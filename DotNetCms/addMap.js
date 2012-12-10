$(function () {
    $('#mapCanvas').gmap({ 'disableDefaultUI': false, 'streetViewControl': false, 'mapTypeControl': false }).bind('init', function (event, map) {
        var markerString;

        $.ajax(
            {
                type: "POST",
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "WebService.asmx/GetMarker",
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

            if (lng == "" || lng == null || lat == "" || lat == null) {
            }
            else {
                var latlng = new google.maps.LatLng(lat, lng);
                $('#mapCanvas').gmap('get', 'map').setOptions({ 'center': latlng });
                $('#mapCanvas').gmap('addMarker', {
                    'position': latlng,
                    'draggable': false,
                    'bounds': false,
                    'icon': 'images/map_icon.png',
                    'title': address1 + "\r\n" + comment
                });
            }
        }
    });
});

$(function () {
    $(window).resize(function () {
        var markers = $('#mapCanvas').gmap('get', 'markers');
        if (markers[0] != null) {
            var pos = markers[0].getPosition();
            $('#mapCanvas').gmap('get', 'map').setOptions({ 'center': pos });
        }
    });
});