$(function () {
    var isChanged;
    $("#adminek").click(function () {
        $("#adminekForm").dialog('open');
    });

       $("#adminekForm").dialog({
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
            Save: function () {
                var newPassword = $("#newPassword"),
                newPasswordRepeat = $("#newPasswordRepeat"),
                bValid = true;

                bValid = checkLength(newPassword, "Password", 1);
                if (bValid == true)
                    bValid = checkPassword(newPassword, newPasswordRepeat);

                if (bValid) {
                    WebService.ChangePassword(newPassword.val());
                    isChanged = true;
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            var newPassword = $("#newPassword");
            var newPasswordRepeat = $("#newPasswordRepeat");
            newPassword.val('').removeClass("ui-state-error");
            newPasswordRepeat.val('');          
        }
    });
});