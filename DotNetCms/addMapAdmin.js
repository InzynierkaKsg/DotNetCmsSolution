var mapCountry;
var mapState;
var mapAddress;
function addMap(option) {

    $('#mapCanvas').gmap({'disableDefaultUI': false, 'streetViewControl': false, 'draggable': false, 'mapTypeControl': false }).bind('init', function (event, map) {
        if (option === 0) {
            addMarkerOption1(event, map);
        }
        else {
            addMarkerOption2(event, map);
        }
    });

    function addMarkerOption1(event, map) {
        $('#mapCanvas').gmap('get', 'map').setOptions({ 'center': new google.maps.LatLng(52, 20) });
        $(map).click(function (event) {
            var markers = $('#mapCanvas').gmap('get', 'markers');
            if (markers.length === 0) {
                $('#mapCanvas').gmap('addMarker', {
                    'position': event.latLng,
                    'draggable': false,
                    'bounds': false,
                    'icon': '/DotNetCms/images/map_icon.png'
                }, function (map, marker) {
                    $('#mapMarkerDialog').append('<form id="mapMarkerDialog' + marker.__gm_id + '" method="get" action="/" style="display:none;"><p><label for="country">Country</label><input id="country' + marker.__gm_id + '" class="txt" name="country" value=""/></p><p><label for="state">State</label><input id="state' + marker.__gm_id + '" class="txt" name="state" value=""/></p><p><label for="address">Address</label><input id="address' + marker.__gm_id + '" class="txt" name="address" value=""/></p><p><label for="comment">Comment</label><textarea id="comment" class="txt" name="comment" cols="40" rows="5" style="border: 1px solid grey;"></textarea></p></form>');
                    findLocation(marker.getPosition(), marker);
                }).click(function () {
                    openDialog(this);
                })
            }
        });
        $('#mapMarkerDialog').css('z-index', '1005');
    }

    function addMarkerOption2(event, map) {
        var markerString;

        $.ajax(
            {
                type: "POST",
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "../WebService.asmx/GetMarker",
                data: "{ 'id': '" + $('#currentPage').text() + "' }",
                success: function (msg) {
                    markerString = msg.d;
                }
            });
            if (markerString) {
            var markerStringSplit = markerString.split(";;;");
            var lng = markerStringSplit[0];
            var lat = markerStringSplit[1];
            var comment = markerStringSplit[2];
            var country1 = markerStringSplit[3];
            var state1 = markerStringSplit[4];
            var address1 = markerStringSplit[5];

            if (country1 != "undefined") {
                mapCountry = country1;
                mapState = state1;
                mapAddress = address1;
            }

            if (lng == "" || lng == null || lat =="" || lat == null) {
                addMarkerOption1(event, map);
            }
            else {
                var latlng = new google.maps.LatLng(lat, lng);
                $('#mapCanvas').gmap('get', 'map').setOptions({ 'center': latlng });
                $('#mapCanvas').gmap('addMarker', {
                    'position': latlng,
                    'draggable': false,
                    'bounds': false,
                    'icon': '/DotNetCms/images/map_icon.png'
                }, function (map, marker) {
                    $('#mapMarkerDialog').append('<form id="mapMarkerDialog' + marker.__gm_id + '" method="get" action="/" style="display:none;"><p><label for="country">Country</label><input id="country' + marker.__gm_id + '" class="txt" name="country" value=""/></p><p><label for="state">State</label><input id="state' + marker.__gm_id + '" class="txt" name="state" value=""/></p><p><label for="address">Address</label><input id="address' + marker.__gm_id + '" class="txt" name="address" value=""/></p><p><label for="comment">Comment</label><textarea id="comment" class="txt" name="comment" cols="40" rows="5" style="border: 1px solid grey;"></textarea></p></form>');
                    $('#comment').append(comment);
                    $('#country' + marker.__gm_id).val(country1);
                    $('#state' + marker.__gm_id).val(state1);
                    $('#address' + marker.__gm_id).val(address1);
                }).click(function () {
                    openDialog(this);
                })
            }
        }
    }

    function findLocation(location, marker) {
        $('#mapCanvas').gmap('search', { 'location': location }, function (results, status) {
            if (status === 'OK') {
                $.each(results[0].address_components, function (i, v) {
                    if (v.types[0] == "administrative_area_level_1" ||
					     v.types[0] == "administrative_area_level_2") {
                        $('#state' + marker.__gm_id).val(v.long_name);
                        mapState = v.long_name;
                    } else if (v.types[0] == "country") {
                        $('#country' + marker.__gm_id).val(v.long_name);
                        mapCountry = v.long_name;
                    }
                });
                marker.setTitle(results[0].formatted_address);
                $('#address' + marker.__gm_id).val(results[0].formatted_address);
                mapAddress = results[0].formatted_address;
                openDialog(marker);
            }
        });
    }

    function openDialog(marker) {
        var isChanged;
        $('#mapMarkerDialog' + marker.__gm_id).dialog({ 'modal': true, 'title': 'Edit and save point',
            open: function () {
                isChanged = false;
            },
            'buttons': {
                "Save": function () {
                    //var comm = $('#comment').val();
                    var comm = document.getElementById('comment').value;
                    document.getElementById('mapViewerDelete').innerHTML = "";

                    var pos = marker.getPosition();
                    $('#mapCanvas').gmap('get', 'map').setOptions({ 'center': pos });
                    var x = pos.lng();
                    var y = pos.lat();

                    WebService.AddMarker($('#currentPage').text(), x, y, comm + ";;;" + mapCountry + ";;;" + mapState + ";;;" + mapAddress);
                    WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());

                    google.maps.event.trigger($('#mapCanvas').gmap('get', 'map'), 'resize');
                    isChanged = true;
                    setTimeout(function () {
                        addMap(1);
                    }, 500);
                    $(this).dialog("close");
                },
                "Remove": function () {
                    marker.setMap(null);
                    $('#mapCanvas').gmap('clear', 'markers');
                    WebService.DeleteMarker($('#currentPage').text());
                    document.getElementById('mapViewerDelete').innerHTML = "";
                    WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());
                    isChanged = true;
                    setTimeout(function () {
                        $("#contentUL").load(location.href + " #contentUL>*", function () {
                            $.getScript("../refresh.js");
                            addMap(0);
                        });
                    }, 500);

                    $(this).dialog("close");
                }
            },
            close: function () {
                if (isChanged) {
                    
                }
            }
        });
    }
}

