$(function () {
    var isChanged;
    $("#addPage").click(function () {
        $("#addPageForm").dialog('open');
    });

    dialog = $("#addPageForm").dialog({
        autoOpen: false,
        modal: true,
        show: 'puff',
        hide: 'scale',
        open: function () {
            var tips = $(".validateTips");

            tips.text('');
            isChanged = false;
        },
        buttons: {
            Add: function () {
                var pageName = $("#newPage"),
                    bValid = true;

                bValid = checkLength(pageName, "Name", 1);

                if (bValid) {
                    WebService.CreatePage(pageName.val());                   
                    var lastPageId = WebService.GetLastPage();
                    isChanged = true;
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            var pageName = $("#newPage"),
             navColor2;
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

            pageName.val('').removeClass("ui-state-error");
            if (isChanged) {
                $("#menuNav").load(location.href + " #menuNav>*", function () {
                    $.getScript("../hover.js");
                    changeColor(setZero(parseInt(navColor2[1])),
                     setZero(parseInt(navColor2[2])), setZero(parseInt(navColor2[3])));
                });
            }
        }
    });
});