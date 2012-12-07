$(function () {
    var elementy = $('#contentUL').find('li');

    $('.tabs1').tabs();
    $(".accordion").find('span').remove();
    $(".accordion").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false
    });

  
    for (var i = 0; i < elementy.length; i++)
        elementy[i].removeAttribute('style');
/komentarz/
});