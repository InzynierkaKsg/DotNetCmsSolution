var allMarkers = [];
$(function () {
    var isChanged;

    $("#mapForm").dialog({
        open: LoadMap(),
        open: function (event, ui) { if ($('#mapPreview').gmap('get', 'map')) { google.maps.event.trigger($('#mapPreview').gmap('get', 'map'), 'resize') } },
        resizeStop: function (event, ui) { if ($('#mapPreview').gmap('get', 'map')) { google.maps.event.trigger($('#mapPreview').gmap('get', 'map'), 'resize') } },
        autoOpen: false,
        height: 600,
        width: 500,
        modal: true,
        show: 'puff',
        hide: 'scale',
        open: function () {
            isChanged = false;
        },
        buttons: {
            "Add": function () {
                $($(this).data('item')).html('<div id="mapViewer"></div>');
                $("#mapViewer").css({
                    width: '30%',
                    height: '300px'
                });
                AddMarkersToMap();
                WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());
                isChanged = true;
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            var adr = $('#address'),
                dsc = $('#description');

            allFields = $([]).add(adr).add(dsc);
            allFields.val("").removeClass("ui-state-error");

            if (isChanged)
                $("#contentUL").load(location.href + " #contentUL>*", function () {
                    $('.tooltp').tooltip();
                    $.getScript("hover.js");
                });
        }
    });
});
function LoadMap() {
    ResizeMapPreview();
    $('#mapPreview').gmap({ 'center': '52,20' });
    $('#mapPreview').gmap().bind('init', function (event, map) {
        $(map).click(function (event) {
            $('#mapPreview').gmap('addMarker', {
                'position': event.latLng,
                'draggable': true,
                'bounds': false
            }, function (map, marker) {
                $('#mapMarkerDialog').append('<form id="mapMarkerDialog' + marker.__gm_id + '" method="get" action="/" style="display:none;"><p><label for="country">Country</label><input id="country' + marker.__gm_id + '" class="txt" name="country" value=""/></p><p><label for="state">State</label><input id="state' + marker.__gm_id + '" class="txt" name="state" value=""/></p><p><label for="address">Address</label><input id="address' + marker.__gm_id + '" class="txt" name="address" value=""/></p><p><label for="comment">Comment</label><textarea id="comment" class="txt" name="comment" cols="40" rows="5" style="border: 1px solid grey;"></textarea></p></form>');
                findLocation(marker.getPosition(), marker);
            }).dragend(function (event) {
                findLocation(event.latLng, this);
            }).click(function () {
                openDialog(this);
            })
        });

        ChangeZIndex();
    });

    function findLocation(location, marker) {
        $('#mapPreview').gmap('search', { 'location': location }, function (results, status) {
            if (status === 'OK') {
                $.each(results[0].address_components, function (i, v) {
                    if (v.types[0] == "administrative_area_level_1" ||
					     v.types[0] == "administrative_area_level_2") {
                        $('#state' + marker.__gm_id).val(v.long_name);
                    } else if (v.types[0] == "country") {
                        $('#country' + marker.__gm_id).val(v.long_name);
                    }
                });
                marker.setTitle(results[0].formatted_address);
                $('#address' + marker.__gm_id).val(results[0].formatted_address);
                openDialog(marker);
            }
        });
    }

    function openDialog(marker) {
        $('#mapMarkerDialog' + marker.__gm_id).dialog({ 'modal': true, 'title': 'Edit and save point', 'buttons': {
            "Remove": function () {
                $(this).dialog("close");
                marker.setMap(null);
            },
            "Save": function () {
                $(this).dialog("close");
            }
        }
        });
    }
}

function ResizeMapPreview() {
    $("#mapPreview").css({
        width: '100%',
        height: '420px',
        margin: '0 auto'
    });
}

function ChangeZIndex() {
    $('#mapPreview').css('z-index', '1002');
    $('#mapMarkerDialog').css('z-index', '1005');

    var nodes = document.getElementById('mapPreview').childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
            nodes[i].style.zIndex = 1002;
            var nodes2 = nodes[i].childNodes;
            for (var j = 0; j < nodes2.length; j++) {
                if (nodes2[j].nodeName.toLowerCase() == 'div') {
                    nodes2[j].style.zIndex = 1002;
                    break;
                }
            }
            break;
        }
    }
}

function AddMarkersToMap() {
    $('#mapViewer').gmap({ 'center': '52,20' });
    $('#mapViewer').gmap('option', 'zoom', 5);
    var markers = $('#mapPreview').gmap('get', 'markers');
    for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        var addedMarker = $('#mapViewer').gmap('addMarker', marker);
    }
}