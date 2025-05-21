// Ensure global variables exist
if (typeof window.NSWSuburbs === 'undefined') {
  window.NSWSuburbs = [];
}
if (typeof window.selectedSuburbIndex === 'undefined') {
  window.selectedSuburbIndex = -1;
}
if (typeof window.jpLocations === 'undefined') {
  window.jpLocations = [];
}

// Make DOM elements global
window.resultElement = document.getElementById("result");
window.errorMessage = document.getElementById("error-message");
window.statusMessage = document.getElementById("status-message");
window.suburbInput = document.getElementById("suburb-input");
window.suburbSuggestions = document.getElementById("suburb-suggestions");

// Google Analytics tracking functions
function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
}

function trackSearch(suburb, postcode, resultsFound) {
  trackEvent('jp_search', {
    'search_term': suburb,
    'postcode': postcode,
    'results_found': resultsFound,
    'event_category': 'engagement'
  });
}

function trackLocationClick(jpName, distance) {
  trackEvent('jp_location_click', {
    'jp_name': jpName,
    'distance_km': Math.round(distance * 10) / 10,
    'event_category': 'engagement'
  });
}

// Initialize the app when page loads
window.addEventListener('DOMContentLoaded', () => {
  loadSuburbsData();
  trackEvent('page_load', {
    'page_title': document.title,
    'event_category': 'engagement'
  });
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
        const parsedData = JSON.parse(cachedData);
        if (Array.isArray(parsedData)) {
          window.NSWSuburbs = parsedData;
          console.log("Using cached suburbs data");
          console.log("Number of suburbs in cache:", parsedData.length);
          initializeApp();
          return;
        }
      } catch (e) {
        console.error('Error parsing cached data:', e);
      }
    }
  }

  // Show loading indicator
  showStatus("Loading NSW suburbs and postcodes data...", "info");
  
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
    const processedData = jsonData.data
      .filter(item => item.state === "NSW")
      .map(item => ({
        name: item.suburb,
        state: item.state,
        postcode: item.postcode,
        lat: item.lat,
        lon: item.lng
      }));

    // Update the global NSWSuburbs array
    window.NSWSuburbs = processedData;

    // Cache the processed data
    try {
      localStorage.setItem('nswSuburbs', JSON.stringify(window.NSWSuburbs));
      localStorage.setItem('nswSuburbsTimestamp', Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache suburbs data:', e);
    }

    console.log("Number of suburbs loaded:", window.NSWSuburbs.length);
    
    // Hide loading indicator
    showStatus("", "info");
    
    geocodeSuburbs();
    initializeApp();
    
    // Track successful data load
    trackEvent('data_load_success', {
      'suburbs_count': window.NSWSuburbs.length,
      'event_category': 'technical'
    });
    
  } catch (error) {
    console.error('Error loading suburbs data:', error);
    showStatus("Using fallback data due to loading error", "error");
    
    // Track data load error
    trackEvent('data_load_error', {
      'error_message': error.message,
      'event_category': 'technical'
    });
    
    // Use fallback data
    useFallbackData();
    initializeApp();
  }
}

// Enhanced function to search by postcode or suburb name
function findSuburbByInput(input) {
  const cleanInput = input.trim();
  
  // Check if input is numeric (postcode)
  if (/^\d{4}$/.test(cleanInput)) {
    const postcode = parseInt(cleanInput);
    return window.NSWSuburbs.filter(s => s.postcode === postcode);
  }
  
  // Search by suburb name
  const lowerInput = cleanInput.toLowerCase();
  
  // First try exact match
  let matches = window.NSWSuburbs.filter(s =>
    s.name.toLowerCase() === lowerInput
  );
  
  // If no exact match, try partial match
  if (matches.length === 0) {
    matches = window.NSWSuburbs.filter(s =>
      s.name.toLowerCase().includes(lowerInput) ||
      lowerInput.includes(s.name.toLowerCase())
    );
  }
  
  return matches;
}

