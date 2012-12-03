$(function () {
    var isChanged;

    $("#textEditorForm").dialog({
        width: 420,
        autoOpen: false,
        modal: true,
        open: function () {
            var tips = $(".validateTips");

            tips.text('');
            isChanged = false;
        },
        buttons: {
            "Save": function () {
                $($(this).data('item')).html($("#dialogTextEditor").htmlarea('html'));
                WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());
                isChanged = true;
                $(this).dialog("close");
            },
            "Delete": function () {
                if ($(this).data('class').match(/\bnotdelitable\b/))
                    updateTips("Delete is impossible.");
                else {
                    $($(this).data('item')).remove();
                    WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());
                    isChanged = true;
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            if(isChanged)
                setTimeout('$("#contentUL").load(location.href + " #contentUL>*",'
                    + ' function () { $(".tooltp").tooltip(); $.getScript("../hover.js");});', 1000);
        }
    });
});


