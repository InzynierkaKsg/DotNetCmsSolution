function updateTips(t) {
    tips = $(".validateTips");
    tips
        .text(t)
        .addClass("ui-state-highlight");
    setTimeout(function () {
        tips.removeClass("ui-state-highlight", 1500);
    }, 500);
}

function checkLength(o, n, min) {
    if (o.val().length < min) {
        o.addClass("ui-state-error");
        updateTips("Length of " + n + " must be more than " +
            (min-1) + ".");
        return false;
    } else {
        o.removeClass("ui-state-error");
        return true;
    }
}