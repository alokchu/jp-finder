import json
from datetime import datetime
import re

def extract_coordinates_from_address(address):
    """Extract coordinates from address if available, otherwise return None"""
    # Common NSW coordinates to use as fallback
    COMMON_LOCATIONS = {
        "2153": {"lat": -33.7304, "lon": 150.9678},  # Norwest
        "2768": {"lat": -33.7184, "lon": 150.9151},  # Stanhope Gardens
        "2769": {"lat": -33.7035, "lon": 150.9066},  # The Ponds
        "2155": {"lat": -33.6841, "lon": 150.9107},  # Rouse Hill
        "2154": {"lat": -33.7319, "lon": 151.0042},  # Castle Hill
        "2145": {"lat": -33.7880, "lon": 150.9773},  # Winston Hills
        "2150": {"lat": -33.8148, "lon": 151.0017},  # Parramatta
    }
    
    # Try to extract postcode
    postcode_match = re.search(r'NSW\s+(\d{4})', address)
    if postcode_match:
        postcode = postcode_match.group(1)
        if postcode in COMMON_LOCATIONS:
            return COMMON_LOCATIONS[postcode]
    
    return None

def parse_hours(hours_str):
    """Convert hours string to structured format"""
    days = {
        'Monday': '',
        'Tuesday': '',
        'Wednesday': '',
        'Thursday': '',
        'Friday': '',
        'Saturday': '',
        'Sunday': ''
    }
    
    if not hours_str:
        return days
        
    # Convert common patterns
    hours_lower = hours_str.lower()
    
    # Pattern: "Monday to Friday"
    if "monday to friday" in hours_lower:
        business_hours = "9:00 AM - 5:00 PM"
        for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']:
            days[day] = business_hours
    
    # Pattern: Specific days
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
        if pattern in hours_lower:
            # Look for time range after day name
            time_range = re.search(
                rf"{pattern}:?\s*((?:\d+(?::\d+)?\s*(?:am|pm))\s*-\s*(?:\d+(?::\d+)?\s*(?:am|pm)))",
                hours_lower
            )
            if time_range:
                days[day] = time_range.group(1).upper()
    
    return days

def transform_jp_data(input_file, output_file):
    """Transform JP location data from scraper format to frontend format"""
    with open(input_file, 'r') as f:
        locations = json.load(f)
    
    transformed_locations = []
    
    for loc in locations:
        # Skip locations without required data
        if not all(key in loc for key in ['name', 'address']):
            continue
            
        # Get coordinates
        coords = extract_coordinates_from_address(loc['address'])
        if not coords:
            continue  # Skip locations without coordinates
            
        transformed_loc = {
            'name': loc['name'],
            'address': loc['address'].replace('\n', ', '),
            'days': loc.get('days', 'Monday to Friday'),
            'hours': parse_hours(loc.get('hours', '')),
            'council': loc.get('council', 'N/A'),
            'source_url': loc.get('source_url', ''),
            'postcode': loc.get('postcode', ''),
            'lat': coords['lat'],
            'lon': coords['lon']
        }
        
        transformed_locations.append(transformed_loc)
    
    # Add timestamp
    output_data = {
        'locations': transformed_locations,
        'last_updated': datetime.now().isoformat()
    }
    
    with open(output_file, 'w') as f:
        json.dump(output_data, f, indent=2)

if __name__ == '__main__':
    transform_jp_data('data/jp_locations_out.json', 'data/jp_locations_transformed.json') 