// Improved function to get coordinates from postcode
function getLatLonFromPostcode(postcode, suburbData) {
  if (!postcode) return null;
  
  console.log('Getting coordinates for postcode:', postcode);
  
  // Convert postcode to number for comparison
  const postcodeNum = parseInt(String(postcode).trim());
  
  // Find all suburbs with this postcode and take the first one with valid coordinates
  const matches = suburbData.filter(s => s.postcode === postcodeNum);
  
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
  
  // Hardcoded coordinates for specific postcodes
  const hardcodedCoords = {
    2769: { lat: -33.7035, lon: 150.9066 }, // The Ponds
    2768: { lat: -33.7184, lon: 150.9151 }, // Stanhope Gardens
    2000: { lat: -33.8688, lon: 151.2093 }, // Sydney CBD
    2150: { lat: -33.8148, lon: 151.0017 }, // Parramatta
  };
  
  if (hardcodedCoords[postcodeNum]) {
    console.log(`Using hardcoded coordinates for postcode ${postcodeNum}`);
    return hardcodedCoords[postcodeNum];
  }
  
  return null;
}

// Fallback data in case the JSON file can't be loaded
function useFallbackData() {
  window.NSWSuburbs = [
    { name: "Sydney", postcode: 2000, lat: -33.8688, lon: 151.2093 },
    { name: "Newcastle", postcode: 2300, lat: -32.9283, lon: 151.7817 },
    { name: "Wollongong", postcode: 2500, lat: -34.4278, lon: 150.8936 },
    { name: "Blacktown", postcode: 2148, lat: -33.7711, lon: 150.9057 },
    { name: "Parramatta", postcode: 2150, lat: -33.8148, lon: 151.0017 },
    { name: "Penrith", postcode: 2750, lat: -33.7506, lon: 150.6944 },
    { name: "Campbelltown", postcode: 2560, lat: -34.0650, lon: 150.8142 },
    { name: "Liverpool", postcode: 2170, lat: -33.9200, lon: 150.9255 },
    { name: "The Ponds", postcode: 2769, lat: -33.7035, lon: 150.9066 },
    { name: "Stanhope Gardens", postcode: 2768, lat: -33.7184, lon: 150.9151 },
  ];
}

// Enhanced geocoding function with specific coordinates for key suburbs
function geocodeSuburbs() {
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
  };

  // Update our NSWSuburbs array with coordinates where available
  window.NSWSuburbs.forEach(suburb => {
    if (geocodedSuburbs[suburb.name] && (!suburb.lat || !suburb.lon)) {
      suburb.lat = geocodedSuburbs[suburb.name].lat;
      suburb.lon = geocodedSuburbs[suburb.name].lon;
    }
  });
}

function initializeApp() {
  window.resultElement.innerHTML = '<p>Enter a NSW suburb name or postcode above to find the nearest Justice of the Peace locations.</p>';
  setupSuburbAutocomplete();
}

function showStatus(message, type) {
  window.statusMessage.textContent = message;
  window.statusMessage.className = type;
  window.statusMessage.style.display = "block";

  // Hide status after 5 seconds
  setTimeout(() => {
    window.statusMessage.style.display = "none";
  }, 5000);
}

function setupSuburbAutocomplete() {
  // Event listener for input changes
  window.suburbInput.addEventListener('input', handleSuburbInput);

  // Event listener for keyboard navigation
  window.suburbInput.addEventListener('keydown', handleKeyboardNavigation);

  // Event listener for clicking outside to close suggestions
  document.addEventListener('click', (e) => {
    if (e.target !== window.suburbInput && e.target !== window.suburbSuggestions) {
      window.suburbSuggestions.style.display = 'none';
    }
  });
}

