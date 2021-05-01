jQuery(function($){

    var KLcompass = (function(Control){
        function KLcompass(opt_options) {
            var options = opt_options || {};

            Control.call(this, {
                element: $('#KLDirectionCompas')[0],
                target: options.target,
              });
        }
        if ( Control ) KLcompass.__proto__ = Control;
        KLcompass.prototype = Object.create( Control && Control.prototype );
        KLcompass.prototype.constructor = KLcompass;

        return KLcompass;
    })(ol.control.Control)
    mapapi.olMap.addControl(new KLcompass())

    var KLmapMenu = (function(Control){
        function KLmapMenu(opt_options) {
            var options = opt_options || {};

            Control.call(this, {
                element: $('#KLmapMenu')[0],
                target: options.target,
              });
        }
        if ( Control ) KLmapMenu.__proto__ = Control;
        KLmapMenu.prototype = Object.create( Control && Control.prototype );
        KLmapMenu.prototype.constructor = KLmapMenu;

        return KLmapMenu;
    })(ol.control.Control)
    mapapi.olMap.addControl(new KLmapMenu())



    var current_tab = null

    $('.tooltab-btn').each(function(){
        let mth = $(this)
        let border = mth.is('.topmenubar') ? 'border-bottom' : 'border-top'

        mth.find('.col').each(function(){
            let th = $(this)
            let a = th.find('a')
            a.on('click', function(){
                let a = $(this)
                if(current_tab === a.data('mytab')){ // close
                    mth.find('.col').removeClass(border)
                    $('.tooltab-tab').addClass('d-none')
                    current_tab = null
                } else {
                    mth.find('.col').addClass(border)
                    th.removeClass(border)
                    current_tab = a.data('mytab')
                    $('.tooltab-tab').addClass('d-none')
                    $(current_tab).removeClass('d-none')
                }
            })
        })
    })

    mapapi.olMap.on('click', function (evt) {
        if(current_tab != null){
            current_tab = null
            $('.tooltab-tab').addClass('d-none')
            $('.tooltab-btn .col').removeClass('border-bottom').removeClass('border-top')
        }
    })

    var group = mapapi.olMap.getLayerGroup()
    var layer_menu  = $('#view_pop')
    var colapsable = layer_menu.find('.mycolapsable');

    var layerData = function(group, index){
        index = index || ''
        let ret = $('<ul />')
        group.getLayers().forEach(function(layer, i){
            let prop = layer.getProperties()
            let indexid = index + '' + i
            let nametitle = prop.title || prop.name
            let li = $('<li />')
            let content = $('<div class="row" />')
            let form = $('<div class="col form-group form-check" />')
            let label = $('<label class="form-check-label" />')
            let input = $('<input type="checkbox" class="form-check-input" />')
            content.append('<div class="col-auto expander"><i class="fa fa-plus" aria-hidden="true"></i><i class="fa fa-minus" aria-hidden="true"></i></div>')
            label.text(nametitle).attr('for', indexid)
            input.prop('checked', layer.getVisible())
            form.append(input).append(label)
            content.append(form)
            li.append(content)
            if (layer instanceof ol.layer.Group) {
                li.append(layerData(layer, indexid + '-'))
            } else {
                li.addClass('leaf')
            }
            ret.prepend(li)

            input.attr('id', indexid).on('change', function() {
                console.log('changed', this)
                let state = $(this).is(':checked')
                layer.setVisible(state)
            })

            layer.on('change:visible', function(){
                input.prop('checked', layer.getVisible())
            })
            
        })
        return ret
    }

    colapsable.append(layerData(group))
    let expander = colapsable.find('li:not(.leaf)')
    expander.each(function(){
        let th = $(this)
        th.find('> .row .expander').on('click', () => {
            let expanded = th.is('.open')
            expander.removeClass('open')
            if(!expanded){
                th.addClass('open')
            }
        })

        let eveble = true
        let input = th.find('> .row input:checkbox')
        let inputChilds = th.find('> ul > li > .row input:checkbox')
        input.on('change', function(){
            if(eveble){
                let val = $(this).is(':checked')
                if(val){
                    inputChilds.prop('checked', val)
                    inputChilds.trigger('change')
                }
            }
            eveble = true
        })

        inputChilds.on('change', function(){
            eveble = false
            let val = $(this).is(':checked')
            if(val){
                input.prop('checked', val)
                input.trigger('change')
            }
        })
    })

})

