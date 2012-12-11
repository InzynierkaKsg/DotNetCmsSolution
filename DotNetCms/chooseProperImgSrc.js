function selectProperImageFiles() {
    var winW = document.body.clientWidth;

    var logo = document.getElementById("logo");
    var logoImg = logo.getElementsByTagName("img");
    var logoFileName = getFileNameWithoutPrefix(logoImg[0].src);
    logoImg[0].src = 'images/original_' + logoFileName;
    
    var contentDiv = document.getElementById("contentUL");
    var images = contentDiv.getElementsByTagName("img");
    for (var j = 0; j < images.length; j++) {
        var fileName = getFileNameWithoutPrefix(images[j].src);
        if (fileName != null && fileName != "icon.png") {
            if (winW < 800) {
                images[j].src = 'images/small_' + fileName;
            }
            else {
                if (winW >= 800 && winW < 1200) {
                    images[j].src = 'images/medium_' + fileName;
                }
                else {
                    images[j].src = 'images/original_' + fileName;
                }
            }
        }
    }

    function getFileNameWithoutPrefix(currFile) {
        var splitPath = currFile.split("/");
        if (splitPath[splitPath.length - 2] === 'images') {
            var currImgName = splitPath[splitPath.length - 1];
            var i;
            for (i = 0; i < currImgName.length; i++) {
                if (currImgName[i] === '_') {
                    break;
                }
            }
            return currImgName.substring(i + 1);
        }
        else {
            return null;
        }
    }
}


$(document).ready(function () {
    selectProperImageFiles();
});

$(window).resize(function () {
    selectProperImageFiles();
});