function handleSuburbInput() {
  const query = window.suburbInput.value.trim();

  if (query.length < 2) {
    window.suburbSuggestions.style.display = 'none';
    return;
  }

  let matches = [];
  
  // Check if input is numeric (postcode search)
  if (/^\d+$/.test(query)) {
    // Search by postcode
    const postcodeQuery = parseInt(query);
    matches = window.NSWSuburbs.filter(suburb => {
      const postcodeStr = suburb.postcode.toString();
      return postcodeStr.startsWith(query);
    }).slice(0, 8);
  } else {
    // Search by suburb name
    const lowerQuery = query.toLowerCase();
    matches = window.NSWSuburbs.filter(suburb =>
      suburb.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }

  if (matches.length === 0) {
    window.suburbSuggestions.style.display = 'none';
    return;
  }

  // Build suggestion list
  window.suburbSuggestions.innerHTML = '';
  matches.forEach((suburb, index) => {
    const item = document.createElement('li');
    item.className = 'suburb-suggestion';

    // Display format: "Suburb Name, Postcode"
    const displayText = `${suburb.name}, ${suburb.postcode}`;
    item.textContent = displayText;

    // Highlight the matching part
    const matchIndex = displayText.toLowerCase().indexOf(query.toLowerCase());
    if (matchIndex >= 0) {
      item.innerHTML =
        displayText.substring(0, matchIndex) +
        '<strong>' + displayText.substring(matchIndex, matchIndex + query.length) + '</strong>' +
        displayText.substring(matchIndex + query.length);
    }

    item.addEventListener('click', () => {
      // Set the input to just the suburb name for consistency
      window.suburbInput.value = suburb.name;
      window.suburbSuggestions.style.display = 'none';
      window.errorMessage.style.display = 'none';
      
      // Track autocomplete selection
      trackEvent('autocomplete_selection', {
        'selected_suburb': suburb.name,
        'selected_postcode': suburb.postcode,
        'event_category': 'engagement'
      });
    });

    window.suburbSuggestions.appendChild(item);
  });

  window.selectedSuburbIndex = -1;
  window.suburbSuggestions.style.display = 'block';
}

function handleKeyboardNavigation(e) {
  const suggestions = window.suburbSuggestions.querySelectorAll('.suburb-suggestion');

  if (suggestions.length === 0) return;

  // Down arrow
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    window.selectedSuburbIndex = Math.min(window.selectedSuburbIndex + 1, suggestions.length - 1);
    updateSelectedSuggestion(suggestions);
  }
  // Up arrow
  else if (e.key === 'ArrowUp') {
    e.preventDefault();
    window.selectedSuburbIndex = Math.max(window.selectedSuburbIndex - 1, -1);
    updateSelectedSuggestion(suggestions);
  }
  // Enter key
  else if (e.key === 'Enter') {
    e.preventDefault();
    if (window.selectedSuburbIndex >= 0 && suggestions[window.selectedSuburbIndex]) {
      // Extract suburb name from "Suburb, Postcode" format
      const selectedText = suggestions[window.selectedSuburbIndex].textContent;
      const suburbName = selectedText.split(',')[0].trim();
      window.suburbInput.value = suburbName;
      window.suburbSuggestions.style.display = 'none';
      findJP();
    } else {
      findJP();
    }
  }
  // Escape key
  else if (e.key === 'Escape') {
    window.suburbSuggestions.style.display = 'none';
  }
}

