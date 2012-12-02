$(function () {

    var selectedFile;
    $('#choosePicture').live('change', function () {
        selectedFile = this.files;
    });
    var isChanged;

    $('#selectFilePicture').toggle();

    $("#pictureForm").dialog({
        autoOpen: false,
        width: 420,
        height: 330,
        modal: true,
        show: 'puff',
        hide: 'scale',
        open: function () {
            var tips = $(".validateTips");

            tips.text('');
            isChanged = false;
        },
        buttons: {
            "Add": function () {
                var url = $("#url"),
                file = $("#choosePicture"),

                addres,
                bValid = true;

                if ($('#selectedPicture')[0].childNodes[0].data == "Url") {
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

                    $($(this).data('item')).html('<div style="text-align: center;"><img  class="picture tooltp" src="' + addres
                        + '" title="Double click to edit Picture."/></div>');

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
            var url = $("#url"),
            file = $("#choosePicture"),
            allFields = $([]).add(url).add(file);

            allFields.val("").removeClass("ui-state-error");

            if (isChanged)
                $("#contentUL").load(location.href + " #contentUL>*", function () {
                    $('.tooltp').tooltip();
                    $.getScript("hover.js");
                });
        }
    });

    $('.selctablePicture').live('click', function () {
        var selected = this.innerHTML
        wasSelected = $('#selectedPicture')[0].childNodes[0].data;

        if (selected != wasSelected) {
            $('#selectFilePicture').toggle();
            $('#urlPicture').toggle();
        }

    });
});



