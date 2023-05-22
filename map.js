
mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1b3JhbmxpdSIsImEiOiJjbGQxbDR6M2QyN2s5M3BudnhrZGV0bTRyIn0.dG9Q884uSu_yGHLnc0KLnA';


const map = new mapboxgl.Map({

    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-74.0060, 40.7128], // Set the initial map center (longitude, latitude)
    zoom: 9.7
});

map.on('load', () => {

    map.addSource('brook', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/zhuoranliu22/Data_Viz_Group/main/Popchange.json'
    });

    map.addLayer({
        id: 'pop',
        type: 'fill',
        source: 'brook',
        layout: {},
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'PopChng'],
                80000, '#B3CDE0',
                100000, ' #6897BB',
                170000, '#1F78B4',
                230000, '#053061',
                250000, '#011627'

                
            ],
            'fill-opacity': 1                   
        }
    });
    map.addLayer({
        id: 'his',
        type: 'fill',
        source: 'brook',
        layout: {},
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'HSp_PpC'],
                0, '#B3CDE0',
                20000, ' #6897BB',
                54000, '#1F78B4',
                65000, '#053061',
                66000, '#011627'
            ],
            'fill-opacity': 0                   
        }
    });
    map.addLayer({
        id: 'whi',
        type: 'fill',
        source: 'brook',
        layout: {},
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'WNH_PpC'],
                -50000, '#B3CDE0',
                -22000, ' #6897BB',
                -20000, '#1F78B4',
                32000, '#053061',
                76000, '#011627'
            ],
            'fill-opacity': 0                   
        }
    });
    map.addLayer({
        id: 'black',
        type: 'fill',
        source: 'brook',
        layout: {},
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'BNH_PpC'],
                -60000, '#B3CDE0',
                -10000, ' #6897BB',
                     0, '#1F78B4',
                2600, '#053061',
                2700, '#011627'
            ],
            'fill-opacity': 0                   
        }
    });
    map.addLayer({
        id: 'asian',
        type: 'fill',
        source: 'brook',
        layout: {},
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'ANH_PpC'],
                20000, '#B3CDE0',
                25000, ' #6897BB',
                43000, '#1F78B4',
                120000, '#053061',
                150000, '#011627'
            ],
            'fill-opacity': 0                   
        }
    });
    map.addLayer({
        'id': 'borough-labels',
        'type': 'symbol',
        'source': 'brook',
        'layout': {
            'text-field': ['get', 'boro_nm'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 14
        },
        'paint': {
            'text-color': '#08214D'
        }
    });
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    // legend.innerHTML = '<h3>Displacement Risk Index</h3>';
    var disgrades = ['80000', '100000', '170000', '230000', '250000'];
    var discolors = ['#B3CDE0', '#6897BB', '#1F78B4', '#053061', '#011627'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < disgrades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + discolors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            disgrades[i] + '<br>';
    }
    


  map.on('mouseenter', 'pop', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  map.on('mouseleave', 'pop', function () {
    map.getCanvas().style.cursor = '';
  });
});

// Initially set the 'fill-opacity' of all but one layer to 0
// map.setPaintProperty('his', 'fill-opacity', 0);
// map.setPaintProperty('whi', 'fill-opacity', 0);
// map.setPaintProperty('black', 'fill-opacity', 0);
// map.setPaintProperty('asian', 'fill-opacity', 0);

