/// Enhanced JP locations data with coordinates
const jpLocations = [
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
    "name": "Lane Cove Council Civic Centre 48 Longueville Road Lane Cove NSW 2066",
    "address": "Lane Cove Council Civic Centre\n48 Longueville Road\nLane Cove NSW 2066",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "12:00 PM - 1:00 PM",
      "Tuesday": "12:00 PM - 1:00 PM",
      "Wednesday": "12:00 PM - 1:00 PM",
      "Thursday": "12:00 PM - 1:00 PM",
      "Friday": "12:00 PM - 1:00 PM"
    },
    "council": "Lane Cove Council",
    "source_url": "https://www.lanecove.nsw.gov.au/Community/Pages/JusticeofthePeace.aspx",
    "postcode": "2066",
    "lat": -33.8158,
    "lon": 151.1691,
    "notes": "Free service, no bookings required"
  },
  {
    "name": "Chatswood Library on The Concourse 409 Victoria Avenue Chatswood NSW 2067",
    "address": "Chatswood Library on The Concourse\n409 Victoria Avenue\nChatswood NSW 2067",
    "days": "Monday, Wednesday, Saturday",
    "hours": {
      "Monday": "12:00 PM - 2:00 PM",
      "Wednesday": "10:00 AM - 12:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://libraries.willoughby.nsw.gov.au/Services/JP-Services/JP-Services",
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
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Thursday": "2:00 PM - 4:00 PM"
    },
    "council": "North Sydney Council",
    "source_url": "https://www.northsydney.nsw.gov.au/community/justice-peace-services",
    "postcode": "2060",
    "lat": -33.8399,
    "lon": 151.2069,
    "notes": "Bookings required (no walk-ins) - book via the North Sydney Council JP page. No Saturday service."
  },
  {
    "name": "Mosman Library 605 Military Road Mosman NSW 2088",
    "address": "Mosman Library\n605 Military Road\nMosman NSW 2088",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "12:00 PM - 2:00 PM"
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
    "name": "Gordon Library 799 Pacific Highway Gordon NSW 2072",
    "address": "Gordon Library\n799 Pacific Highway\nGordon NSW 2072",
    "days": "Monday, Tuesday, Thursday, Friday",
    "hours": {
      "Monday": "10:00 AM - 11:30 AM; 5:30 PM - 6:30 PM",
      "Tuesday": "10:00 AM - 11:30 AM",
      "Thursday": "10:00 AM - 11:30 AM; 5:30 PM - 6:30 PM",
      "Friday": "9:30 AM - 10:30 AM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.krg.nsw.gov.au/Community/Ku-ring-gai-Library/Justice-of-the-Peace",
    "postcode": "2072",
    "lat": -33.733,
    "lon": 151.144
  },
  {
    "name": "Lindfield Library 265 Pacific Highway Lindfield NSW 2070",
    "address": "Lindfield Library\n265 Pacific Highway\nLindfield NSW 2070",
    "days": "Monday, Wednesday",
    "hours": {
      "Monday": "10:00 AM - 11:30 AM",
      "Wednesday": "10:00 AM - 11:30 AM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.krg.nsw.gov.au/Community/Ku-ring-gai-Library/Justice-of-the-Peace",
    "postcode": "2070",
    "lat": -33.781,
    "lon": 151.167
  },
  {
    "name": "Turramurra Library 5 Ray Street Turramurra NSW 2074",
    "address": "Turramurra Library\n5 Ray Street\nTurramurra NSW 2074",
    "days": "Monday, Tuesday",
    "hours": {
      "Monday": "3:30 PM - 4:30 PM",
      "Tuesday": "3:00 PM - 4:30 PM"
    },
    "council": "Ku-ring-gai Council",
    "source_url": "https://www.krg.nsw.gov.au/Community/Ku-ring-gai-Library/Justice-of-the-Peace",
    "postcode": "2074",
    "lat": -33.7333,
    "lon": 151.1288
  },
  {
    "name": "Constitution Hill Branch Library",
    "address": "20 Hollis Street\nConstitution Hill NSW 2145",
    "days": "Tuesday and Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 1:30 PM",
      "Saturday": "9:30 AM - 12:00 PM"
    },
    "council": "City of Parramatta",
    "source_url": "https://historyandheritage.cityofparramatta.nsw.gov.au/blog/2020/05/08/constitution-hill-branch-library",
    "postcode": "2145",
    "lat": -33.7990, 
    "lon": 150.9730
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
    "name": "Northbridge Plaza Information Desk 79-113 Sailors Bay Road Northbridge NSW 2063",
    "address": "Northbridge Plaza Information Desk\n79-113 Sailors Bay Road\nNorthbridge NSW 2063",
    "days": "Tuesday",
    "hours": {
      "Tuesday": "JP service reported on Tuesdays only - confirm times with the Plaza information desk"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.northbridgeplaza.com.au/centre-info/services",
    "postcode": "2063",
    "lat": -33.8121,
    "lon": 151.2167,
    "notes": "Needs verification: two May 2026 reports say JP is only here on Tuesdays; times not confirmed."
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
    "name": "City of Parramatta JP Service",
    "address": "City of Parramatta\nParramatta NSW 2150\n(no longer at 126 Church Street)",
    "days": "Varies",
    "hours": {
      "Varies": "Sessions and locations vary - check the City of Parramatta JP calendar before visiting"
    },
    "council": "City of Parramatta Council",
    "source_url": "https://www.cityofparramatta.nsw.gov.au/community/libraries-and-community-hubs/justice-of-the-peace",
    "postcode": "2150",
    "lat": -33.815,
    "lon": 151.0011,
    "notes": "Reported moved from 126 Church St (now at PHIVE) and not available every day - verify against council calendar."
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
    "name": "Northbridge Library, 173 Sailors Bay Road Northbridge NSW 2063",
    "address": "Northbridge Library\n173 Sailors Bay Road\nNorthbridge NSW 2063",
    "days": "Thursday",
    "hours": {
      "Thursday": "5:00 PM - 6:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "",
    "postcode": "2063",
    "lat": -33.8130,
    "lon": 151.2160
  },
  {
    "name": "West Chatswood Library, 565 Mowbray Road West Chatswood NSW 2067",
    "address": "West Chatswood Library\n565 Mowbray Road West\nChatswood NSW 2067",
    "days": "Tuesday",
    "hours": {
      "Tuesday": "5:00 PM - 6:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "",
    "postcode": "2067",
    "lat": -33.8000,
    "lon": 151.1570
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
    "days": "Tuesday",
    "hours": {
      "Tuesday": "2:00 PM - 4:00 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.sutherlandshire.nsw.gov.au/Community/Library/Your-Library/Justice-of-the-Peace",
    "postcode": "2232",
    "lat": -34.0316,
    "lon": 151.0576
  },
  {
    "name": "Caringbah Library",
    "address": "Caringbah Library, Caringbah (see council page)",
    "days": "Monday",
    "hours": {
      "Monday": "11:00 AM - 1:00 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.sutherlandshire.nsw.gov.au/subsites/libraries/services/justices-of-the-peace",
    "postcode": "2229",
    "lat": -34.0449815,
    "lon": 151.1234315
  },
  {
    "name": "Southgate Centre (Sylvania) JP desk",
    "address": "Southgate Shopping Centre, Sylvania (desk in the shopping centre)",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "9:00 AM - 12:00 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.sutherlandshire.nsw.gov.au/subsites/libraries/services/justices-of-the-peace",
    "postcode": "2224",
    "lat": -34.01003,
    "lon": 151.10408
  },
  {
    "name": "Cronulla Library",
    "address": "Cronulla Library (Cronulla Central precinct - see council page)",
    "days": "Thursday",
    "hours": {
      "Thursday": "10:00 AM - 1:00 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.sutherlandshire.nsw.gov.au/subsites/libraries/services/justices-of-the-peace",
    "lat": -34.05204,
    "lon": 151.15218
  },
  {
    "name": "Menai Library",
    "address": "Menai Library (see council page )",
    "days": "Friday",
    "hours": {
      "Friday": "10:00 AM - 1:00 PM"
    },
    "council": "Sutherland Shire Council",
    "source_url": "https://www.sutherlandshire.nsw.gov.au/subsites/libraries/services/justices-of-the-peace",
    "postcode": "2234",
    "lat": -34.013333,
    "lon": 151.016111
  },
  {
    "name": "Stockland Wetherill Park Customer Care Desk 561-583 Polding Street Wetherill Park NSW 2164",
    "address": "Stockland Wetherill Park Customer Care Desk\n561-583 Polding Street\nWetherill Park NSW 2164",
    "days": "Thursday, Saturday",
    "hours": {
      "Thursday": "5:00 PM - 6:00 PM",
      "Saturday": "9:30 AM - 11:30 AM"
    },
    "council": "Fairfield City Council",
    "source_url": "https://www.stockland.com.au/shopping-centres/centres/stockland-wetherill-park/offers-and-services",
    "postcode": "2164",
    "lat": -33.8552,
    "lon": 150.9068
  },
  {
    "name": "Liverpool City Library (Yellamundie) 98 Bigge Street Liverpool NSW 2170",
    "address": "Liverpool City Library (Yellamundie)\n98 Bigge Street\nLiverpool NSW 2170",
    "days": "Wednesday, Friday, Saturday",
    "hours": {
      "Wednesday": "11:00 AM - 1:00 PM",
      "Friday": "11:00 AM - 1:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://mylibrary.liverpool.nsw.gov.au/services/justice-of-the-peace-service",
    "postcode": "2170",
    "lat": -33.9181,
    "lon": 150.9200
  },
  {
    "name": "Carnes Hill Library 11 Carnes Hill Drive Carnes Hill NSW 2171",
    "address": "Carnes Hill Library\n11 Carnes Hill Drive\nCarnes Hill NSW 2171",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "10:00 AM - 12:00 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://mylibrary.liverpool.nsw.gov.au/services/justice-of-the-peace-service",
    "postcode": "2171",
    "lat": -33.9460,
    "lon": 150.8535
  },
  {
    "name": "Casula Library 19 Hillcrest Road Casula NSW 2170",
    "address": "Casula Library\n19 Hillcrest Road\nCasula NSW 2170",
    "days": "Tuesday",
    "hours": {
      "Tuesday": "5:30 PM - 7:30 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://mylibrary.liverpool.nsw.gov.au/services/justice-of-the-peace-service",
    "postcode": "2170",
    "lat": -33.9230,
    "lon": 150.9000
  },
  {
    "name": "Green Valley Library 202 John Street Green Valley NSW 2168",
    "address": "Green Valley Library\n202 John Street\nGreen Valley NSW 2168",
    "days": "Monday",
    "hours": {
      "Monday": "5:30 PM - 7:30 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://mylibrary.liverpool.nsw.gov.au/services/justice-of-the-peace-service",
    "postcode": "2168",
    "lat": -33.9105,
    "lon": 150.8977
  },
  {
    "name": "Moorebank Library 20 Moore Street Moorebank NSW 2170",
    "address": "Moorebank Library\n20 Moore Street\nMoorebank NSW 2170",
    "days": "Tuesday",
    "hours": {
      "Tuesday": "5:30 PM - 7:30 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://mylibrary.liverpool.nsw.gov.au/services/justice-of-the-peace-service",
    "postcode": "2170",
    "lat": -33.9586,
    "lon": 150.9255
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
    "days": "Saturday",
    "hours": {
      "Saturday": "9:00 AM - 12:00 PM"
    },
    "council": "City of Canada Bay",
    "source_url": "https://www.rhodeswaterside.com.au/experience/events/free-jp-service",
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
    "name": "Marrickville Library & Pavilion 313 Marrickville Road Marrickville NSW 2204",
    "address": "Patyegarang Place, Marrickville Library & Pavilion\n313 Marrickville Road\nMarrickville NSW 2204",
    "days": "Tuesday (fortnightly)",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM (fortnightly)"
    },
    "council": "Inner West Council",
    "source_url": "https://www.innerwest.nsw.gov.au/libraries/justice-peace-jp-services",
    "postcode": "2204",
    "lat": -33.9108,
    "lon": 151.1539,
    "notes": "No longer Wednesdays - now fortnightly on Tuesdays."
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
    "days": "Tuesday, Wednesday, Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 12:30 PM",
      "Wednesday": "10:00 AM - 12:00 PM",
      "Saturday": "10:00 AM - 12:30 PM"
    },
    "council": "N/A",
    "source_url": "https://www.blacktown.nsw.gov.au/Services/Justice-of-the-Peace",
    "postcode": "2768",
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
    "name": "Penrith City Council - St. Marys Office",
    "address": "Penrith City Council - St Marys Office\nSt Marys Corner Community & Cultural Precinct\n207-209 Queen Street\nSt Marys NSW 2760",
    "days": "Thursday",
    "hours": {
      "Thursday": "2:30 PM - 4:30 PM"
    },
    "council": "Penrith City Council",
    "source_url": "https://www.penrithcity.nsw.gov.au/community-library/community-information/justice-of-the-peace",
    "postcode": "2760",
    "lat": -33.7656,
    "lon": 150.7744,
    "notes": "Appointment required - book via the Penrith Library website."
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
  },
  {
    "name": "Manly Library",
    "address": "Manly Library\n1 Market Place\nManly NSW 2095",
    "days": "Varies",
    "hours": {
      "Varies": "Times change week to week - check the Northern Beaches Libraries JP schedule before visiting"
    },
    "council": "Northern Beaches Council",
    "source_url": "https://www.northernbeaches.nsw.gov.au/library/services/justice-peace",
    "postcode": "2095",
    "lat": -33.7971,
    "lon": 151.2857,
    "notes": "Northern Beaches Libraries asked that listings direct people to their JP schedule page."
  },
  {
    "name": "Dee Why Library",
    "address": "Dee Why Library\n725 Pittwater Road\nDee Why NSW 2099",
    "days": "Varies",
    "hours": {
      "Varies": "Times change week to week - check the Northern Beaches Libraries JP schedule before visiting"
    },
    "council": "Northern Beaches Council",
    "source_url": "https://www.northernbeaches.nsw.gov.au/library/services/justice-peace",
    "postcode": "2099",
    "lat": -33.7516,
    "lon": 151.2867,
    "notes": "Northern Beaches Libraries asked that listings direct people to their JP schedule page."
  },
  {
    "name": "Whitlam Library Cabramatta",
    "address": "Whitlam Library Cabramatta\n165 Railway Parade\nCabramatta NSW 2166",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "9:30 AM - 12:00 PM"
    },
    "council": "Fairfield City Council",
    "source_url": "https://www.fairfieldcity.nsw.gov.au/Services/Fairfield-City-Open-Libraries/Our-Special-Services",
    "postcode": "2166",
    "lat": -33.8926667,
    "lon": 150.9388692,
    "notes": "Volunteer-supported service - call (02) 9725 0333 to confirm a JP is available."
  },
  {
    "name": "Kogarah Library",
    "address": "Kogarah Library and Service Centre\n2 Belgrave Street\nKogarah NSW 2217",
    "days": "Monday, Thursday",
    "hours": {
      "Monday": "2:30 PM - 4:30 PM",
      "Thursday": "11:00 AM - 1:00 PM"
    },
    "council": "Georges River Council",
    "source_url": "https://georgesriver.spydus.com/cgi-bin/spydus.exe/MSGTRNGEN/OPAC/JPSERVICE",
    "postcode": "2217",
    "lat": -33.9671,
    "lon": 151.1374
  },
  {
    "name": "Oatley Library 26 Letitia Street Oatley NSW 2223",
    "address": "Oatley Library\n26 Letitia Street\nOatley NSW 2223",
    "days": "Thursday",
    "hours": {
      "Thursday": "11:00 AM - 1:00 PM"
    },
    "council": "Georges River Council",
    "source_url": "https://georgesriver.spydus.com/cgi-bin/spydus.exe/MSGTRNGEN/OPAC/JPSERVICE",
    "postcode": "2223",
    "lat": -33.9814,
    "lon": 151.083
  },
  {
    "name": "South Hurstville Library Corner of Short and Allen Street South Hurstville NSW 2221",
    "address": "South Hurstville Library\nCorner of Short and Allen Street\nSouth Hurstville NSW 2221",
    "days": "Friday",
    "hours": {
      "Friday": "11:00 AM - 1:00 PM"
    },
    "council": "Georges River Council",
    "source_url": "https://georgesriver.spydus.com/cgi-bin/spydus.exe/MSGTRNGEN/OPAC/JPSERVICE",
    "postcode": "2221",
    "lat": -33.97756,
    "lon": 151.1055
  },
  {
    "name": "Macquarie Centre JP Desk",
    "address": "Macquarie Centre\nLevel 1, near Macquarie Ice Rink\nCnr Herring & Waterloo Roads\nMacquarie Park NSW 2113",
    "days": "Wednesday, 1st & 3rd Saturday of the month",
    "hours": {
      "Wednesday": "9:30 AM - 12:30 PM",
      "1st & 3rd Saturday": "9:30 AM - 12:30 PM"
    },
    "council": "City of Ryde",
    "source_url": "https://www.macquariecentre.com.au/centre-info/services-facilities",
    "postcode": "2113",
    "lat": -33.7766,
    "lon": 151.1235,
    "notes": "Run by NSW Justices Association volunteers; hours may vary depending on volunteer availability."
  },
  {
    "name": "Eastgardens Library",
    "address": "Eastgardens Library\nWestfield Eastgardens, Level 1\n152 Bunnerong Road\nEastgardens NSW 2036",
    "days": "Monday, Tuesday, Thursday",
    "hours": {
      "Monday": "11:00 AM - 1:00 PM",
      "Tuesday": "9:00 AM - 1:00 PM",
      "Thursday": "1:00 PM - 4:45 PM"
    },
    "council": "Bayside Council",
    "source_url": "https://www.bayside.nsw.gov.au/services/justice-peace",
    "postcode": "2036",
    "lat": -33.9472,
    "lon": 151.2197
  },
  {
    "name": "Rockdale Library",
    "address": "Rockdale Library\n444-446 Princes Highway\nRockdale NSW 2216",
    "days": "Saturday",
    "hours": {
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Bayside Council",
    "source_url": "https://www.bayside.nsw.gov.au/services/justice-peace",
    "postcode": "2216",
    "lat": -33.9517,
    "lon": 151.1397,
    "notes": "Wednesday service ended (reported by Rockdale Library staff, May 2026)."
  },
  {
    "name": "Fairfield Library",
    "address": "Fairfield Library\n1/1B Barbara Street\nFairfield NSW 2165",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "1:30 PM - 3:00 PM",
      "Thursday": "1:30 PM - 3:00 PM"
    },
    "council": "Fairfield City Council",
    "source_url": "https://www.fairfieldcity.nsw.gov.au/Services/Fairfield-City-Open-Libraries/Our-Special-Services",
    "postcode": "2165",
    "lat": -33.8726,
    "lon": 150.9571
  },
  {
    "name": "Bankstown Library and Knowledge Centre",
    "address": "Bankstown Library and Knowledge Centre\n80 Rickard Road\nBankstown NSW 2200",
    "days": "Tuesday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM"
    },
    "council": "Canterbury-Bankstown Council",
    "source_url": "https://www.cbcity.nsw.gov.au/community/community-services/justice-of-the-peace",
    "postcode": "2200",
    "lat": -33.9171,
    "lon": 151.0341
  },
  {
    "name": "Carlingford Court Shopping Centre",
    "address": "Lvl 1 opposite Mobile Experts\nCarlingford Court Shopping Centre\nCustomer Service Desk\n220 Carlingford Road\nCarlingford NSW 2118",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "11:00 AM - 1:00 PM",
      "Thursday": "11:00 AM - 1:00 PM"
    },
    "council": "City of Parramatta",
    "source_url": "https://www.carlingfordcourt.com.au/services",
    "postcode": "2118",
    "lat": -33.7827,
    "lon": 151.0463
  },
  {
    "name": "Burwood Library",
    "address": "Burwood Library\n2 Conder Street\nBurwood NSW 2134",
    "days": "Tuesday",
    "hours": {
      "Tuesday": "2:00 PM - 4:00 PM",
      "Second Tuesday of the month": "6:45 PM - 7:45 PM"
    },
    "council": "Burwood Council",
    "source_url": "https://www.burwood.nsw.gov.au/Community/Justice-of-the-Peace",
    "postcode": "2134",
    "lat": -33.8776,
    "lon": 151.1044
  },
  {
    "name": "Strathfield Library",
    "address": "Strathfield Library\n65-67 Rochester Street\nStrathfield NSW 2135",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "10:00 AM - 12:00 PM"
    },
    "council": "Strathfield Council",
    "source_url": "https://www.strathfield.nsw.gov.au/community/justice-of-the-peace/",
    "postcode": "2135",
    "lat": -33.8728,
    "lon": 151.0917
  },
  {
    "name": "Mona Vale Library",
    "address": "Mona Vale Library\n1 Park Street\nMona Vale NSW 2103",
    "days": "Varies",
    "hours": {
      "Varies": "Times change week to week - check the Northern Beaches Libraries JP schedule before visiting"
    },
    "council": "Northern Beaches Council",
    "source_url": "https://www.northernbeaches.nsw.gov.au/library/services/justice-peace",
    "postcode": "2103",
    "lat": -33.6766,
    "lon": 151.3052,
    "notes": "Northern Beaches Libraries asked that listings direct people to their JP schedule page."
  },
  {
    "name": "Campsie Library and Knowledge Centre",
    "address": "Campsie Library and Knowledge Centre\n14-28 Amy Street\nCampsie NSW 2194",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "10:00 AM - 12:45 PM"
    },
    "council": "Canterbury-Bankstown Council",
    "source_url": "https://www.cbcity.nsw.gov.au/community/community-services/justice-of-the-peace",
    "postcode": "2194",
    "lat": -33.9115,
    "lon": 151.1036
  },
  {
    "name": "Port Stephens Council Administration Building",
    "address": "116 Adelaide Street\nRaymond Terrace NSW 2324",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:00 PM",
      "Tuesday": "8:30 AM - 4:00 PM",
      "Wednesday": "8:30 AM - 4:00 PM",
      "Thursday": "8:30 AM - 4:00 PM",
      "Friday": "8:30 AM - 4:00 PM"
    },
    "council": "Port Stephens Council",
    "source_url": "https://www.portstephens.nsw.gov.au/council/contact-us/justice-of-the-peace",
    "postcode": "2324",
    "lat": -32.7632,
    "lon": 151.7457
  },
  {
    "name": "Cessnock City Council Administration Centre",
    "address": "62-78 Vincent Street\nCessnock NSW 2325",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 4:30 PM",
      "Tuesday": "9:00 AM - 4:30 PM",
      "Wednesday": "9:00 AM - 4:30 PM",
      "Thursday": "9:00 AM - 4:30 PM",
      "Friday": "9:00 AM - 4:30 PM"
    },
    "council": "Cessnock City Council",
    "source_url": "https://www.cessnock.nsw.gov.au/Council/Contact-us",
    "postcode": "2325",
    "lat": -32.8344,
    "lon": 151.3552
  },
  {
    "name": "Singleton Council Administration Centre",
    "address": "Cnr Queen Street and Civic Avenue\nSingleton NSW 2330",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Singleton Council",
    "source_url": "https://www.singleton.nsw.gov.au/Contact-Us",
    "postcode": "2330",
    "lat": -32.5671,
    "lon": 151.1689
  },
  {
    "name": "Tweed Shire Council Administration Office",
    "address": "10-14 Tumbulgum Road\nMurwillumbah NSW 2484",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:15 PM",
      "Tuesday": "8:30 AM - 4:15 PM",
      "Wednesday": "8:30 AM - 4:15 PM",
      "Thursday": "8:30 AM - 4:15 PM",
      "Friday": "8:30 AM - 4:15 PM"
    },
    "council": "Tweed Shire Council",
    "source_url": "https://www.tweed.nsw.gov.au/council/contact-us",
    "postcode": "2484",
    "lat": -28.3278,
    "lon": 153.3945
  },
  {
    "name": "Tweed Heads Civic and Cultural Centre",
    "address": "Cnr Brett Street and Wharf Street\nTweed Heads NSW 2485",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 4:00 PM",
      "Tuesday": "9:00 AM - 4:00 PM",
      "Wednesday": "9:00 AM - 4:00 PM",
      "Thursday": "9:00 AM - 4:00 PM",
      "Friday": "9:00 AM - 4:00 PM"
    },
    "council": "Tweed Shire Council",
    "source_url": "https://www.tweed.nsw.gov.au/council/contact-us",
    "postcode": "2485",
    "lat": -28.1823,
    "lon": 153.5425
  },
  {
    "name": "Maitland City Council Administration Centre",
    "address": "285-287 High Street\nMaitland NSW 2320",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:00 PM",
      "Tuesday": "8:30 AM - 5:00 PM",
      "Wednesday": "8:30 AM - 5:00 PM",
      "Thursday": "8:30 AM - 5:00 PM",
      "Friday": "8:30 AM - 5:00 PM"
    },
    "council": "Maitland City Council",
    "source_url": "https://www.maitland.nsw.gov.au/my-council/contact-us",
    "postcode": "2320",
    "lat": -32.7316,
    "lon": 151.5550
  },
  {
    "name": "Wollongong City Council",
    "address": "Wollongong City Council\n41 Burelli Street\nWollongong NSW 2500",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 5:00 PM",
      "Tuesday": "9:00 AM - 5:00 PM",
      "Wednesday": "9:00 AM - 5:00 PM",
      "Thursday": "9:00 AM - 5:00 PM",
      "Friday": "9:00 AM - 5:00 PM"
    },
    "council": "Wollongong City Council",
    "source_url": "https://www.wollongong.nsw.gov.au/your-council/justice-of-the-peace",
    "postcode": "2500",
    "lat": -34.4278,
    "lon": 150.8931
  },
  {
    "name": "Wollongong Central Shopping Centre",
    "address": "Wollongong Central Shopping Centre\n200 Crown Street\nWollongong NSW 2500",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "10:00 AM - 2:00 PM",
      "Thursday": "3:00 PM - 6:00 PM",
      "Saturday": "10:00 AM - 1:00 PM"
    },
    "council": "Wollongong City Council",
    "source_url": "https://www.wollongongcentral.com.au/services",
    "postcode": "2500",
    "lat": -34.4252,
    "lon": 150.8936
  },
  {
    "name": "Kiama Municipal Council",
    "address": "Kiama Municipal Council\n11 Manning Street\nKiama NSW 2533",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Kiama Municipal Council",
    "source_url": "https://www.kiama.nsw.gov.au/your-council/contact-us",
    "postcode": "2533",
    "lat": -34.6721,
    "lon": 150.8540
  },
  {
    "name": "Nowra Library",
    "address": "Nowra Library\n10 Berry Street\nNowra NSW 2541",
    "days": "Thursday",
    "hours": {
      "Thursday": "10:00 AM - 11:00 AM"
    },
    "council": "Shoalhaven City Council",
    "source_url": "https://www.shoalhaven.nsw.gov.au/Services/Justice-of-the-Peace",
    "postcode": "2541",
    "lat": -34.8739,
    "lon": 150.6029
  },
  {
    "name": "Armidale Community JP Desk – Community Support Hub 101 Dangar Street Armidale NSW 2350",
    "address": "Armidale Community JP Desk – Community Support Hub\n101 Dangar Street\nArmidale NSW 2350",
    "days": "Wednesday, Friday",
    "hours": {
      "Wednesday": "10:00 AM - 12:00 PM",
      "Friday": "10:00 AM - 12:00 PM"
    },
    "council": "Armidale Regional Council",
    "source_url": "https://communitysupporthub.org.au/",
    "postcode": "2350",
    "lat": -30.5143,
    "lon": 151.6680
  },
  {
    "name": "UNE Armidale Campus – JP Access via Student Services Dixon Library Armidale NSW 2351",
    "address": "University of New England\nStudent Services – Dixon Library\nElm Avenue\nArmidale NSW 2351",
    "days": "By appointment (business days)",
    "hours": {
      "Monday": "By appointment",
      "Tuesday": "By appointment",
      "Wednesday": "By appointment",
      "Thursday": "By appointment",
      "Friday": "By appointment"
    },
    "council": "Armidale Regional Council",
    "source_url": "https://askune.custhelp.com/app/answers/detail/a_id/991/~/finding-a-justice-of-the-peace",
    "postcode": "2351",
    "lat": -30.4909,
    "lon": 151.6430
  },
  {
    "name": "Shoalhaven City Council Administrative Centre",
    "address": "Shoalhaven City Council Administrative Centre\nBridge Road\nNowra NSW 2541",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 4:00 PM",
      "Tuesday": "9:00 AM - 4:00 PM",
      "Wednesday": "9:00 AM - 4:00 PM",
      "Thursday": "9:00 AM - 4:00 PM",
      "Friday": "9:00 AM - 4:00 PM"
    },
    "council": "Shoalhaven City Council",
    "source_url": "https://www.shoalhaven.nsw.gov.au/Services/Justice-of-the-Peace",
    "postcode": "2541",
    "lat": -34.8728,
    "lon": 150.6021
  },
  {
    "name": "Coffs Harbour City Council",
    "address": "Coffs Harbour City Council\n2 Castle Street\nCoffs Harbour NSW 2450",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Coffs Harbour City Council",
    "source_url": "https://www.coffsharbour.nsw.gov.au/Community-and-recreation/Justice-of-the-Peace",
    "postcode": "2450",
    "lat": -30.2962,
    "lon": 153.1187
  },
  {
    "name": "Coffs Central Shopping Centre",
    "address": "Coffs Central Shopping Centre\n35-61 Harbour Drive\nCoffs Harbour NSW 2450",
    "days": "Monday, Wednesday, Friday",
    "hours": {
      "Monday": "11:00 AM - 2:00 PM",
      "Wednesday": "2:00 PM - 5:00 PM",
      "Friday": "10:00 AM - 1:00 PM"
    },
    "council": "Coffs Harbour City Council",
    "source_url": "https://www.coffscentral.com.au/services",
    "postcode": "2450",
    "lat": -30.2973,
    "lon": 153.1193
  },
  {
    "name": "Albury City Council",
    "address": "Albury City Council\n553 Kiewa Street\nAlbury NSW 2640",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:00 PM",
      "Tuesday": "8:30 AM - 5:00 PM",
      "Wednesday": "8:30 AM - 5:00 PM",
      "Thursday": "8:30 AM - 5:00 PM",
      "Friday": "8:30 AM - 5:00 PM"
    },
    "council": "Albury City Council",
    "source_url": "https://www.alburycity.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2640",
    "lat": -36.0737,
    "lon": 146.9135
  },
  {
    "name": "Wagga Wagga City Council",
    "address": "Wagga Wagga City Council\n243 Baylis Street\nWagga Wagga NSW 2650",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:00 PM",
      "Tuesday": "8:30 AM - 5:00 PM",
      "Wednesday": "8:30 AM - 5:00 PM",
      "Thursday": "8:30 AM - 5:00 PM",
      "Friday": "8:30 AM - 5:00 PM"
    },
    "council": "Wagga Wagga City Council",
    "source_url": "https://www.wagga.nsw.gov.au/city-of-wagga-wagga/community/justice-of-the-peace",
    "postcode": "2650",
    "lat": -35.1082,
    "lon": 147.3699
  },
  {
    "name": "Tamworth Regional Council",
    "address": "Tamworth Regional Council\n437 Peel Street\nTamworth NSW 2340",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "9:00 AM - 4:30 PM",
      "Tuesday": "9:00 AM - 4:30 PM",
      "Wednesday": "9:00 AM - 4:30 PM",
      "Thursday": "9:00 AM - 4:30 PM",
      "Friday": "9:00 AM - 4:30 PM"
    },
    "council": "Tamworth Regional Council",
    "source_url": "https://www.tamworth.nsw.gov.au/about-council/justice-of-the-peace",
    "postcode": "2340",
    "lat": -31.0929,
    "lon": 150.9314
  },
  {
    "name": "Broken Hill City Council",
    "address": "Broken Hill City Council\n240 Blende Street\nBroken Hill NSW 2880",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 5:00 PM",
      "Tuesday": "8:30 AM - 5:00 PM",
      "Wednesday": "8:30 AM - 5:00 PM",
      "Thursday": "8:30 AM - 5:00 PM",
      "Friday": "8:30 AM - 5:00 PM"
    },
    "council": "Broken Hill City Council",
    "source_url": "https://www.brokenhill.nsw.gov.au/Community/Justice-of-the-Peace",
    "postcode": "2880",
    "lat": -31.9567,
    "lon": 141.4675
  },
  {
    "name": "Griffith City Council",
    "address": "Griffith City Council\n1 Benerembah Street\nGriffith NSW 2680",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:15 AM - 4:30 PM",
      "Tuesday": "8:15 AM - 4:30 PM",
      "Wednesday": "8:15 AM - 4:30 PM",
      "Thursday": "8:15 AM - 4:30 PM",
      "Friday": "8:15 AM - 4:30 PM"
    },
    "council": "Griffith City Council",
    "source_url": "https://www.griffith.nsw.gov.au/cp_themes/default/home.asp",
    "postcode": "2680",
    "lat": -34.2897,
    "lon": 146.0451
  },
  {
    "name": "Bathurst Regional Council",
    "address": "Bathurst Regional Council\n158 Russell Street\nBathurst NSW 2795",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Bathurst Regional Council",
    "source_url": "https://www.bathurst.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2795",
    "lat": -33.4193,
    "lon": 149.5775
  },
  {
    "name": "Lismore City Council",
    "address": "Lismore City Council\n43 Oliver Avenue\nGoonellabah NSW 2480",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Lismore City Council",
    "source_url": "https://lismore.nsw.gov.au/community-support-services",
    "postcode": "2480",
    "lat": -28.8167,
    "lon": 153.2833
  },
  {
    "name": "Port Macquarie Library",
    "address": "Port Macquarie Library\n32 Grant Street\nPort Macquarie NSW 2444",
    "days": "Monday, Wednesday, Friday",
    "hours": {
      "Monday": "10:00 AM - 12:00 PM",
      "Wednesday": "2:00 PM - 4:00 PM",
      "Friday": "10:00 AM - 12:00 PM"
    },
    "council": "Port Macquarie-Hastings Council",
    "source_url": "https://mnclibrary.org.au/port-macquarie",
    "postcode": "2444",
    "lat": -31.4333,
    "lon": 152.9167
  },
  {
    "name": "Forster Library",
    "address": "Forster Library\n4-12 Breese Parade\nForster NSW 2428",
    "days": "Varies - call ahead",
    "hours": {
      "Every day": "No set days or times - call (02) 7955 7001 and staff will advise when a JP is available"
    },
    "council": "MidCoast Council",
    "source_url": "https://www.midcoast.nsw.gov.au/",
    "postcode": "2428",
    "lat": -32.1808,
    "lon": 152.5124
  },
  {
    "name": "Taree Library",
    "address": "Taree Library\n242 Victoria Street\nTaree NSW 2430",
    "days": "Varies - call ahead",
    "hours": {
      "Every day": "No set days or times - call (02) 7955 7001 and staff will advise when a JP is available"
    },
    "council": "MidCoast Council",
    "source_url": "https://www.midcoast.nsw.gov.au/",
    "postcode": "2430",
    "lat": -31.9097,
    "lon": 152.4597
  },
  {
    "name": "Goulburn Mulwaree Council",
    "address": "Goulburn Mulwaree Council\n184-194 Bourke Street\nGoulburn NSW 2580",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "8:30 AM - 4:30 PM",
      "Tuesday": "8:30 AM - 4:30 PM",
      "Wednesday": "8:30 AM - 4:30 PM",
      "Thursday": "8:30 AM - 4:30 PM",
      "Friday": "8:30 AM - 4:30 PM"
    },
    "council": "Goulburn Mulwaree Council",
    "source_url": "https://www.goulburn.nsw.gov.au/Council/Contact-Us",
    "postcode": "2580",
    "lat": -34.7545,
    "lon": 149.7186
  },
  {
    "name": "Edmondson Park Shopping Centre",
    "address": "Edmondson Park Shopping Centre\nCustomer Service Desk\n2 Soldiers Parade\nEdmondson Park NSW 2174",
    "days": "Tuesday, Thursday, Saturday",
    "hours": {
      "Tuesday": "11:00 AM - 2:00 PM",
      "Thursday": "3:00 PM - 6:00 PM",
      "Saturday": "10:00 AM - 1:00 PM"
    },
    "council": "Liverpool City Council",
    "source_url": "https://www.liverpool.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2174",
    "lat": -33.9594,
    "lon": 150.8556
  },
  {
    "name": "Ashfield Library",
    "address": "Ashfield Library\n260 Liverpool Road\nAshfield NSW 2131",
    "days": "Friday",
    "hours": {
      "Friday": "10:00 AM - 12:00 PM (call 9392 5588 to book)"
    },
    "council": "Inner West Council",
    "source_url": "https://www.innerwest.nsw.gov.au/live/community-well-being/justice-of-the-peace",
    "postcode": "2131",
    "lat": -33.8893,
    "lon": 151.1246
  },
  {
    "name": "Stanmore Library",
    "address": "Stanmore Library\nDouglas Street\nStanmore NSW 2048",
    "days": "Monday",
    "hours": {
      "Monday": "10:00 AM - 12:00 PM (call 9392 5588 to book)"
    },
    "council": "Inner West Council",
    "source_url": "https://www.innerwest.nsw.gov.au/about/get-in-touch/jp-services",
    "postcode": "2048",
    "lat": -33.8921,
    "lon": 151.1593
  },
  {
    "name": "Leichhardt Library",
    "address": "Leichhardt Library\nThe Italian Forum\n23 Norton Street\nLeichhardt NSW 2040",
    "days": "Thursday",
    "hours": {
      "Thursday": "3:00 PM - 4:00 PM (call 9392 5588 to book)"
    },
    "council": "Inner West Council",
    "source_url": "https://www.innerwest.nsw.gov.au/about/get-in-touch/jp-services",
    "postcode": "2040",
    "lat": -33.8836,
    "lon": 151.1552
  },
  {
    "name": "Epping Library",
    "address": "Epping Library\nChambers Court\n1 Chambers Court\nEpping NSW 2121",
    "council": "City of Parramatta",
    "source_url": "https://www.cityofparramatta.nsw.gov.au/living/libraries/library-locations/epping-library",
    "postcode": "2121",
    "notes": "JPs on rotating roster every week, contact (02)9806 5843 to check hours and make a booking!",
    "lat": -33.7728,
    "lon": 151.0824
  },
  {
    "name": "West Epping Community Centre",
    "address": "West Epping Community Centre\n3-5 Ward Street\nEpping NSW 2121",
    "days": "Tuesday, Friday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Friday": "2:00 PM - 4:00 PM"
    },
    "council": "City of Parramatta",
    "source_url": "https://www.cityofparramatta.nsw.gov.au/community/community-venues/west-epping-community-centre",
    "postcode": "2121",
    "lat": -33.7725,
    "lon": 151.0733
  },
  {
    "name": "Carlingford Library",
    "address": "Carlingford Library\nLloyds Avenue\nCarlingford NSW 2118",
    "days": "Monday",
    "hours": {
      "Monday": "1:00 PM - 2:30 PM"
    },
    "council": "City of Parramatta",
    "source_url": "https://www.cityofparramatta.nsw.gov.au/living/libraries/library-locations/carlingford-library",
    "postcode": "2118",
    "lat": -33.7816,
    "lon": 151.0454
  },
  {
    "name": "Kellyville Community Centre",
    "address": "Kellyville Community Centre\n45 Windsor Road\nKellyville NSW 2155",
    "days": "Tuesday, Thursday",
    "hours": {
      "Tuesday": "10:00 AM - 12:00 PM",
      "Thursday": "2:00 PM - 4:00 PM"
    },
    "council": "The Hills Shire Council",
    "source_url": "https://www.thehills.nsw.gov.au/Services/Justice-of-the-Peace",
    "postcode": "2155",
    "lat": -33.7156,
    "lon": 150.9594
  },
  {
    "name": "North Rocks Shopping Centre",
    "address": "North Rocks Shopping Centre\nInformation Desk\n328-336 North Rocks Road\nNorth Rocks NSW 2151",
    "days": "Saturday",
    "hours": {
      "Saturday": "10:00 AM - 12:00 PM (In front of Alexander Jewellers & Watchmaker North Rocks)"
    },
    "council": "City of Parramatta",
    "source_url": "https://www.cityofparramatta.nsw.gov.au/community/justice-of-the-peace",
    "postcode": "2151",
    "lat": -33.7742,
    "lon": 151.0247
  },
  {
    "name": "Downing Centre JP Desk",
    "address": "Downing Centre\n143-147 Liverpool Street\nSydney NSW 2000",
    "days": "Monday to Friday",
    "hours": {
      "Monday": "11:30 AM - 2:00 PM",
      "Tuesday": "11:30 AM - 2:00 PM",
      "Wednesday": "11:30 AM - 2:00 PM",
      "Thursday": "11:30 AM - 2:00 PM",
      "Friday": "11:30 AM - 2:00 PM"
    },
    "council": "City of Sydney",
    "source_url": "https://www.cityofsydney.nsw.gov.au/library-information-services/find-a-jp",
    "postcode": "2000",
    "lat": -33.8770098,
    "lon": 151.2090863,
    "notes": "NSW Justices Association community desk - call 1300 679 272 to confirm the desk is open, as days may change."
  },
  {
    "name": "International Towers Barangaroo",
    "address": "International Towers\nLobby of Tower 3\n300 Barangaroo Avenue\nBarangaroo NSW 2000",
    "days": "Tuesday, Thursday, Contact Eddie Fazal JP on 0409 668 270",
    "hours": {
      "Tuesday": "12:00 PM - 1:30 PM",
      "Thursday": "12:00 PM - 1:30 PM"
    },
    "council": "City of Sydney",
    "source_url": "https://www.barangaroo.com/the-district/services",
    "postcode": "2000",
    "lat": -33.8633,
    "lon": 151.2012
  },
  {
    "name": "Max Webber Library",
    "address": "Max Webber Library\n1 Flushcombe Road\nBlacktown NSW 2148",
    "days": "Varies - call ahead",
    "hours": {
      "Every day": "JP availability varies - please call Max Webber Library on (02) 9839 6677 to check if a JP is available that day"
    },
    "council": "Blacktown City Council",
    "source_url": "https://www.blacktown.nsw.gov.au/Services/Justice-of-the-peace",
    "postcode": "2148",
    "lat": -33.7706,
    "lon": 150.9072
  },
  {
    "name": "Artarmon Library",
    "address": "Artarmon Library\n139 Artarmon Road\nArtarmon NSW 2064",
    "days": "Thursday",
    "hours": {
      "Thursday": "6:00 PM - 7:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.willoughby.nsw.gov.au/Community/Library/Library-locations/Artarmon-Library",
    "postcode": "2064",
    "lat": -33.8112,
    "lon": 151.1872
  },
  {
    "name": "St Leonards Community Centre",
    "address": "St Leonards Community Centre\n10 Christie Street\nSt Leonards NSW 2065",
    "days": "Monday, Wednesday, Friday",
    "hours": {
      "Monday": "11:00 AM - 1:00 PM",
      "Wednesday": "2:00 PM - 4:00 PM",
      "Friday": "10:00 AM - 12:00 PM"
    },
    "council": "North Sydney Council",
    "source_url": "https://www.northsydney.nsw.gov.au/Community_Services/Justice_of_the_Peace",
    "postcode": "2065",
    "lat": -33.8236,
    "lon": 151.1944
  },
  {
    "name": "Gore Hill Library",
    "address": "Gore Hill Library\nPacific Highway & Ralph Street\nSt Leonards NSW 2065",
    "days": "Thursday, Saturday",
    "hours": {
      "Thursday": "2:00 PM - 4:00 PM",
      "Saturday": "10:00 AM - 12:00 PM"
    },
    "council": "Willoughby City Council",
    "source_url": "https://www.willoughby.nsw.gov.au/Community/Library/Library-locations/Gore-Hill-Library",
    "postcode": "2065",
    "lat": -33.8252,
    "lon": 151.1892
  },
  {
    "name": "HJ Daley Library, Campbelltown",
    "address": "147-157 Queen St, Campbelltown NSW 2560",
    "days": "Monday–Friday",
    "hours": {
      "Monday": "10:00 AM – 01:00 PM",
      "Tuesday": "10:00 AM – 01:00 PM",
      "Wednesday": "10:00 AM – 01:00 PM",
      "Thursday": "10:00 AM – 01:00 PM",
      "Friday": "10:00 AM – 01:00 PM"
    },
    "council": "Campbelltown City Council",
    "source_url": "https://www.campbelltown.nsw.gov.au/Services-and-Facilities/Libraries/Libraries-additional-pages/Justices-Of-The-Peace",
    "postcode": "2560",
    "lat": -34.0702792,
    "lon": 150.8066246
  },
  {
    "name": "Campbelltown Mall (Community JP desk)",
    "address": "Lower Level, Campbelltown Mall, 271 Queen St, Campbelltown NSW 2560",
    "days": "Saturday",
    "hours": {
      "Saturday": "10:00 AM – 12:00 PM"
    },
    "council": "Campbelltown City Council",
    "source_url": "https://www.campbelltownmall.com.au/",
    "postcode": "2560",
    "lat": -34.068807,
    "lon": 150.810799
  },
  {
    "name": "Coutts Lawyers & Conveyancers, Campbelltown",
    "address": "Shop 1, 143 Queen St, Campbelltown NSW 2560",
    "days": "Wednesday",
    "hours": {
      "Wednesday": "2:00 PM – 4:00 PM"
    },
    "council": "Campbelltown City Council",
    "source_url": "https://www.couttslegal.com.au/coutts-locations/campbelltown-lawyers/",
    "postcode": "2560",
    "lat": null,
    "lon": null
  },
  {
    "name": "Bateau Bay Square",
    "address": "Bateau Bay Square\n12 Bay Village Road\nBateau Bay NSW 2261",
    "council": "Central Coast Council",
    "source_url": "https://www.bateaubaysquare.com.au/community-hub/news-and-events/news-details/bateaubaysquare/2023/01/24/justice-of-the-peace",
    "postcode": "2261",
    "days": "Thursday",
    "hours": {
      "Thursday": "9:30 AM - 12:30 PM"
    },
    "notes": "Located next to Mr Minit, opposite Coles. No booking required.",
    "lat": -33.3811,
    "lon": 151.4707
  },
  {
    "name": "Belmont Local Court",
    "address": "Belmont Local Court\n597 Pacific Highway\nBelmont NSW 2280",
    "council": "Lake Macquarie City Council",
    "source_url": "https://dcj.nsw.gov.au/legal-and-justice/legal-assistance-and-representation/justice-of-the-peace/become-a-jp/taking-your-oaths.html",
    "postcode": "2280",
    "days": "By Appointment",
    "hours": {},
    "notes": "JP services available by appointment. Email local-court-belmont@justice.nsw.gov.au to schedule.",
    "lat": -33.0221,
    "lon": 151.6601
  },
  {
    "name": "Tweed City Shopping Centre",
    "address": "Tweed City Shopping Centre\n54 Minjungbal Drive\nTweed Heads South NSW 2486",
    "council": "Tweed Shire Council",
    "source_url": "https://www.tweedcity.com.au/whats-new/editorial/jp-services/",
    "postcode": "2486",
    "days": "Monday, Thursday, Saturday",
    "hours": {
      "Monday": "10:30 AM - 1:30 PM",
      "Thursday": "10:30 AM - 1:30 PM, 5:00 PM - 6:30 PM",
      "Saturday": "9:00 AM - 11:00 AM"
    },
    "notes": "Located behind the Customer Service Desk near Cotton On Kids.",
    "lat": -28.2065,
    "lon": 153.5408
  },
  {
    "name": "Hurstville Library",
    "address": "Hurstville Library\nCnr Queens Road & Dora Street\nHurstville NSW 2220",
    "days": "Tuesday, Wednesday, Friday, Saturday",
    "hours": {
      "Tuesday": "11:00 AM - 1:00 PM",
      "Wednesday": "11:00 AM - 12:00 PM",
      "Friday": "12:30 PM - 1:30 PM",
      "Saturday": "10:00 AM - 11:00 AM"
    },
    "council": "Georges River Council",
    "source_url": "https://georgesriver.spydus.com/cgi-bin/spydus.exe/MSGTRNGEN/OPAC/JPSERVICE",
    "postcode": "2220",
    "lat": -33.9642597,
    "lon": 151.1011728
  },
  {
    "name": "Penshurst Library",
    "address": "Penshurst Library\n630 Forest Road\nPenshurst NSW 2222",
    "days": "Tuesday, Wednesday",
    "hours": {
      "Tuesday": "2:00 PM - 3:00 PM",
      "Wednesday": "1:00 PM - 3:00 PM"
    },
    "council": "Georges River Council",
    "source_url": "https://georgesriver.spydus.com/cgi-bin/spydus.exe/MSGTRNGEN/OPAC/JPSERVICE",
    "postcode": "2222",
    "lat": -33.9607236,
    "lon": 151.0772504
  },
  {
    "name": "Bonnyrigg Library",
    "address": "Bonnyrigg Library\n100 Bonnyrigg Avenue\nBonnyrigg NSW 2177",
    "days": "Monday, Wednesday",
    "hours": {
      "Monday": "4:00 PM - 5:30 PM",
      "Wednesday": "3:00 PM - 5:00 PM"
    },
    "council": "Fairfield City Council",
    "source_url": "https://www.fairfieldcity.nsw.gov.au/Services/Fairfield-City-Open-Libraries/Our-Special-Services",
    "postcode": "2177",
    "lat": -33.8864822,
    "lon": 150.8880186
  },
  {
    "name": "Wetherill Park Library",
    "address": "Wetherill Park Library\nWetherill Park NSW 2164",
    "days": "Tuesday, Friday",
    "hours": {
      "Tuesday": "11:00 AM - 1:00 PM",
      "Friday": "2:00 PM - 4:00 PM"
    },
    "council": "Fairfield City Council",
    "source_url": "https://www.fairfieldcity.nsw.gov.au/Services/Fairfield-City-Open-Libraries/Our-Special-Services",
    "postcode": "2164",
    "lat": -33.8505,
    "lon": 150.9045,
    "notes": "Address and coordinates need verification - hours confirmed by Fairfield City Council."
  },
  {
    "name": "Green Square Library",
    "address": "Green Square Library\n355 Botany Road\nZetland NSW 2017",
    "days": "Thursday, Saturday",
    "hours": {
      "Thursday": "2:00 PM - 5:00 PM",
      "Saturday": "12:00 PM - 3:00 PM"
    },
    "council": "City of Sydney",
    "source_url": "https://www.cityofsydney.nsw.gov.au/library-information-services/find-a-jp",
    "postcode": "2017",
    "lat": -33.9064494,
    "lon": 151.2034077
  }
];

// Export the jpLocations array so main.js can use it
window.jpLocations = jpLocations; 
