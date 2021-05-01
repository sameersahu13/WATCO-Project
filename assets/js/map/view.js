const mapapi = (function ($) {
    const assetLayerURL = "http://34.66.75.129:8080/geoserver/Assets/wms"

    let layers = [];
    let popupLayers = [];
    var measureCount=0;
    /* Elements that make up the popup. */
    let container = document.getElementById('popup');
    let content = document.getElementById('popup-content');
    let closer = document.getElementById('popup-closer');
    let header = document.getElementById('popup-header');

    let overlayPopup = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250,
        },
    });

    closer.onclick = function () {
        overlayPopup.setPosition(undefined);
        closer.blur();
        return false;
    };

    //Add basemap Layers to map
    let osm = new ol.layer.Tile({
        type: 'base',
        title: 'OSM',
        visible: true,
        source: new ol.source.OSM()
    });
    layers.push(osm);

    let streetmap = new ol.layer.Tile({
        type: 'base',
        title: 'Google Streetmaps',
        visible: false,
        source: new ol.source.OSM({
            url: 'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
        })
    });
    layers.push(streetmap);

    let imagery = new ol.layer.Tile({
        type: 'base',
        title: 'Google Satelite',
        visible: false,
        source: new ol.source.OSM({
            url: 'https://mt{0-3}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
        })
    });
    layers.push(imagery);

    let osmcarto = new ol.layer.Tile({
        type: 'base',
        title: 'OSM Cartography',
        visible: false,
        source: new ol.source.XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
        })
    });
    layers.push(osmcarto);

    let bingMap = new ol.layer.Tile({
        type: 'base',
        title: 'Bing Map',
        visible: false,
        source: new ol.source.BingMaps({
            imagerySet: 'AerialWithLabels',
            key: 'AlWJE3xHQNz1L2UMzA-Sast_AN8AAL4UIuxEpKCUVMUAuNP3FeSyCvltL5FzA2yq'
        })
    });
    layers.push(bingMap);

    let googleLayerSatellite = new ol.layer.Tile({
        title: "Google Satellite",
        name: "Google satellite",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga' }),
        visible: false
    });

    let googleLayerRoadNames = new ol.layer.Tile({
        title: "Google Road Names",
        name: "Google Road Names",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}' }),
        visible: false
    });

    let googleLayerRoadmap = new ol.layer.Tile({
        title: "Google Road Map",
        name: "Google Road Map",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' }),
        visible: false
    });

    let googleLayerHybrid = new ol.layer.Tile({
        title: "Google Satellite & Roads",
        name: "Google Satellite & Roads",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }),
        visible: false
    });

    let googleLayerTerrain = new ol.layer.Tile({
        title: "Google Terrain",
        name: "Google Terrain",
        source: new ol.source.TileImage({ url: 'http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}' }),
        visible: false
    });

    let googleLayerHybrid2 = new ol.layer.Tile({
        title: "Google Terrain & Roads",
        name: "Google Terrain & Roads",
        source: new ol.source.TileImage({ url: 'http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }),
        visible: false
    });

    let googleLayerOnlyRoad = new ol.layer.Tile({
        title: "Google Road without Building",
        name: "Google Road without Building",
        source: new ol.source.TileImage({ url: 'http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' }),
        visible: false
    });

    //Add Administrative Boundary Layers to map
    let ward = new ol.layer.Image({
        title: 'BBSR Ward Boundary',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:WARD_BOUNDARY'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(ward);

    let section = new ol.layer.Image({
        title: 'BBSR Section Boundary',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:SECTION_BOUNDARY'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(section);

    let subdivision = new ol.layer.Image({
        title: 'BBSR Sub-Division Boundary',
        type: 'base',
        visible: true,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:SUB_DIVISION_BOUNDARY'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(subdivision);

    let division = new ol.layer.Image({
        title: 'BBSR Division Boundary',
        type: 'base',
        visible: true,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:DIVISION_BOUNDARY'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(division);

    //Add consumer Layers to map
    let consumer = new ol.layer.Tile({
        title: 'Consumer',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:CONSUMER'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(consumer);

    //Add Water Supply Layers to map
    let reservoir = new ol.layer.Tile({
        title: 'Reservoir',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:RESERVOIR'
            },
            serverType: 'geoserver'
        }),
        crossOrigin: 'anonymous'
    });
    layers.push(reservoir);

    let pump = new ol.layer.Tile({
        title: 'Pump',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:PUMP'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(pump);

    let pump_house = new ol.layer.Tile({
        title: 'Pump House',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:PUMP_HOUSE'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(pump_house);

    let prod_well = new ol.layer.Tile({
        title: 'Production Well',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:PRODUCTION_WELL'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(prod_well);

    let valve = new ol.layer.Tile({
        title: 'valve',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:VALVE'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(valve);

    let intakes = new ol.layer.Tile({
        title: 'valve',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:INTAKES'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(intakes);

    let flow_meter = new ol.layer.Tile({
        title: 'Flow Meter',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:FLOW_METER'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(flow_meter);

    let wtp = new ol.layer.Tile({
        title: 'WTP',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:WTP'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(wtp);

    let chlorinator = new ol.layer.Tile({
        title: 'valve',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:CHLORINATOR'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(chlorinator);

    let cwline = new ol.layer.Tile({
        title: 'Clear Water Line',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:CLEAR_WATER_LINE'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(cwline);

    let rwline = new ol.layer.Tile({
        title: 'Raw Water Line',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:RAW_WATER_LINE'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(rwline);

    let wsline = new ol.layer.Tile({
        title: 'Water Supply Line',
        type: 'base',
        visible: false,
        source: new ol.source.TileWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:WATER_SUPPLY_LINE'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(wsline);

    //Add Sewerage Network Layers to map
    let manhole = new ol.layer.Image({
        title: 'Manhole',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:MANHOLES'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(manhole);

    let discharge_point = new ol.layer.Image({
        title: 'Discharge Point',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:DISCHARGE_POINT'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(discharge_point);

    let sewerage_pumps = new ol.layer.Image({
        title: 'Sewerage Pumps',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:SEWERAGE_PUMPS'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(sewerage_pumps);

    let sewerage_pump_house = new ol.layer.Image({
        title: 'Sewerage Pump_House',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:SEWERAGE_PUMP_HOUSE'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(sewerage_pump_house);

    let sewerage_stp = new ol.layer.Image({
        title: 'Sewerage Pump_House',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:SEWERAGE_STP'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(sewerage_stp);

    let sewer_line = new ol.layer.Image({
        title: 'Sewer Line',
        type: 'base',
        visible: false,
        source: new ol.source.ImageWMS({
            url: assetLayerURL,
            params: {
                'LAYERS': 'Assets:SEWER_LINE'
            },
            serverType: 'geoserver'
        })
    });
    layers.push(sewer_line);


    let groupGoogleBasemap = new ol.layer.Group({
        name: 'Google Maps',
        layers: [googleLayerSatellite, googleLayerOnlyRoad],
        visible: false
    });

    let groupAdmin = new ol.layer.Group({
        name: 'Administrative Layers',

        layers: [division, subdivision, section, ward],
        visible: true
    });

    let groupWater = new ol.layer.Group({
        name: 'Waret Supply Assets',
        layers: [reservoir, pump, pump_house, prod_well, valve, intakes, flow_meter, wtp, chlorinator, cwline, rwline, wsline],
        visible: true
    });

    let groupSewerage = new ol.layer.Group({
        name: 'Sewerage Assets',
        layers: [manhole, discharge_point, sewerage_pumps, sewerage_pump_house, sewer_line],
        visible: true
    });

    let groupbasemap = new ol.layer.Group({
        name: 'Base Map',
        layers: [osm],
        visible: true
    });

    olMap = new ol.Map({
        target: 'mapDiv',
        overlays: [overlayPopup],
        crossOrigin: 'anonymous',
        layers: layers,
        view: new ol.View({
            center: ol.proj.transform([85.85, 20.28], 'EPSG:4326', 'EPSG:3857'),
            zoom: 12
        })
    })

    const zoomtoextent = new ol.control.ZoomToExtent({
        className: 'custom-zoom',
        extent: [8796767.525037993, 1954132.2578038773, 10027358.36810457, 2596668.4464184004]
    });

    const mousePosition = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(6),
        projection: 'EPSG:4326',
    });

    olMap.addControl(new ol.control.ScaleLine())
    olMap.addControl(new ol.control.OverviewMap({ 'className': 'ol-overviewmap ol-custom-overviewmap', collapseLabel: '\u00BB', label: '\u00AB' }))
    olMap.addControl(new ol.control.ZoomSlider())
    // olMap.addControl(new ol.control.FullScreen())
    // olMap.addControl(zoomtoextent)
    olMap.addControl(mousePosition)

    /* const sourceDraw = new ol.source.Vector();
    const vectorDraw = new ol.layer.Vector({
        source: sourceDraw,
        map: olMap,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2,
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33',
                }),
            }),
        }),
    });
    const modify = new ol.interaction.Modify({ source: sourceDraw });
    olMap.addInteraction(modify);

    let draw, snap;
    const typeSelect = document.getElementById('type');

    function addInteractions() {
        draw = new ol.interaction.Draw({
            source: sourceDraw,
            type: typeSelect.value,
        });
        olMap.addInteraction(draw);
        snap = new ol.interaction.Snap({ source: sourceDraw });
        olMap.addInteraction(snap);
    }


    typeSelect.onchange = function () {
        sourceDraw.clear();
        olMap.removeInteraction(draw);
        olMap.removeInteraction(snap);
        addInteractions();
    };

    $("#markonmap").click(function () {
        addInteractions();
    }); */

    let popupStr = "";

    /*Add a click handler to the map to render the popup.*/
    olMap.on('singleclick', function (evt) {

        if (measureCount == 0) {

            popupStr = "";
            const coordinates = evt.coordinate;
            coordinate = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
            const latitude = parseFloat(coordinate[0]).toFixed(6);
            const longitude = parseFloat(coordinate[1]).toFixed(6);

            popupStr = "<table class='table table-bordered table-sm'>";
            let selectedLayer;

            for (let i = 0; i < popupLayers.length; i++) {
                selectedLayer = popupLayers[i];
                const view = olMap.getView();
                const viewResolution = /** @type {number} */ (olMap.getView().getResolution());
                let url = selectedLayer.getSource().getGetFeatureInfoUrl(evt.coordinate, view.getResolution(), view.getProjection(), {
                    'INFO_FORMAT': 'application/json',
                    'PIXELRADIUS': 5,
                    'FEATURE_COUNT': 10
                });
                if (url) {
                    const parser = new ol.format.GeoJSON();
                    $.ajax({
                        url: url,
                        crossOrigin: true,
                        dataType: 'json',
                        jsonpCallback: 'parseResponse'
                    }).then(function (response) {
                        if (response.features.length > 0) {
                            let featureid = response.features[0].id;
                            let splitfeatureid = featureid.split(".");
                            let layername = splitfeatureid[0];
                            header.innerHTML = "";
                            let address = "";

                            if (layername == "CONSUMER") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Consumer Name:</td><td>" + response.features[0].properties.cons_name + "</td></tr>";
                                popupStr += "<tr><td>Consumer No.:</td><td>" + response.features[0].properties.cons_no + "</td></tr>";
                                popupStr += "<tr><td>Connection Type:</td><td>" + response.features[0].properties.conc_type + "</td></tr>";
                                popupStr += "<tr><td>Water Demand:</td><td>" + response.features[0].properties.water_demd + "</td></tr>";
                                address = response.features[0].properties.address_2 + response.features[0].properties.address_3;
                                popupStr += "<tr><td>Address:</td><td>" + address + "</td></tr>";
                            }
                            if (layername == "INTAKES") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Type:</td><td>" + response.features[0].properties.type + "</td></tr>";
                                popupStr += "<tr><td>Size in Meter:</td><td>" + response.features[0].properties.size + "</td></tr>";
                                popupStr += "<tr><td>Source of Water:</td><td>" + response.features[0].properties.source + "</td></tr>";
                                popupStr += "<tr><td>Shape:</td><td>" + response.features[0].properties.shp + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "WTP") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Type:</td><td>" + response.features[0].properties.type + "</td></tr>";
                                popupStr += "<tr><td>Year of Installation:</td><td>" + response.features[0].properties.yr_const + "</td></tr>";
                                popupStr += "<tr><td>Capacilty in MLD:</td><td>" + response.features[0].properties.cap_mld + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "PRODUCTION_WELL") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Type of Supply:</td><td>" + response.features[0].properties.type_suppl + "</td></tr>";
                                popupStr += "<tr><td>Dia in Meter:</td><td>" + response.features[0].properties.dia_mm + "</td></tr>";
                                popupStr += "<tr><td>Depth of PW in Meter:</td><td>" + response.features[0].properties.depth_m + "</td></tr>";
                                popupStr += "<tr><td>Casing material:</td><td>" + response.features[0].properties.cas_mat + "</td></tr>";
                                popupStr += "<tr><td>Casing depth in Meter:</td><td>" + response.features[0].properties.cas_dep_m + "</td></tr>";
                                popupStr += "<tr><td>Year of installation:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "RESERVOIR") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Type:</td><td>" + response.features[0].properties.type + "</td></tr>";
                                popupStr += "<tr><td>Capacity in Ltr:</td><td>" + response.features[0].properties.cap_ltr + "</td></tr>";
                                popupStr += "<tr><td>Size in Meter:</td><td>" + response.features[0].properties.size_m + "</td></tr>";
                                popupStr += "<tr><td>Shape:</td><td>" + response.features[0].properties.shp + "</td></tr>";
                                popupStr += "<tr><td>Material Type:</td><td>" + response.features[0].properties.material + "</td></tr>";
                                popupStr += "<tr><td>Comm_Year:</td><td>" + response.features[0].properties.yr_const + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "PUMP") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Type:</td><td>" + response.features[0].properties.type + "</td></tr>";
                                popupStr += "<tr><td>Make:</td><td>" + response.features[0].properties.make + "</td></tr>";
                                popupStr += "<tr><td>Installation_Year:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "PUMPS") {
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Type:</td><td>" + response.features[0].properties.type + "</td></tr>";
                                popupStr += "<tr><td>Make:</td><td>" + response.features[0].properties.make + "</td></tr>";
                                popupStr += "<tr><td>Installation_Year:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "PUMP_HOUSE") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Size in Meter:</td><td>" + response.features[0].properties.size + "</td></tr>";
                                popupStr += "<tr><td>Year of Construction:</td><td>" + response.features[0].properties.yr_const + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "VALVE") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Type:</td><td>" + response.features[0].properties.type + "</td></tr>";
                                popupStr += "<tr><td>Material Type:</td><td>" + response.features[0].properties.material + "</td></tr>";
                                popupStr += "<tr><td>Dia (mm):</td><td>" + response.features[0].properties.dia_size + "</td></tr>";
                                popupStr += "<tr><td>Year of Construction:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "FLOW_METER") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Make:</td><td>" + response.features[0].properties.make + "</td></tr>";
                                popupStr += "<tr><td>Size in MM:</td><td>" + response.features[0].properties.size + "</td></tr>";
                                popupStr += "<tr><td>Year of Construction:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "CHLORINATOR") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Manufacturer Name:</td><td>" + response.features[0].properties.make + "</td></tr>";
                                popupStr += "<tr><td>Capacity:</td><td>" + response.features[0].properties.cap + "</td></tr>";
                                popupStr += "<tr><td>Year of Construction:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Location:</td><td>" + response.features[0].properties.location + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "RAW_WATER_LINE") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Material Type:</td><td>" + response.features[0].properties.material + "</td></tr>";
                                popupStr += "<tr><td>Dia(mm):</td><td>" + response.features[0].properties.dia_siz_mm + "</td></tr>";
                                popupStr += "<tr><td>Length in Meter:</td><td>" + response.features[0].properties.len_mtr + "</td></tr>";
                                popupStr += "<tr><td>Year of Installation:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "CLEAR_WATER_LINE") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Material Type:</td><td>" + response.features[0].properties.material + "</td></tr>";
                                popupStr += "<tr><td>Dia(mm):</td><td>" + response.features[0].properties.dia_siz_mm + "</td></tr>";
                                popupStr += "<tr><td>Length in Meter:</td><td>" + response.features[0].properties.len_mtr + "</td></tr>";
                                popupStr += "<tr><td>Year of Installation:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            if (layername == "WATER_SUPPLY_LINE") {
                                header.innerHTML = layername;
                                popupStr += "<tr><td>Asset Code:</td><td>" + response.features[0].properties.assest_cod + "</td></tr>";
                                popupStr += "<tr><td>Material Type:</td><td>" + response.features[0].properties.material + "</td></tr>";
                                popupStr += "<tr><td>Dia(mm):</td><td>" + response.features[0].properties.dia_siz_mm + "</td></tr>";
                                popupStr += "<tr><td>Length in Meter:</td><td>" + response.features[0].properties.len_mtr + "</td></tr>";
                                popupStr += "<tr><td>Year of Installation:</td><td>" + response.features[0].properties.yr_instl + "</td></tr>";
                                popupStr += "<tr><td>Section Name:</td><td>" + response.features[0].properties.section + "</td></tr>";
                                popupStr += "<tr><td>Sub Division:</td><td>" + response.features[0].properties.sub_div + "</td></tr>";
                                popupStr += "<tr><td>Division Name:</td><td>" + response.features[0].properties.division + "</td></tr>";
                            }
                            popupStr += "<tr><td>Latitude:</td><td>" + latitude + "</td></tr><tr><td>Longitude:</td><td>" + longitude + "</td></tr>";
                            content.innerHTML = popupStr + '</table>';
                            overlayPopup.setPosition(coordinates);
                        }
                    });
                }
            }
        }
    });

    function formatCoordinate(coordinate) {
        return ("<table><tbody><tr><th>longitude:</th><td>" + (coordinate[0].toFixed(6)) + "</td></tr>" +
            "<tr><th>latitude:</th><td>" + (coordinate[1].toFixed(6)) + "</td></tr></tbody></table>");
    }


    //Administrative Layer checkbox event
    $('#chkAB1').change(function () {
        if (this.checked) {
            ward.setVisible(true);
        }
        else {
            ward.setVisible(false);
        }
    });

    $('#chkAB2').change(function () {
        if (this.checked) {
            section.setVisible(true);
        }
        else {
            section.setVisible(false);
        }
    });

    $('#chkAB3').change(function () {
        if (this.checked) {
            subdivision.setVisible(true);
        }
        else {
            subdivision.setVisible(false);
        }
    });

    $('#chkAB4').change(function () {
        if (this.checked) {
            division.setVisible(true);
        }
        else {
            division.setVisible(false);
        }
    });

    //Consumer Layer checkbox event
    $('#chkCM1').change(function () {
        if (this.checked) {
            consumer.setVisible(true);
            popupLayers.push(consumer);
        }
        else {
            consumer.setVisible(false);
            popupLayers.pop(consumer);
        }
    });

    //Water Asset checkbox event
    $('#chkWA1').change(function () {
        if (this.checked) {
            reservoir.setVisible(true);
            popupLayers.push(reservoir);
        }
        else {
            reservoir.setVisible(false);
            popupLayers.pop(reservoir);
        }
    });

    $('#chkWA2').change(function () {
        if (this.checked) {
            pump.setVisible(true);
            popupLayers.push(pump);
        }
        else {
            pump.setVisible(false);
            popupLayers.pop(pump);
        }
    });

    $('#chkWA3').change(function () {
        if (this.checked) {
            pump_house.setVisible(true);
            popupLayers.push(pump_house);
        }
        else {
            pump_house.setVisible(false);
            popupLayers.pop(pump_house);
        }
    });

    $('#chkWA4').change(function () {
        if (this.checked) {
            prod_well.setVisible(true);
            popupLayers.push(prod_well);
        }
        else {
            prod_well.setVisible(false);
            popupLayers.pop(prod_well);
        }
    });

    $('#chkWA5').change(function () {
        if (this.checked) {
            valve.setVisible(true);
            popupLayers.push(valve);
        }
        else {
            valve.setVisible(false);
            popupLayers.pop(valve);
        }
    });

    $('#chkWA6').change(function () {
        if (this.checked) {
            flow_meter.setVisible(true);
            popupLayers.push(flow_meter);
        }
        else {
            flow_meter.setVisible(false);
            popupLayers.pop(flow_meter);
        }
    });

    $('#chkWA7').change(function () {
        if (this.checked) {
            wtp.setVisible(true);
            popupLayers.push(wtp);
        }
        else {
            wtp.setVisible(false);
            popupLayers.pop(wtp);
        }
    });

    $('#chkWA8').change(function () {
        if (this.checked) {
            cwline.setVisible(true);
            popupLayers.push(cwline);
        }
        else {
            cwline.setVisible(false);
            popupLayers.pop(cwline);
        }
    });

    $('#chkWA9').change(function () {
        if (this.checked) {
            rwline.setVisible(true);
            popupLayers.push(rwline);
        }
        else {
            rwline.setVisible(false);
            popupLayers.pop(rwline);
        }
    });

    $('#chkWA10').change(function () {
        if (this.checked) {
            wsline.setVisible(true);
            popupLayers.push(wsline);
        }
        else {
            wsline.setVisible(false);
            popupLayers.pop(wsline);
        }
    });

    $('#chkWA11').change(function () {
        if (this.checked) {
            intakes.setVisible(true);
            popupLayers.push(intakes);
        }
        else {
            intakes.setVisible(false);
            popupLayers.pop(intakes);
        }
    });

    $('#chkWA12').change(function () {
        if (this.checked) {
            chlorinator.setVisible(true);
            popupLayers.push(chlorinator);
        }
        else {
            chlorinator.setVisible(false);
            popupLayers.pop(chlorinator);
        }
    });


    //Sewerage Asset checkbox event
    $('#chkSA1').change(function () {
        if (this.checked) {
            manhole.setVisible(true);
        }
        else {
            manhole.setVisible(false);
        }
    });

    $('#chkSA2').change(function () {
        if (this.checked) {
            discharge_point.setVisible(true);
        }
        else {
            discharge_point.setVisible(false);
        }
    });

    $('#chkSA3').change(function () {
        if (this.checked) {
            sewerage_pumps.setVisible(true);
        }
        else {
            sewerage_pumps.setVisible(false);
        }
    });

    $('#chkSA4').change(function () {
        if (this.checked) {
            sewerage_pump_house.setVisible(true);
        }
        else {
            sewerage_pump_house.setVisible(false);
        }
    });

    $('#chkSA5').change(function () {
        if (this.checked) {
            sewerage_stp.setVisible(true);
        }
        else {
            sewerage_stp.setVisible(false);
        }
    });

    $('#chkSA6').change(function () {
        if (this.checked) {
            sewer_line.setVisible(true);
        }
        else {
            sewer_line.setVisible(false);
        }
    });

    //Basemap checkbox event

    $('#chkBM1').change(function () {
        if (this.checked) {
            $("#chkBM2").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(false);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
        else {
            $("#chkBM2").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(true);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
    });

    $('#chkBM2').change(function () {
        if (this.checked) {
            $("#chkBM1").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(false);
            streetmap.setVisible(true);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
        else {
            $("#chkBM1").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(true);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
    });

    $('#chkBM3').change(function () {
        if (this.checked) {
            $("#chkBM1").prop("checked", false);
            $("#chkBM2").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(false);
            streetmap.setVisible(false);
            imagery.setVisible(true);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
        else {
            $("#chkBM1").prop("checked", false);
            $("#chkBM2").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(true);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
    });

    $('#chkBM4').change(function () {
        if (this.checked) {
            $("#chkBM1").prop("checked", false);
            $("#chkBM2").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(false);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(true);
            bingMap.setVisible(false);
        }
        else {
            $("#chkBM1").prop("checked", false);
            $("#chkBM2").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM5").prop("checked", false);
            osm.setVisible(true);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
    });

    $('#chkBM5').change(function () {
        if (this.checked) {
            $("#chkBM1").prop("checked", false);
            $("#chkBM2").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            osm.setVisible(false);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(true);
        }
        else {
            $("#chkBM1").prop("checked", false);
            $("#chkBM2").prop("checked", false);
            $("#chkBM3").prop("checked", false);
            $("#chkBM4").prop("checked", false);
            osm.setVisible(true);
            streetmap.setVisible(false);
            imagery.setVisible(false);
            osmcarto.setVisible(false);
            bingMap.setVisible(false);
        }
    });

    let sketch
    let measureTooltipElement
    let measureTooltip
    let draw

    let source = new ol.source.Vector()

    let vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2,
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33',
                }),
            }),
        }),
    });

    let formatLength = function (line) {
        var length = line.getLength(line);
        var output;
        if (length > 1000) {
            output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    }

    let formatArea = function (polygon) {
        var area = polygon.getArea();
        var output;
        if (area > 1000000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
        } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
        }
        return output;
    }

    function addInteraction(type) {
        measureCount=1;
        closeInteraction();
        draw = new ol.interaction.Draw({
            source: source,
            type: type,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                }),
            }),
        });
        olMap.addInteraction(draw);

        draw.on('drawstart', function (evt) {
            createTooltip()
            if (sketch) {
                source.removeFeature(sketch)
                sketch = null
            }
            sketch = evt.feature;
            var tooltipCoord = evt.coordinate;
            sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    //   tooltipCoord = geom.getLastCoordinate();
                    tooltipCoord = geom.getCoordinateAt(.5);
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            })
        });
    }

    function createTooltip() {
        if (measureTooltip) {
            olMap.removeOverlay(measureTooltip)
            measureTooltip = null
        }
        if (measureTooltipElement) {
            $(measureTooltipElement).remove();
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, 0],
            positioning: 'center-center',
        })
        olMap.addOverlay(measureTooltip);
    }

    function closeInteraction() {
        if (draw) {
            olMap.removeInteraction(draw)
            draw = null
        }
        if (sketch) {
            source.removeFeature(sketch)
            sketch = null
        }
        if (measureTooltip) {
            olMap.removeOverlay(measureTooltip)
            measureTooltip = null
        }
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        
    }

    const modify = new ol.interaction.Modify({ source: source });
    olMap.addLayer(vector)
    olMap.addInteraction(modify)

    $('#areaTool').on('click', function () {
        addInteraction('Polygon');
    })
    $('#distanceTool').on('click', function () {
        addInteraction('LineString');
    })
    $('#clearTool').on('click', function () {
        closeInteraction();
    })

    // Menu icon click function
    $("#layerIcon").click(function () {
        closeInteraction();
        measureCount=0;
    });

    $("#legendIcon").click(function () {
        closeInteraction();
        measureCount=0;
    });

    $("#basemapIcon").click(function () {
        closeInteraction();
        measureCount=0;
    });

    $("#measureIcon").click(function () {
        measureCount=1;
    });

    $("#queryIcon").click(function () {
        closeInteraction();
        measureCount=0;
    });

    return { olMap }

})(jQuery)