// Add event listeners for the radio buttons
document.getElementById('pop').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 1);
    map.setPaintProperty('his', 'fill-opacity', 0);
    map.setPaintProperty('whi', 'fill-opacity', 0);
    map.setPaintProperty('black', 'fill-opacity', 0);
    map.setPaintProperty('asian', 'fill-opacity', 0);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    // legend.innerHTML = '<h3>Displacement Risk Index</h3>';
    var disgrades = ['80000', '100000', '170000', '230000', '250000'];
    var discolors = ['#B3CDE0', '#6897BB', '#1F78B4', '#053061', '#011627'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < disgrades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + discolors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            disgrades[i] + '<br>';
    }
});
document.getElementById('his').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 1);
    map.setPaintProperty('whi', 'fill-opacity', 0);
    map.setPaintProperty('black', 'fill-opacity', 0);
    map.setPaintProperty('asian', 'fill-opacity', 0);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    // legend.innerHTML = '<h3>Displacement Risk Index</h3>';
    var disgrades = ['0', '20000', '54000', '65000', '66000'];
    var discolors = ['#B3CDE0', '#6897BB', '#1F78B4', '#053061', '#011627'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < disgrades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + discolors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            disgrades[i] + '<br>';
    }
});
// ... repeat for all other radio buttons
document.getElementById('whi').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 0);
    map.setPaintProperty('whi', 'fill-opacity', 1);
    map.setPaintProperty('black', 'fill-opacity', 0);
    map.setPaintProperty('asian', 'fill-opacity', 0);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    // legend.innerHTML = '<h3>Displacement Risk Index</h3>';
    var disgrades = ['-50000', '-22000', '-20000', '32000', '76000'];
    var discolors = ['#B3CDE0', '#6897BB', '#1F78B4', '#053061', '#011627'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < disgrades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + discolors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            disgrades[i] + '<br>';
    }
});
document.getElementById('black').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 0);
    map.setPaintProperty('whi', 'fill-opacity', 0);
    map.setPaintProperty('black', 'fill-opacity', 1);
    map.setPaintProperty('asian', 'fill-opacity', 0);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    // legend.innerHTML = '<h3>Displacement Risk Index</h3>';
    var disgrades = ['-60000', '-10000', '0', '2600', '2700'];
    var discolors = ['#B3CDE0', '#6897BB', '#1F78B4', '#053061', '#011627'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < disgrades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + discolors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            disgrades[i] + '<br>';
    }
});
document.getElementById('asian').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 0);
    map.setPaintProperty('whi', 'fill-opacity', 0);
    map.setPaintProperty('black', 'fill-opacity', 0);
    map.setPaintProperty('asian', 'fill-opacity', 1);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    // legend.innerHTML = '<h3>Displacement Risk Index</h3>';
    var disgrades = ['20000', '25000', '43000', '120000', '150000'];
    var discolors = ['#B3CDE0', '#6897BB', '#1F78B4', '#053061', '#011627'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < disgrades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + discolors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            disgrades[i] + '<br>';
    }
});
    
var originalFeatureProperties = document.getElementById("feature-properties").innerHTML;
var orig = document.getElementById("chart").innerHTML;

// add popup 
map.on('click', 'pop', function (e) {
    var coordinates = e.lngLat;
    var properties = e.features[0].properties;
  
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML('<h3>Feature Information</h3>' +
               '<p>Population Change: ' + properties.PopChng + '</p>' +
               '<p>Hispanic Population per Capita: ' + properties.HSp_PpC + '</p>' +
               '<p>White Non-Hispanic Population per Capita: ' + properties.WNH_PpC + '</p>' +
               '<p>Black Non-Hispanic Population per Capita: ' + properties.BNH_PpC + '</p>' +
               '<p>Asian Non-Hispanic Population per Capita: ' + properties.ANH_PpC + '</p>')
      .addTo(map);
  });
  
 
  




// map.on('click', function(e) {

//     var properties = map.queryRenderedFeatures(e.point)[0].properties;
//     var infoPanelContent = '';

