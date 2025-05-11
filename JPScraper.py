import requests
from bs4 import BeautifulSoup
import json
import os
import re
from datetime import datetime
import time
import logging
from Geocoder import Geocoder
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from urllib.parse import urljoin

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scraper.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("JPScraper")


class JPScraper:
    def __init__(self, config_file="jp_locations.json"):
        self.jp_data = []
        self.source_info = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0'
        }
        self.session = requests.Session()
        self.geocoder = Geocoder()

        # Load locations from config file
        try:
            with open(config_file, "r") as f:
                config = json.load(f)
                self.locations = config.get("locations", {})
                logger.info(f"Loaded {len(self.locations)} locations from {config_file}")
        except FileNotFoundError:
            logger.error(f"Config file {config_file} not found, using empty configuration")
            self.locations = {}

    def get_coordinates(self, postcode):
        """Get coordinates for known postcodes"""
        COORDINATES = {
            "2153": {"lat": -33.7304, "lon": 150.9678},  # Norwest/Winston Hills
            "2154": {"lat": -33.7319, "lon": 151.0042},  # Castle Hill
            "2155": {"lat": -33.6841, "lon": 150.9107},  # Rouse Hill
            "2768": {"lat": -33.7184, "lon": 150.9151},  # Stanhope Gardens
            "2769": {"lat": -33.7035, "lon": 150.9066},  # The Ponds
            "2145": {"lat": -33.7880, "lon": 150.9773},  # Winston Hills
            "2150": {"lat": -33.8148, "lon": 151.0017},  # Parramatta
            "2151": {"lat": -33.7967, "lon": 150.9882},  # North Parramatta
            "2152": {"lat": -33.7650, "lon": 150.9556},  # Northmead
            "2148": {"lat": -33.7677, "lon": 150.8577},  # Blacktown
            "2750": {"lat": -33.7506, "lon": 150.6944},  # Penrith
            "2170": {"lat": -33.9200, "lon": 150.9255},  # Liverpool
            "2077": {"lat": -33.7039, "lon": 151.0987},  # Hornsby
            "2113": {"lat": -33.7858, "lon": 151.1243},  # Macquarie Centre
        }
        return COORDINATES.get(str(postcode))

    def extract_postcode(self, address):
        """Extract NSW postcode from address"""
        match = re.search(r'NSW\s+(\d{4})', address)
        return match.group(1) if match else None

    def clean_address(self, address):
        """Clean and format address string"""
        if not address:
            return ""
        # Remove extra whitespace and newlines
        address = re.sub(r'\s+', ' ', address.replace('\n', ' '))
        # Remove duplicate commas
        address = re.sub(r',\s*,', ',', address)
        # Remove extra spaces around commas
        address = re.sub(r'\s*,\s*', ', ', address)
        return address.strip()

    def extract_hours_from_text(self, text):
        """
        Extract hours in the structured format needed for the frontend.
        Returns a dictionary with days as keys and time ranges as values.
        """
        days = {
            'Monday': '',
            'Tuesday': '',
            'Wednesday': '',
            'Thursday': '',
            'Friday': '',
            'Saturday': '',
            'Sunday': ''
        }
        
        if not text:
            return days

        text_lower = text.lower()
        
        # Extract notes about delays, booking requirements etc.
        notes = []
        if "avoid delays" in text_lower:
            delay_match = re.search(r'to avoid delays.*?(?=(?:[A-Z][a-z]+:|\Z))', text, re.DOTALL)
            if delay_match:
                notes.append(delay_match.group(0).strip())
        
        if "copying service" in text_lower:
            copy_match = re.search(r'(?:no )?copying service[^.]*\.', text_lower)
            if copy_match:
                notes.append(copy_match.group(0).strip().capitalize())

        # Handle individual days
        day_patterns = {
            'monday': 'Monday',
            'tuesday': 'Tuesday',
            'wednesday': 'Wednesday',
            'thursday': 'Thursday',
            'friday': 'Friday',
            'saturday': 'Saturday',
            'sunday': 'Sunday'
        }

        for pattern, day in day_patterns.items():
            if pattern in text_lower:
                # Look for time range after day name
                time_match = re.search(
                    rf"{pattern}:?\s*(\d+(?::\d+)?\s*(?:am|pm)\s*(?:-|to)\s*\d+(?::\d+)?\s*(?:am|pm))",
                    text_lower,
                    re.IGNORECASE
                )
                if time_match:
                    time_range = time_match.group(1)
                    # Standardize format to "HH:MM AM/PM"
                    time_parts = re.findall(r'(\d+)(?::(\d+))?\s*(am|pm)', time_range.lower())
                    if len(time_parts) == 2:
                        start_time = self.format_time(time_parts[0])
                        end_time = self.format_time(time_parts[1])
                        days[day] = f"{start_time} - {end_time}"

        return days, ' '.join(notes)

    def format_time(self, time_parts):
        """Format time parts into standardized "HH:MM AM/PM" format"""
        hour, minute, meridiem = time_parts
        hour = int(hour)
        minute = minute if minute else "00"
        if meridiem.lower() == "pm" and hour != 12:
            hour += 12
        elif meridiem.lower() == "am" and hour == 12:
            hour = 0
        return f"{hour:02d}:{minute} {meridiem.upper()}"

    def extract_address(self, text, location_name):
        """Extract NSW address from text using regex patterns"""
        if not text:
            return ""
            
        # Try to find full address with postcode
        address_pattern = r'(\d+[A-Za-z\s\-,]+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Lane|Ln|Place|Pl|Parade|Pde|Highway|Hwy)[,\s]+[A-Za-z\s\-]+(?:NSW|nsw)[,\s]+\d{4})'
        match = re.search(address_pattern, text)
        if match:
            return self.clean_address(match.group(1))

        # Try to find library or center name with location
        location_pattern = r'([A-Za-z\s\-]+(?:Library|Centre|Center|Building|Office)[,\s]+[A-Za-z\s\-]+)'
        match = re.search(location_pattern, text)
        if match:
            return self.clean_address(f"{match.group(1)}, {location_name}, NSW")

        # Fall back to location name
        return self.clean_address(f"{text}, {location_name}, NSW")

    def clean_text(self, text):
        """Clean and normalize text"""
        if not text:
            return ""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        # Remove special characters but keep basic punctuation
        text = re.sub(r'[^\w\s,.-]', '', text)
        return text.strip()

    def scrape_location(self, location_id):
        """Generic method to determine which scraper to use based on location configuration"""
        location = self.locations.get(location_id)
        if not location:
            logger.error(f"Location ID {location_id} not found in configuration")
            return

        # Determine which scraping method to use
        scraper_type = location.get("scraper_type", "council")  # Default to council type

        if scraper_type == "shopping_center":
            self.scrape_shopping_center(location)
        else:
            self.scrape_council_website(location_id, location)

    def scrape_council_website(self, location_id, location):
        """Method for scraping council websites"""
        logger.info(f"Scraping {location['name']} ({location['url']}) as council website")

        try:
            response = self.session.get(location['url'], headers=self.headers, timeout=30)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, 'html.parser')

            # Common selectors to try
            content_selectors = [
                'div.content-wrapper', 'div.main-content', 'article.main-content',
                'div#main-content', 'div.page-content', 'div.service-details',
                'section.service-information'
            ]

            content = None
            for selector in content_selectors:
                content = soup.select_one(selector)
                if content:
                    break

            if not content:
                content = soup.find('main')

            if not content:
                logger.warning(f"Could not find content area for {location['name']}")
                content = soup.body

            # Look for tables
            locations = []
            tables = content.find_all('table')

            if tables:
                for table in tables:
                    rows = table.find_all('tr')
                    if len(rows) <= 1:
                        continue  # Skip tables with only headers

                    # Try to determine column meanings
                    headers = rows[0].find_all(['th', 'td'])
                    header_texts = [h.text.strip().lower() for h in headers]

                    # Identify column indices
                    location_idx = next(
                        (i for i, h in enumerate(header_texts) if 'location' in h or 'venue' in h or 'library' in h), 0)
                    days_idx = next((i for i, h in enumerate(header_texts) if 'day' in h or 'date' in h), 1)
                    times_idx = next((i for i, h in enumerate(header_texts) if 'time' in h or 'hour' in h), 2)

                    for row in rows[1:]:  # Skip header row
                        cells = row.find_all(['th', 'td'])
                        if len(cells) >= 2:
                            location_text = cells[location_idx].text.strip() if location_idx < len(cells) else ""
                            days_text = cells[days_idx].text.strip() if days_idx < len(cells) else ""
                            times_text = cells[times_idx].text.strip() if times_idx < len(cells) else ""

                            if location_text:
                                location_name = self.clean_text(location_text)
                                address = self.extract_address(location_text, location['name'])

                                # Fix up days text
                                days_text = re.sub(r'(\d)(am|pm)', r'\1 \2', days_text)
                                days = self.clean_text(days_text)
                                hours = self.extract_hours_from_text(times_text)

                                # If hours are empty but days includes time information
                                if not hours and re.search(r'\d+:\d+|am|pm', days):
                                    # Try to split days and times
                                    match = re.match(r'([^0-9:]+)(.+)', days)
                                    if match:
                                        days = match.group(1).strip()
                                        hours = self.extract_hours_from_text(match.group(2))

                                # Get postcode
                                postcode = ""
                                pc_match = re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE)
                                if pc_match:
                                    postcode = pc_match.group(1)

                                # Geocode the address to get lat/lon
                                lat, lon = self.geocoder.geocode_address(address)
                                print(f'Got values for Geocode the address {lat} {lon}')

                                locations.append({
                                    "name": location_name,
                                    "address": address,
                                    "days": days,
                                    "hours": hours,
                                    "council": location['name'],
                                    "source_url": location['url'],
                                    "postcode": postcode,
                                    "lat": lat,
                                    "lon": lon
                                })

            # If no tables or no results from tables, try paragraphs and lists
            if not locations:
                # Look for sections that might contain JP information
                sections = content.find_all(['div', 'section', 'article'])

                for section in sections:
                    headings = section.find_all(['h2', 'h3', 'h4'])
                    for heading in headings:
                        # Check if heading is related to JP services locations
                        heading_text = heading.text.strip().lower()
                        if 'jp' in heading_text or 'justice' in heading_text or 'service' in heading_text or 'location' in heading_text:
                            # Check next sibling elements for location information
                            next_elements = heading.find_next_siblings(['p', 'ul', 'div'])

                            for element in next_elements[:3]:  # Check next 3 elements
                                if element.name == 'ul':
                                    list_items = element.find_all('li')
                                    for item in list_items:
                                        item_text = item.text.strip()
                                        # Try to identify if this list item contains a location
                                        if ('library' in item_text.lower() or 'centre' in item_text.lower() or
                                                'center' in item_text.lower() or 'council' in item_text.lower()):

                                            # Try to extract location and time information
                                            parts = item_text.split('-', 1)
                                            if len(parts) >= 2:
                                                location_name = self.clean_text(parts[0])
                                                address = self.extract_address(parts[0], location['name'])
                                                schedule = self.clean_text(parts[1])

                                                # Extract hours from schedule
                                                hours = self.extract_hours_from_text(schedule)

                                                # Get postcode
                                                postcode = ""
                                                pc_match = re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE)
                                                if pc_match:
                                                    postcode = pc_match.group(1)

                                                # Geocode the address
                                                lat, lon = self.geocoder.geocode_address(address)

                                                locations.append({
                                                    "name": location_name,
                                                    "address": address,
                                                    "days": schedule,
                                                    "hours": hours,
                                                    "council": location['name'],
                                                    "source_url": location['url'],
                                                    "postcode": postcode,
                                                    "lat": lat,
                                                    "lon": lon
                                                })
                                elif element.name == 'p':
                                    # Check if paragraph contains location information
                                    p_text = element.text.strip()
                                    if ('library' in p_text.lower() or 'council' in p_text.lower() or
                                            'available' in p_text.lower() or 'service' in p_text.lower()):

                                        lines = p_text.split('\n')
                                        for line in lines:
                                            if ('monday' in line.lower() or 'tuesday' in line.lower() or
                                                    'wednesday' in line.lower() or 'thursday' in line.lower() or
                                                    'friday' in line.lower() or 'saturday' in line.lower() or
                                                    'sunday' in line.lower()):

                                                parts = line.split('-', 1)
                                                if len(parts) >= 2:
                                                    location_name = self.clean_text(parts[0])
                                                    address = self.extract_address(parts[0], location['name'])
                                                    schedule = self.clean_text(parts[1])
                                                    hours = self.extract_hours_from_text(schedule)

                                                    # Get postcode
                                                    postcode = ""
                                                    pc_match = re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE)
                                                    if pc_match:
                                                        postcode = pc_match.group(1)

                                                    # Geocode the address
                                                    lat, lon = self.geocoder.geocode_address(address)

                                                    locations.append({
                                                        "name": location_name,
                                                        "address": address,
                                                        "days": schedule,
                                                        "hours": hours,
                                                        "council": location['name'],
                                                        "source_url": location['url'],
                                                        "postcode": postcode,
                                                        "lat": lat,
                                                        "lon": lon
                                                    })

            # Add the locations to our JP data
            self.jp_data.extend(locations)

            # Add source information
            self.source_info.append({
                "source": location['name'],
                "url": location['url'],
                "scraped_at": datetime.now().isoformat(),
                "locations_found": len(locations)
            })

            logger.info(f"Found {len(locations)} JP locations from {location['name']}")

        except Exception as e:
            logger.error(f"Error scraping {location['name']}: {str(e)}")

    def get_soup(self, url):
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')

    def scrape_winston_hills(self, location):
        try:
            options = Options()
            options.add_argument('--headless')
            options.add_argument('--disable-gpu')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')

            driver = webdriver.Chrome(options=options)
            driver.get(location['url'])

            driver.implicitly_wait(15)
            time.sleep(5)

            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            driver.quit()

            logger.info(f"[JP Winston Hills] Page title: {soup.title.text if soup.title else 'No title'}")

            # Use the body as our container
            main_content = soup.find('body')

            # Find all text that contains "Justice of the Peace" or "JP Service"
            jp_text = ""
            for element in main_content.find_all(text=True):
                if 'justice of the peace' in element.lower() or 'jp service' in element.lower():
                    # Get the parent element and its text
                    parent = element.parent
                    if parent:
                        jp_text += " " + parent.get_text().strip()

                        # Also get siblings text for context
                        for sibling in parent.next_siblings:
                            if hasattr(sibling, 'get_text'):
                                jp_text += " " + sibling.get_text().strip()
                                # Limit how many siblings we capture
                                if len(jp_text) > 500:
                                    break

            if jp_text:
                jp_text = re.sub(r'\s+', ' ', jp_text)
                logger.info(f"[JP Winston Hills] Found JP text: {jp_text[:150]}...")

                # Try to extract "Every [DAY] [TIME] to [TIME]" pattern
                every_pattern = r'every\s+([a-z]+day)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s+to\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))'
                every_match = re.search(every_pattern, jp_text, re.IGNORECASE)

                days = ""
                hours = ""

                if every_match:
                    days = f"Every {every_match.group(1).capitalize()}"
                    hours = f"{every_match.group(2)} to {every_match.group(3)}"
                else:
                    # Alternative patterns
                    # Try to find day pattern
                    day_match = re.search(r'((?:mon|tues|wednes|thurs|fri|satur|sun)day)s?', jp_text, re.IGNORECASE)
                    if day_match:
                        days = day_match.group(1).capitalize()

                        # Look for time ranges near the day mention
                        start_pos = jp_text.lower().find(day_match.group(0).lower())
                        surrounding_text = jp_text[max(0, start_pos - 20):min(len(jp_text), start_pos + 100)]

                        # Try time range patterns
                        time_range_patterns = [
                            r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|-|–|—)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))',
                            r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))'
                        ]

                        for pattern in time_range_patterns:
                            time_match = re.search(pattern, surrounding_text, re.IGNORECASE)
                            if time_match:
                                hours = f"{time_match.group(1)} to {time_match.group(2)}"
                                break

                # If we still don't have hours, look for any time mentions
                if not hours:
                    time_mentions = re.findall(r'\d{1,2}(?::\d{2})?\s*(?:am|pm)', jp_text)
                    if len(time_mentions) >= 2:
                        hours = f"{time_mentions[0]} to {time_mentions[1]}"

                # If we still don't have days, look for uppercase DAY mentions
                if not days:
                    uppercase_day = re.search(r'(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)', jp_text)
                    if uppercase_day:
                        days = f"Every {uppercase_day.group(1).capitalize()}"

                address = location.get('address', f"{location['name']}, NSW")
                postcode_match = re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE)
                postcode = postcode_match.group(1) if postcode_match else ''

                self.jp_data.append({
                    "name": location['name'],
                    "address": address,
                    "days": days,
                    "hours": hours,
                    "council": "N/A",
                    "source_url": location['url'],
                    "postcode": postcode
                })

                self.source_info.append({
                    "source": location['name'],
                    "url": location['url'],
                    "scraped_at": datetime.now().isoformat(),
                    "locations_found": 1
                })

                logger.info(f"[JP Winston Hills] Found: {days} | {hours}")
                return

            logger.warning(f"[JP Winston Hills] Could not find JP service details on the page: {location['url']}")

        except Exception as e:
            logger.error(f"[JP Winston Hills] Scraping error: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())

    def scrape_shopping_center(self, location):
        logger.info(f"Scraping {location['name']} ({location['url']}) as shopping center")
        url = location['url']
        logger.info(f"Scraping shopping centre: {location['name']} from {url}")

        try:
            soup = self.get_soup(url)

            # Dispatch to specific function
            name_lower = location['name'].lower()
            if 'winston hills' in name_lower:
                return self.scrape_winston_hills(location)
            elif 'stanhope' in name_lower:
                return self.scrape_stanhope_village(location)
            else:
                return self.scrape_generic_shopping_center(location, soup)

        except Exception as e:
            logger.error(f"Failed to scrape shopping centre: {e}")


    def scrape_all_locations(self):
        """Scrape all configured locations"""
        for location_id in self.locations:
            self.scrape_location(location_id)
            # Be nice to the servers
            time.sleep(2)

    def save_data(self, output_dir="data"):
        """Save scraped data to JSON file"""
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        output_file = os.path.join(output_dir, "jp_locations_out.json")
        
        formatted_data = []
        for location in self.jp_data:
            # Clean up the name and address
            name = location.get('name', '').split('Location')[0].strip()
            address = self.clean_address(location.get('address', ''))
            
            # Format hours into the required structure
            hours_text = location.get('hours', '')
            days_list = []
            hours_dict = {}
            
            # Parse the hours text into structured format
            for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']:
                if day.lower() in hours_text.lower():
                    time_match = re.search(
                        rf"{day}:?\s*(\d+(?::\d+)?\s*(?:am|pm)\s*(?:-|to)\s*\d+(?::\d+)?\s*(?:am|pm))",
                        hours_text,
                        re.IGNORECASE
                    )
                    if time_match:
                        time_range = time_match.group(1)
                        # Convert to standardized format (e.g., "10:00 AM - 12:00 PM")
                        times = re.findall(r'(\d+)(?::(\d+))?\s*(am|pm)', time_range.lower())
                        if len(times) == 2:
                            start_time = f"{int(times[0][0]):02d}:{times[0][1] or '00'} {times[0][2].upper()}"
                            end_time = f"{int(times[1][0]):02d}:{times[1][1] or '00'} {times[1][2].upper()}"
                            hours_dict[day] = f"{start_time} - {end_time}"
                            days_list.append(day)

            # Handle "Monday to Friday" pattern
            if "monday to friday" in hours_text.lower():
                days_list = ["Monday to Friday"]
                for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']:
                    hours_dict[day] = "8:30 AM - 5:00 PM"

            # Extract postcode and get coordinates
            postcode = location.get('postcode') or self.extract_postcode(address)
            coords = self.get_coordinates(postcode) if postcode else None
            
            formatted_location = {
                "name": name,
                "address": address,
                "days": ", ".join(days_list),
                "hours": hours_dict,
                "council": location.get('council', 'N/A'),
                "source_url": location.get('source_url', ''),
                "postcode": postcode or ''
            }
            
            if coords:
                formatted_location.update(coords)
                
            formatted_data.append(formatted_location)

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(formatted_data, f, indent=2, ensure_ascii=False)

        logger.info(f"Saved {len(formatted_data)} JP locations to {output_file}")

    def scrape_stanhope_village(self, location):
        """Scraper for Stanhope Village and Dennis Johnson Library JP services"""
        logger.info(f"Scraping Stanhope Village ({location['url']})")

        try:
            response = self.session.get(location['url'], headers=self.headers, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            content = soup.select_one('div.page-content') or soup.body
            full_text = content.get_text(separator="\n", strip=True)

            # Lowercase version for pattern searching
            full_text_lower = full_text.lower()
            found_entries = []

            # --- Capture holiday closure notice ---
            holiday_notice = ""
            holiday_match = re.search(r"(christmas holiday hours.*?)\n", full_text, re.IGNORECASE | re.DOTALL)
            if holiday_match:
                holiday_notice = self.clean_text(holiday_match.group(1))

            # --- Common notes ---
            contact_note = ""
            contact_match = re.search(r"(call them at\s*0[2-9]\d{3}\s*\d{4})", full_text, re.IGNORECASE)
            if contact_match:
                contact_note = "To ensure the availability of the service on the day, kindly " + contact_match.group(
                    1).strip()

            # --- STANHOPE VILLAGE JP DESK ---
            if "jp desk" in full_text_lower or "outside specsavers" in full_text_lower:
                match = re.search(
                    r"operates on (.*?)christmas holiday hours",
                    full_text_lower,
                    re.DOTALL
                )
                if match:
                    raw_times = match.group(1)
                    days = self.clean_text(raw_times)
                    hours = self.extract_hours_from_text(raw_times)

                    found_entries.append({
                        "name": "Stanhope Village Shopping Centre (JP Desk)",
                        "address": "Outside Specsavers, Stanhope Village Shopping Centre, 2 Sentry Drive, Stanhope Gardens NSW 2768",
                        "days": days,
                        "hours": hours,
                        "council": "N/A",
                        "source_url": location['url'],
                        "postcode": "2768",
                        "holiday_notice": holiday_notice,
                        "notes": contact_note
                    })

            # --- DENNIS JOHNSON LIBRARY ---
            if "dennis johnson library" in full_text_lower:
                match = re.search(
                    r"dennis johnson library.*?(mondays.*?)(to ensure|for more info|call them|$)",
                    full_text_lower,
                    re.DOTALL
                )
                if match:
                    raw_times = match.group(1)
                    days = self.clean_text(raw_times)
                    hours = self.extract_hours_from_text(raw_times)

                    found_entries.append({
                        "name": "Dennis Johnson Library (JP Service)",
                        "address": "Stanhope Leisure Centre, Sentry Drive, Stanhope Gardens NSW 2768",
                        "days": days,
                        "hours": hours,
                        "council": "N/A",
                        "source_url": location['url'],
                        "postcode": "2768",
                        "holiday_notice": holiday_notice,
                        "notes": contact_note
                    })

            if found_entries:
                self.jp_data.extend(found_entries)
                for entry in found_entries:
                    logger.info(f"Found JP service: {entry['name']} - Days: {entry['days']} - Hours: {entry['hours']}")
            else:
                logger.warning("Could not find JP service details at Stanhope Village")

            self.source_info.append({
                "source": "Stanhope Village Shopping Centre",
                "url": location['url'],
                "scraped_at": datetime.now().isoformat(),
                "locations_found": len(found_entries)
            })

        except Exception as e:
            logger.error(f"Error scraping Stanhope Village: {str(e)}")

if __name__ == "__main__":
    config_path = os.environ.get("JP_CONFIG_PATH", "data/jp_locations.json")
    print(f'config_path - {config_path}')
    scraper = JPScraper(config_path)
    scraper.scrape_all_locations()
    scraper.save_data()