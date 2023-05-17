
mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1b3JhbmxpdSIsImEiOiJjbGQxbDR6M2QyN2s5M3BudnhrZGV0bTRyIn0.dG9Q884uSu_yGHLnc0KLnA'; // Put your Mapbox Public Access token here
  
// Load a new map in the 'map' HTML div
// var map = new mapboxgl.Map({
// container: 'map', // container id
// style: 'mapbox://styles/jiaxuanfan/clhdjukc3015a01qygcofgut3', // map background layer location
//  // starting position [lng, lat]
// zoom: 9, // starting zoom
// center: [-74.0060, 40.7128]
// });

var map = new mapboxgl.Map({
    container: 'map', // The id of the div you want to contain the map
    style: 'mapbox://styles/zhuoranliu/clhoxbtj401v201p69opy47jq', // The style URL for the map you created in Mapbox Studio
    center: [-74.0060, 40.7128], // [longitude, latitude] of the center of the map
    zoom: 9.5 // starting zoom level
});

map.addControl(new mapboxgl.NavigationControl());

// map.on('load', function() {

//Event listener for layer switch
document.getElementById("layer1").addEventListener("click", function(){
    map.setPaintProperty('PPC','fill-opacity',1);
    map.setPaintProperty('WNH_PPC','fill-opacity',0);
    });
    
    document.getElementById("layer2").addEventListener("click", function(){
    map.setPaintProperty('PPC','fill-opacity',0);
    map.setPaintProperty('WNH_PPC','fill-opacity',1);
    });

map.addLayer({
    'id': 'labels',
    'type': 'fill',
    'source': {
    type: 'vector',
    url: 'mapbox://zhuoranliu.1pefjxon' },// Your Mapbox tileset Map ID,
    'source-layer': 'Popchange-c3ut1i', // name of tilesets
    'layout': {},
    });

var legend = document.getElementById('legend');
legend.innerHTML = '';
// legend.innerHTML = '<h3>Displacement Risk Index</h3>';
var disgrades = ['Lowest', 'Lower', 'Intermediate', 'Higher', 'Highest'];
var discolors = ['#B3CDE0', '#6897BB', '#1F78B4', '#053061', '#011627'];   
// loop through our intervals and generate a label with a colored square for each interval
for (var i = 0; i < disgrades.length; i++) {
    legend.innerHTML +=
        '<i style="background:' + discolors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
        disgrades[i] + '<br>';
}
