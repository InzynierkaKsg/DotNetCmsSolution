$(function () {
    //formularz do zdjec
    $('<p class="validateTips"></p><form><div class="picker"><select><option SELECTED>Url</option>'
        + '<option>Select File</option></select>'
        + '<a href="#" class="toggle" id="selectedPicture" >Url<span class="caret"></span></a><ul><li><a href="#" class="selctablePicture">Url</a></li><li>'
        + '<a href="#" class="selctablePicture">Select File</a></li></ul></div><div id="urlPicture"><label for="url">Url</label><input '
        + 'type="text" name="url" id="url" class="text ui-widget-content ui-corner-all" /></div>'
        + '<div id="selectFilePicture"><p class="btn submit"><input type="File" value="Select picture"'
        + ' name="choosePicture" id="choosePicture" accept="image/*"/></p></div></form>').appendTo('#pictureForm');


    $('<p class="validateTips"></p><form><div class="picker"><select><option SELECTED>Url</option>'
        + '<option>Select File</option></select>'
        + '<a href="#" class="toggle" id="selectedPictureEdit" >Url<span class="caret">'
        + '</span></a><ul><li><a href="#" class="selctablePictureEdit">Url</a></li><li>'
        + '<a href="#" class="selctablePictureEdit">Select File</a></li></ul></div>'
        + '<div id="urlPictureEdit"><label for="urlEdit">Url</label><input type="text" name="urlEdit" id="urlEdit"'
        + ' class="text ui-widget-content ui-corner-all" /></div>'
        + '<div id="selectFilePictureEdit" style="display: none"><p class="btn submit"><input type="File" value="Choose picture"'
        + ' name="choosePictureEdit" id="choosePictureEdit" accept="image/*"/></p></div></form>').appendTo('#pictureFormEdit');

    //formularz do tabow
    $('<p class="validateTips"></p><form><label>Titles</label>'
        + '<span class="ui-icon ui-icon-circle-plus"/><br/><label>Titles</label>'
        + '<ul id="tabList"><li id="tabLi1">'
        + '<input type="text" id="tab_title1" value="" class="ui-widget-content ui-corner-all" />'
        + '<span class="ui-icon ui-icon-close"/></li></lu></form>').appendTo('#tabForm');

    //formularz do edycji tabow
    $('<p class="validateTips"></p><form><label>Titles</label>'
        + '<span class="ui-icon ui-icon-circle-plus"/><br/><label>Titles</label>'
        + '<ul id="tabListEdit"></lu></form>').appendTo('#tabEditForm');

    //slidery
    $('<div id="redSlider"></div><div id="greenSlider"></div><div id="blueSlider">'
        + '</div><div id="swatch" class="ui-widget-content ui-corner-all"></div>').appendTo('#picker');

    //dodaj edytor tekstu
    $('<textarea id="dialogAddTextEditor" rows="10" style="width: 400px">Click to edit.</textarea>').appendTo('#textAddForm');

    //edytuj tekst
    $('<p class="validateTips"></p><textarea id="dialogTextEditor" rows="10" style="width: 400px"></textarea>').appendTo('#textEditorForm');

    //formularz do map
    $('<form><div id="mapMarkerDialog"></div><div id="mapPreview"></div></form>').appendTo('#mapForm');

    //formularz do page'ow
    $('<p class="validateTips"></p><form><label>Pages names:</label>'
        + '<ul id="pageList"></lu></form>').appendTo('#pageForm');

    //formularz do  nowej strony
    $('<p class="validateTips"></p><form>'
        + '<label>Name of page</label>'
        + '<input type="text" id="newPage" value="" class="ui-widget-content ui-corner-all" /></form>').appendTo('#addPageForm');

});