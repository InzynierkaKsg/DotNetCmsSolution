$(function () {
    var innerRows = $('#logInForm > table > tbody > tr > td > table > tbody tr');
    var header = $('td', innerRows[0])[0];
    $(header).css({
        fontSize: '150%',
        fontWeight: 'bold',
        paddingBottom: '12px'
    });

    var rememberMeRow = innerRows[3];
    $(rememberMeRow).css({
        fontSize: '90%',
        padding: '0px',
        textAlign: 'right'
    });

    var rememberMeLabel = $('label', innerRows[3])[0];
    $(rememberMeLabel).css({
        paddingRight: '10px',
    });

    $('#Login1_LoginButton').css({
        marginRight: '10px',
        marginTop: '10px'
    });
});