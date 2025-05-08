// We'll replace the hardcoded suburbs with data loaded from suburbs.json
let NSWSuburbs = [];
let selectedSuburbIndex = -1;
const resultElement = document.getElementById("result");
const errorMessage = document.getElementById("error-message");
const statusMessage = document.getElementById("status-message");
const suburbInput = document.getElementById("suburb-input");
const suburbSuggestions = document.getElementById("suburb-suggestions");

// Initialize the app when page loads
window.addEventListener('DOMContentLoaded', () => {
  loadSuburbsData();
});

// Load suburbs data from JSON file
function loadSuburbsData() {
  fetch('../data/suburbs.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the data into a format we can use
      NSWSuburbs = data.data
        .filter(item => item.state === "NSW")
        .map(item => ({
          name: item.suburb,
          state: item.state,
          postcode: item.postcode,
          lat: item.lat,
          lon: item.lng
        }));

      console.log("Number of suburbs loaded:", NSWSuburbs.length);
      console.log("NSW suburbs sample:", NSWSuburbs[0]," and ",NSWSuburbs[1]);

      // Geocode the suburbs that don't have coordinates
      geocodeSuburbs();

      initializeApp();
      showStatus("Suburbs data loaded successfully!", "success");
    })
    .catch(error => {
      console.error('Error loading suburbs data:', error);
      resultElement.innerHTML = `<p>Error loading suburbs data: ${error.message}</p>`;
      showStatus("Failed to load suburbs data. Using fallback data.", "error");

      // Use fallback data
      useFallbackData();
      initializeApp();
    });
}

// Improved function to get coordinates from postcode
function getLatLonFromPostcode(postcode, suburbData) {
  if (!postcode) return null;
  
  console.log('Getting coordinates for postcode:', postcode);
  
  // Convert postcode to string and ensure we're comparing strings
  const postcodeStr = String(postcode).trim();
  
  // Find all suburbs with this postcode and take the first one with valid coordinates
  const matches = suburbData.filter(s => String(s.postcode).trim() === postcodeStr);
  
  if (matches.length > 0) {
    // Find first match with valid coordinates
    for (const match of matches) {
      if (match.lat && match.lon) {
        console.log('Match found with coordinates:', match.name, match.lat, match.lon);
        return { lat: match.lat, lon: match.lon };
      }
    }
  }
  
  console.log('No matches found with valid coordinates for postcode:', postcode);
  
  // If we're looking for The Ponds or nearby postcodes, return specific coordinates
  if (postcodeStr === "2769") {
    console.log('Using hardcoded coordinates for The Ponds area');
    return { lat: -33.7035, lon: 150.9066 }; // The Ponds coordinates
  }
  
  // For Stanhope Gardens postcode
  if (postcodeStr === "2768") {
    console.log('Using hardcoded coordinates for Stanhope Gardens');
    return { lat: -33.7184, lon: 150.9151 }; // Stanhope Gardens coordinates
  }
  
  return null;
}

// Fallback data in case the JSON file can't be loaded
function useFallbackData() {
  NSWSuburbs = [
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Newcastle", lat: -32.9283, lon: 151.7817 },
    { name: "Wollongong", lat: -34.4278, lon: 150.8936 },
    { name: "Blacktown", lat: -33.7711, lon: 150.9057 },
    { name: "Parramatta", lat: -33.8148, lon: 151.0017 },
    { name: "Penrith", lat: -33.7506, lon: 150.6944 },
    { name: "Campbelltown", lat: -34.0650, lon: 150.8142 },
    { name: "Liverpool", lat: -33.9200, lon: 150.9255 },
    { name: "The Ponds", lat: -33.7035, lon: 150.9066 },
    { name: "Stanhope Gardens", lat: -33.7184, lon: 150.9151 },
    // ...other NSW suburbs with coordinates
  ];
}

// Enhanced geocoding function with specific coordinates for key suburbs
function geocodeSuburbs() {
  // This is a simplified approach - in a real app, you would use a geocoding service
  // like Google Maps, Mapbox, or OpenStreetMap Nominatim

  // For now, let's assign coordinates to a few major suburbs
  const geocodedSuburbs = {
    "Sydney": { lat: -33.8688, lon: 151.2093 },
    "Newcastle": { lat: -32.9283, lon: 151.7817 },
    "Wollongong": { lat: -34.4278, lon: 150.8936 },
    "Blacktown": { lat: -33.7711, lon: 150.9057 },
    "Parramatta": { lat: -33.8148, lon: 151.0017 },
    "Penrith": { lat: -33.7506, lon: 150.6944 },
    "Campbelltown": { lat: -34.0650, lon: 150.8142 },
    "Liverpool": { lat: -33.9200, lon: 150.9255 },
    "The Ponds": { lat: -33.7035, lon: 150.9066 },
    "Stanhope Gardens": { lat: -33.7184, lon: 150.9151 },
    "Norwest": { lat: -33.7304, lon: 150.9678 },
    "Castle Hill": { lat: -33.7319, lon: 151.0042 },
    "Rouse Hill": { lat: -33.6841, lon: 150.9107 },
    "Winston Hills": { lat: -33.7880, lon: 150.9773 }
    // Add more geocoded suburbs as needed
  };

  // Update our NSWSuburbs array with coordinates
  NSWSuburbs.forEach(suburb => {
    if (geocodedSuburbs[suburb.name]) {
      suburb.lat = geocodedSuburbs[suburb.name].lat;
      suburb.lon = geocodedSuburbs[suburb.name].lon;
    }
    /*else {
      // For suburbs without known coordinates, use a default position
      // This is not ideal but allows the app to function
      console.log('in else block, suburb.name is=>'+suburb.name)
      suburb.lat = -33.8688; // Sydney's coordinates as default
      suburb.lon = 151.2093;
    }*/
  });
}

function initializeApp() {
  resultElement.innerHTML = '<p>Enter your suburb above to find the nearest Justice of the Peace.</p>';
  setupSuburbAutocomplete();
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = type;
  statusMessage.style.display = "block";

  // Hide status after 5 seconds
  setTimeout(() => {
    statusMessage.style.display = "none";
  }, 5000);
}

function setupSuburbAutocomplete() {
  // Event listener for input changes
  suburbInput.addEventListener('input', handleSuburbInput);

  // Event listener for keyboard navigation
  suburbInput.addEventListener('keydown', handleKeyboardNavigation);

  // Event listener for clicking outside to close suggestions
  document.addEventListener('click', (e) => {
    if (e.target !== suburbInput && e.target !== suburbSuggestions) {
      suburbSuggestions.style.display = 'none';
    }
  });
}