$(function () {
    $(document).ready(function () {
        addMap(1);
    });
    $(window).resize(function () {
        var markers = $('#mapCanvas').gmap('get', 'markers');
        if (markers[0] != null) {
            var pos = markers[0].getPosition();
            $('#mapCanvas').gmap('get', 'map').setOptions({ 'center': pos });
        }
    });
    $("body").delegate('#mapCanvas', 'mouseover mouseleave', function (e) {
        if (e.type == 'mouseover') {
            $("#mapViewerDelete").css({
                width: '100%',
                height: '30px',
                visibility: 'visible',
                paddingBottom: '7px'
            });
            document.getElementById('mapViewerDelete').innerHTML = "<button id=\"deleteMapButton\">Click to delete the map</button>";
            $("#deleteMapButton")
            .button()
            .click(function (event) {
                event.preventDefault();
                $('.ui-draggable.mapViewer').remove();
                WebService.DeleteMarker($('#currentPage').text());
                WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());

                setTimeout(function () {
                    $("#contentUL").load(location.href + " #contentUL>*", function () {
                        $.getScript("../refresh.js");
                    });
                }, 500);
            });
        } else {
            setTimeout(function () {
                $("#mapViewerDelete").css({
                    width: '0%',
                    height: '0px',
                    visibility: 'hidden'
                });
                var mapDeleteDiv = document.getElementById('mapViewerDelete');
                if (mapDeleteDiv != null) {
                    mapDeleteDiv.innerHTML = "";
                }
            }, 1400);
        }
    });
});