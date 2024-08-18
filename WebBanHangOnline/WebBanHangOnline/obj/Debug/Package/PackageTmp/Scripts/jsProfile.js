////$(document).ready(function () {
////    CKEDITOR.replace('txtDetail', {
////        customConfig: '/content/ckeditor/config.js',
////        extraAllowedContent: 'span',
////    });
////});
function BrowseServer(field) {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {
        document.getElementById(field).value = fileUrl;
        document.getElementById("_avatar").src = fileUrl;
    };
    finder.popup();
}