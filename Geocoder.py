import requests
import json
from time import sleep


class Geocoder:
    """Simple geocoder class to add latitude and longitude to locations"""

    def __init__(self, api_key=None):
        self.api_key = api_key
        self.cache = {}  # Cache to avoid duplicate requests

    def geocode_address(self, address):
        """
        Geocode an address using Nominatim (OpenStreetMap) service.
        Returns (lat, lon) tuple or (None, None) if address couldn't be geocoded.
        """
        # Check cache first
        if address in self.cache:
            return self.cache[address]

        # For Australian addresses, add 'Australia' if it's not already there
        if not address.lower().endswith('australia') and 'nsw' in address.lower():
            query = f"{address}, Australia"
        else:
            query = address
        print(f'query is {query}')

        # Use Nominatim service (free, but please be respectful with usage)
        url = f"https://nominatim.openstreetmap.org/search"
        params = {
            'q': query,
            'format': 'json',
            'limit': 1
        }

        headers = {
            'User-Agent': 'JusticeOfPeaceFinder/1.0'  # Identifying your application is good practice
        }

        try:
            response = requests.get(url, params=params, headers=headers)
            data = response.json()

            if data and len(data) > 0:
                lat = float(data[0]['lat'])
                lon = float(data[0]['lon'])
                result = (lat, lon)
            else:
                result = (None, None)

            # Cache the result
            self.cache[address] = result

            # Be nice to the service - don't send too many requests too quickly
            sleep(1)

            return result

        except Exception as e:
            print(f"Error geocoding address {address}: {str(e)}")
            return (None, None)

    def add_coordinates_to_jp_data(self, jp_data):
        """
        Add lat/lon coordinates to JP location data.
        Modifies the jp_data list in-place.
        """
        for location in jp_data:
            address = location.get('address', '')
            if address and 'lat' not in location:
                lat, lon = self.geocode_address(address)
                if lat is not None and lon is not None:
                    location['lat'] = lat
                    location['lon'] = lon
                    print(f"Added coordinates for {location['name']}: {lat}, {lon}")
                else:
                    print(f"Could not geocode address for {location['name']}: {address}")

        return jp_data


# Add to the main JPScraper class:
def enhance_jp_data(self):
    """Add geographic coordinates to the JP data"""
    geocoder = Geocoder()
    self.jp_data = geocoder.add_coordinates_to_jp_data(self.jp_data)

# Call this method before saving data:
# scraper.enhance_jp_data()