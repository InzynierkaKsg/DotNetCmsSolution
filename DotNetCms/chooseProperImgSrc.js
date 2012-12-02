$(function () {
    chooseProperImageFiles();

    $(window).resize(function () {
        chooseProperImageFiles();
    });

    function chooseProperImageFiles() {
        $(function () {
            var winW = document.body.clientWidth;
            if (winW < 800) {
                var images = document.querySelectorAll('ul#contentUL img');
                for (var j = 0; j < images.length; j++) {
                    var fileName = getFileNameWithoutPrefix(images[j].src);
                    images[j].src = '/images/small_' + fileName;
                }

            }
            if (winW >= 800 && winW < 1200) {
                var images = document.querySelectorAll('ul#contentUL img');
                for (var j = 0; j < images.length; j++) {
                    var fileName = getFileNameWithoutPrefix(images[j].src);
                    images[j].src = '/images/medium_' + fileName;
                }
            }
            else {
                var images = document.querySelectorAll('ul#contentUL img');
                for (var j = 0; j < images.length; j++) {
                    var fileName = getFileNameWithoutPrefix(images[j].src);
                    images[j].src = '/images/original_' + fileName;
                }
            }
        });

        function getFileNameWithoutPrefix(currFile) {
            splitPath = currFile.split("/");
            var currImgName = splitPath[splitPath.length - 1];

            alert(currImgName);

            var i = 0;
            for (; i < currImgName; i++) {
                if (currImgName[i] === '_') {
                    break;
                }
            }
            alert(currImgName.substring(i));
            return currImgName.substring(i);
        }


    }
});