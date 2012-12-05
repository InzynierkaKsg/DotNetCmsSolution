$(function () {
    var navColor2, color2, color3, color4;

    function getcolor() {
        if (jQuery.browser.msie)
            navColor2 = $('#prettynav').css('backgroundColor');
        else {
            navColor2 = $('#prettynav').css('backgroundImage');
            if (jQuery.browser.chrome) {
                navColor2 = navColor2.replace('-webkit-linear-gradient(top, ', '');
                navColor2 = navColor2.replace('-webkit-gradient(linear, 0% 0%, 0% 100%, from(', '');
            }
            if (jQuery.browser.mozilla)
                navColor2 = navColor2.replace('-moz-linear-gradient(50% 0%, ', '');
            if (jQuery.browser.opera)
                navColor2 = navColor2.replace('-o-linear-gradient(top, ', '');

            navColor2 = navColor2.slice(0, navColor2.indexOf(')') + 1);
        }

        navColor2 = navColor2.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        if (getMaxRGB(parseInt(navColor2[1]), parseInt(navColor2[2]), parseInt(navColor2[3])) > 190) {
            color2 = hexFromRGB(setZero(parseInt(navColor2[1] * 0.75)),
                setZero(parseInt(navColor2[2] * 0.75)), setZero(parseInt(navColor2[3] * 0.75)));
            color3 = hexFromRGB(setZero(parseInt(navColor2[1]) + 20),
                setZero(parseInt(navColor2[2]) + 20), setZero(parseInt(navColor2[3]) + 20));
            color4 = hexFromRGB(setZero(parseInt(navColor2[1] * 0.75) - 15),
               setZero(parseInt(navColor2[2] * 0.75) - 15), setZero(parseInt(navColor2[3] * 0.75) - 15));
        }
        else if (getMaxRGB(parseInt(navColor2[1]), parseInt(navColor2[2]), parseInt(navColor2[3])) > 127) {
            color2 = hexFromRGB(setZero(parseInt(navColor2[1] * 0.55)),
                setZero(parseInt(navColor2[2] * 0.55)), setZero(parseInt(navColor2[3] * 0.55)));
            color3 = hexFromRGB(setZero(parseInt(navColor2[1]) + 20),
                setZero(parseInt(navColor2[2]) + 20), setZero(parseInt(navColor2[3]) + 20));
            color4 = hexFromRGB(setZero(parseInt(navColor2[1] * 0.55) - 15),
                setZero(parseInt(navColor2[2] * 0.55) - 15), setZero(parseInt(navColor2[3] * 0.55) - 15));
        }
        else if (getMaxRGB(parseInt(navColor2[1]), parseInt(navColor2[2]), parseInt(navColor2[3])) > 40) {
            color2 = hexFromRGB(setZero(parseInt(navColor2[1] * 1.45)),
                setZero(parseInt(navColor2[2] * 1.45)), setZero(parseInt(navColor2[3] * 1.45)));
            color3 = hexFromRGB(setZero(parseInt(navColor2[1]) - 20),
                setZero(parseInt(navColor2[2]) - 20), setZero(parseInt(navColor2[3]) - 20));
            color4 = hexFromRGB(setZero(parseInt(navColor2[1] * 1.45) + 15),
               setZero(parseInt(navColor2[2] * 1.45) + 15), setZero(parseInt(navColor2[3] * 1.45) + 15));
        }
        else {
            color2 = hexFromRGB(setZero(parseInt(navColor2[1]) + 60),
                setZero(parseInt(navColor2[2]) + 60), setZero(parseInt(navColor2[3]) + 60));
            color3 = hexFromRGB(setZero(parseInt(navColor2[1]) - 20),
                setZero(parseInt(navColor2[2]) - 20), setZero(parseInt(navColor2[3]) - 20));
            color4 = hexFromRGB(setZero(parseInt(navColor2[1]) + 75),
               setZero(parseInt(navColor2[2]) + 75), setZero(parseInt(navColor2[3]) + 75));
        }
    }

    $('.hov').hover(function (event, ui) {
        getcolor();

        $(this).css("background-color", "#" + color2);
    }, function () {
        getcolor();

        $(this).css("background-color", '#' + hexFromRGB(parseInt(navColor2[1]),
            parseInt(navColor2[2]), parseInt(navColor2[3])));
    });

    $('#tog').hover(function (event, ui) {
        getcolor();

        $(this).css("background", "#" + color2);
        $(this).css('box-shadow', 'none');
    }, function () {
        getcolor();

        if (jQuery.browser.chrome) {
            $(this).css("background", '-webkit-gradient(linear, left top, left bottom,'
                + ' color-stop(0%, #' + hexFromRGB(parseInt(navColor2[1]), parseInt(navColor2[2]),
                parseInt(navColor2[3])) + '), color-stop(100%,#' + color2 + '))');
            $(this).css('box-shadow', 'inset 0 1px 1px #' + color3 + ', 0 1px 1px #' + color3);
        } else if (jQuery.browser.mozilla) {
            $(this).css("background", '-moz-linear-gradient(top, #'
                + hexFromRGB(parseInt(navColor2[1]), parseInt(navColor2[2]),
                parseInt(navColor2[3])) + ' 0%,#' + color2 + ' 100%)');
            $(this).css('box-shadow', 'inset 0 1px 1px #' + color3 + ', 0 1px 1px #' + color3);
        } else if (jQuery.browser.opera) {
            $(this).css("background", '-o-linear-gradient(top, #' + hexFromRGB(parseInt(navColor2[1]),
                parseInt(navColor2[2]), parseInt(navColor2[3])) + ' 0%,#' + color2 + ' 100%)');
            $(this).css('boxShadow', 'inset 0 1px 1px #' + color3 + ', 0 1px 1px #' + color3);
        } else {

            $(this).css("background", '#' + hexFromRGB(parseInt(navColor2[1]),
                parseInt(navColor2[2]), parseInt(navColor2[3])));
            $(this).css('box-shadow', 'inset 0 1px 1px #' + color3 + ', 0 1px 1px #' + color3);
        }
    });

    $('.hovGradient').hover(function (event, ui) {
        getcolor();

        if (document.body.clientWidth > 767)
            $(this).css("background", "#" + color2);
        else
            $(this).css("background", "#f5f5f5");

        $(this).css('box-shadow', 'none');
    }, function () {
        getcolor();

        if (document.body.clientWidth > 767) {
            if (jQuery.browser.chrome) {
                $(this).css("background", '-webkit-gradient(linear, left top,' +
                    ' left bottom, color-stop(0%, #' + hexFromRGB(parseInt(navColor2[1]),
                    parseInt(navColor2[2]), parseInt(navColor2[3]))
                    + '), color-stop(100%,#' + color2 + '))');
                $(this).css('box-shadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('box-shadow', 'none');
            } else if (jQuery.browser.mozilla) {
                $(this).css("background", '-moz-linear-gradient(top, #'
                    + hexFromRGB(parseInt(navColor2[1]), parseInt(navColor2[2]),
                    parseInt(navColor2[3])) + ' 0%,#' + color2 + ' 100%)');
                $(this).css('box-shadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('boxShadow', 'none');
            } else if (jQuery.browser.opera) {
                $(this).css("background", '-o-linear-gradient(top, #'
                    + hexFromRGB(parseInt(navColor2[1]), parseInt(navColor2[2]),
                    parseInt(navColor2[3])) + ' 0%,#' + color2 + ' 100%)');
                $(this).css('boxShadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('boxShadow', 'none');
            } else {
                $(this).css("background-color", '#' + hexFromRGB(parseInt(navColor2[1]),
                    parseInt(navColor2[2]), parseInt(navColor2[3])));
                $(this).css('box-shadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('box-shadow', 'none');
            }
        } else {
            $(this).css("background", '#fff');
        }
    });

    $(window).resize(function () {
        var linki = $('.hovGradient');

        getcolor();

        if (document.body.clientWidth > 767) {
            if (jQuery.browser.chrome) {
                linki.css("background", '-webkit-gradient(linear, left top,' +
                    ' left bottom, color-stop(0%, #' + hexFromRGB(parseInt(navColor2[1]),
                    parseInt(navColor2[2]), parseInt(navColor2[3]))
                    + '), color-stop(100%,#' + color2 + '))');
                linki.css('box-shadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('box-shadow', 'none');
            } else if (jQuery.browser.mozilla) {
                linki.css("background", '-moz-linear-gradient(top, #'
                    + hexFromRGB(parseInt(navColor2[1]), parseInt(navColor2[2]),
                    parseInt(navColor2[3])) + ' 0%,#' + color2 + ' 100%)');
                linki.css('box-shadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('boxShadow', 'none');
            } else if (jQuery.browser.opera) {
                linki.css("background", '-o-linear-gradient(top, #'
                    + hexFromRGB(parseInt(navColor2[1]), parseInt(navColor2[2]),
                    parseInt(navColor2[3])) + ' 0%,#' + color2 + ' 100%)');
                linki.css('boxShadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('boxShadow', 'none');
            } else {
                linki.css("background-color", '#' + hexFromRGB(parseInt(navColor2[1]),
                    parseInt(navColor2[2]), parseInt(navColor2[3])));
                linki.css('box-shadow', 'inset 1px 0 0 #' + color3);
                $('#prettynav > ul > li:first-child > a').css('box-shadow', 'none');
            }
            $('#basicnav').css('border', '1px solid #' + color4);
            $('#basicnav2').css('border', '1px solid #' + color4);
        } else {
            linki.css("background", '#fff');
            linki.css('box-shadow', 'none');
            linki.css('text-shadow', 'none');
            $('#basicnav').css('border', 'none');
            $('#basicnav2').css('border', 'none');
        }
    });
});