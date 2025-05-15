/// Enhanced JP locations data with coordinates
const jpLocations = [
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
        "Monday": "8:30 AM - 4:30 PM",
        "Tuesday": "8:30 AM - 4:30 PM",
        "Wednesday": "8:30 AM - 4:30 PM",
        "Thursday": "8:30 AM - 4:30 PM",
        "Friday": "8:30 AM - 4:30 PM"
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
    },
    {
      "name": "Manly Library",
      "address": "Manly Library\n1 Market Place\nManly NSW 2095",
      "days": "Monday, Wednesday, Saturday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Northern Beaches Council",
      "source_url": "https://www.northernbeaches.nsw.gov.au/services/justice-of-the-peace",
      "postcode": "2095",
      "lat": -33.7971,
      "lon": 151.2857
    },
    {
      "name": "Dee Why Library",
      "address": "Dee Why Library\n725 Pittwater Road\nDee Why NSW 2099",
      "days": "Tuesday, Thursday, Friday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Northern Beaches Council",
      "source_url": "https://www.northernbeaches.nsw.gov.au/services/justice-of-the-peace",
      "postcode": "2099",
      "lat": -33.7516,
      "lon": 151.2867
    },
    {
      "name": "Gordon Library",
      "address": "Gordon Library\n799 Pacific Highway\nGordon NSW 2072",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Ku-ring-gai Council",
      "source_url": "https://www.krg.nsw.gov.au/Community/Justice-of-the-Peace",
      "postcode": "2072",
      "lat": -33.7559,
      "lon": 151.1545
    },
    {
      "name": "Cabramatta Library",
      "address": "Cabramatta Library\n1 Railway Parade\nCabramatta NSW 2166",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 1:00 PM",
        "Thursday": "2:00 PM - 5:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Fairfield City Council",
      "source_url": "https://www.fairfieldcity.nsw.gov.au/Services/Justice-of-the-Peace",
      "postcode": "2166",
      "lat": -33.8945,
      "lon": 150.9385
    },
    {
      "name": "Kogarah Library",
      "address": "Kogarah Library and Service Centre\n2 Belgrave Street\nKogarah NSW 2217",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 1:00 PM",
        "Wednesday": "2:00 PM - 5:00 PM",
        "Friday": "10:00 AM - 1:00 PM"
      },
      "council": "Georges River Council",
      "source_url": "https://www.georgesriver.nsw.gov.au/Community/Justice-of-the-Peace",
      "postcode": "2217",
      "lat": -33.9671,
      "lon": 151.1374
    },
    {
      "name": "St George Bank - Chatswood Branch",
      "address": "St George Bank\n402 Victoria Avenue\nChatswood NSW 2067",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "9:30 AM - 4:00 PM",
        "Tuesday": "9:30 AM - 4:00 PM",
        "Wednesday": "9:30 AM - 4:00 PM",
        "Thursday": "9:30 AM - 4:00 PM",
        "Friday": "9:30 AM - 4:00 PM"
      },
      "council": "Willoughby City Council",
      "source_url": "https://www.stgeorge.com.au/contact-us/locate-us",
      "postcode": "2067",
      "lat": -33.7965,
      "lon": 151.1824
    },
    {
      "name": "Macquarie Centre Customer Service Desk",
      "address": "Macquarie Centre\nLevel 3 (near Event Cinemas)\nHerring Road & Waterloo Road\nMacquarie Park NSW 2113",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "11:00 AM - 2:00 PM",
        "Thursday": "11:00 AM - 2:00 PM",
        "Saturday": "11:00 AM - 2:00 PM"
      },
      "council": "City of Ryde",
      "source_url": "https://www.macquariecentre.com.au/services",
      "postcode": "2113",
      "lat": -33.7766,
      "lon": 151.1235
    },
    {
      "name": "Eastgardens Library",
      "address": "Eastgardens Library\nWestfield Eastgardens, Level 1\n152 Bunnerong Road\nEastgardens NSW 2036",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
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
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Bayside Council",
      "source_url": "https://www.bayside.nsw.gov.au/services/justice-peace",
      "postcode": "2216",
      "lat": -33.9517,
      "lon": 151.1397
    },
    {
      "name": "Warringah Mall Library",
      "address": "Warringah Mall Library\nShop 650, Level 2, Westfield Warringah Mall\n145 Old Pittwater Road\nBrookvale NSW 2100",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 1:00 PM",
        "Wednesday": "2:00 PM - 5:00 PM",
        "Friday": "10:00 AM - 1:00 PM"
      },
      "council": "Northern Beaches Council",
      "source_url": "https://www.northernbeaches.nsw.gov.au/services/justice-of-the-peace",
      "postcode": "2100",
      "lat": -33.7671,
      "lon": 151.2712
    },
    {
      "name": "Fairfield Library",
      "address": "Fairfield Library\n1/1B Barbara Street\nFairfield NSW 2165",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Fairfield City Council",
      "source_url": "https://www.fairfieldcity.nsw.gov.au/Services/Justice-of-the-Peace",
      "postcode": "2165",
      "lat": -33.8726,
      "lon": 150.9571
    },
    {
      "name": "Bankstown Library and Knowledge Centre",
      "address": "Bankstown Library and Knowledge Centre\n80 Rickard Road\nBankstown NSW 2200",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "10:00 AM - 4:00 PM",
        "Tuesday": "10:00 AM - 4:00 PM",
        "Wednesday": "10:00 AM - 4:00 PM",
        "Thursday": "10:00 AM - 4:00 PM",
        "Friday": "10:00 AM - 4:00 PM"
      },
      "council": "Canterbury-Bankstown Council",
      "source_url": "https://www.cbcity.nsw.gov.au/community/community-services/justice-of-the-peace",
      "postcode": "2200",
      "lat": -33.9171,
      "lon": 151.0341
    },
    {
      "name": "Lane Cove Library",
      "address": "Lane Cove Library\nLibrary Walk, 139a Longueville Road\nLane Cove NSW 2066",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Lane Cove Council",
      "source_url": "https://www.lanecove.nsw.gov.au/Community/Pages/JusticeOfThePeace.aspx",
      "postcode": "2066",
      "lat": -33.8156,
      "lon": 151.1697
    },
    {
      "name": "Carlingford Court Shopping Centre",
      "address": "Carlingford Court Shopping Centre\nCustomer Service Desk\n220 Carlingford Road\nCarlingford NSW 2118",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 1:00 PM",
        "Thursday": "2:00 PM - 5:00 PM",
        "Saturday": "10:00 AM - 1:00 PM"
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
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
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
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
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
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 1:00 PM",
        "Wednesday": "2:00 PM - 5:00 PM",
        "Friday": "10:00 AM - 1:00 PM"
      },
      "council": "Northern Beaches Council",
      "source_url": "https://www.northernbeaches.nsw.gov.au/services/justice-of-the-peace",
      "postcode": "2103",
      "lat": -33.6766,
      "lon": 151.3052
    },
    {
      "name": "Revesby Library",
      "address": "Revesby Library\n26 Revesby Place\nRevesby NSW 2212",
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM"
      },
      "council": "Canterbury-Bankstown Council",
      "source_url": "https://www.cbcity.nsw.gov.au/community/community-services/justice-of-the-peace",
      "postcode": "2212",
      "lat": -33.9494,
      "lon": 151.0175
    },
    {
      "name": "Campsie Library and Knowledge Centre",
      "address": "Campsie Library and Knowledge Centre\n14-28 Amy Street\nCampsie NSW 2194",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "10:00 AM - 4:00 PM",
        "Tuesday": "10:00 AM - 4:00 PM",
        "Wednesday": "10:00 AM - 4:00 PM",
        "Thursday": "10:00 AM - 4:00 PM",
        "Friday": "10:00 AM - 4:00 PM"
      },
      "council": "Canterbury-Bankstown Council",
      "source_url": "https://www.cbcity.nsw.gov.au/community/community-services/justice-of-the-peace",
      "postcode": "2194",
      "lat": -33.9115,
      "lon": 151.1036
    },
    {
      "name": "St Ives Library",
      "address": "St Ives Library\nSt Ives Village Shopping Centre\n166 Mona Vale Road\nSt Ives NSW 2075",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Ku-ring-gai Council",
      "source_url": "https://www.krg.nsw.gov.au/Community/Justice-of-the-Peace",
      "postcode": "2075",
      "lat": -33.7444,
      "lon": 151.1681
    },
    {
        "name": "Newcastle City Council Administration Centre",
        "address": "12 Stewart Avenue\nNewcastle West NSW 2302",
        "days": "Monday to Friday",
        "hours": {
        "Monday": "8:30 AM - 5:00 PM",
        "Tuesday": "8:30 AM - 5:00 PM",
        "Wednesday": "8:30 AM - 5:00 PM",
        "Thursday": "8:30 AM - 5:00 PM",
        "Friday": "8:30 AM - 5:00 PM"
        },
        "council": "Newcastle City Council",
        "source_url": "https://www.newcastle.nsw.gov.au/council/customer-service/justice-of-the-peace",
        "postcode": "2302",
        "lat": -32.9267,
        "lon": 151.7644
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
        "name": "Port Macquarie-Hastings Council Customer Service Centre",
        "address": "17 Burrawan Street\nPort Macquarie NSW 2444",
        "days": "Monday to Friday",
        "hours": {
        "Monday": "8:30 AM - 4:30 PM",
        "Tuesday": "8:30 AM - 4:30 PM",
        "Wednesday": "8:30 AM - 4:30 PM",
        "Thursday": "8:30 AM - 4:30 PM",
        "Friday": "8:30 AM - 4:30 PM"
        },
        "council": "Port Macquarie-Hastings Council",
        "source_url": "https://www.pmhc.nsw.gov.au/Council/About-Us/Customer-Service",
        "postcode": "2444",
        "lat": -31.4312,
        "lon": 152.9089
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
        "name": "Byron Shire Council Administration Office",
        "address": "70-90 Station Street\nMullumbimby NSW 2482",
        "days": "Monday to Friday",
        "hours": {
        "Monday": "8:30 AM - 4:30 PM",
        "Tuesday": "8:30 AM - 4:30 PM",
        "Wednesday": "8:30 AM - 4:30 PM",
        "Thursday": "8:30 AM - 4:30 PM",
        "Friday": "8:30 AM - 4:30 PM"
        },
        "council": "Byron Shire Council",
        "source_url": "https://www.byron.nsw.gov.au/Council/Contact-Council",
        "postcode": "2482",
        "lat": -28.5772,
        "lon": 153.4989
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
        "name": "Lake Macquarie City Council Administration Centre",
        "address": "126-138 Main Road\nSpeers Point NSW 2284",
        "days": "Monday to Friday",
        "hours": {
        "Monday": "8:30 AM - 5:00 PM",
        "Tuesday": "8:30 AM - 5:00 PM",
        "Wednesday": "8:30 AM - 5:00 PM",
        "Thursday": "8:30 AM - 5:00 PM",
        "Friday": "8:30 AM - 5:00 PM"
        },
        "council": "Lake Macquarie City Council",
        "source_url": "https://www.lakemac.com.au/For-residents/About-our-city/Justice-of-the-Peace",
        "postcode": "2284",
        "lat": -32.9497,
        "lon": 151.6226
    },
    {
      "name": "Marsden Park Shopping Centre",
      "address": "Marsden Park Shopping Centre\n169 Hollinsworth Road\nMarsden Park NSW 2765",
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "10:00 AM - 1:00 PM",
        "Thursday": "2:00 PM - 5:00 PM"
      },
      "council": "Blacktown City Council",
      "source_url": "https://www.blacktown.nsw.gov.au/Services/Justice-of-the-peace",
      "postcode": "2765",
      "lat": -33.7227,
      "lon": 150.8367
    },
    {
      "name": "Schofields Community Centre",
      "address": "Schofields Community Centre\n65 Railway Terrace\nSchofields NSW 2762",
      "days": "Monday, Wednesday",
      "hours": {
        "Monday": "9:30 AM - 12:30 PM",
        "Wednesday": "1:30 PM - 4:30 PM"
      },
      "council": "Blacktown City Council",
      "source_url": "https://www.blacktown.nsw.gov.au/Services/Justice-of-the-peace",
      "postcode": "2762",
      "lat": -33.7094,
      "lon": 150.8728
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
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Shoalhaven City Council",
      "source_url": "https://www.shoalhaven.nsw.gov.au/Services/Justice-of-the-Peace",
      "postcode": "2541",
      "lat": -34.8739,
      "lon": 150.6029
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
      "name": "Jervis Bay Maritime Museum",
      "address": "Jervis Bay Maritime Museum\n1 Woollamia Road\nHuskisson NSW 2540",
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "10:00 AM - 1:00 PM",
        "Thursday": "1:00 PM - 4:00 PM"
      },
      "council": "Shoalhaven City Council",
      "source_url": "https://www.shoalhaven.nsw.gov.au/Services/Justice-of-the-Peace",
      "postcode": "2540",
      "lat": -35.0405,
      "lon": 150.6724
    },
    {
      "name": "Batemans Bay Library",
      "address": "Batemans Bay Library\n1 Hanging Rock Place\nBatemans Bay NSW 2536",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Eurobodalla Shire Council",
      "source_url": "https://www.esc.nsw.gov.au/community/justice-of-the-peace",
      "postcode": "2536",
      "lat": -35.7082,
      "lon": 150.1744
    },
    {
      "name": "Byron Bay Library",
      "address": "Byron Bay Library\nCorner of Lawson and Middleton Streets\nByron Bay NSW 2481",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Byron Shire Council",
      "source_url": "https://www.byron.nsw.gov.au/Services/Libraries",
      "postcode": "2481",
      "lat": -28.6474,
      "lon": 153.6123
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
      "name": "Armidale Regional Council",
      "address": "Armidale Regional Council\n135 Rusden Street\nArmidale NSW 2350",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "8:30 AM - 4:30 PM",
        "Tuesday": "8:30 AM - 4:30 PM",
        "Wednesday": "8:30 AM - 4:30 PM",
        "Thursday": "8:30 AM - 4:30 PM",
        "Friday": "8:30 AM - 4:30 PM"
      },
      "council": "Armidale Regional Council",
      "source_url": "https://www.armidaleregional.nsw.gov.au/community/justice-of-the-peace",
      "postcode": "2350",
      "lat": -30.5150,
      "lon": 151.6678
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
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM"
      },
      "council": "MidCoast Council",
      "source_url": "https://www.midcoast.nsw.gov.au/Community/Justice-of-the-Peace",
      "postcode": "2428",
      "lat": -32.1808,
      "lon": 152.5124
    },
    {
      "name": "Taree Library",
      "address": "Taree Library\n242 Victoria Street\nTaree NSW 2430",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "MidCoast Council",
      "source_url": "https://www.midcoast.nsw.gov.au/Community/Justice-of-the-Peace",
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
      "name": "Leppington Library",
      "address": "Leppington Library\n7 Madison Circuit\nLeppington NSW 2179",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Camden Council",
      "source_url": "https://www.camden.nsw.gov.au/community/justice-of-the-peace",
      "postcode": "2179",
      "lat": -33.9647,
      "lon": 150.8286
    },
    {
      "name": "Oran Park Library",
      "address": "Oran Park Library\n72 Central Avenue\nOran Park NSW 2570",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Camden Council",
      "source_url": "https://www.camden.nsw.gov.au/community/justice-of-the-peace",
      "postcode": "2570",
      "lat": -34.0023,
      "lon": 150.7419
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
      "name": "Narellan Library",
      "address": "Narellan Library\nCamden Council\nQueen Street\nNarellan NSW 2567",
      "days": "Monday, Wednesday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM"
      },
      "council": "Camden Council",
      "source_url": "https://www.camden.nsw.gov.au/community/justice-of-the-peace",
      "postcode": "2567",
      "lat": -34.0428,
      "lon": 150.7364
    },
    {
      "name": "Ashfield Library",
      "address": "Ashfield Library\n260 Liverpool Road\nAshfield NSW 2131",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Inner West Council",
      "source_url": "https://www.innerwest.nsw.gov.au/live/community-well-being/justice-of-the-peace",
      "postcode": "2131",
      "lat": -33.8893,
      "lon": 151.1246
    },
    {
      "name": "Haberfield Library",
      "address": "Haberfield Library\n78 Dalhousie Street\nHaberfield NSW 2045",
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM"
      },
      "council": "Inner West Council",
      "source_url": "https://www.innerwest.nsw.gov.au/live/community-well-being/justice-of-the-peace",
      "postcode": "2045",
      "lat": -33.8827,
      "lon": 151.1419
    },
    {
      "name": "Petersham Service Centre",
      "address": "Petersham Service Centre\n2-14 Fisher Street\nPetersham NSW 2049",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "9:00 AM - 4:00 PM",
        "Tuesday": "9:00 AM - 4:00 PM",
        "Wednesday": "9:00 AM - 4:00 PM",
        "Thursday": "9:00 AM - 4:00 PM",
        "Friday": "9:00 AM - 4:00 PM"
      },
      "council": "Inner West Council",
      "source_url": "https://www.innerwest.nsw.gov.au/live/community-well-being/justice-of-the-peace",
      "postcode": "2049",
      "lat": -33.8964,
      "lon": 151.1546
    },
    {
      "name": "Summer Hill Library",
      "address": "Summer Hill Library\n131 Smith Street\nSummer Hill NSW 2130",
      "days": "Monday, Wednesday",
      "hours": {
        "Monday": "2:00 PM - 4:00 PM",
        "Wednesday": "10:00 AM - 12:00 PM"
      },
      "council": "Inner West Council",
      "source_url": "https://www.innerwest.nsw.gov.au/live/community-well-being/justice-of-the-peace",
      "postcode": "2130",
      "lat": -33.8933,
      "lon": 151.1383
    },
    {
      "name": "Balmain Library",
      "address": "Balmain Library\n370 Darling Street\nBalmain NSW 2041",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Inner West Council",
      "source_url": "https://www.innerwest.nsw.gov.au/live/community-well-being/justice-of-the-peace",
      "postcode": "2041",
      "lat": -33.8586,
      "lon": 151.1792
    },
    {
      "name": "Gregory Hills Shopping Centre",
      "address": "Gregory Hills Shopping Centre\nCustomer Service Desk\n100 Waterfront Crescent\nGregory Hills NSW 2557",
      "days": "Wednesday, Friday",
      "hours": {
        "Wednesday": "10:00 AM - 2:00 PM",
        "Friday": "11:00 AM - 3:00 PM"
      },
      "council": "Camden Council",
      "source_url": "https://www.camden.nsw.gov.au/community/justice-of-the-peace",
      "postcode": "2557",
      "lat": -34.0283,
      "lon": 150.7736
    },
    {
      "name": "Epping Library",
      "address": "Epping Library\nChambers Court\n1 Chambers Court\nEpping NSW 2121",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "City of Parramatta",
      "source_url": "https://www.cityofparramatta.nsw.gov.au/living/libraries/library-locations/epping-library",
      "postcode": "2121",
      "lat": -33.7728,
      "lon": 151.0824
    },
    {
      "name": "Carlingford Court Shopping Centre",
      "address": "Carlingford Court Shopping Centre\nCustomer Service Desk\n220 Carlingford Road\nCarlingford NSW 2118",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 1:00 PM",
        "Thursday": "2:00 PM - 5:00 PM",
        "Saturday": "10:00 AM - 1:00 PM"
      },
      "council": "City of Parramatta",
      "source_url": "https://www.carlingfordcourt.com.au/services",
      "postcode": "2118",
      "lat": -33.7827,
      "lon": 151.0463
    },
    {
      "name": "North Epping Community Centre",
      "address": "North Epping Community Centre\n9 Oxley Avenue\nEpping NSW 2121",
      "days": "Monday, Wednesday",
      "hours": {
        "Monday": "2:00 PM - 4:00 PM",
        "Wednesday": "10:00 AM - 12:00 PM"
      },
      "council": "City of Parramatta",
      "source_url": "https://www.cityofparramatta.nsw.gov.au/community/community-venues/north-epping-community-centre",
      "postcode": "2121",
      "lat": -33.7603,
      "lon": 151.0847
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
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "2:00 PM - 4:00 PM",
        "Thursday": "10:00 AM - 12:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "City of Parramatta",
      "source_url": "https://www.cityofparramatta.nsw.gov.au/living/libraries/library-locations/carlingford-library",
      "postcode": "2118",
      "lat": -33.7816,
      "lon": 151.0454
    },
    {
      "name": "Kellyville Village Shopping Centre",
      "address": "Kellyville Village Shopping Centre\nCustomer Service Desk\n90 Wrights Road\nKellyville NSW 2155",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 1:00 PM",
        "Wednesday": "2:00 PM - 5:00 PM",
        "Friday": "10:00 AM - 1:00 PM"
      },
      "council": "The Hills Shire Council",
      "source_url": "https://www.thehills.nsw.gov.au/Services/Justice-of-the-Peace",
      "postcode": "2155",
      "lat": -33.7128,
      "lon": 150.9567
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
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 1:00 PM",
        "Thursday": "2:00 PM - 5:00 PM",
        "Saturday": "10:00 AM - 1:00 PM"
      },
      "council": "City of Parramatta",
      "source_url": "https://www.cityofparramatta.nsw.gov.au/community/justice-of-the-peace",
      "postcode": "2151",
      "lat": -33.7742,
      "lon": 151.0247
    },
    {
      "name": "North Rocks Library",
      "address": "North Rocks Library\nNorth Rocks Shopping Centre\n328-336 North Rocks Road\nNorth Rocks NSW 2151",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "City of Parramatta",
      "source_url": "https://www.cityofparramatta.nsw.gov.au/living/libraries/library-locations/north-rocks-library",
      "postcode": "2151",
      "lat": -33.7742,
      "lon": 151.0247
    },
    {
      "name": "Sydney Town Hall Customer Service Centre",
      "address": "Sydney Town Hall\n483 George Street\nSydney NSW 2000",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "8:00 AM - 6:00 PM",
        "Tuesday": "8:00 AM - 6:00 PM",
        "Wednesday": "8:00 AM - 6:00 PM",
        "Thursday": "8:00 AM - 6:00 PM",
        "Friday": "8:00 AM - 6:00 PM"
      },
      "council": "City of Sydney",
      "source_url": "https://www.cityofsydney.nsw.gov.au/guides/justice-of-the-peace",
      "postcode": "2000",
      "lat": -33.8731,
      "lon": 151.2073
    },
    {
      "name": "Customs House Library",
      "address": "Customs House Library\n31 Alfred Street\nSydney NSW 2000",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "City of Sydney",
      "source_url": "https://www.cityofsydney.nsw.gov.au/guides/justice-of-the-peace",
      "postcode": "2000",
      "lat": -33.8618,
      "lon": 151.2107
    },
    {
      "name": "International Towers Barangaroo",
      "address": "International Towers\nTower One, Level 3\n100 Barangaroo Avenue\nBarangaroo NSW 2000",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "11:00 AM - 2:00 PM",
        "Wednesday": "2:00 PM - 5:00 PM",
        "Friday": "11:00 AM - 2:00 PM"
      },
      "council": "City of Sydney",
      "source_url": "https://www.barangaroo.com/the-district/services",
      "postcode": "2000",
      "lat": -33.8633,
      "lon": 151.2012
    },
    {
      "name": "Pitt Street Service NSW Centre",
      "address": "Service NSW Centre\n20 Pitt Street\nSydney NSW 2000",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "9:00 AM - 5:00 PM",
        "Tuesday": "9:00 AM - 5:00 PM",
        "Wednesday": "9:00 AM - 5:00 PM",
        "Thursday": "9:00 AM - 5:00 PM",
        "Friday": "9:00 AM - 5:00 PM"
      },
      "council": "City of Sydney",
      "source_url": "https://www.service.nsw.gov.au/service-centre/sydney-service-centre",
      "postcode": "2000",
      "lat": -33.8634,
      "lon": 151.2089
    },
    {
      "name": "Haymarket Library",
      "address": "Haymarket Library\n744 George Street\nHaymarket NSW 2000",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "City of Sydney",
      "source_url": "https://www.cityofsydney.nsw.gov.au/guides/justice-of-the-peace",
      "postcode": "2000",
      "lat": -33.8797,
      "lon": 151.2043
    },
    {
      "name": "Queen Victoria Building Service Desk",
      "address": "Queen Victoria Building\nLevel 2 Service Desk\n455 George Street\nSydney NSW 2000",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "11:00 AM - 2:00 PM",
        "Thursday": "3:00 PM - 6:00 PM",
        "Saturday": "11:00 AM - 2:00 PM"
      },
      "council": "City of Sydney",
      "source_url": "https://www.qvb.com.au/services",
      "postcode": "2000",
      "lat": -33.8716,
      "lon": 151.2069
    },
    {
      "name": "The Galeries Customer Service",
      "address": "The Galeries\nLevel 1 Customer Service\n500 George Street\nSydney NSW 2000",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "11:00 AM - 2:00 PM",
        "Wednesday": "2:00 PM - 5:00 PM",
        "Friday": "11:00 AM - 2:00 PM"
      },
      "council": "City of Sydney",
      "source_url": "https://www.thegaleries.com/services",
      "postcode": "2000",
      "lat": -33.8734,
      "lon": 151.2066
    },
    {
      "name": "Glenhaven Community Centre",
      "address": "Glenhaven Community Centre\n76 Glenhaven Road\nGlenhaven NSW 2156",
      "days": "Monday, Wednesday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM"
      },
      "council": "The Hills Shire Council",
      "source_url": "https://www.thehills.nsw.gov.au/Services/Justice-of-the-Peace",
      "postcode": "2156",
      "lat": -33.6947,
      "lon": 151.0033
    },
    {
      "name": "Knightsbridge Shopping Centre",
      "address": "Knightsbridge Shopping Centre\n227 Old Northern Road\nCastle Hill NSW 2154",
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "11:00 AM - 2:00 PM",
        "Thursday": "2:00 PM - 5:00 PM"
      },
      "council": "The Hills Shire Council",
      "source_url": "https://www.thehills.nsw.gov.au/Services/Justice-of-the-Peace",
      "postcode": "2154",
      "lat": -33.7147,
      "lon": 151.0156
    },
    {
      "name": "Blacktown City Council Civic Centre",
      "address": "Blacktown City Council Civic Centre\n62 Flushcombe Road\nBlacktown NSW 2148",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "8:30 AM - 4:30 PM",
        "Tuesday": "8:30 AM - 4:30 PM",
        "Wednesday": "8:30 AM - 4:30 PM",
        "Thursday": "8:30 AM - 4:30 PM",
        "Friday": "8:30 AM - 4:30 PM"
      },
      "council": "Blacktown City Council",
      "source_url": "https://www.blacktown.nsw.gov.au/Services/Justice-of-the-peace",
      "postcode": "2148",
      "lat": -33.7712,
      "lon": 150.9068
    },
    {
      "name": "Westpoint Blacktown Customer Service",
      "address": "Westpoint Blacktown\nLevel 4 Customer Service Desk\n17 Patrick Street\nBlacktown NSW 2148",
      "days": "Monday, Wednesday, Saturday",
      "hours": {
        "Monday": "10:00 AM - 2:00 PM",
        "Wednesday": "3:00 PM - 6:00 PM",
        "Saturday": "10:00 AM - 1:00 PM"
      },
      "council": "Blacktown City Council",
      "source_url": "https://www.westpoint.com.au/services",
      "postcode": "2148",
      "lat": -33.7717,
      "lon": 150.9065
    },
    {
      "name": "Max Webber Library",
      "address": "Max Webber Library\n1 Flushcombe Road\nBlacktown NSW 2148",
      "days": "Tuesday, Thursday, Friday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Friday": "11:00 AM - 1:00 PM"
      },
      "council": "Blacktown City Council",
      "source_url": "https://www.blacktown.nsw.gov.au/Services/Justice-of-the-peace",
      "postcode": "2148",
      "lat": -33.7706,
      "lon": 150.9072
    },
    {
      "name": "Service NSW Blacktown",
      "address": "Service NSW Blacktown\nShop 3004, Level 3, Westpoint Shopping Centre\n17 Patrick Street\nBlacktown NSW 2148",
      "days": "Monday to Friday",
      "hours": {
        "Monday": "9:00 AM - 5:00 PM",
        "Tuesday": "9:00 AM - 5:00 PM",
        "Wednesday": "9:00 AM - 5:00 PM",
        "Thursday": "9:00 AM - 5:00 PM",
        "Friday": "9:00 AM - 5:00 PM"
      },
      "council": "Blacktown City Council",
      "source_url": "https://www.service.nsw.gov.au/service-centre/blacktown-service-centre",
      "postcode": "2148",
      "lat": -33.7717,
      "lon": 150.9065
    },
    {
      "name": "Macquarie University Library",
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
      "name": "Willoughby Library",
      "address": "Willoughby Library\n409 Victoria Avenue\nWilloughby NSW 2068",
      "days": "Monday, Wednesday, Friday",
      "hours": {
        "Monday": "10:00 AM - 12:00 PM",
        "Wednesday": "2:00 PM - 4:00 PM",
        "Friday": "10:00 AM - 12:00 PM"
      },
      "council": "Willoughby City Council",
      "source_url": "https://www.willoughby.nsw.gov.au/Community/Library/Library-locations/Willoughby-Library",
      "postcode": "2068",
      "lat": -33.7989,
      "lon": 151.1912
    },
    {
      "name": "Artarmon Library",
      "address": "Artarmon Library\n139 Artarmon Road\nArtarmon NSW 2064",
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM"
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
      "name": "Greenwich Library",
      "address": "Greenwich Library\n48 Greenwich Road\nGreenwich NSW 2065",
      "days": "Tuesday, Thursday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM"
      },
      "council": "Lane Cove Council",
      "source_url": "https://www.lanecove.nsw.gov.au/Community/Pages/JusticeofthePeace.aspx",
      "postcode": "2065",
      "lat": -33.8308,
      "lon": 151.1842
    },
    {
      "name": "Northbridge Plaza",
      "address": "Northbridge Plaza\nCustomer Service Desk\n79-113 Sailors Bay Road\nNorthbridge NSW 2063",
      "days": "Monday, Wednesday",
      "hours": {
        "Monday": "10:00 AM - 1:00 PM",
        "Wednesday": "2:00 PM - 5:00 PM"
      },
      "council": "Willoughby City Council",
      "source_url": "https://www.willoughby.nsw.gov.au/Community/Justice-of-the-Peace",
      "postcode": "2063",
      "lat": -33.8121,
      "lon": 151.2167
    },
    {
      "name": "Gore Hill Library",
      "address": "Gore Hill Library\nPacific Highway & Ralph Street\nSt Leonards NSW 2065",
      "days": "Tuesday, Thursday, Saturday",
      "hours": {
        "Tuesday": "10:00 AM - 12:00 PM",
        "Thursday": "2:00 PM - 4:00 PM",
        "Saturday": "10:00 AM - 12:00 PM"
      },
      "council": "Willoughby City Council",
      "source_url": "https://www.willoughby.nsw.gov.au/Community/Library/Library-locations/Gore-Hill-Library",
      "postcode": "2065",
      "lat": -33.8252,
      "lon": 151.1892
    }
  ];

// Export the jpLocations array so main.js can use it
window.jpLocations = jpLocations; 