function handleSuburbInput() {
  const query = suburbInput.value.trim().toLowerCase();

  if (query.length < 2) {
    suburbSuggestions.style.display = 'none';
    return;
  }

  const matches = NSWSuburbs.filter(suburb =>
    suburb.name.toLowerCase().includes(query)
  ).slice(0, 8); // Limit to 8 suggestions

  if (matches.length === 0) {
    suburbSuggestions.style.display = 'none';
    return;
  }

  // Build suggestion list
  suburbSuggestions.innerHTML = '';
  matches.forEach((suburb, index) => {
    const item = document.createElement('li');
    item.className = 'suburb-suggestion';

    // Include postcode in the display if available
    const displayText = suburb.postcode
      ? `${suburb.name}, ${suburb.postcode}`
      : suburb.name;

    item.textContent = displayText;

    // Highlight the matching part
    const matchText = displayText;
    const matchIndex = matchText.toLowerCase().indexOf(query);
    if (matchIndex >= 0) {
      item.innerHTML =
        matchText.substring(0, matchIndex) +
        '<strong>' + matchText.substring(matchIndex, matchIndex + query.length) + '</strong>' +
        matchText.substring(matchIndex + query.length);
    }

    item.addEventListener('click', () => {
      suburbInput.value = suburb.name;
      suburbSuggestions.style.display = 'none';
      errorMessage.style.display = 'none';
    });

    suburbSuggestions.appendChild(item);
  });

  selectedSuburbIndex = -1;
  suburbSuggestions.style.display = 'block';
}

function handleKeyboardNavigation(e) {
  const suggestions = suburbSuggestions.querySelectorAll('.suburb-suggestion');

  if (suggestions.length === 0) return;

  // Down arrow
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedSuburbIndex = Math.min(selectedSuburbIndex + 1, suggestions.length - 1);
    updateSelectedSuggestion(suggestions);
  }
  // Up arrow
  else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedSuburbIndex = Math.max(selectedSuburbIndex - 1, -1);
    updateSelectedSuggestion(suggestions);
  }
  // Enter key
  else if (e.key === 'Enter') {
    e.preventDefault();
    if (selectedSuburbIndex >= 0 && suggestions[selectedSuburbIndex]) {
      // Extract just the suburb name from the possibly "Suburb, Postcode" format
      const selectedText = suggestions[selectedSuburbIndex].textContent;
      const suburbName = selectedText.split(',')[0].trim();
      suburbInput.value = suburbName;
      suburbSuggestions.style.display = 'none';

      // If enter is pressed with a selection, find JP
      if (suburbSuggestions.style.display === 'none') {
        findJP();
      }
    } else {
      // If no suggestion is selected, just search
      findJP();
    }
  }
  // Escape key
  else if (e.key === 'Escape') {
    suburbSuggestions.style.display = 'none';
  }
}

function updateSelectedSuggestion(suggestions) {
  // Remove selected class from all suggestions
  suggestions.forEach(s => s.classList.remove('selected'));

  // Add selected class to current suggestion
  if (selectedSuburbIndex >= 0) {
    suggestions[selectedSuburbIndex].classList.add('selected');
    suggestions[selectedSuburbIndex].scrollIntoView({ block: 'nearest' });
  }
}

