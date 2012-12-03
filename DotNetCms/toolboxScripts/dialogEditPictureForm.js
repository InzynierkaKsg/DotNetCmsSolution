$(function () {

    var selectedFile;
    $('#choosePictureEdit').live('change', function () {
        selectedFile = this.files;
    });
    var isChanged;

    $("#pictureFormEdit").dialog({
        autoOpen: false,
        width: 420,
        height: 330,
        modal: true,
        show: 'puff',
        hide: 'scale',
        open: function () {
            var tips = $(".validateTips");

            tips.text('');
            $("#urlEdit").attr('value', $($(this).data('item')).find('img').attr("src"));
            isChanged = false;
        },
        buttons: {
            "Save": function () {
                var url = $("#urlEdit"),
                file = $("#choosePictureEdit"),
                addres, html = "";
                bValid = true;

                if ($('#selectedPictureEdit')[0].childNodes[0].data == "Url") {
                    addres = url.val();
                    bValid = checkLength(url, "Url", 1);
                }
                else {
                    addres = "/DotNetCms/images/original_" + selectedFile[0].name;
                    bValid = checkLength(file, "File path", 1);

                    var data = new FormData();
                    data.append(selectedFile[0].name, selectedFile[0]);

                    $.ajax({
                        type: "POST",
                        url: "FileUploaderHandler.ashx",
                        contentType: false,
                        processData: false,
                        data: data,
                        error: function () {
                            alert("There was error uploading files!");
                            bValid = false;
                        }
                    });
                }

                if (bValid) {
                    if ($(this).data('logo')) {
                        WebService.UpdateLogo("<img src=" + addres + " />");
                    }
                    else {
                        html = '<div style="text-align: center;"><img class="picture tooltp" src="' + addres + '" title="Double click to edit Picture." /></div>';
                        $($(this).data('item')).html(html);
                        WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());
                    }
                    isChanged = true;
                    $(this).dialog("close");
                }
            },
            "Delete": function () {
                if ($(this).data('class').match(/\bnotDeleteable\b/))
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
            var url = $("#urlEdit"),
            file = $("#choosePictureEdit"),
            allFields = $([]).add(url).add(file);

            $('#selectFilePictureEdit').css('display', 'none');
            $('#urlPictureEdit').css('display', 'block');
            $('#selectedPictureEdit')[0].childNodes[0].data = "Url"

            allFields.val("").removeClass("ui-state-error");
            if (isChanged) {
                if ($(this).data('logo'))
                    $("#logo").load(location.href + " #logo>*", '');
                else
                    $("#contentUL").load(location.href + " #contentUL>*", function () {
                        $('.tooltp').tooltip();
                        $.getScript("../hover.js");
                    });
            }
        }
    });

    $('.selctablePictureEdit').live('click', function () {
        var selected = this.innerHTML
        wasSelected = $('#selectedPictureEdit')[0].childNodes[0].data;

        if (selected != wasSelected) {
            $('#selectFilePictureEdit').toggle();
            $('#urlPictureEdit').toggle();
        }

    });
});

