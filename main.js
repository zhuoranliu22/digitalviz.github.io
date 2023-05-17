mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1b3JhbmxpdSIsImEiOiJjbGQxbDR6M2QyN2s5M3BudnhrZGV0bTRyIn0.dG9Q884uSu_yGHLnc0KLnA';

const map = new mapboxgl.Map({

    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-74.0060, 40.7128], // Set the initial map center (longitude, latitude)
    zoom: 9.7
});



map.on('load', () => {

    map.addSource('data_map', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/zhuoranliu22/Data_Viz_Group/main/data_group_viz.json'
    });

    map.addLayer({
        id: 'displacement',
        type: 'fill',
        source: 'data_map',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'DsplcRI'],
                'Lowest', '#B3CDE0',
                'Lower', ' #6897BB',
                'Intermediate', '#1F78B4',
                'Higher', '#053061',
                'Highest', '#011627',
                '#000000' // fallback color if none of the categories match
            ],
            'fill-opacity': 1                   
        }
    });

    map.addLayer({
        id: 'housing',
        type: 'fill',
        source: 'data_map',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'HsngCnd'],
                'Lowest', '#4d5d53',
                'Lower', '#729d80',
                'Intermediate', '#738276',
                'Higher', '#9eb08d',
                'Highest', '#626c41',
                '#000000' // fallback color if none of the categories match
            ],
            'fill-opacity': 0           
        }
    });
    
    map.addLayer({
        id: 'market',
        type: 'fill',
        source: 'data_map',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'MrktPrs'],
                'Lowest', '#E9DADE',
                'Lower', '#F3BEC6',
                'Intermediate', '#C88EA7',
                'Higher', '#99627A',
                'Highest', '#643843',
                '#000000' // fallback color if none of the categories match
            ],
            'fill-opacity': 0           
        }
    });

    map.addLayer({
        id: 'popu',
        type: 'fill',
        source: 'data_map',
        layout: {},
        paint: {
            'fill-color': [
                'match',
                ['get', 'PpltnVl'],
                'Lowest', '#EEEEEE',
                'Lower', '#FFEAD2',
                'Intermediate', '#DBDFEA',
                'Higher', '#ACB1D6',
                'Highest', '#8294C4',
                '#000000' // fallback color if none of the categories match
            ],
            'fill-opacity': 0           
        }
    });

    
    map.addSource('boroughs', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/zhuoranliu22/Data_Viz_Group/main/border.json'
    });

    map.addLayer({
        'id': 'boroughs-layer',
        'type': 'line',
        'source': 'boroughs',
        'layout': {},
        'paint': {
            'line-color': '#33332f',
            'line-width': 0.8
        }
    });

    map.addLayer({
        'id': 'borough-labels',
        'type': 'symbol',
        'source': 'boroughs',
        'layout': {
            'text-field': ['get', 'boro_name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 14
        },
        'paint': {
            'text-color': '#FF5733'
        }
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
});


document.getElementById("displacement").addEventListener("click", function(){
    map.setPaintProperty('displacement','fill-opacity',1);
    map.setPaintProperty('housing','fill-opacity',0);
    map.setPaintProperty('market','fill-opacity',0);
    map.setPaintProperty('popu','fill-opacity',0);
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
});

document.getElementById("housing").addEventListener("click", function(){
    map.setPaintProperty('displacement','fill-opacity',0);
    map.setPaintProperty('housing','fill-opacity',1);
    map.setPaintProperty('market','fill-opacity',0);
    map.setPaintProperty('popu','fill-opacity',0);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    var hou_grades = ['Lowest', 'Lower', 'Intermediate', 'Higher', 'Highest'];
    var hou_colors = ['#4d5d53', '#729d80', '#738276', '#9eb08d', '#626c41'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < hou_grades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + hou_colors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            hou_grades[i] + '<br>';
    }
});

document.getElementById('market').addEventListener("click", function(){
    map.setPaintProperty('displacement','fill-opacity',0);
    map.setPaintProperty('housing','fill-opacity',0);
    map.setPaintProperty('market','fill-opacity',1);
    map.setPaintProperty('popu','fill-opacity',0);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    var mar_grades = ['Lowest', 'Lower', 'Intermediate', 'Higher', 'Highest'];
    var mar_colors = ['#E9DADE', '#F3BEC6', '#C88EA7', '#99627A', '#643843'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < mar_grades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + mar_colors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            mar_grades[i] + '<br>';
    }
});

document.getElementById("popu").addEventListener("click", function(){
    map.setPaintProperty('displacement','fill-opacity',0);
    map.setPaintProperty('housing','fill-opacity',0);
    map.setPaintProperty('market','fill-opacity',0);
    map.setPaintProperty('popu','fill-opacity',1);
    var legend = document.getElementById('legend');
    legend.innerHTML = '';
    var pop_grades = ['Lowest', 'Lower', 'Intermediate', 'Higher', 'Highest'];
    var pop_colors = ['#EEEEEE', '#FFEAD2', '#DBDFEA', '#ACB1D6', '#8294C4'];   
    // loop through our intervals and generate a label with a colored square for each interval
    for (var i = 0; i < pop_grades.length; i++) {
        legend.innerHTML +=
            '<i style="background:' + pop_colors[i] + '; width: 14px; height: 14px; display: inline-block; margin-right: 2px;"></i> ' +
            pop_grades[i] + '<br>';
    }
});

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

const propertiesToDisplay = {
    
    'DsplcRI': 'Displacement Risk',
    'HsngCnd': 'Housing Conditions',
    'MrktPrs': 'Market Pressure',
    'PpltnVl': 'Population Vulnerability'
    
};

const panelProperties = {
    'NTAName': 'Name',
    'DsplcRI': 'Displacement Risk'
    
    // Add more properties as needed
};

//map.on('click', 'displacement', (e) => {
    // Get the properties of the clicked feature
    //const properties = e.features[0].properties;
    // Generate the content for the info panel
    //let infoPanelContent = '<h3>Feature Information</h3><ul>';
    //for (const property in properties) {
     //   infoPanelContent += `<li>${property}: ${properties[property]}</li>`;
    //}
    // for (const originalProperty in panelProperties) {
    //     if (properties.hasOwnProperty(originalProperty)) {
    //         const displayName = panelProperties[originalProperty];
    //         infoPanelContent += `<li><strong>${displayName}:</strong> ${properties[originalProperty]}</li>`;
    //     }
    // }
//     infoPanelContent += `<p style="font-size:18px;">The selected area is <strong>${properties.NTAName}</strong>.</p>`;
//     infoPanelContent += `<p style="font-size:16px;">The Displacement Risk Index is <strong>${properties.DsplcRI}</strong>.</p>`;
//     document.getElementById('feature-properties').innerHTML = infoPanelContent;
// });
// document.getElementById('back-button').addEventListener('click', function() {
//     // Hide the back button
//     this.style.display = 'none';
//     // Clear the info panel
//     document.getElementById('info-panel').innerHTML = '';
//     // Show the welcome page
//     document.getElementById('feature-properties').style.display = 'block';
// });

        // Go back to the welcome message when the "Back" button is clicked
    
var originalFeatureProperties = document.getElementById("feature-properties").innerHTML;
map.on('click', function(e) {
    var properties = map.queryRenderedFeatures(e.point)[0].properties;
    var infoPanelContent = '';

    // Always show the same data
    infoPanelContent = '<button id="back-button" >&larr;Back</button>';
    if (properties.NTAName !== undefined) {
        infoPanelContent += '<h2>' + properties.NTAName + '</h2>';
        infoPanelContent += '<div class="index"><p>' + properties.DsplcRI + '</p></div>';   
        infoPanelContent += '<hr>';
        infoPanelContent += '<p class="first">Housing Condition: ' + properties.HsngCnd + '</p>';
        infoPanelContent += '<p class="second">HOUSING WITH 3+ MAINTENANCE DEFICIENCIES</p>';
        infoPanelContent += '<p class="third">' + properties['3PlMDVC'] + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">HOUSING THAT IS NOT RENT-STABILIZED</p>';
        infoPanelContent += '<p class="third">' + properties.NtRnSVC + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">HOUSING THAT IS NOT INCOME-RESTRICTED</p>';
        infoPanelContent += '<p class="fourth">' + properties.NtIncmR + '%' + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">RENTER-OCCUPIED HOUSING UNITS</p>';
        infoPanelContent += '<p class="fourth">' + properties.RntlHsn + '%' + '</p>';
        infoPanelContent += '<hr>';

        infoPanelContent += '<p class="first">Market Pressure: ' + properties.MrktPrs + '</p>';
        infoPanelContent += '<p class="second">RESIDENTIAL PROPERTY PRICE APPRECIATION 2000-2020</p>';
        infoPanelContent += '<p class="fourth">' + properties.SlsPrcA.toFixed(0) + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">CHANGE IN RENTS COMPARED TO CITYWIDE AVERAGE</p>';
        infoPanelContent += '<p class="third">' + properties.ChnIRVC + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">ADJACENT NEIGHBORHOOD PRESSURE</p>';
        infoPanelContent += '<p class="third">' + properties.Adjcncy + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">BACHELORS DEGREE OR HIGHER CHANGE</p>';
        infoPanelContent += '<p class="fourth">' + properties.CIPWBDV + '</p>';
        infoPanelContent += '<hr>';

        infoPanelContent += '<p class="first">Population Vulnerability: ' + properties.PpltnVl + '</p>';
        infoPanelContent += '<p class="second">HOUSEHOLDS WITH SEVERE RENT BURDEN COMPARED TO CITYWIDE</p>';
        infoPanelContent += '<p class="third">' + properties.SvrRBVC + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">NON-WHITE POPULATION</p>';
        infoPanelContent += '<p class="fourth">' + properties.NotWhit + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">POPULATION WITH INCOME BELOW 200% OF FEDERAL POVERTY RATE</p>';
        infoPanelContent += '<p class="fourth">' + properties.Blw2xPR + '%' + '</p>';
        infoPanelContent += '<hr class="inside">';
        infoPanelContent += '<p class="second">LIMITED-ENGLISH SPEAKING POPULATION</p>';
        infoPanelContent += '<p class="fourth">' + properties.LmtdEnP + '%' + '</p>';

        console.log(Object.keys(properties)); 

    }else {
        infoPanelContent += '<h2>No data available for this area</h2>';
    }

    // ... add more data as needed

    
    infoPanelContent += originalFeatureProperties; 
    document.getElementById('info-panel').innerHTML = infoPanelContent;
    document.getElementById("back-button").style.display = 'block';

    document.getElementById('back-button').addEventListener('click', function () {
        var OrgContent = '';
        OrgContent = '<h2>Feature Information</h2>';
        OrgContent += '<h3>Welcome!</h3>';
        OrgContent += '<p>Click on an area to see more information. Use the right panel to switch between fields.</p>';
        OrgContent += 'Navigate through the displacement risk map to observe the potential displacement risk across city neighborhoods in comparison to each other. Choose a neighborhood to get a detailed analysis of the elements contributing to displacement risk, which include population vulnerability, housing conditions, and market pressure, as well as the data points that make up these elements.</p>'
        OrgContent += '<ul class = download><li><a href=\'https://equity-tool-data.nyc3.digitaloceanspaces.com/DRI_Subindices_Indicators.xls\'>Download Data</a ></li><ul>'
        document.getElementById('info-panel').innerHTML = OrgContent;
        
    });
    
    });


    

// map.on('mousemove', 'displacement', (e) => {
//     // Generate the content for the popup
//     const properties = e.features[0].properties;
//     let popupContent = '<h3>Basic Information</h3><ul>';
    
//     for (const originalProperty in propertiesToDisplay) {
//         if (properties.hasOwnProperty(originalProperty)) {
//             const displayName = propertiesToDisplay[originalProperty];
//             popupContent += `<li>${displayName}: ${properties[originalProperty]}</li>`;
//         }
//     }
//     popupContent += '</ul>';


//     // Instead of adding the popup to the map here, just set its content and location
//     popup.setLngLat(e.lngLat)
//         .setHTML(popupContent);

    
// });


// map.on('mouseenter', 'displacement', () => {
//     map.getCanvas().style.cursor = 'pointer';
//     popup.addTo(map); // Add the popup to the map when the cursor enters a feature
// });

// map.on('mouseleave', 'displacement', () => {
//     map.getCanvas().style.cursor = '';
//     popup.remove();
// });



// map.on('click', 'housing', (e) => {
//     // Get the properties of the clicked feature
//     const properties = e.features[0].properties;
//     // Generate the content for the info panel
//     let infoPanelContent = '<h3>Feature Information</h3><ul>';
//     for (const property in properties) {
//         infoPanelContent += `<li>${property}: ${properties[property]}</li>`;
//     }
//     // for (const originalProperty in panelProperties) {
//     //     if (properties.hasOwnProperty(originalProperty)) {
//     //         const displayName = panelProperties[originalProperty];
//     //         infoPanelContent += `<li><strong>${displayName}:</strong> ${properties[originalProperty]}</li>`;
//     //     }
//     // }
//     infoPanelContent += '</ul>';
//     // Set the info panel content
//     document.getElementById('feature-properties').innerHTML = infoPanelContent;
// });

// map.on('mousemove', 'housing', (e) => {
//     // Generate the content for the popup
//     const properties = e.features[0].properties;
//     let popupContent = '<h3>Basic Information</h3><ul>';
    
//     for (const originalProperty in propertiesToDisplay) {
//         if (properties.hasOwnProperty(originalProperty)) {
//             const displayName = propertiesToDisplay[originalProperty];
//             popupContent += `<li>${displayName}: ${properties[originalProperty]}</li>`;
//         }
//     }
//     popupContent += '</ul>';


//     // Instead of adding the popup to the map here, just set its content and location
//     popup.setLngLat(e.lngLat)
//         .setHTML(popupContent);

    
// });


// map.on('mouseenter', 'housing', () => {
//     map.getCanvas().style.cursor = 'pointer';
//     popup.addTo(map); // Add the popup to the map when the cursor enters a feature
// });

// map.on('mouseleave', 'housing', () => {
//     map.getCanvas().style.cursor = '';
//     popup.remove();
// });

function setupLayerMouseEffects(layerName) {
    map.on('mousemove', layerName, (e) => {
        const properties = e.features[0].properties;
        let popupContent = '<h3>' + properties.NTAName + '</h3><ul>';

        // if (properties.hasOwnProperty('boro_name')) {
        //     popupContent += `<li>Borough: ${properties.boro_name}</li>`;
        // }
        
        for (const originalProperty in propertiesToDisplay) {
            if (properties.hasOwnProperty(originalProperty)) {
                const displayName = propertiesToDisplay[originalProperty];
                popupContent += `<li>${displayName}: ${properties[originalProperty]}</li>`;
            }
        }
        popupContent += '</ul>';

        popup.setLngLat(e.lngLat).setHTML(popupContent);
    });

    map.on('mouseenter', layerName, () => {
        map.getCanvas().style.cursor = 'pointer';
        popup.addTo(map);
    });

    map.on('mouseleave', layerName, () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}

// Now you can call setupLayerMouseEffects for each of your layers
setupLayerMouseEffects('displacement');
setupLayerMouseEffects('housing');
setupLayerMouseEffects('market');
setupLayerMouseEffects('popu');

// document.getElementById('back_center').addEventListener('click', function () {
//     var lat,long;

//     switch(e.target.id) {
//         case "back_center": long=-74.0060; lat=40.7128; break;
//     }

//     map.flyTo({
//         center: [long,lat],
//         zoom: 9,
//         speed: 0.3,
//         pitch: 50
//         });
// });


// const map_sec = new mapboxgl.Map({
//     container: 'map2',
//     style: 'mapbox://styles/mapbox/light-v11',
//     center: [-74.0060, 40.7128], // Set the initial map center (longitude, latitude)
//     zoom: 9.7
// });
// window.onload = function() {
    
//     map_sec.on('load', () => {
//         map_sec.addSource('second', {
//             type: 'geojson',
//             data: 'https://raw.githubusercontent.com/zhuoranliu22/Data_Viz_Group/main/Popchange.json'
//         });

//         map_sec.addLayer({
//             id: 'Pop_Change',
//             type: 'fill',
//             source: 'second',
//             layout: {},
//             paint: {
//                 'fill-color': [
//                     'match',
//                     ['get', 'PopChange'],
//                     '27017', '#B3CDE0',
//                     '87546', ' #6897BB',
//                     '108378', '#1F78B4',
//                     '174742', '#053061',
//                     '231374', '#011627',
//                     '#000000' // fallback color if none of the categories match
//                 ],
//                 'fill-opacity': 1                   
//             }
//         });
//     })
// }