//     // Always show the same data
//     infoPanelContent = '<button id="back-button" >&larr;Back</button>';
//     // 
//     //place flourish here
//     if (properties.boro_nm == 'Staten Island') {
//     infoPanelContent += '<h2><div style="display: flex; justify-content: center;"></h2>';
//     infoPanelContent += '<div style="width: 60%;">';
//     infoPanelContent += '<p>textext 小岛</p>';
//     console.log(Object.keys(properties)); }
//     //QN
//     if (properties.boro_nm == 'Queens') {
//     infoPanelContent += '<h2><div style="display: flex; justify-content: center;"></h2>';
//     infoPanelContent += '<div style="width: 60%;">';
//     infoPanelContent += '<p>皇后区</p>';
//     infoPanelContent += '<div class="flourish-embed flourish-chart" data-src="visualisation/13836618"><script src="https://public.flourish.studio/resources/embed.js"></script></div>';
//     console.log(Object.keys(properties)); }
//     //MN
//     // if (properties.boro_nm == 'Manhattan') {
//     // infoPanelContent += '<h2><div style="display: flex; justify-content: center;"></h2>';
//     // infoPanelContent += '<div style="width: 60%;">';
//     // infoPanelContent += '<p>曼哈顿</p>';
//     // infoPanelContent += '<div class="flourish-embed flourish-chart" data-src="visualisation/13836481"><script src="https://public.flourish.studio/resources/embed.js"></script></div>';
//     // console.log(Object.keys(properties)); }
//     if (properties.boro_nm == 'Manhattan') {
//         infoPanelContent += '<h2><div style="display: flex; justify-content: center;"></h2>';
//         infoPanelContent += '<div style="width: 60%;">';
//         infoPanelContent += '<p>曼哈顿</p>';
      
//         // Insert a bar chart
//         infoPanelContent += '<div class="bar-chart">';
//         infoPanelContent += '<div class="bar" style="height: 80%"></div>';
//         infoPanelContent += '<div class="bar" style="height: 60%"></div>';
//         infoPanelContent += '<div class="bar" style="height: 40%"></div>';
//         infoPanelContent += '<div class="bar" style="height: 20%"></div>';
//         infoPanelContent += '</div>';
        
//         console.log(Object.keys(properties));
//       }
      
//     //Bronx
//     if (properties.boro_nm == 'Bronx') {
//     infoPanelContent += '<h2><div style="display: flex; justify-content: center;"></h2>';
//     infoPanelContent += '<div style="width: 60%;">';
//     infoPanelContent += '<p>Bronx</p>';
//     infoPanelContent += '<div class="flourish-embed flourish-chart" data-src="visualisation/13836481"><script src="https://public.flourish.studio/resources/embed.js"></script></div>';
//     console.log(Object.keys(properties)); }
//     //布鲁克林
//     if (properties.boro_nm == 'Brooklyn') {
//     infoPanelContent += '<h2><div style="display: flex; justify-content: center;"></h2>';
//     infoPanelContent += '<div style="width: 60%;">';
//     infoPanelContent += '<p>布鲁克林</p>';
//     infoPanelContent += '<div class="flourish-embed flourish-chart" data-src="visualisation/13836481"><script src="https://public.flourish.studio/resources/embed.js"></script></div>';
//     console.log(Object.keys(properties)); }

// })
    // else {
    // infoPanelContent += '<h2>No data available for this area</h2>';
    // }
//     infoPanelContent += originalFeatureProperties; 
//     document.getElementById('chart').innerHTML = infoPanelContent;
//     document.getElementById("back-button").style.display = 'block';

//     document.getElementById('back-button').addEventListener('click', function () {
//         var OrgContent = '';
//         // OrgContent = '<h2>Feature Information</h2>';
//         // OrgContent += '<h3>Welcome!</h3>';
//         // OrgContent += '<p>Click on an area to see charts. Use the right panel to switch between fields.</p>';
       
//         // OrgContent += 'Navigate through the displacement risk map to observe the potential displacement risk across city neighborhoods in comparison to each other. Choose a neighborhood to get a detailed analysis of the elements contributing to displacement risk, which include population vulnerability, housing conditions, and market pressure, as well as the data points that make up these elements.</p>'
//         // OrgContent += '<ul class = download><li><a href=\'https://equity-tool-data.nyc3.digitaloceanspaces.com/DRI_Subindices_Indicators.xls\'>Download Data</a ></li><ul>'
//         document.getElementById('chart').innerHTML = orig;
        
//     });
// })
    // });
// const propertiesToDisplay = {
    
//     'PopChng': 'Whole Population',
//     'HSp_PpC': 'Hispanic',
//     'WNH_PpC': 'White',
//     'BNH_PpC': 'Black',
//     'ANH_PpC': 'Asian'
    
// }
