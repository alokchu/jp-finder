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

// Load suburbs data from JSON file with caching
async function loadSuburbsData() {
  // First try to load from localStorage
  const cachedData = localStorage.getItem('nswSuburbs');
  const cacheTimestamp = localStorage.getItem('nswSuburbsTimestamp');
  
  // Check if we have valid cached data (less than 24 hours old)
  if (cachedData && cacheTimestamp) {
    const cacheAge = Date.now() - parseInt(cacheTimestamp);
    if (cacheAge < 24 * 60 * 60 * 1000) { // 24 hours
      try {
        NSWSuburbs = JSON.parse(cachedData);
        console.log("Using cached suburbs data");
        initializeApp();
        return;
      } catch (e) {
        console.error('Error parsing cached data:', e);
      }
    }
  }

  // Show loading indicator
  showStatus("Loading suburbs data...", "info");
  
  try {
    const response = await fetch('../data/suburbs.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let data = '';
    
    while (true) {
      const {value, done} = await reader.read();
      if (done) break;
      data += decoder.decode(value, {stream: true});
    }
    
    const jsonData = JSON.parse(data);
    
    // Process the data into a format we can use
    NSWSuburbs = jsonData.data
      .filter(item => item.state === "NSW")
      .map(item => ({
        name: item.suburb,
        state: item.state,
        postcode: item.postcode,
        lat: item.lat,
        lon: item.lng
      }));

    // Cache the processed data
    try {
      localStorage.setItem('nswSuburbs', JSON.stringify(NSWSuburbs));
      localStorage.setItem('nswSuburbsTimestamp', Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache suburbs data:', e);
    }

    console.log("Number of suburbs loaded:", NSWSuburbs.length);
    
    // Hide loading indicator
    showStatus("", "info");
    
    geocodeSuburbs();
    initializeApp();
  } catch (error) {
    console.error('Error loading suburbs data:', error);
    showStatus("Using fallback data due to loading error", "error");
    
    // Use fallback data
    useFallbackData();
    initializeApp();
  }
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