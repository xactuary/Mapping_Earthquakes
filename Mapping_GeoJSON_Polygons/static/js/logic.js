// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level. center of the Earth
//let map = L.map('mapid').setView([30, 30], 2);

// Create the map object with a center and zoom level.
//let map = L.map("mapid", {
 //// center: [44.0, -80],
  //zoom: 2
//});

//We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add streets tile layer to ma;
//streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  SatelliteStreets: satelliteStreets
};



// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map. Basemaps is the base layer object which allows
// two different map styles to be shown in index.html file.  
L.control.layers(baseMaps).addTo(map);


// Add GeoJSON data.
// Accessing the airport GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/xactuary/Mapping_Earthquakes/Mapping_Multiple_Points/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/xactuary/Mapping_Earthquakes/Mapping_Multiple_Points/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/xactuary/Mapping_Earthquakes/Mapping_Multiple_Points/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
  color: "#a1acff",
  //background-color: "yellow",
  weight: 1
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);


// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: myStyle,
  onEachFeature: function(feature, layer){
    layer.bindPopup("<h3> Neighborhood "  + feature.properties.AREA_NAME + "</h3>"); 
  }
})  
.addTo(map);
});


// Creating a GeoJSON layer with the retrieved data.
//L.geoJson(data,{
//  onEachFeature: function(feature, layer){
//    console.log(layer);

//layer.bindPopup("<h2>"  + features.properties.faa + "</h2> <hr> <h3>Airport code " + features.properties.name + "</h3>");
// }
//}).addTo(map);






//   We turn each feature into a marker on the map.
//  pointToLayer: function(feature, latlng) {
//    console.log(feature);
//   return L.marker(latlng).bindPopup("<h2>" + feature.properties.city + "</h2>");
//  }

//}).addTo(map);


 

//Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);