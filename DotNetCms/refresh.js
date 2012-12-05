$(function () {
    var elementy = $('#contentUL').find('li');

    $('.tabs1').tabs();
    $(".accordion").find('span').remove();
    $(".accordion").accordion({
        heightStyle: "content"
    });

  
    for (var i = 0; i < elementy.length; i++)
        elementy[i].removeAttribute('style');
});