jQuery(function($){

    var circleNames = []
    var divisionNames = []
    var subDivisionNames = []
    var rangeNames = []
    var sectionNames = []
    var phadiNames = []

    var vectorSourcecirlce = new ol.source.Vector()
    var featureOverlaycircle = new ol.layer.Vector({
        map: mapapi.olMap,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    var textCircle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#006400',
            width: 7.5,
            lineDash: [8, 5]
        }),
        text: new ol.style.Text({
            font: '20px Times New Roman',
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            }),
        })
    })
    var vectorSourcedivision = new ol.source.Vector()
    var featureOverlaydivision = new ol.layer.Vector({
        map: mapapi.olMap,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    var textDivision = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#4287f5',
            width: 6.5,
            lineDash: [6, 4]
        }),
        text: new ol.style.Text({
            font: '18px Times New Roman',
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            }),
        })
    })
    var vectorSourcesubdivision = new ol.source.Vector()
    var featureOverlaysubdivision = new ol.layer.Vector({
        map: mapapi.olMap,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    var textSubDivision = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#cc2546',
            width: 4.5,
            lineDash: [8, 5]
        }),
        text: new ol.style.Text({
            font: '16px Times New Roman',
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            }),
        })
    })
    var vectorSourcerange = new ol.source.Vector()
    var featureOverlayrange = new ol.layer.Vector({
        map: mapapi.olMap,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    var textRange = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#512059',
            width: 3.5,
            lineDash: [8, 5]
        }),
        text: new ol.style.Text({
            font: '15px Times New Roman',
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            }),
        })
    })
    var vectorSourcesection = new ol.source.Vector()
    var featureOverlaysection = new ol.layer.Vector({
        map: mapapi.olMap,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    var textSection = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#2f6682',
            width: 5.5,
            lineDash: [8, 5]
        }),
        text: new ol.style.Text({
            font: '14px Times New Roman',
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            }),
        })
    })
    var vectorSourcephadi = new ol.source.Vector()
    var featureOverlayphadi = new ol.layer.Vector({
        map: mapapi.olMap,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    var textPhadi = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#a3912a',
            width: 7.5,
            lineDash: [8, 5]
        }),
        text: new ol.style.Text({
            font: '12px Times New Roman',
            fill: new ol.style.Fill({
                color: '#000000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            }),
        })
    })

    function reset_query(stage){
        switch(stage){
            default:
            case 'kldivision': $('#kldivision').html('<option value="">Select a Division</option>')
            case 'klsubdivision': $('#klsubdivision').html('<option value="">Select a Subdivision</option>')
            case 'klrange': $('#klrange').html('<option value="">Select a Range</option>')
            case 'klsection': $('#klsection').html('<option value="">Select a Section</option>')
            case 'klphadi': $('#klphadi').html('<option value="">Select a Phadi</option>')
        }
    }
    function reset_map(stage){
        switch(stage){
            default:
            case 'kldivision': vectorSourcedivision.clear()
            case 'klsubdivision': vectorSourcesubdivision.clear()
            case 'klrange': vectorSourcerange.clear()
            case 'klsection': vectorSourcesection.clear()
            case 'klphadi': vectorSourcephadi.clear()
        }
    }
    function call_api(url, data){
        data = data || {}
        return axios({
            url: base_url+url,
            headers: {
                'x-access-refreshtoken': sessionStorage.getItem("klpsis_reftkn"),
                'x-access-token': sessionStorage.getItem("klpsis_tkn") 
            },
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data
        })
    }
    function call_api_post(url, data){
        data = data || ''
        return axios.post(base_url+url, data, {
            headers: {
                'x-access-refreshtoken': sessionStorage.getItem("klpsis_reftkn"),
                'x-access-token': sessionStorage.getItem("klpsis_tkn") 
            },
        })
    }

    call_api('/getCicrle').then((response) => {
        if(response.data.status == 1){
            let postdata = response.data.post;
            for( k in postdata ){
                circleNames[postdata[k]['int_circle_id']] = postdata[k]['vch_circle_name']
                $('#klcircle').append('<option value="'+postdata[k]['int_circle_id']+'">'+postdata[k]['vch_circle_name']+'</option>');
            }
        }
    }).catch((err) => {
        console.log(err)
    })
    $('#klcircle').on('change', function(){
        let val = $(this).val()
        reset_query('kldivision')
        if(val == ''){
            return
        }
        call_api_post('/filterDivision', { "circleid": val }).then(function(responce){
            let post = responce.data.post
            for (var i = 0; i < post.length; i++) {
                divisionNames[post[i]['int_division_id']] = post[i]['vch_division_name']
                $('#kldivision').append("<option value='" + post[i]['int_division_id'] + "'>" + post[i]['vch_division_name'] + "</option>")
            }
        })
        call_api_post('/filterCircleGeojson', { "circleid": val }).then(function(responce){
            reset_map('kldivision')
            let data = responce.data
            let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + data.post.txtgeom + '}'
            let gjFormatpoly = new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857',
                strategy: ol.loadingstrategy.bbox,
            })
            
            vectorSourcecirlce.clear()
            vectorSourcecirlce.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
            textCircle.getText().setText(circleNames[val])
            featureOverlaycircle.setSource(vectorSourcecirlce)
            featureOverlaycircle.setStyle(textCircle)

            mapapi.olMap.getView().fit(vectorSourcecirlce.getExtent(), {
                size: mapapi.olMap.getSize(),
                maxZoom: 8
            })
        })
    })

    $('#kldivision').on('change', function(){
        let val = $(this).val()
        reset_query('klsubdivision')
        if(val == ''){
            return
        }
        call_api_post('/filterSubDivision', { "divisionid": val }).then(function(responce){
            let post = responce.data.post
            for (var i = 0; i < post.length; i++) {
                subDivisionNames[post[i]['sub_division_id']] = post[i]['sub_division_name']
                $('#klsubdivision').append("<option value='" + post[i]['sub_division_id'] + "'>" + post[i]['sub_division_name'] + "</option>")
            }
        })
        call_api_post('/filterDivisionGeojson', { "divisionid": val }).then(function(responce){
            reset_map('klsubdivision')
            let data = responce.data
            let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + data.post.txtgeom + '}'
            let gjFormatpoly = new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857',
                strategy: ol.loadingstrategy.bbox,
            })
            
            vectorSourcedivision.clear()
            vectorSourcedivision.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
            textDivision.getText().setText(divisionNames[val])
            featureOverlaydivision.setSource(vectorSourcedivision)
            featureOverlaydivision.setStyle(textDivision)

            mapapi.olMap.getView().fit(vectorSourcedivision.getExtent(), {
                size: mapapi.olMap.getSize(),
                maxZoom: 10
            })
        })
    })
    $('#klsubdivision').on('change', function(){
        let val = $(this).val()
        reset_query('klrange')
        if(val == ''){
            return
        }
        call_api_post('/filterRangeBySubDiv', { "subdivisionid": val }).then(function(responce){
            let post = responce.data.post
            for (var i = 0; i < post.length; i++) {
                rangeNames[post[i]['int_range_id']] = post[i]['vch_range_name']
                $('#klrange').append("<option value='" + post[i]['int_range_id'] + "'>" + post[i]['vch_range_name'] + "</option>")
            }
        })
        call_api_post('/filterSubDivisionGeojson', { "subdivisionid": val }).then(function(responce){
            reset_map('klrange')
            let data = responce.data
            let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + data.post.txtgeom + '}'
            let gjFormatpoly = new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857',
                strategy: ol.loadingstrategy.bbox,
            })
            
            vectorSourcesubdivision.clear()
            vectorSourcesubdivision.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
            textSubDivision.getText().setText(subDivisionNames[val])
            featureOverlaysubdivision.setSource(vectorSourcesubdivision)
            featureOverlaysubdivision.setStyle(textSubDivision)

            mapapi.olMap.getView().fit(vectorSourcesubdivision.getExtent(), {
                size: mapapi.olMap.getSize(),
                maxZoom: 12
            })
        })
    })
    $('#klrange').on('change', function(){
        let val = $(this).val()
        reset_query('klsection')
        if(val == ''){
            return
        }
        call_api_post('/filterSection', { "rangeid": val }).then(function(responce){
            let post = responce.data.post
            for (var i = 0; i < post.length; i++) {
                sectionNames[post[i]['int_sec_id']] = post[i]['vch_sec_name']
                $('#klsection').append("<option value='" + post[i]['int_sec_id'] + "'>" + post[i]['vch_sec_name'] + "</option>")
            }
        })
        call_api_post('/filterRangeGeojson', { "rangeid": val }).then(function(responce){
            reset_map('klsection')
            let data = responce.data
            let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + data.post.txtgeom + '}'
            let gjFormatpoly = new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857',
                strategy: ol.loadingstrategy.bbox,
            })
            
            vectorSourcerange.clear()
            vectorSourcerange.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
            textRange.getText().setText(rangeNames[val])
            featureOverlayrange.setSource(vectorSourcerange)
            featureOverlayrange.setStyle(textRange)

            mapapi.olMap.getView().fit(vectorSourcerange.getExtent(), {
                size: mapapi.olMap.getSize(),
                maxZoom: 13
            })
        })
    })
    $('#klsection').on('change', function(){
        let val = $(this).val()
        reset_query('klphadi')
        if(val == ''){
            return
        }
        call_api_post('/filterPhadi', { "sectionid": val }).then(function(responce){
            let post = responce.data.post
            for (var i = 0; i < post.length; i++) {
                phadiNames[post[i]['phadi_id']] = post[i]['phadi_name']
                $('#klphadi').append("<option value='" + post[i]['phadi_id'] + "'>" + post[i]['phadi_name'] + "</option>")
            }
        })
        call_api_post('/filterSectionGeojson', { "sectionid": val }).then(function(responce){
            reset_map('klphadi')
            let data = responce.data
            let txtgeom = data.post[data.post.length - 1].txtgeom
            let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + txtgeom + '}'
            let gjFormatpoly = new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857',
                strategy: ol.loadingstrategy.bbox,
            })
            
            vectorSourcesection.clear()
            vectorSourcesection.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
            textSection.getText().setText(sectionNames[val])
            featureOverlaysection.setSource(vectorSourcesection)
            featureOverlaysection.setStyle(textSection)

            mapapi.olMap.getView().fit(vectorSourcesection.getExtent(), {
                size: mapapi.olMap.getSize(),
                maxZoom: 14
            })
        })
    })
    $('#klphadi').on('change', function(){
        let val = $(this).val()
        if(val == ''){
            return
        }
        call_api_post('/filterPhadiGeojson', { "phadiid": val }).then(function(responce){
            let data = responce.data
            let txtgeom = data.post[data.post.length - 1].txtgeom
            let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + txtgeom + '}'
            let gjFormatpoly = new ol.format.GeoJSON({
                featureProjection: 'EPSG:3857',
                strategy: ol.loadingstrategy.bbox,
            })
            
            vectorSourcephadi.clear()
            vectorSourcephadi.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
            textPhadi.getText().setText(phadiNames[val])
            featureOverlayphadi.setSource(vectorSourcephadi)
            featureOverlayphadi.setStyle(textPhadi)

            mapapi.olMap.getView().fit(vectorSourcephadi.getExtent(), {
                size: mapapi.olMap.getSize(),
                maxZoom: 15
            })
        })
    })
})