// Enhanced JP locations data with coordinates
const jpLocations = [
  {
    "name": "Gordon Library 799 Pacific Highway Gordon NSW 2072",
    "address": "Gordon Library\n799 Pacific Highway\nGordon NSW 2072",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Thursday": "2:00 PM - 4:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.kmc.nsw.gov.au/Your_Council/Organisation/Justice_of_the_Peace",
    "postcode": "2072",
    "lat": -33.7561,
    "lon": 151.1531
  },
  {
    "name": "Ku-ring-gai Council Chambers 818 Pacific Highway Gordon NSW 2072",
    "address": "Ku-ring-gai Council Chambers\n818 Pacific Highway\nGordon NSW 2072",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:00 PM",
      "Tuesday": "8:30 AM - 5:00 PM",
      "Wednesday": "8:30 AM - 5:00 PM",
      "Thursday": "8:30 AM - 5:00 PM",
      "Friday": "8:30 AM - 5:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.kmc.nsw.gov.au/Your_Council/Organisation/Justice_of_the_Peace",
    "postcode": "2072",
    "lat": -33.7558,
    "lon": 151.1543
  },
  {
    "name": "St Ives Shopping Village Information Desk 166 Mona Vale Road St Ives NSW 2075",
    "address": "St Ives Shopping Village Information Desk\n166 Mona Vale Road\nSt Ives NSW 2075",
    "days": "Wednesday, Friday",
    "hours": {
      "Wednesday": "10:00 AM - 1:00 PM",
      "Friday": "11:00 AM - 2:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.stivesvillage.com.au/centre-info/services",
    "postcode": "2075",
    "lat": -33.7308,
    "lon": 151.1670
  },
  {
    "name": "Lane Cove Library Library Walk, 139a Longueville Road Lane Cove NSW 2066",
    "address": "Lane Cove Library\nLibrary Walk, 139a Longueville Road\nLane Cove NSW 2066",
    "days": "Monday, Wednesday, Saturday",
    "hours": {
      "Monday": "10:00 AM - 12:00 PM",
      "Wednesday": "2:00 PM - 4:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Lane Cove Council",
    "source_url": "https://www.lanecove.nsw.gov.au/Community/Pages/JusticeofthePeace.aspx",
    "postcode": "2066",
    "lat": -33.8146,
    "lon": 151.1687
  },
  {
    "name": "Lane Cove Council Civic Centre 48 Longueville Road Lane Cove NSW 2066",
    "address": "Lane Cove Council Civic Centre\n48 Longueville Road\nLane Cove NSW 2066",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 4:30 PM",
      "Tuesday": "9:00 AM - 4:30 PM",
      "Wednesday": "9:00 AM - 4:30 PM",
      "Thursday": "9:00 AM - 4:30 PM",
      "Friday": "9:00 AM - 4:30 PM"
    },
    "council": "Lane Cove Council",
    "source_url": "https://www.lanecove.nsw.gov.au/Community/Pages/JusticeofthePeace.aspx",
    "postcode": "2066",
    "lat": -33.8158,
    "lon": 151.1691
  },
  {
    "name": "Chatswood Library on The Concourse 409 Victoria Avenue Chatswood NSW 2067",
    "address": "Chatswood Library on The Concourse\n409 Victoria Avenue\nChatswood NSW 2067",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "11:00 AM - 1:00 PM",
      "Thursday": "2:00 PM - 4:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.willoughby.nsw.gov.au/Community/Library/Library-locations/Chatswood-Library",
    "postcode": "2067",
    "lat": -33.7967,
    "lon": 151.1828
  },
  {
    "name": "Willoughby City Council Administration Building Level 4, 31 Victor Street Chatswood NSW 2067",
    "address": "Willoughby City Council Administration Building\nLevel 4\n31 Victor Street\nChatswood NSW 2067",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 5:00 PM",
      "Tuesday": "9:00 AM - 5:00 PM",
      "Wednesday": "9:00 AM - 5:00 PM",
      "Thursday": "9:00 AM - 5:00 PM",
      "Friday": "9:00 AM - 5:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.willoughby.nsw.gov.au/Community/Justice-of-the-Peace",
    "postcode": "2067",
    "lat": -33.7973,
    "lon": 151.1851
  },
  {
    "name": "Chatswood Chase Shopping Centre Concierge Level 1, 345 Victoria Avenue Chatswood NSW 2067",
    "address": "Chatswood Chase Shopping Centre Concierge\nLevel 1\n345 Victoria Avenue\nChatswood NSW 2067",
    "days": "Monday, Thursday, Saturday",
    "hours": {
      "Monday": "11:00 AM - 2:00 PM",
      "Thursday": "4:00 PM - 7:00 PM",
      "Saturday": "11:00 AM - 2:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.chatswoodchaseshopping.com.au/services",
    "postcode": "2067",
    "lat": -33.7956,
    "lon": 151.1811
  },
  {
    "name": "Westfield Chatswood Concierge Level 3, 1 Anderson Street Chatswood NSW 2067",
    "address": "Westfield Chatswood Concierge\nLevel 3\n1 Anderson Street\nChatswood NSW 2067",
    "days": "Tuesday, Friday, Sunday",
    "hours": {
      "Tuesday": "10:00 AM - 1:00 PM",
      "Friday": "3:00 PM - 6:00 PM",
      "Sunday": "11:00 AM - 2:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.westfield.com.au/chatswood/services",
    "postcode": "2067",
    "lat": -33.7971,
    "lon": 151.1837
  },
  {
    "name": "Macquarie University Library 16 Macquarie Walk Macquarie Park NSW 2109",
    "address": "Macquarie University Library\n16 Macquarie Walk\nMacquarie Park NSW 2109",
    "days": "Monday, Wednesday",
    "hours": {
      "Monday": "11:00 AM - 1:00 PM",
      "Wednesday": "2:00 PM - 4:00 PM"
    },
    "council": "City of Ryde",
    "source_url": "https://www.mq.edu.au/about/campus-services-and-facilities/library",
    "postcode": "2109",
    "lat": -33.7741,
    "lon": 151.1138
  },
  {
    "name": "North Sydney Council Customer Service Centre 200 Miller Street North Sydney NSW 2060",
    "address": "North Sydney Council Customer Service Centre\n200 Miller Street\nNorth Sydney NSW 2060",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 5:00 PM",
      "Tuesday": "9:00 AM - 5:00 PM",
      "Wednesday": "9:00 AM - 5:00 PM",
      "Thursday": "9:00 AM - 5:00 PM",
      "Friday": "9:00 AM - 5:00 PM"
    },
    "council": "North Sydney Council",
    "source_url": "https://www.northsydney.nsw.gov.au/Community_Services/Justice_of_the_Peace",
    "postcode": "2060",
    "lat": -33.8385,
    "lon": 151.2072
  },
  {
    "name": "Stanton Library 234 Miller Street North Sydney NSW 2060",
    "address": "Stanton Library\n234 Miller Street\nNorth Sydney NSW 2060",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Thursday": "2:00 PM - 4:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "North Sydney Council",
    "source_url": "https://www.northsydney.nsw.gov.au/Library_Services/Library_Locations/Stanton_Library",
    "postcode": "2060",
    "lat": -33.8399,
    "lon": 151.2069
  },
  {
    "name": "Mosman Library 605 Military Road Mosman NSW 2088",
    "address": "Mosman Library\n605 Military Road\nMosman NSW 2088",
    "days": "Monday, Wednesday, Saturday",
    "hours": {
      "Monday": "2:00 PM - 4:00 PM",
      "Wednesday": "10:00 AM - 12:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Mosman Council",
    "source_url": "https://mosman.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2088",
    "lat": -33.8283,
    "lon": 151.2446
  },
  {
    "name": "Mosman Council Civic Centre 1 Mosman Square Mosman NSW 2088",
    "address": "Mosman Council Civic Centre\n1 Mosman Square\nMosman NSW 2088",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:00 PM",
      "Tuesday": "8:30 AM - 5:00 PM",
      "Wednesday": "8:30 AM - 5:00 PM",
      "Thursday": "8:30 AM - 5:00 PM",
      "Friday": "8:30 AM - 5:00 PM"
    },
    "council": "Mosman Council",
    "source_url": "https://mosman.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2088",
    "lat": -33.8285,
    "lon": 151.2447
  },
  {
    "name": "Lindfield Library Level 1, 259 Pacific Highway Lindfield NSW 2070",
    "address": "Lindfield Library\nLevel 1\n259 Pacific Highway\nLindfield NSW 2070",
    "days": "Wednesday, Friday",
    "hours": {
      "Wednesday": "10:00 AM - 12:00 PM",
      "Friday": "2:00 PM - 4:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.kmc.nsw.gov.au/Facilities_recreation/Library/Library_locations",
    "postcode": "2070",
    "lat": -33.7771,
    "lon": 151.1692
  },
  {
    "name": "Turramurra Library 5 Ray Street Turramurra NSW 2074",
    "address": "Turramurra Library\n5 Ray Street\nTurramurra NSW 2074",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "2:00 PM - 4:00 PM",
      "Thursday": "10:00 AM - 12:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.kmc.nsw.gov.au/Facilities_recreation/Library/Library_locations",
    "postcode": "2074",
    "lat": -33.7333,
    "lon": 151.1288
  },
  {
    "name": "Roseville Library 2 Clermiston Avenue Roseville NSW 2069",
    "address": "Roseville Library\n2 Clermiston Avenue\nRoseville NSW 2069",
    "days": "Monday, Saturday",
    "hours": {
      "Monday": "10:00 AM - 12:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.kmc.nsw.gov.au/Facilities_recreation/Library/Library_locations",
    "postcode": "2069",
    "lat": -33.7831,
    "lon": 151.1780
  },
  {
    "name": "St Ives Library St Ives Shopping Village, 166 Mona Vale Road St Ives NSW 2075",
    "address": "St Ives Library\nSt Ives Shopping Village\n166 Mona Vale Road\nSt Ives NSW 2075",
    "days": "Wednesday, Friday",
    "hours": {
      "Wednesday": "2:00 PM - 4:00 PM",
      "Friday": "10:00 AM - 12:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.kmc.nsw.gov.au/Facilities_recreation/Library/Library_locations",
    "postcode": "2075",
    "lat": -33.7308,
    "lon": 151.1670
  },
  {
    "name": "Wahroonga Library 3 Woniora Avenue Wahroonga NSW 2076",
    "address": "Wahroonga Library\n3 Woniora Avenue\nWahroonga NSW 2076",
    "days": "Tuesday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.kmc.nsw.gov.au/Facilities_recreation/Library/Library_locations",
    "postcode": "2076",
    "lat": -33.7204,
    "lon": 151.1180
  },
  {
    "name": "NSW Service Centre - Chatswood Service NSW Centre Shop 6001, Level 6, Westfield Chatswood 1 Anderson Street Chatswood NSW 2067",
    "address": "NSW Service Centre - Chatswood\nService NSW Centre\nShop 6001, Level 6, Westfield Chatswood\n1 Anderson Street\nChatswood NSW 2067",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 5:00 PM",
      "Tuesday": "9:00 AM - 5:00 PM",
      "Wednesday": "9:00 AM - 5:00 PM",
      "Thursday": "9:00 AM - 5:00 PM",
      "Friday": "9:00 AM - 5:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.service.nsw.gov.au/service-centre/chatswood-service-centre",
    "postcode": "2067",
    "lat": -33.7971,
    "lon": 151.1837
  },
  {
    "name": "Cremorne Point Marina Office d'Albora Marinas, 2 Green Street Cremorne Point NSW 2090",
    "address": "Cremorne Point Marina Office\nd'Albora Marinas\n2 Green Street\nCremorne Point NSW 2090",
    "days": "Monday, Thursday",
    "hours": {
      "Monday": "10:00 AM - 12:00 PM",
      "Thursday": "2:00 PM - 4:00 PM"
    },
    "council": "North Sydney Council",
    "source_url": "https://www.dalboramarinas.com.au/marina/cremorne-point",
    "postcode": "2090",
    "lat": -33.8465,
    "lon": 151.2274
  },
  {
    "name": "Neutral Bay Club 3 Westleigh Street Neutral Bay NSW 2089",
    "address": "Neutral Bay Club\n3 Westleigh Street\nNeutral Bay NSW 2089",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "10:00 AM - 1:00 PM"
    },
    "council": "North Sydney Council",
    "source_url": "https://www.neutralbayclub.com.au/services",
    "postcode": "2089",
    "lat": -33.8324,
    "lon": 151.2185
  },
  {
    "name": "Royal North Shore Hospital Volunteer Desk Building 34, Reserve Road St Leonards NSW 2065",
    "address": "Royal North Shore Hospital Volunteer Desk\nBuilding 34\nReserve Road\nSt Leonards NSW 2065",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Thursday": "1:00 PM - 3:00 PM"
    },
    "council": "North Sydney Council",
    "source_url": "https://www.nslhd.health.nsw.gov.au/Hospitals/RNSH",
    "postcode": "2065",
    "lat": -33.8224,
    "lon": 151.1893
  },
  {
    "name": "Northbridge Plaza Information Desk 79-113 Sailors Bay Road Northbridge NSW 2063",
    "address": "Northbridge Plaza Information Desk\n79-113 Sailors Bay Road\nNorthbridge NSW 2063",
    "days": "Friday",
    "hours": {
      "Friday": "10:00 AM - 1:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.northbridgeplaza.com.au/centre-info/services",
    "postcode": "2063",
    "lat": -33.8121,
    "lon": 151.2167
  },
  {
    "name": "Forestville RSL Club 22 Melwood Avenue Forestville NSW 2087",
    "address": "Forestville RSL Club\n22 Melwood Avenue\nForestville NSW 2087",
    "days": "Tuesday, Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Saturday": "11:00 AM - 1:00 PM"
    },
    "council": "Northern Beaches Council",
    "source_url": "https://www.forestvillersl.com.au/community",
    "postcode": "2087",
    "lat": -33.7689,
    "lon": 151.2174
  },
  {
    "name": "The Hills Shire Council 3 Columbia Court Norwest NSW 2153",
    "address": "The Hills Shire Council\n3 Columbia Court Norwest NSW 2153",
    "days": "Monday, Wednesday, Friday",
    "hours": {
      "Monday": "11:00 AM - 2:00 PM",
      "Wednesday": "11:00 AM - 2:00 PM",
      "Friday": "11:00 AM - 2:00 PM"
    },
    "council": "The Hills Shire Council",
    "source_url": "https://www.thehills.nsw.gov.au/Residents/Library/Library-Services/Justice-of-the-Peace",
    "postcode": "2153",
    "lat": -33.7304,
    "lon": 150.9678,
    "notes": "No Copying Service. Please bring all copies of documents to be certified as Council does not have a copying service available. To avoid delays for more than 5 Statutory Declarations or 10 Signatures, book by calling 02 9843 0555."
  },
  {
    "name": "Blacktown City Council Civic Centre 62 Flushcombe Road Blacktown NSW 2148",
    "address": "Blacktown City Council Civic Centre\n62 Flushcombe Road\nBlacktown NSW 2148",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 5:00 PM",
      "Tuesday": "9:00 AM - 5:00 PM",
      "Wednesday": "9:00 AM - 5:00 PM",
      "Thursday": "9:00 AM - 5:00 PM",
      "Friday": "9:00 AM - 5:00 PM"
    },
    "council": "Blacktown City Council",
    "source_url": "https://www.blacktown.nsw.gov.au/Services/Justice-of-the-peace",
    "postcode": "2148",
    "lat": -33.7712,
    "lon": 150.9068
  },
  {
    "name": "Sutherland Shire Council Administration Centre 4-20 Eton Street Sutherland NSW 2232",
    "address": "Sutherland Shire Council Administration Centre\n4-20 Eton Street\nSutherland NSW 2232",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.sutherlandshire.nsw.gov.au/Residents/Justice-of-the-Peace",
    "postcode": "2232",
    "lat": -34.0327,
    "lon": 151.0574
  },
  {
    "name": "Parramatta City Council Customer Contact Centre 126 Church Street Parramatta NSW 2150",
    "address": "Parramatta City Council Customer Contact Centre\n126 Church Street\nParramatta NSW 2150",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 3:00 PM",
      "Tuesday": "9:00 AM - 3:00 PM",
      "Wednesday": "9:00 AM - 3:00 PM",
      "Thursday": "9:00 AM - 3:00 PM",
      "Friday": "9:00 AM - 3:00 PM"
    },
    "council": "City of Parramatta Council",
    "source_url": "https://www.cityofparramatta.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2150",
    "lat": -33.8150,
    "lon": 151.0011
  },
  {
    "name": "Hornsby Shire Council Administration Building 296 Peats Ferry Road Hornsby NSW 2077",
    "address": "Hornsby Shire Council Administration Building\n296 Peats Ferry Road\nHornsby NSW 2077",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "10:00 AM - 1:00 PM",
      "Thursday": "2:00 PM - 4:00 PM"
    },
    "council": "Hornsby Shire Council",
    "source_url": "https://www.hornsby.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2077",
    "lat": -33.7009,
    "lon": 151.0985
  },
  {
    "name": "Canterbury-Bankstown Council Bankstown Customer Service Centre Upper Ground Floor, Bankstown Civic Tower, 66-72 Rickard Road Bankstown NSW 2200",
    "address": "Canterbury-Bankstown Council Bankstown Customer Service Centre\nUpper Ground Floor, Bankstown Civic Tower\n66-72 Rickard Road\nBankstown NSW 2200",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Canterbury-Bankstown Council",
    "source_url": "https://www.cbcity.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2200",
    "lat": -33.9172,
    "lon": 151.0334
  },
  {
    "name": "Northern Beaches Council Dee Why Civic Centre 725 Pittwater Road Dee Why NSW 2099",
    "address": "Northern Beaches Council Dee Why Civic Centre\n725 Pittwater Road\nDee Why NSW 2099",
    "days": "Monday, Wednesday, Friday",
    "hours": {
      "Monday": "9:00 AM - 12:00 PM",
      "Wednesday": "1:00 PM - 4:00 PM",
      "Friday": "9:00 AM - 12:00 PM"
    },
    "council": "Northern Beaches Council",
    "source_url": "https://www.northernbeaches.nsw.gov.au/services/justice-of-the-peace",
    "postcode": "2099",
    "lat": -33.7539,
    "lon": 151.2874
  },
  {
    "name": "Liverpool City Council Customer Service Centre Ground Floor, 33 Moore Street Liverpool NSW 2170",
    "address": "Liverpool City Council Customer Service Centre\nGround Floor\n33 Moore Street\nLiverpool NSW 2170",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:00 PM",
      "Tuesday": "8:30 AM - 5:00 PM",
      "Wednesday": "8:30 AM - 5:00 PM",
      "Thursday": "8:30 AM - 5:00 PM",
      "Friday": "8:30 AM - 5:00 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://www.liverpool.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2170",
    "lat": -33.9202,
    "lon": 150.9219
  },
  {
    "name": "Randwick City Council Administration Building 30 Frances Street Randwick NSW 2031",
    "address": "Randwick City Council Administration Building\n30 Frances Street\nRandwick NSW 2031",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "9:30 AM - 12:30 PM",
      "Thursday": "1:30 PM - 4:30 PM"
    },
    "council": "Randwick City Council",
    "source_url": "https://www.randwick.nsw.gov.au/community/community-support/justice-of-the-peace",
    "postcode": "2031",
    "lat": -33.9173,
    "lon": 151.2407
  },
  {
    "name": "Westfield Parramatta Information Desk Level 2, 159-175 Church Street Parramatta NSW 2150",
    "address": "Westfield Parramatta Information Desk\nLevel 2\n159-175 Church Street\nParramatta NSW 2150",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 2:00 PM",
      "Thursday": "12:00 PM - 4:00 PM",
      "Saturday": "10:00 AM - 1:00 PM"
    },
    "council": "City of Parramatta",
    "source_url": "https://www.westfield.com.au/parramatta/services",
    "postcode": "2150",
    "lat": -33.8165,
    "lon": 151.0028
  },
  {
    "name": "Westfield Bondi Junction Concierge Level 3, 500 Oxford Street Bondi Junction NSW 2022",
    "address": "Westfield Bondi Junction Concierge\nLevel 3\n500 Oxford Street\nBondi Junction NSW 2022",
    "days": "Monday, Wednesday, Friday",
    "hours": {
      "Monday": "11:00 AM - 2:00 PM",
      "Wednesday": "3:00 PM - 6:00 PM",
      "Friday": "10:00 AM - 1:00 PM"
    },
    "council": "Waverley Council",
    "source_url": "https://www.westfield.com.au/bondijunction/services",
    "postcode": "2022",
    "lat": -33.8916,
    "lon": 151.2501
  },
  {
    "name": "Castle Towers Shopping Centre Concierge Level 3, 6-14 Castle Street Castle Hill NSW 2154",
    "address": "Castle Towers Shopping Centre Concierge\nLevel 3\n6-14 Castle Street\nCastle Hill NSW 2154",
    "days": "Monday, Thursday, Saturday",
    "hours": {
      "Monday": "10:00 AM - 1:00 PM",
      "Thursday": "5:00 PM - 8:00 PM",
      "Saturday": "10:00 AM - 1:00 PM"
    },
    "council": "The Hills Shire Council",
    "source_url": "https://www.qicgre.com/places/castle-towers",
    "postcode": "2154",
    "lat": -33.7312,
    "lon": 151.0041
  },
  {
    "name": "Macquarie Centre Customer Service Centre Level 3, Corner Herring & Waterloo Roads North Ryde NSW 2113",
    "address": "Macquarie Centre Customer Service Centre\nLevel 3\nCorner Herring & Waterloo Roads\nNorth Ryde NSW 2113",
    "days": "Tuesday, Friday, Sunday",
    "hours": {
      "Tuesday": "11:00 AM - 2:00 PM",
      "Friday": "4:00 PM - 7:00 PM",
      "Sunday": "12:00 PM - 3:00 PM"
    },
    "council": "City of Ryde",
    "source_url": "https://www.macquariecentre.com.au/services",
    "postcode": "2113",
    "lat": -33.7758,
    "lon": 151.1231
  },
  {
    "name": "Bankstown Central Customer Service Desk Level 1, North Terrace, 1 North Terrace Bankstown NSW 2200",
    "address": "Bankstown Central Customer Service Desk\nLevel 1, North Terrace\n1 North Terrace\nBankstown NSW 2200",
    "days": "Wednesday, Saturday",
    "hours": {
      "Wednesday": "10:00 AM - 2:00 PM",
      "Saturday": "11:00 AM - 3:00 PM"
    },
    "council": "Canterbury-Bankstown Council",
    "source_url": "https://www.bankstowncentral.com.au/centre-info/services",
    "postcode": "2200",
    "lat": -33.9142,
    "lon": 151.0341
  },
  {
    "name": "Sutherland Shire Libraries - Sutherland Branch 30-36 Belmont Street Sutherland NSW 2232",
    "address": "Sutherland Shire Libraries - Sutherland Branch\n30-36 Belmont Street\nSutherland NSW 2232",
    "days": "Monday, Wednesday, Saturday",
    "hours": {
      "Monday": "2:00 PM - 4:00 PM",
      "Wednesday": "10:00 AM - 12:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.sutherlandshire.nsw.gov.au/Community/Library/Your-Library/Justice-of-the-Peace",
    "postcode": "2232",
    "lat": -34.0316,
    "lon": 151.0576
  },
  {
    "name": "Stockland Wetherill Park Customer Care Desk 561-583 Polding Street Wetherill Park NSW 2164",
    "address": "Stockland Wetherill Park Customer Care Desk\n561-583 Polding Street\nWetherill Park NSW 2164",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "10:00 AM - 2:00 PM",
      "Thursday": "3:00 PM - 7:00 PM"
    },
    "council": "Fairfield City Council",
    "source_url": "https://www.stockland.com.au/shopping-centres/centres/stockland-wetherill-park/offers-and-services",
    "postcode": "2164",
    "lat": -33.8552,
    "lon": 150.9068
  },
  {
    "name": "Westfield Liverpool Concierge Level 2, 175 Macquarie Street Liverpool NSW 2170",
    "address": "Westfield Liverpool Concierge\nLevel 2\n175 Macquarie Street\nLiverpool NSW 2170",
    "days": "Monday, Friday, Saturday",
    "hours": {
      "Monday": "11:00 AM - 2:00 PM",
      "Friday": "4:00 PM - 7:00 PM",
      "Saturday": "10:00 AM - 1:00 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://www.westfield.com.au/liverpool/services",
    "postcode": "2170",
    "lat": -33.9200,
    "lon": 150.9260
  },
  {
    "name": "Westfield Miranda Customer Service Level 2, 600 Kingsway Miranda NSW 2228",
    "address": "Westfield Miranda Customer Service\nLevel 2\n600 Kingsway\nMiranda NSW 2228",
    "days": "Wednesday, Friday, Sunday",
    "hours": {
      "Wednesday": "10:00 AM - 2:00 PM",
      "Friday": "3:00 PM - 6:00 PM",
      "Sunday": "11:00 AM - 2:00 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.westfield.com.au/miranda/services",
    "postcode": "2228",
    "lat": -34.0359,
    "lon": 151.1040
  },
  {
    "name": "Rouse Hill Town Centre Customer Service Level 2, 10-14 Market Lane Rouse Hill NSW 2155",
    "address": "Rouse Hill Town Centre Customer Service\nLevel 2\n10-14 Market Lane\nRouse Hill NSW 2155",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 1:00 PM",
      "Thursday": "4:00 PM - 7:00 PM",
      "Saturday": "11:00 AM - 2:00 PM"
    },
    "council": "The Hills Shire Council",
    "source_url": "https://www.rhtc.com.au/centre-info/services",
    "postcode": "2155",
    "lat": -33.6815,
    "lon": 150.9204
  },
  {
    "name": "Rhodes Waterside Shopping Centre Information Desk Level 1, 1 Rider Boulevard Rhodes NSW 2138",
    "address": "Rhodes Waterside Shopping Centre Information Desk\nLevel 1\n1 Rider Boulevard\nRhodes NSW 2138",
    "days": "Monday, Wednesday",
    "hours": {
      "Monday": "10:00 AM - 1:00 PM",
      "Wednesday": "4:00 PM - 7:00 PM"
    },
    "council": "City of Canada Bay",
    "source_url": "https://www.rhodeswaterside.com.au/centre-info/services",
    "postcode": "2138",
    "lat": -33.8338,
    "lon": 151.0869
  },
  {
    "name": "Top Ryde City Shopping Centre Concierge Ground Floor, Corner Devlin Street & Blaxland Road Ryde NSW 2112",
    "address": "Top Ryde City Shopping Centre Concierge\nGround Floor\nCorner Devlin Street & Blaxland Road\nRyde NSW 2112",
    "days": "Tuesday, Saturday",
    "hours": {
      "Tuesday": "11:00 AM - 2:00 PM",
      "Saturday": "10:00 AM - 1:00 PM"
    },
    "council": "City of Ryde",
    "source_url": "https://www.toprydecity.com.au/Centre-Info/Services",
    "postcode": "2112",
    "lat": -33.8123,
    "lon": 151.1040
  },
  {
    "name": "NSW Service Centre - Chatswood Service NSW Centre Shop 6001, Level 6, Westfield Chatswood 1 Anderson Street Chatswood NSW 2067",
    "address": "NSW Service Centre - Chatswood\nService NSW Centre\nShop 6001, Level 6, Westfield Chatswood\n1 Anderson Street\nChatswood NSW 2067",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 5:00 PM",
      "Tuesday": "9:00 AM - 5:00 PM",
      "Wednesday": "9:00 AM - 5:00 PM",
      "Thursday": "9:00 AM - 5:00 PM",
      "Friday": "9:00 AM - 5:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.service.nsw.gov.au/service-centre/chatswood-service-centre",
    "postcode": "2067",
    "lat": -33.7971,
    "lon": 151.1837
  },
  {
    "name": "NSW Service Centre - Parramatta Service NSW Centre 8 Valentine Avenue Parramatta NSW 2150",
    "address": "NSW Service Centre - Parramatta\nService NSW Centre\n8 Valentine Avenue\nParramatta NSW 2150",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:30 PM",
      "Tuesday": "8:30 AM - 5:30 PM",
      "Wednesday": "8:30 AM - 5:30 PM",
      "Thursday": "8:30 AM - 5:30 PM",
      "Friday": "8:30 AM - 5:30 PM"
    },
    "council": "City of Parramatta",
    "source_url": "https://www.service.nsw.gov.au/service-centre/parramatta-service-centre",
    "postcode": "2150",
    "lat": -33.8144,
    "lon": 151.0031
  },
  {
    "name": "Marrickville Library & Pavilion 313 Marrickville Road Marrickville NSW 2204",
    "address": "Marrickville Library & Pavilion\n313 Marrickville Road\nMarrickville NSW 2204",
    "days": "Wednesday, Saturday",
    "hours": {
      "Wednesday": "10:00 AM - 12:00 PM",
      "Saturday": "2:00 PM - 4:00 PM"
    },
    "council": "Inner West Council",
    "source_url": "https://www.innerwest.nsw.gov.au/explore/libraries/library-locations-and-opening-hours/marrickville-library",
    "postcode": "2204",
    "lat": -33.9108,
    "lon": 151.1539
  },
  {
    "name": "Randwick City Library - Bowen Library 669-673 Anzac Parade Maroubra NSW 2035",
    "address": "Randwick City Library - Bowen Library\n669-673 Anzac Parade\nMaroubra NSW 2035",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Thursday": "2:00 PM - 4:00 PM"
    },
    "council": "Randwick City Council",
    "source_url": "https://www.randwick.nsw.gov.au/library/about-the-library/locations-and-opening-hours",
    "postcode": "2035",
    "lat": -33.9438,
    "lon": 151.2399
  },
  {
    "name": "Hurstville Central Shopping Centre Information Desk 225 Forest Road Hurstville NSW 2220",
    "address": "Hurstville Central Shopping Centre Information Desk\n225 Forest Road\nHurstville NSW 2220",
    "days": "Monday, Friday",
    "hours": {
      "Monday": "11:00 AM - 2:00 PM",
      "Friday": "11:00 AM - 2:00 PM"
    },
    "council": "Georges River Council",
    "source_url": "https://www.hurstvillecentral.com.au/services",
    "postcode": "2220",
    "lat": -33.9676,
    "lon": 151.1038
  },
  {
    "name": "Hornsby Library 28-44 George Street Hornsby NSW 2077",
    "address": "Hornsby Library\n28-44 George Street\nHornsby NSW 2077",
    "days": "Monday, Wednesday, Saturday",
    "hours": {
      "Monday": "10:00 AM - 12:00 PM",
      "Wednesday": "2:00 PM - 4:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Hornsby Shire Council",
    "source_url": "https://www.hornsby.nsw.gov.au/library/about-library/locations",
    "postcode": "2077",
    "lat": -33.7033,
    "lon": 151.0988
  },
  {
    "name": "Inner West Council Service Centre 7-15 Wetherill Street Leichhardt NSW 2040",
    "address": "Inner West Council Service Centre\n7-15 Wetherill Street\nLeichhardt NSW 2040",
    "days": "Monday, Wednesday, Friday",
    "hours": {
      "Monday": "10:00 AM - 1:00 PM",
      "Wednesday": "2:00 PM - 5:00 PM",
      "Friday": "10:00 AM - 1:00 PM"
    },
    "council": "Inner West Council",
    "source_url": "https://www.innerwest.nsw.gov.au/live/community-well-being/justice-of-the-peace",
    "postcode": "2040",
    "lat": -33.8847,
    "lon": 151.1552
  },
  {
    "name": "Castle Hill Library Cnr Castle & Pennant Streets Castle Hill NSW 2154 Location Copying Service Available, fees apply",
    "address": "Castle Hill Library\nCnr Castle, The Hills Shire Council, NSW",
    "days": "Tuesday, Wednesday, Thursday",
    "hours": {
      "Tuesday": "10:00 AM - 1:00 PM",
      "Wednesday": "5:00 PM - 7:00 PM",
      "Thursday": "10:00 AM - 1:00 PM"
    },
    "council": "The Hills Shire Council",
    "source_url": "https://www.thehills.nsw.gov.au/Residents/Library/Library-Services/Justice-of-the-Peace",
    "postcode": "2154",
    "lat": -33.7319,
    "lon": 151.0042
  },
  {
    "name": "Vinegar Hill Memorial Library 29 Main Street, Rouse Hill Town Centre Rouse Hill NSW 2155 Location Copying Service Available, fees apply",
    "address": "29 Main Street, Rouse Hill Town Centre\nRouse Hill NSW 2155",
    "days": "Thursday",
    "hours": {
      "Thursday": "5:00 PM - 7:00 PM"
    },
    "council": "The Hills Shire Council",
    "source_url": "https://www.thehills.nsw.gov.au/Residents/Library/Library-Services/Justice-of-the-Peace",
    "postcode": "2155",
    "lat": -33.6841,
    "lon": 150.9107
  },
  {
    "name": "Stanhope Village Shopping Centre (JP Desk)",
    "address": "Outside Specsavers, Stanhope Village Shopping Centre, 2 Sentry Drive, Stanhope Gardens NSW 2768",
    "days": "Wednesday, Saturday",
    "hours": {
      "Wednesday": "3:00 PM - 6:00 PM",
      "Saturday": "9:00 AM - 12:00 PM"
    },
    "council": "N/A",
    "source_url": "https://www.stanhopevillage.com.au/whats-on/justice-of-the-peace",
    "postcode": "2768",
    "holiday_notice": "Christmas Holiday Hours 🎄",
    "lat": -33.7184,
    "lon": 150.9151
  },
  {
    "name": "Dennis Johnson Library (JP Service)",
    "address": "Stanhope Leisure Centre, Sentry Drive, Stanhope Gardens NSW 2768",
    "days": "Monday, Tuesday, Wednesday, Saturday",
    "hours": {
      "Monday": "10:00 AM - 1:00 PM",
      "Tuesday": "5:00 PM - 7:00 PM",
      "Wednesday": "10:00 AM - 12:00 PM",
      "Saturday": "10:00 AM - 12:30 PM"
    },
    "council": "N/A",
    "source_url": "https://www.stanhopevillage.com.au/whats-on/justice-of-the-peace",
    "postcode": "2768",
    "holiday_notice": "Christmas Holiday Hours 🎄",
    "lat": -33.7184,
    "lon": 150.9151
  },
  {
    "name": "Winston Hills Mall",
    "address": "Caroline Chisholm Drive, Winston Hills NSW 2153",
    "days": "Thursday",
    "hours": {
      "Thursday": "10:00 AM - 12:00 PM"
    },
    "council": "N/A",
    "source_url": "https://www.winstonhillsmall.com.au/whats-on/jpservice",
    "postcode": "2153",
    "lat": -33.7880,
    "lon": 150.9773
  },
{
"name": "Dubbo City Library",
"address": "Dubbo City Library\nCnr Macquarie & Talbragar Streets\nDubbo NSW 2830",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday",
"hours": {
"Monday": "9:30 AM - 5:00 PM",
"Tuesday": "9:30 AM - 5:00 PM",
"Wednesday": "9:30 AM - 5:00 PM",
"Thursday": "9:30 AM - 5:00 PM",
"Friday": "9:30 AM - 5:00 PM"
},
"council": "Dubbo Regional Council",
"source_url": "https://www.dubbo.nsw.gov.au/Community-and-Groups/Justice-of-the-Peace",
"postcode": "2830",
"lat": -32.2452,
"lon": 148.6015
},
{
"name": "Dubbo Regional Council - Customer Service Centre",
"address": "Dubbo Regional Council\nCnr Church and Darling Streets\nDubbo NSW 2830",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday",
"hours": {
"Monday": "9:00 AM - 4:00 PM",
"Tuesday": "9:00 AM - 4:00 PM",
"Wednesday": "9:00 AM - 4:00 PM",
"Thursday": "9:00 AM - 4:00 PM",
"Friday": "9:00 AM - 4:00 PM"
},
"council": "Dubbo Regional Council",
"source_url": "https://www.dubbo.nsw.gov.au/Community-and-Groups/Justice-of-the-Peace",
"postcode": "2830",
"lat": -32.2447,
"lon": 148.6062
},
{
"name": "Orange City Library",
"address": "Orange City Library\n147 Byng Street\nOrange NSW 2800",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday",
"hours": {
"Monday": "10:00 AM - 12:00 PM",
"Tuesday": "2:00 PM - 4:00 PM",
"Wednesday": "10:00 AM - 12:00 PM",
"Thursday": "2:00 PM - 4:00 PM",
"Friday": "10:00 AM - 12:00 PM"
},
"council": "Orange City Council",
"source_url": "https://www.orange.nsw.gov.au/community/justice-of-the-peace",
"postcode": "2800",
"lat": -33.2835,
"lon": 149.1012
},
{
"name": "Orange Civic Centre",
"address": "Orange Civic Centre\n135 Byng Street\nOrange NSW 2800",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday",
"hours": {
"Monday": "9:00 AM - 3:00 PM",
"Tuesday": "9:00 AM - 3:00 PM",
"Wednesday": "9:00 AM - 3:00 PM",
"Thursday": "9:00 AM - 3:00 PM",
"Friday": "9:00 AM - 3:00 PM"
},
"council": "Orange City Council",
"source_url": "https://www.orange.nsw.gov.au/community/justice-of-the-peace",
"postcode": "2800",
"lat": -33.2833,
"lon": 149.1008
},
{
"name": "Hawkesbury Central Library",
"address": "Hawkesbury Central Library\nDeerubbin Centre\n300 George Street\nWindsor NSW 2756",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday",
"hours": {
"Monday": "9:00 AM - 5:00 PM",
"Tuesday": "9:00 AM - 5:00 PM",
"Wednesday": "9:00 AM - 5:00 PM",
"Thursday": "9:00 AM - 5:00 PM",
"Friday": "9:00 AM - 5:00 PM",
"Saturday": "9:00 AM - 1:00 PM"
},
"council": "Hawkesbury City Council",
"source_url": "https://www.hawkesbury.nsw.gov.au/council/forms-and-publications/justice-of-the-peace",
"postcode": "2756",
"lat": -33.6103,
"lon": 150.8219
},
{
"name": "Richmond Marketplace",
"address": "Richmond Marketplace\n78 March Street\nRichmond NSW 2753",
"days": "Tuesday, Thursday",
"hours": {
"Tuesday": "10:00 AM - 12:00 PM",
"Thursday": "1:00 PM - 3:00 PM"
},
"council": "Hawkesbury City Council",
"source_url": "https://www.hawkesbury.nsw.gov.au/council/forms-and-publications/justice-of-the-peace",
"postcode": "2753",
"lat": -33.5978,
"lon": 150.7483
},
{
"name": "Penrith City Council - St Marys Office",
"address": "Penrith City Council - St Marys Office\nSt Marys Corner Community & Cultural Precinct\n207-209 Queen Street\nSt Marys NSW 2760",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday",
"hours": {
"Monday": "9:00 AM - 4:00 PM",
"Tuesday": "9:00 AM - 4:00 PM",
"Wednesday": "9:00 AM - 4:00 PM",
"Thursday": "9:00 AM - 4:00 PM",
"Friday": "9:00 AM - 4:00 PM"
},
"council": "Penrith City Council",
"source_url": "https://www.penrithcity.nsw.gov.au/community-library/community-information/justice-of-the-peace",
"postcode": "2760",
"lat": -33.7656,
"lon": 150.7744
},
{
"name": "Katoomba Library",
"address": "Katoomba Library\n30 Parke Street\nKatoomba NSW 2780",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday",
"hours": {
"Monday": "10:00 AM - 5:00 PM",
"Tuesday": "10:00 AM - 5:00 PM",
"Wednesday": "10:00 AM - 5:00 PM",
"Thursday": "10:00 AM - 5:00 PM",
"Friday": "10:00 AM - 5:00 PM",
"Saturday": "10:00 AM - 1:00 PM"
},
"council": "Blue Mountains City Council",
"source_url": "https://www.bmcc.nsw.gov.au/community/justice-of-the-peace",
"postcode": "2780",
"lat": -33.7147,
"lon": 150.3122
},
{
"name": "Springwood Library",
"address": "Springwood Library\n104 Macquarie Road\nSpringwood NSW 2777",
"days": "Monday, Wednesday, Friday",
"hours": {
"Monday": "10:00 AM - 12:00 PM",
"Wednesday": "2:00 PM - 4:00 PM",
"Friday": "10:00 AM - 12:00 PM"
},
"council": "Blue Mountains City Council",
"source_url": "https://www.bmcc.nsw.gov.au/community/justice-of-the-peace",
"postcode": "2777",
"lat": -33.6969,
"lon": 150.5658
},
{
"name": "Blue Mountains City Council - Katoomba Office",
"address": "Blue Mountains City Council\n2-6 Civic Place\nKatoomba NSW 2780",
"days": "Monday, Tuesday, Wednesday, Thursday, Friday",
"hours": {
"Monday": "9:00 AM - 4:30 PM",
"Tuesday": "9:00 AM - 4:30 PM",
"Wednesday": "9:00 AM - 4:30 PM",
"Thursday": "9:00 AM - 4:30 PM",
"Friday": "9:00 AM - 4:30 PM"
},
"council": "Blue Mountains City Council",
"source_url": "https://www.bmcc.nsw.gov.au/community/justice-of-the-peace",
"postcode": "2780",
"lat": -33.7142,
"lon": 150.3120
}
];

