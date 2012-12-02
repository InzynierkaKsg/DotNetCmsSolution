$(function () {
    var isChanged;

    $("#textAddForm").dialog({
        width: 420,
        autoOpen: false,
        modal: true,
        open: function () {
            isChanged = false;
        },
        buttons: {
            "Add": function () {
                $($(this).data('item')).html($("#dialogAddTextEditor").htmlarea('html'));
                WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());
                isChanged = true;
                $(this).dialog("close");
            },
            Cancel: function () {
                $($(this).data('item')).remove();
                $(this).dialog("close");
            }
        },
        close: function () {
            $($(this).data('item')).html($("#dialogAddTextEditor").htmlarea('html', "Clickt to edit."));

            if (isChanged)
                $("#contentUL").load(location.href + " #contentUL>*", function () {
                    $('.tooltp').tooltip();
                    $.getScript("hover.js");
                });
        }
    });
});


