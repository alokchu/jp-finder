import requests
from bs4 import BeautifulSoup
import json
import os
import re
from datetime import datetime
import time
import logging
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

        # Load locations from config file
        try:
            with open(config_file, "r") as f:
                config = json.load(f)
                self.locations = config.get("locations", {})
                logger.info(f"Loaded {len(self.locations)} locations from {config_file}")
        except FileNotFoundError:
            logger.error(f"Config file {config_file} not found, using empty configuration")
            self.locations = {}

    def extract_address(self, text, location_name):
        """Extract NSW address from text using regex patterns"""
        # Try to find full address with postcode
        address_pattern = r'(\d+[A-Za-z\s\-,]+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Lane|Ln|Place|Pl|Parade|Pde|Highway|Hwy)[,\s]+[A-Za-z\s\-]+(?:NSW|nsw)[,\s]+\d{4})'
        match = re.search(address_pattern, text)
        if match:
            return match.group(1).strip()

        # Try to find library or center name with location
        location_pattern = r'([A-Za-z\s\-]+(?:Library|Centre|Center|Building|Office)[,\s]+[A-Za-z\s\-]+)'
        match = re.search(location_pattern, text)
        if match:
            return f"{match.group(1).strip()}, {location_name}, NSW"

        # Fall back to location name
        return f"{text.strip()}, {location_name}, NSW"

    def clean_text(self, text):
        """Clean and normalize text"""
        if not text:
            return ""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        # Remove special characters
        return text

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
                                hours = self.clean_text(times_text)

                                # If hours are empty but days includes time information
                                if not hours and re.search(r'\d+:\d+|am|pm', days):
                                    # Try to split days and times
                                    match = re.match(r'([^0-9:]+)(.+)', days)
                                    if match:
                                        days = match.group(1).strip()
                                        hours = match.group(2).strip()

                                locations.append({
                                    "name": location_name,
                                    "address": address,
                                    "days": days,
                                    "hours": hours,
                                    "council": location['name'],
                                    "source_url": location['url'],
                                    "postcode": re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE).group(
                                        1) if re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE) else ""
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

                                                # Try to separate days and hours
                                                days = schedule
                                                hours = ""

                                                locations.append({
                                                    "name": location_name,
                                                    "address": address,
                                                    "days": days,
                                                    "hours": hours,
                                                    "council": location['name'],
                                                    "source_url": location['url'],
                                                    "postcode": re.search(r'NSW[,\s]+(\d{4})', address,
                                                                          re.IGNORECASE).group(1) if re.search(
                                                        r'NSW[,\s]+(\d{4})', address, re.IGNORECASE) else ""
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

                                                    locations.append({
                                                        "name": location_name,
                                                        "address": address,
                                                        "days": schedule,
                                                        "hours": "",
                                                        "council": location['name'],
                                                        "source_url": location['url'],
                                                        "postcode": re.search(r'NSW[,\s]+(\d{4})', address,
                                                                              re.IGNORECASE).group(1) if re.search(
                                                            r'NSW[,\s]+(\d{4})', address, re.IGNORECASE) else ""
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

    def extract_hours_from_text(self, text):
        """
        Extracts and returns a clean, comma-separated string of time ranges or standalone times from text.
        e.g., "Wednesdays 3pm - 6pm and Saturdays 9am - 12pm" -> "3pm - 6pm, 9am - 12pm"
        """
        time_ranges = re.findall(r'(\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*-\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))', text,
                                 re.IGNORECASE)
        single_times = re.findall(r'(?<!-)\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b(?!\s*-\s*\d)', text, re.IGNORECASE)

        all_times = time_ranges + single_times
        return ', '.join(sorted(set(t.strip() for t in all_times)))

    def scrape_rouse_hill(self, location):
        """Scraper for Rouse Hill Town Centre JP services"""
        logger.info(f"Scraping Rouse Hill Town Centre ({location['url']})")

        try:
            response = self.session.get(location['url'], headers=self.headers, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Search for JP services
            jp_elements = soup.find_all(string=lambda text: text and ('justice of the peace' in text.lower() or
                                                                      'jp service' in text.lower()))

            if jp_elements:
                # Find container with JP information
                jp_container = None
                for element in jp_elements:
                    parent = element.parent
                    for _ in range(4):  # Look up to 4 levels up
                        if parent and hasattr(parent, 'name'):
                            if parent.name in ['div', 'section', 'article']:
                                jp_container = parent
                                break
                            parent = parent.parent
                        else:
                            break

                    if jp_container:
                        break

                if jp_container:
                    # Extract JP information
                    text = jp_container.get_text(separator="\n", strip=True)

                    # Common patterns for Rouse Hill Town Centre
                    days_pattern = r'((?:mon|tues|wednes|thurs|fri|satur|sun)days?)'
                    time_pattern = r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|–|-)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))'

                    # Find all day matches
                    days = []
                    for day_match in re.finditer(days_pattern, text, re.IGNORECASE):
                        day = day_match.group(1).capitalize()
                        if day.endswith('s') and not day.endswith('ys'):  # Fix plurals but not days ending in 'ys'
                            day = day[:-1]
                        days.append(day)

                    # Find all time matches
                    hours = []
                    for time_match in re.finditer(time_pattern, text, re.IGNORECASE):
                        hour = f"{time_match.group(1)} to {time_match.group(2)}"
                        hours.append(hour)

                    # Clean up and format
                    days_str = ", ".join(days) if days else "Please check website for current schedule"
                    hours_str = ", ".join(hours) if hours else ""

                    # Find location within center
                    location_pattern = r'(?:located|available|desk|situated|find).*?((?:level|floor|near|outside|opposite|beside).*?)(?:\.|,|\n)'
                    location_match = re.search(location_pattern, text, re.IGNORECASE)
                    location_desc = ""
                    if location_match:
                        location_desc = f" ({location_match.group(1).strip().capitalize()})"

                    # Add entry
                    address = "Windsor Rd & White Hart Dr, Rouse Hill NSW 2155"
                    self.jp_data.append({
                        "name": f"Rouse Hill Town Centre{location_desc}",
                        "address": address,
                        "days": days_str,
                        "hours": hours_str,
                        "council": "N/A",
                        "source_url": location['url'],
                        "postcode": "2155",
                        "notes": "Please visit the Customer Service desk for assistance"
                    })

                    self.source_info.append({
                        "source": "Rouse Hill Town Centre",
                        "url": location['url'],
                        "scraped_at": datetime.now().isoformat(),
                        "locations_found": 1
                    })

                    logger.info(f"Found JP service at Rouse Hill: {days_str} | {hours_str}")
                    return

            logger.warning("Could not find JP service details at Rouse Hill Town Centre")

        except Exception as e:
            logger.error(f"Error scraping Rouse Hill Town Centre: {str(e)}")

    def scrape_shopping_center(self, location):
        """Enhanced method to scrape shopping centers with specific handlers for known centers"""
        logger.info(f"Scraping {location['name']} ({location['url']}) as shopping center")

        try:
            response = self.session.get(location['url'], headers=self.headers, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Dispatch to specific function based on shopping center name
            name_lower = location['name'].lower()

            if 'winston hills' in name_lower:
                return self.scrape_winston_hills(location)
            elif 'stanhope' in name_lower:
                return self.scrape_stanhope_village(location)
            elif 'castle' in name_lower and ('tower' in name_lower or 'hill' in name_lower):
                return self.scrape_castle_towers(location)
            elif 'rouse hill' in name_lower:
                return self.scrape_rouse_hill(location)
            elif 'macquarie' in name_lower and 'centre' in name_lower:
                # Call a specific scraper for Macquarie Centre
                return self.scrape_macquarie_centre(location, soup)
            elif 'stockland' in name_lower:
                # Call a specific scraper for Stockland centers
                return self.scrape_stockland_center(location, soup)
            else:
                # Fall back to generic scraper
                return self.scrape_generic_shopping_center(location, soup)

        except Exception as e:
            logger.error(f"Failed to scrape shopping centre {location['name']}: {str(e)}")

    def scrape_macquarie_centre(self, location, soup):
        """Specific scraper for Macquarie Centre"""
        logger.info(f"Scraping Macquarie Centre ({location['url']})")

        try:
            # Macquarie Centre often has JP services info in their Customer Service section
            # Look for specific mentions of JP services
            jp_elements = soup.find_all(string=lambda text: text and ('justice of the peace' in text.lower() or
                                                                      'jp service' in text.lower()))

            if not jp_elements:
                # If not found on landing page, try common customer service page
                service_url = urljoin(location['url'], '/services')
                try:
                    service_response = self.session.get(service_url, headers=self.headers, timeout=30)
                    service_response.raise_for_status()
                    service_soup = BeautifulSoup(service_response.text, 'html.parser')
                    jp_elements = service_soup.find_all(
                        string=lambda text: text and ('justice of the peace' in text.lower() or
                                                      'jp service' in text.lower()))
                    if jp_elements:
                        soup = service_soup
                except:
                    logger.warning("Failed to check services page at Macquarie Centre")

            if jp_elements:
                # Find container
                jp_container = None
                for element in jp_elements:
                    parent = element.parent
                    for _ in range(4):
                        if parent and hasattr(parent, 'name'):
                            if parent.name in ['div', 'section', 'article', 'li']:
                                jp_container = parent
                                break
                            parent = parent.parent
                        else:
                            break

                    if jp_container:
                        break

                if jp_container:
                    text = jp_container.get_text(separator="\n", strip=True)

                    # Pattern matching for Macquarie Centre
                    days_pattern = r'((?:mon|tues|wednes|thurs|fri|satur|sun)day)s?'
                    time_pattern = r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|–|-)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))'

                    days_matches = list(re.finditer(days_pattern, text, re.IGNORECASE))
                    time_matches = list(re.finditer(time_pattern, text, re.IGNORECASE))

                    days = [match.group(1).capitalize() for match in days_matches]
                    hours = [f"{match.group(1)} to {match.group(2)}" for match in time_matches]

                    days_str = ", ".join(days) if days else "Please check with customer service"
                    hours_str = ", ".join(hours) if hours else ""

                    # Look for location descriptor
                    location_desc = ""
                    location_patterns = [
                        r'(?:located|available|desk|situated|find).*?((?:level|floor|near|outside|opposite|beside).*?)(?:\.|,|\n)',
                        r'(customer service desk|information desk|concierge)'
                    ]

                    for pattern in location_patterns:
                        location_match = re.search(pattern, text, re.IGNORECASE)
                        if location_match:
                            location_desc = f" ({location_match.group(1).strip().capitalize()})"
                            break

                    # Add entry
                    address = "Cnr Herring Rd & Waterloo Rd, North Ryde NSW 2113"
                    self.jp_data.append({
                        "name": f"Macquarie Centre{location_desc}",
                        "address": address,
                        "days": days_str,
                        "hours": hours_str,
                        "council": "N/A",
                        "source_url": location['url'],
                        "postcode": "2113"
                    })

                    self.source_info.append({
                        "source": "Macquarie Centre",
                        "url": location['url'],
                        "scraped_at": datetime.now().isoformat(),
                        "locations_found": 1
                    })

                    logger.info(f"Found JP service at Macquarie Centre: {days_str} | {hours_str}")
                    return

            logger.warning("Could not find JP service details at Macquarie Centre")

        except Exception as e:
            logger.error(f"Error scraping Macquarie Centre: {str(e)}")

    def scrape_stockland_center(self, location, soup):
        """Specific scraper for Stockland shopping centers"""
        logger.info(f"Scraping Stockland center: {location['name']} ({location['url']})")

        try:
            # Try to find JP service mentions
            jp_elements = soup.find_all(string=lambda text: text and ('justice of the peace' in text.lower() or
                                                                      'jp service' in text.lower()))

            if not jp_elements:
                # If not found on landing page, try common customer service pages
                service_paths = ['/services', '/centre-services', '/customer-service']
                for path in service_paths:
                    try:
                        service_url = urljoin(location['url'], path)
                        service_response = self.session.get(service_url, headers=self.headers, timeout=30)
                        if service_response.status_code == 200:
                            service_soup = BeautifulSoup(service_response.text, 'html.parser')
                            jp_elements = service_soup.find_all(
                                string=lambda text: text and ('justice of the peace' in text.lower() or
                                                              'jp service' in text.lower()))
                            if jp_elements:
                                soup = service_soup
                                location['url'] = service_url  # Update URL for reference
                                break
                    except:
                        continue

            if jp_elements:
                # Find container
                jp_container = None
                for element in jp_elements:
                    parent = element.parent
                    for _ in range(5):  # Look up to 5 levels up
                        if parent and hasattr(parent, 'name'):
                            if parent.name in ['div', 'section', 'article', 'li']:
                                jp_container = parent
                                break
                            parent = parent.parent
                        else:
                            break

                    if jp_container:
                        break

                if jp_container:
                    text = jp_container.get_text(separator="\n", strip=True)

                    # Pattern matching for Stockland centers
                    days_pattern = r'((?:mon|tues|wednes|thurs|fri|satur|sun)day)s?'
                    time_pattern = r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|–|-)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))'

                    days_matches = list(re.finditer(days_pattern, text, re.IGNORECASE))
                    time_matches = list(re.finditer(time_pattern, text, re.IGNORECASE))

                    days = [match.group(1).capitalize() for match in days_matches]
                    hours = [f"{match.group(1)} to {match.group(2)}" for match in time_matches]

                    days_str = ", ".join(days) if days else "Please check with customer service"
                    hours_str = ", ".join(hours) if hours else ""

                    # Location information
                    location_desc = ""
                    location_patterns = [
                        r'(?:located|available|desk|situated|find).*?((?:level|floor|near|outside|opposite|beside).*?)(?:\.|,|\n)',
                        r'(customer service desk|information desk|concierge)'
                    ]

                    for pattern in location_patterns:
                        location_match = re.search(pattern, text, re.IGNORECASE)
                        if location_match:
                            location_desc = f" ({location_match.group(1).strip().capitalize()})"
                            break

                    # Extract address from page if available, otherwise use defaults
                    address = location.get('address', '')
                    if not address:
                        # Look for address in footer or contact section
                        address_elements = soup.find_all('address') or soup.find_all(class_='address')
                        if address_elements:
                            address = address_elements[0].get_text(strip=True)
                        else:
                            # Default addresses for common Stockland centers in NW Sydney
                            if 'baulkham hills' in location['name'].lower():
                                address = "375-383 Windsor Rd, Baulkham Hills NSW 2153"
                            elif 'glenrose' in location['name'].lower():
                                address = "56-58 Glenrose Village, Glen Street, Belrose NSW 2085"
                            elif 'merrylands' in location['name'].lower():
                                address = "1 Pitt St, Merrylands NSW 2160"
                            else:
                                address = f"{location['name']}, NSW"

                    # Extract postcode
                    postcode_match = re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE)
                    postcode = postcode_match.group(1) if postcode_match else ''

                    # Add entry
                    self.jp_data.append({
                        "name": f"{location['name']}{location_desc}",
                        "address": address,
                        "days": days_str,
                        "hours": hours_str,
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

                    logger.info(f"Found JP service at {location['name']}: {days_str} | {hours_str}")
                    return

            logger.warning(f"Could not find JP service details at {location['name']}")

        except Exception as e:
            logger.error(f"Error scraping {location['name']}: {str(e)}")

    def extract_complex_schedule(self, text):
        """
        Extract days and hours from complex text descriptions of JP schedules.
        Returns a tuple of (days_string, hours_string)
        """
        # Initialize empty results
        days_hours = {}

        # Pattern for "Day: Start time - End time" format
        day_time_pattern = r'((?:mon|tues|wednes|thurs|fri|satur|sun)day)s?[:\s]+(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|–|-)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))'

        # Find all day-time pairs
        for match in re.finditer(day_time_pattern, text, re.IGNORECASE):
            day = match.group(1).capitalize()
            time_range = f"{match.group(2)} to {match.group(3)}"
            days_hours[day] = time_range

        # If the above didn't find anything, try simpler patterns
        if not days_hours:
            # Find all days
            days_pattern = r'((?:mon|tues|wednes|thurs|fri|satur|sun)day)s?'
            days = [m.group(1).capitalize() for m in re.finditer(days_pattern, text, re.IGNORECASE)]

            # Find all time ranges
            time_pattern = r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|–|-)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))'
            times = [f"{m.group(1)} to {m.group(2)}" for m in re.finditer(time_pattern, text, re.IGNORECASE)]

            # If we have both days and times but couldn't match them directly
            if days and times:
                # Assume first time applies to all days
                time_str = times[0]
                for day in days:
                    days_hours[day] = time_str

        # Format the results
        days_str = ", ".join(days_hours.keys()) if days_hours else ""
        hours_str = ", ".join(set(days_hours.values())) if days_hours else ""

        return days_str, hours_str

    def scrape_generic_shopping_center(self, location, soup):
        """
        Enhanced generic shopping center scraper that makes a better effort to find JP information
        on various shopping center websites.
        """
        logger.info(f"Scraping generic shopping center: {location['name']}")

        # First attempt: Look for JP or Justice of Peace mentions
        jp_content = None

        # Check for dedicated JP pages or sections
        jp_elements = soup.find_all(string=lambda text: text and ('justice of the peace' in text.lower() or
                                                                  ' jp ' in text.lower() or
                                                                  'jp service' in text.lower()))

        if jp_elements:
            # Find the closest container for the first matching element
            element = jp_elements[0]
            # Navigate up to find a suitable container
            for _ in range(5):  # Try up to 5 levels up
                if element.parent and hasattr(element.parent, 'name'):
                    if element.parent.name in ['div', 'section', 'article']:
                        jp_content = element.parent
                        break
                    element = element.parent
                else:
                    break

        # If no dedicated section found, check if we're already on a JP page
        if not jp_content and ('justice' in soup.title.text.lower() if soup.title else False):
            jp_content = soup.find('main') or soup.find('div', class_='content') or soup.body

        if jp_content:
            # Extract text
            full_text = jp_content.get_text(separator="\n", strip=True)

            # Find days and times
            days_pattern = r'(?:every|each)?\s*([a-z]+day)s?'
            times_pattern = r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|–|-)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))'

            days_match = re.search(days_pattern, full_text, re.IGNORECASE)
            days = days_match.group(1).capitalize() if days_match else ""

            # If we found a day, look for times nearby
            hours = ""
            if days_match:
                start_pos = full_text.lower().find(days_match.group(0).lower())
                context = full_text[max(0, start_pos - 20):min(len(full_text), start_pos + 200)]

                time_match = re.search(times_pattern, context, re.IGNORECASE)
                if time_match:
                    hours = f"{time_match.group(1)} to {time_match.group(2)}"
            else:
                # If no specific day found, just look for any time pattern
                time_match = re.search(times_pattern, full_text, re.IGNORECASE)
                if time_match:
                    hours = f"{time_match.group(1)} to {time_match.group(2)}"

            # Look for location description
            location_pattern = r'((?:located|available|desk|situated|find).*?\b(?:level|floor|near|outside|opposite|beside).*?)(?:\.|,|\n)'
            location_match = re.search(location_pattern, full_text, re.IGNORECASE)
            location_desc = ""
            if location_match:
                location_desc = location_match.group(1).strip()

            # If we found any useful information, add it
            if days or hours:
                address = location.get('address', f"{location['name']}, NSW")
                # Try to extract postcode
                postcode_match = re.search(r'NSW[,\s]+(\d{4})', address, re.IGNORECASE)
                postcode = postcode_match.group(1) if postcode_match else ''

                # Additional context for the JP location
                name_suffix = ""
                if location_desc:
                    name_suffix = f" ({location_desc.capitalize()})"

                self.jp_data.append({
                    "name": f"{location['name']}{name_suffix}",
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

                logger.info(f"Found JP service at {location['name']}: {days} | {hours}")
                return

        logger.warning(f"No JP service information found at {location['name']}")

    def scrape_castle_towers(self, location):
        """Scraper for Castle Towers Shopping Centre JP services"""
        logger.info(f"Scraping Castle Towers ({location['url']})")

        try:
            response = self.session.get(location['url'], headers=self.headers, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Look for Justice of Peace information
            jp_elements = soup.find_all(string=lambda text: text and ('justice of the peace' in text.lower() or
                                                                      ' jp ' in text.lower() or
                                                                      'jp service' in text.lower()))

            if jp_elements:
                # Get the container
                container = None
                for element in jp_elements:
                    parent = element.parent
                    # Look for a suitable container up to 3 levels up
                    for _ in range(3):
                        if parent and hasattr(parent, 'name'):
                            if parent.name in ['div', 'section', 'article']:
                                container = parent
                                break
                            parent = parent.parent
                        else:
                            break

                    if container:
                        break

                if container:
                    text = container.get_text(separator="\n", strip=True)

                    # Extract days and times
                    days_pattern = r'(?:every|each)?\s*((?:mon|tues|wednes|thurs|fri|satur|sun)day)s?'
                    time_pattern = r'(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*(?:to|–|-)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))'

                    days = []
                    hours = []

                    # Find all day matches
                    for day_match in re.finditer(days_pattern, text, re.IGNORECASE):
                        day = day_match.group(1).capitalize()
                        days.append(day)

                        # Look for times near this day
                        day_pos = day_match.start()
                        day_context = text[day_pos:day_pos + 200]

                        time_match = re.search(time_pattern, day_context, re.IGNORECASE)
                        if time_match:
                            hour = f"{time_match.group(1)} to {time_match.group(2)}"
                            hours.append(hour)

                    # Clean up and format
                    days_str = ", ".join(days) if days else "Please check website for schedule"
                    hours_str = ", ".join(hours) if hours else ""

                    # Look for location within the center
                    location_pattern = r'(?:located|available|desk|situated|find).*?((?:level|floor|near|outside|opposite|beside).*?)(?:\.|,|\n)'
                    location_match = re.search(location_pattern, text, re.IGNORECASE)
                    location_desc = ""
                    if location_match:
                        location_desc = f" ({location_match.group(1).strip().capitalize()})"

                    # Add entry
                    address = "6-14 Castle St, Castle Hill NSW 2154"
                    self.jp_data.append({
                        "name": f"Castle Towers Shopping Centre{location_desc}",
                        "address": address,
                        "days": days_str,
                        "hours": hours_str,
                        "council": "N/A",
                        "source_url": location['url'],
                        "postcode": "2154",
                        "notes": "Please check with the information desk for current schedule"
                    })

                    self.source_info.append({
                        "source": "Castle Towers Shopping Centre",
                        "url": location['url'],
                        "scraped_at": datetime.now().isoformat(),
                        "locations_found": 1
                    })

                    logger.info(f"Found JP service at Castle Towers: {days_str} | {hours_str}")
                    return

            logger.warning("Could not find JP service details at Castle Towers")

        except Exception as e:
            logger.error(f"Error scraping Castle Towers: {str(e)}")

    def scrape_all_locations(self):
        """Scrape all configured locations"""
        for location_id in self.locations:
            self.scrape_location(location_id)
            # Be nice to the servers
            time.sleep(2)

    def save_data(self, output_dir="data"):
        """Save collected JP data to JSON files"""
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        if not os.path.exists(os.path.join(output_dir, "jp_locations_out.json")):
            logger.error(f'Error in locating {os.path.join(output_dir, "jp_locations_out.json")}')


        # Save JP location data
        with open(os.path.join(output_dir, "jp_locations_out.json"), "w") as f:
            json.dump(self.jp_data, f, indent=2)

        # Save source information
        with open(os.path.join(output_dir, "sources.json"), "w") as f:
            json.dump(self.source_info, f, indent=2)

        # Save a sitemap.xml file for SEO
        self.generate_sitemap(output_dir)

        logger.info(f"Saved {len(self.jp_data)} JP locations to {output_dir}/jp_locations_out.json")

    def generate_sitemap(self, output_dir):
        """Generate a sitemap.xml file for better SEO"""
        base_url = "https://www.nswjpfinder.com.au"  # Replace with your actual domain

        sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
        sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

        # Add main pages
        pages = [
            {"loc": "/", "priority": "1.0"},
            {"loc": "/about", "priority": "0.8"},
            {"loc": "/locations", "priority": "0.8"},
            {"loc": "/jp-info", "priority": "0.9"},
            {"loc": "/privacy", "priority": "0.5"},
            {"loc": "/contact", "priority": "0.7"},
        ]

        for page in pages:
            sitemap_content += '  <url>\n'
            sitemap_content += f'    <loc>{base_url}{page["loc"]}</loc>\n'
            sitemap_content += '    <changefreq>weekly</changefreq>\n'
            sitemap_content += f'    <priority>{page["priority"]}</priority>\n'
            sitemap_content += '  </url>\n'

        # Add location pages
        for location_id, location in self.locations.items():
            sitemap_content += '  <url>\n'
            sitemap_content += f'    <loc>{base_url}/?location={location["name"].replace(" ", "+")}</loc>\n'
            sitemap_content += '    <changefreq>weekly</changefreq>\n'
            sitemap_content += '    <priority>0.7</priority>\n'
            sitemap_content += '  </url>\n'

        # Add day-specific pages for SEO
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        for day in days:
            sitemap_content += '  <url>\n'
            sitemap_content += f'    <loc>{base_url}/?day={day}</loc>\n'
            sitemap_content += '    <changefreq>weekly</changefreq>\n'
            sitemap_content += '    <priority>0.6</priority>\n'
            sitemap_content += '  </url>\n'

        sitemap_content += '</urlset>'

        with open(os.path.join(output_dir, "sitemap.xml"), "w") as f:
            f.write(sitemap_content)

        logger.info(f"Generated sitemap.xml in {output_dir}")




if __name__ == "__main__":
    config_path = os.environ.get("JP_CONFIG_PATH", "data/jp_locations.json")
    print(f'config_path - {config_path}')
    scraper = JPScraper(config_path)
    scraper.scrape_all_locations()
    scraper.save_data()