function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = deg => deg * (Math.PI / 180);
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

document.getElementById("find-jp").addEventListener("click", findJP);

function findJP() {
  const input = suburbInput.value.trim();
  console.log("My input suburb:", input);
  errorMessage.style.display = "none";

  if (!input) {
    errorMessage.textContent = "Please enter a suburb name";
    errorMessage.style.display = "block";
    return;
  }

  // First try exact match (case insensitive)
  let userSuburb = NSWSuburbs.find(s =>
    s.name.toLowerCase() === input.toLowerCase()
  );
  console.log('userSuburb found=>',userSuburb)

  // If no exact match, try to find a partial match
  if (!userSuburb) {
    userSuburb = NSWSuburbs.find(s =>
      s.name.toLowerCase().includes(input.toLowerCase()) ||
      input.toLowerCase().includes(s.name.toLowerCase())
    );
  }

  // Handle specifically for The Ponds if not found
  if (!userSuburb && input.toLowerCase() === "the ponds") {
    userSuburb = {
      name: "The Ponds",
      postcode: "2769",
      lat: -33.7035,
      lon: 150.9066
    };
  }

  // If still no match, try Levenshtein distance
  if (!userSuburb) {
    console.log('In userSuburb block')
    let closestMatch = null;
    let closestDistance = Infinity;

    NSWSuburbs.forEach(s => {
      const d = levenshtein(input.toLowerCase(), s.name.toLowerCase());
      if (d < closestDistance) {
        closestDistance = d;
        closestMatch = s;
      }
    });

    // Only use closest match if it's reasonably close
    if (closestDistance <= 3) {
      userSuburb = closestMatch;
      console.log("Closest match:", userSuburb.name);
    }
  }

  if (!userSuburb) {
    errorMessage.textContent = "Suburb not found. Please check your spelling or select from the dropdown.";
    errorMessage.style.display = "block";
    return;
  }

  // Check if we have coordinates for this suburb
  if (!userSuburb.lat || !userSuburb.lon) {
    // Try to get coordinates from postcode
    const latLon = getLatLonFromPostcode(userSuburb.postcode, NSWSuburbs);
    if (latLon) {
      console.log('latLon.lat=>'+latLon.lat+'latLon.lon=>'+latLon.lon);
      userSuburb.lat = latLon.lat;
      userSuburb.lon = latLon.lon;
    } else {
      resultElement.innerHTML = `
        <p style="color:orange;">We don't have precise location data for ${userSuburb.name}.</p>
        <p>Please try a different suburb or contact support.</p>
      `;
      return;
    }
  }

  console.log("User suburb:", userSuburb.name, "coordinates:", userSuburb.lat, userSuburb.lon);

  function createLocationElement(jp) {
      // Generate the maps link
      const mapsLink = `https://www.google.com/maps?q=${jp.address}`;

      // Process hours
      let hoursHTML = '';
      if (jp.hours && typeof jp.hours === 'object') {
        hoursHTML = '<p class="jp-hours"><strong>Hours:</strong></p><ul>';
        for (const [day, time] of Object.entries(jp.hours)) {
          if (time) {
            hoursHTML += `<li>${day}: ${time}</li>`;
          }
        }
        hoursHTML += '</ul>';
      }
      return hoursHTML
  }

  // Calculate distances for all JP locations
  const jpWithDistances = jpLocations.map(jp => {
    // If JP doesn't have coordinates, try to get them from postcode
    if (!jp.lat || !jp.lon) {
      const latLon = getLatLonFromPostcode(jp.postcode, NSWSuburbs);
      if (latLon) {
        jp.lat = latLon.lat;
        jp.lon = latLon.lon;
      } else {
        console.warn(`No coordinates found for JP: ${jp.name}`);
        return null; // Skip this JP
      }
    }

    // Calculate distance
    const dist = getDistance(userSuburb.lat, userSuburb.lon, jp.lat, jp.lon);
    //console.log(`Distance to ${jp.name}: ${dist.toFixed(2)} km`);

    // Return JP with distance
    return {
      ...jp,
      distance: dist
    };
  })
  .filter(jp => jp !== null) // Remove any JPs without coordinates
  .sort((a, b) => a.distance - b.distance); // Sort by distance

  // Get the top 3 nearest locations
  const topThree = jpWithDistances.slice(0, 3);

  if (topThree.length > 0) {
    const postcodeInfo = userSuburb.postcode ? ` (${userSuburb.postcode})` : '';

    // Start building the results HTML
    let resultsHTML = `<h3>Results for ${userSuburb.name}${postcodeInfo}</h3>`;

    // Add each of the top 3 locations
    topThree.forEach((jp, index) => {
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(jp.address)}`;

      // Process the name and address
      let displayName = jp.name;
      let additionalInfo = "";



      // For Vinegar Hill specifically - split the name and any additional info
      if (jp.name.includes("Vinegar Hill Memorial Library")) {
        displayName = "Vinegar Hill Memorial Library";
      }

      // For any location, extract "Location" and anything after it as additional info
      if (jp.address.includes("Location")) {
        const parts = jp.address.split("Location");
        jp.address = parts[0].trim();
        additionalInfo = "Location" + parts[1].trim();
      }

      resultsHTML += `
        <div class="jp-location">
          <h4>${index + 1}. ${displayName}</h4>
          <p class="jp-address">${jp.address}</p>
          ${additionalInfo ? `<p class="jp-additional-info">${additionalInfo}</p>` : ''}
          <p class="jp-days"><strong>Days:</strong> ${jp.days || ''}</p>
          ${createLocationElement(jp)}
          <p class="jp-distance"><strong>Distance:</strong> ${jp.distance.toFixed(2)} km</p>
          <p class="jp-map-link"><a href="${mapsLink}" target="_blank">View on Google Maps</a></p>
        </div>
      `;

      // Add a separator between locations (except after the last one)
      if (index < topThree.length - 1) {
        resultsHTML += `<hr class="location-divider">`;
      }
    });

    resultElement.innerHTML = resultsHTML;
  } else {
    resultElement.innerHTML = `<p class="error-message">No JP locations found nearby ${userSuburb.name}.</p>`;
  }
}

function levenshtein(a, b) {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, () => Array(an + 1).fill(0));

  for (let i = 0; i <= bn; i++) matrix[i][0] = i;
  for (let j = 0; j <= an; j++) matrix[0][j] = j;

  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[bn][an];
}