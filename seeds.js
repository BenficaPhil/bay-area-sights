var mongoose    = require("mongoose"),
    Sight       = require("./models/sight"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "Golden Gate Bridge",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg",
        city: "San Francisco",
        description: "From Wikipedia: The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. The structure links the American city of San Francisco, California – the northern tip of the San Francisco Peninsula – to Marin County, carrying both U.S. Route 101 and California State Route 1 across the strait. The bridge is one of the most internationally recognized symbols of San Francisco, California, and the United States. It has been declared one of the Wonders of the Modern World by the American Society of Civil Engineers. The Frommer's travel guide describes the Golden Gate Bridge as \"possibly the most beautiful, certainly the most photographed, bridge in the world.\" At the time of its opening in 1937, it was both the longest and the tallest suspension bridge in the world, with a main span of 4,200 feet (1,280 m) and a total height of 746 feet (227 m). Today, the Golden Gate Bridge is neither the longest nor the tallest in the world, but remains the tallest bridge in the United States.",
        author: { 
            id: "5a3eb7a88f89a506d98a2edd", 
            username: "admin" 
        }
    },
    {
        name: "Fisherman's Wharf",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/San_Francisco_Fisherman%27s_Wharf_Streetcar_2079152719.jpg",
        city: "San Francisco",
        description: "From Wikipedia: Fisherman's Wharf is a neighborhood and popular tourist attraction in San Francisco, California. It roughly encompasses the northern waterfront area of San Francisco from Ghirardelli Square or Van Ness Avenue east to Pier 35 or Kearny Street. The F Market streetcar runs through the area, the Powell-Hyde cable car lines runs to Aquatic Park, at the edge of Fisherman's Wharf, and the Powell-Mason cable car line runs a few blocks away. San Francisco's Fisherman's Wharf gets its name and neighborhood characteristics from the city's early days of the mid to later 1800s when Italian immigrant fishermen came to the city by the bay to take advantage of the influx of population due to the gold rush. One, Achille Paladini, found success wholesaling local fish as owner of the Paladini Fish Company, and came to be known as the \"Fish King\". Most of the Italian immigrant fishermen settled in the North Beach area close to the wharf and fished for the local delicacies and the now famed Dungeness crab. From then until the present day it remained the home base of San Francisco's fishing fleet. Despite its redevelopment into a tourist attraction during the 1970s and 1980s, the area is still home to many active fishermen and their fleets.",
        author: {
            id: "5a3eb7a88f89a506d98a2edd",
            username: "admin"
        }
    },
    {
        name: "Pier 39",
        image: "https://c1.staticflickr.com/5/4039/4690202925_4a488b787c_b.jpg",
        city: "San Francisco",
        description: "From Wikipedia: Pier 39 is a shopping center and popular tourist attraction built on a pier in San Francisco, California. At Pier 39, there are shops, restaurants, a video arcade, street performances, the Aquarium of the Bay, virtual 3D rides, and views of California sea lions hauled out on docks on Pier 39's marina. A two-story carousel is one of the pier's more dominant features, although it is not directly visible from the street and sits towards the end of the pier. The family-oriented entertainment and presence of marine mammals make this a popular tourist location for families with kids. The pier is located at the edge of the Fisherman's Wharf district and is close to North Beach, Chinatown, and the Embarcadero. The area is easily accessible with the historic F Market streetcars. From the pier one can see Angel Island, Alcatraz Island, the Golden Gate Bridge, and the Bay Bridge. Blue & Gold Fleet's bay cruises leave from Pier 39. Pier 39 was first developed by entrepreneur Warren Simmons and opened October 4, 1978.",
        author: { 
            id: "5a3eb7a88f89a506d98a2edd", 
            username: "admin" 
        }
    },
    {
        name: "North Beach",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/North_Beach%2C_San_Francisco.jpg",
        city: "San Francisco",
        description: "From Wikipedia: North Beach is a neighborhood in the northeast of San Francisco adjacent to Chinatown. The neighborhood is San Francisco's \"Little Italy\", and has historically been home to a large Italian American population. It is still home to many Italian restaurants today, though many other ethnic groups currently live in the neighborhood. It was also the historic center of the beatnik subculture. Today, North Beach is one of San Francisco's main nightlife districts as well as a residential neighborhood populated by a mix of young urban professionals, families and Chinese immigrants part of the adjacent Chinatown. The American Planning Association (APA) has named North Beach as one of ten \"Great Neighborhoods in America.\"",
        author: { 
            id: "5a3eb7a88f89a506d98a2edd", 
            username: "admin" 
        }
    },
    {
        name: "Chinatown",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Gate%2C_Chinatown%2C_San_Francisco%2C_CA%2C_USA.jpg",
        city: "San Francisco",
        description: "From Wikipedia: The Chinatown centered on Grant Avenue and Stockton Street in San Francisco, California, is the oldest Chinatown in North America and the largest Chinese enclave outside Asia. It is the oldest of the four notable Chinatowns in the city. Since its establishment in 1848, it has been highly important and influential in the history and culture of ethnic Chinese immigrants in North America. Chinatown is an enclave that continues to retain its own customs, languages, places of worship, social clubs, and identity. There are two hospitals, numerous parks and squares, a post office, and other infrastructure. While recent immigrants and the elderly choose to live here because of the availability of affordable housing and their familiarity with the culture, the place is also a major tourist attraction, drawing more visitors annually than the Golden Gate Bridge.",
        author: { 
            id: "5a3eb7a88f89a506d98a2edd", 
            username: "admin" 
        }
    },
    {
        name: "Alcatraz Island",
        image: "https://cdn.pixabay.com/photo/2017/07/08/23/20/alcatraz-2485909_960_720.jpg",
        city: "San Francisco",
        description: "From Wikipedia: Alcatraz Island is located in San Francisco Bay, 1.25 miles (2.01 km) offshore from San Francisco, California, United States. The small island was developed with facilities for a lighthouse, a military fortification, a military prison (1868), and a federal prison from 1934 until 1963. Beginning in November 1969, the island was occupied for more than 19 months by a group of Native Americans from San Francisco, who were part of a wave of Native activism across the nation, with public protests through the 1970s. In 1972, Alcatraz became part of a national recreation area and received designation as a National Historic Landmark in 1986. Today, the island's facilities are managed by the National Park Service as part of the Golden Gate National Recreation Area; it is open to tours. Visitors can reach the island in a little under 15 minutes by ferry ride from Pier 33, located between the San Francisco Ferry Building and Fisherman's Wharf, San Francisco. Hornblower Cruises and Events, operating under the name Alcatraz Cruises, is the official ferry provider to and from the island. Alcatraz Island is home to the abandoned prison, the site of the oldest operating lighthouse on the West Coast of the United States, early military fortifications, and natural features such as rock pools and a seabird colony (mostly western gulls, cormorants, and egrets). According to a 1971 documentary on the history of Alcatraz, the island measures 1,675 feet (511 m) by 590 feet (180 m) and is 135 feet (41 m) at highest point during mean tide. However, the total area of the island is reported to be 22 acres (8.9 ha). Landmarks on the island include the Main Cellhouse, Dining Hall, Library, Lighthouse, the ruins of the Warden's House and Officers' Club, Parade Grounds, Building 64, Water Tower, New Industries Building, Model Industries Building, and the Recreation Yard.",
        author: { 
            id: "5a3eb7a88f89a506d98a2edd", 
            username: "admin" 
        }
    }
    ];

function seedDB(){
    //Remove all sights
    Sight.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed all sights");
        // Add a few sights
        data.forEach(function(seed){
            Sight.create(seed, function(err, sight){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a sight");
                    // //Create comment
                    // Comment.create(
                    //     {
                    //         text: "This place is great, but I wish it had internet.",
                    //         author: "Homer"
                    //     }, function(err, comment){
                    //         if(err){
                    //             console.log(err);
                    //         } else {
                    //         sight.comments.push(comment);
                    //         sight.save();
                    //         console.log("Created new comment");
                    //         }
                    //     });
                }
            });
        });
    });
}

module.exports = seedDB;