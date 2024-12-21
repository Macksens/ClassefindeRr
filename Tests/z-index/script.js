       // Initialize the map
        var map = L.map('map').setView([48.8566, 2.3522], 13); // Paris coordinates

        // Add base layers
        var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });

        var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors, © OpenTopoMap'
        });

        // Add a marker layer
        var markers = L.layerGroup();
        var marker1 = L.marker([48.8566, 2.3522]).bindPopup("Paris").addTo(markers);
        marker1.feature = { properties: { title: "Paris" } };
        var marker2 = L.marker([48.8666, 2.3622]).bindPopup("Another location in Paris").addTo(markers);
        marker2.feature = { properties: { title: "Another location in Paris" } };
        var marker3 = L.marker([48.853, 2.3499]).bindPopup("Notre Dame Cathedral").addTo(markers);
        marker3.feature = { properties: { title: "Notre Dame Cathedral" } };
        markers.addLayer(marker1).addLayer(marker2).addLayer(marker3);

        // Add Layers Control
        var baseLayers = {
            "Streets": streets,
            "Topographic": topo
        };

        var overlays = {
            "Markers": markers
        };

        var layersControl = L.control.layers(baseLayers, overlays, { position: 'topright' });
        layersControl.addTo(map);

        // Add search control
        var searchControl = new L.Control.Search({
            layer: markers,
            propertyName: 'title',
            marker: false,
            moveToLocation: function(latlng, title, map) {
                map.setView(latlng, 14); // Zoom when a result is found
            },
            position: 'topright'
        });

        searchControl.on('search:locationfound', function(e) {
            e.layer.openPopup();
        });

        map.addControl(searchControl);

        // Add the default layer and overlays
        streets.addTo(map);
        markers.addTo(map);