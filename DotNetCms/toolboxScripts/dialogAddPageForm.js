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
            var pageName = $("#newPage");

            pageName.val('').removeClass("ui-state-error");
            if (isChanged)
                $("#menuNav").load(location.href + " #menuNav>*", function () {
                    $.getScript("hover.js");
                });
        }
    });
});