jQuery(function($){
    var sketch
    var measureTooltipElement
    var measureTooltip
    var draw


    var source = new ol.source.Vector()

    var vector = new ol.layer.Vector({
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

    var formatLength = function (line) {
        var length = line.getLength(line);
        var output;
        if (length > 1000) {
          output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
          output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    }

    var formatArea = function (polygon) {
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
        closeInteraction()

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
        mapapi.olMap.addInteraction(draw);

        draw.on('drawstart', function (evt) {
            createTooltip()
            if(sketch){
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
        })
    }

    function createTooltip(){
        if(measureTooltip){
            mapapi.olMap.removeOverlay(measureTooltip)
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
        mapapi.olMap.addOverlay(measureTooltip);
    }

    function closeInteraction(){
        if(draw){
            mapapi.olMap.removeInteraction(draw)
            draw = null
        }
        if(sketch){
            source.removeFeature(sketch)
            sketch = null
        }
        if(measureTooltip){
            mapapi.olMap.removeOverlay(measureTooltip)
            measureTooltip = null
        }
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
    }
    
    var modify = new ol.interaction.Modify({source: source});
    mapapi.olMap.addLayer(vector)
    mapapi.olMap.addInteraction(modify)

    $('#areaTool').on('click', function(){
        addInteraction('Polygon')
        $('#clearTool').removeClass('d-none')
    })
    $('#distanceTool').on('click', function(){
        addInteraction('LineString')
        $('#clearTool').removeClass('d-none')
    })
    $('#clearTool').on('click', function(){
        closeInteraction()
        $(this).addClass('d-none')
    })

   

})