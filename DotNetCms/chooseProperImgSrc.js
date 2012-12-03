$(function () {
    chooseProperImageFiles();

    $(window).resize(function () {
        chooseProperImageFiles();
    });

    function chooseProperImageFiles() {
        $(function () {
            var winW = document.body.clientWidth;
            var contentDiv = document.getElementById("contentUL");
            var images = contentDiv.getElementsByTagName("img");
            for (var j = 0; j < images.length; j++) {
                var fileName = getFileNameWithoutPrefix(images[j].src);

                if (winW < 800) {
                    images[j].src = '/DotNetCms/images/small_' + fileName;
                }
                else {
                    if (winW >= 800 && winW < 1200) {
                        images[j].src = '/DotNetCms/images/medium_' + fileName;
                    }
                    else {
                        images[j].src = '/DotNetCms/images/original_' + fileName;
                    }
                }
            }
        });

        function getFileNameWithoutPrefix(currFile) {
            var splitPath = currFile.split("/");
            var currImgName = splitPath[splitPath.length - 1];
            var i;
            for (i = 0; i < currImgName.length; i++) {
                if (currImgName[i] === '_') {
                    break;
                }
            }
            return currImgName.substring(i + 1);
        }
    }
});