function updateSelectedSuggestion(suggestions) {
  // Remove selected class from all suggestions
  suggestions.forEach(s => s.classList.remove('selected'));

  // Add selected class to current suggestion
  if (window.selectedSuburbIndex >= 0) {
    suggestions[window.selectedSuburbIndex].classList.add('selected');
    suggestions[window.selectedSuburbIndex].scrollIntoView({ block: 'nearest' });
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
  const input = window.suburbInput.value.trim();
  console.log("Search input:", input);
  window.errorMessage.style.display = "none";

  if (!input) {
    window.errorMessage.textContent = "Please enter a NSW suburb name or postcode";
    window.errorMessage.style.display = "block";
    return;
  }

  // Find suburbs by input (handles both postcode and suburb name)
  const matchingSuburbs = findSuburbByInput(input);
  let userSuburb = null;

  if (matchingSuburbs.length > 0) {
    // If multiple matches, prefer exact name match or take first postcode match
    const exactMatch = matchingSuburbs.find(s => 
      s.name.toLowerCase() === input.toLowerCase()
    );
    userSuburb = exactMatch || matchingSuburbs[0];
  }

  // Handle specifically for The Ponds if not found
  if (!userSuburb && input.toLowerCase() === "the ponds") {
    userSuburb = {
      name: "The Ponds",
      postcode: 2769,
      lat: -33.7035,
      lon: 150.9066
    };
  }

  // If still no match, try Levenshtein distance for suburb names
  if (!userSuburb && !/^\d+$/.test(input)) {
    let closestMatch = null;
    let closestDistance = Infinity;

    window.NSWSuburbs.forEach(s => {
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
    window.errorMessage.textContent = "Suburb or postcode not found. Please check your spelling or select from the dropdown suggestions.";
    window.errorMessage.style.display = "block";
    
    // Track failed search
    trackEvent('search_not_found', {
      'search_term': input,
      'event_category': 'engagement'
    });
    return;
  }

  // Check if we have coordinates for this suburb
  if (!userSuburb.lat || !userSuburb.lon) {
    // Try to get coordinates from postcode
    const latLon = getLatLonFromPostcode(userSuburb.postcode, window.NSWSuburbs);
    if (latLon) {
      console.log('Got coordinates from postcode:', latLon.lat, latLon.lon);
      userSuburb.lat = latLon.lat;
      userSuburb.lon = latLon.lon;
    } else {
      window.resultElement.innerHTML = `
        <p style="color:orange;">We don't have precise location data for ${userSuburb.name} (${userSuburb.postcode}).</p>
        <p>Please try a different suburb or postcode, or contact support.</p>
      `;
      
      // Track location data missing
      trackEvent('location_data_missing', {
        'suburb_name': userSuburb.name,
        'postcode': userSuburb.postcode,
        'event_category': 'error'
      });
      return;
    }
  }

  console.log("User suburb:", userSuburb.name, "coordinates:", userSuburb.lat, userSuburb.lon);

  function createLocationElement(jp) {
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
      return hoursHTML;
  }

  // Calculate distances for all JP locations
  const jpWithDistances = window.jpLocations.map(jp => {
    // If JP doesn't have coordinates, try to get them from postcode
    if (!jp.lat || !jp.lon) {
      const latLon = getLatLonFromPostcode(jp.postcode, window.NSWSuburbs);
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

    // Track successful search
    trackSearch(userSuburb.name, userSuburb.postcode, topThree.length);

    // Start building the results HTML with SEO-friendly content
    let resultsHTML = `<h3>Justice of the Peace (JP) Locations Near ${userSuburb.name}${postcodeInfo}</h3>`;
    resultsHTML += `<p class="results-intro">Find the closest JP services in your area. These Justice of the Peace locations offer document witnessing, statutory declarations, and other notarial services.</p>`;

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
        <div class="jp-location" itemscope itemtype="https://schema.org/GovernmentService">
          <h4 itemprop="name">${index + 1}. ${displayName}</h4>
          <p class="jp-address" itemprop="address">${jp.address}</p>
          ${additionalInfo ? `<p class="jp-additional-info">${additionalInfo}</p>` : ''}
          <p class="jp-days"><strong>Available Days:</strong> <span itemprop="availableService">${jp.days || 'Contact for availability'}</span></p>
          ${createLocationElement(jp)}
          <p class="jp-distance"><strong>Distance from ${userSuburb.name}:</strong> ${jp.distance.toFixed(2)} km</p>
          <p class="jp-map-link">
            <a href="${mapsLink}" target="_blank" onclick="trackLocationClick('${displayName.replace(/'/g, "\\'")}', ${jp.distance})">
              View ${displayName} on Google Maps →
            </a>
          </p>
          <p class="jp-description">Justice of the Peace services including document witnessing, statutory declarations, and certified copies.</p>
        </div>
      `;

      // Add a separator between locations (except after the last one)
      if (index < topThree.length - 1) {
        resultsHTML += `<hr class="location-divider">`;
      }
    });

    // Add SEO-friendly footer content
    resultsHTML += `
      <div class="search-footer">
        <p><strong>About JP Services:</strong> Justice of the Peace officers can witness documents, administer oaths, take statutory declarations, and certify copies of original documents. All services shown are for ${userSuburb.name} and surrounding NSW areas.</p>
        <p><em>Need JP services in another area? Search for any NSW suburb or postcode above.</em></p>
      </div>
    `;

    window.resultElement.innerHTML = resultsHTML;
  } else {
    window.resultElement.innerHTML = `
      <div class="no-results">
        <p class="error-message">No Justice of the Peace locations found near ${userSuburb.name}${userSuburb.postcode ? ` (${userSuburb.postcode})` : ''}.</p>
        <p>Try searching for a nearby suburb or contact your local council for JP availability in your area.</p>
      </div>
    `;
    
    // Track no results found
    trackEvent('no_results_found', {
      'suburb_name': userSuburb.name,
      'postcode': userSuburb.postcode,
      'event_category': 'engagement'
    });
  }
}

// Enhanced tracking for map link clicks
function trackLocationClick(jpName, distance) {
  trackEvent('jp_location_click', {
    'jp_name': jpName,
    'distance_km': Math.round(distance * 10) / 10,
    'event_category': 'engagement'
  });
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