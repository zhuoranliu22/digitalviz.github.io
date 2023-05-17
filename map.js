
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
    // ... repeat for all other layers
});
document.getElementById('his').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 1);
    map.setPaintProperty('whi', 'fill-opacity', 0);
    map.setPaintProperty('black', 'fill-opacity', 0);
    map.setPaintProperty('asian', 'fill-opacity', 0);
    // ... repeat for all other layers
});
// ... repeat for all other radio buttons
document.getElementById('whi').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 0);
    map.setPaintProperty('whi', 'fill-opacity', 1);
    map.setPaintProperty('black', 'fill-opacity', 0);
    map.setPaintProperty('asian', 'fill-opacity', 0);
    // ... repeat for all other layers
});
document.getElementById('black').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 0);
    map.setPaintProperty('whi', 'fill-opacity', 0);
    map.setPaintProperty('black', 'fill-opacity', 1);
    map.setPaintProperty('asian', 'fill-opacity', 0);
    // ... repeat for all other layers
});
document.getElementById('asian').addEventListener('change', function() {
    map.setPaintProperty('pop', 'fill-opacity', 0);
    map.setPaintProperty('his', 'fill-opacity', 0);
    map.setPaintProperty('whi', 'fill-opacity', 0);
    map.setPaintProperty('black', 'fill-opacity', 0);
    map.setPaintProperty('asian', 'fill-opacity', 1);
    // ... repeat for all other layers
});
const propertiesToDisplay = {
    
    'DsplcRI': 'Displacement Risk',
    'HsngCnd': 'Housing Conditions',
    'MrktPrs': 'Market Pressure',
    'PpltnVl': 'Population Vulnerability'
    
};
function setupLayerMouseEffects(layerName) {
    map.on('mousemove', layerName, (e) => {
        const properties = e.features[0].properties;
        let popupContent = '<h3>' + properties.boro_nm + '</h3><ul>';

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
