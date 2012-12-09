$(function () {

    $("#contentUL").sortable({
        placeholder: "ui-state-highlight",
        update: function (event, ui) {
            if (event.handleObj.namespace == 'sortable') {
                WebService.SaveContent($('#contentUL').html(), $('#currentPage').text());
            }
        },
        receive: function (event, ui) {
            var newItem = $(this).data().sortable.currentItem;
            newItem.html("");

            switch (ui.item.attr('id')) {
                case 'textEditor':
                    newItem.addClass("editable");
                    $("#textAddForm").data('item', newItem);
                    $("#textAddForm").dialog('open');
                    $("#dialogAddTextEditor").htmlarea();
                    break;
                case 'accordion':
                    newItem.addClass("editableAccordion");
                    $("#tabForm").data('item', newItem);
                    $("#tabForm").data('option', 3);
                    $("#tabForm").dialog('open');
                    break;
                case 'picture':
                    newItem.addClass("editablePicture");
                    $("#pictureForm").data('item', newItem);
                    $("#pictureForm").dialog('open');
                    newItem.tooltip();
                    break;
                case 'tab1':
                    newItem.addClass("editableTab1");
                    $("#tabForm").data('item', newItem);
                    $("#tabForm").data('option', 1);
                    $("#tabForm").dialog('open');
                    break;
                case 'tab2':
                    newItem.addClass("editableTab2");
                    $("#tabForm").data('item', newItem);
                    $("#tabForm").data('option', 2);
                    $("#tabForm").dialog('open');
                    break;
                case 'map':
                    var cnv = $('#mapCanvas');
                    if (cnv.length === 0) {
                        newItem.addClass("mapViewer");
                        $(".mapViewer").html('<div id="mapCanvas" style="border: 3px solid grey;"></div><div id="mapViewerDelete"></div>');
                        $("#mapCanvas").css({
                            width: '100%',
                            height: '300px'
                        });

                        $("#mapViewerDelete").css({
                            visibility: 'hidden' 
                        });
                        addMap(0);
                    }
                    else {
                        alert('Cannot open second map on the same site.');
                    }
                    break;
            }
        }
    });

    $("#toolbox > li").draggable({
        connectToSortable: '#contentUL',
        containment: "document",
        revert: "invalid",
        helper: "clone"
    });

    $("#footer").click(function () {
        console.log($('html')[0].outerHTML);
    });

    $("#logo").dblclick(function () {
        $("#pictureFormEdit").data('item', $(this));
        $("#pictureFormEdit").data('class', $(this)[0].className);
        $("#pictureFormEdit").data('logo', true);
        $("#pictureFormEdit").dialog('open');
    });


    $(".editable").live("click", function () {
        $("#textEditorForm").data('item', $(this));
        $("#textEditorForm").data('class', $(this)[0].className);
        $("#textEditorForm").dialog('open');
        $("#dialogTextEditor").htmlarea('html', $(this).html());
    });

    $(".editablePicture").live("dblclick", function () {
        $("#pictureFormEdit").data('item', $(this));
        $("#pictureFormEdit").data('class', $(this)[0].className);
        $("#pictureFormEdit").data('logo', false);
        $("#pictureFormEdit").dialog('open');
    });

    $(".editableAccordion").live("dblclick", function () {
        $("#tabEditForm").data('item', $(this));
        $("#tabEditForm").data('option', 3);
        $("#tabEditForm").dialog('open');
    });

    $(".editableTab1").live("dblclick", function () {
        $("#tabEditForm").data('item', $(this));
        $("#tabEditForm").data('option', 1);
        $("#tabEditForm").dialog('open');
    });

    $(".editableTab2").live("dblclick", function () {
        $("#tabEditForm").data('item', $(this));
        $("#tabEditForm").data('option', 2);
        $("#tabEditForm").dialog('open');
    });

    $("#tabListEdit").sortable({
        placeholder: "ui-state-highlight"
    });

    $("#tabListEdit").disableSelection();
});