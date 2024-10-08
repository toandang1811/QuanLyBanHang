﻿var actionList = []
$(document).ready(function () {    
    createToolbar(
        [
            {
                type: 'add',
                action: actionScreen.addHandler
            },
            'delete',
            'undo',
            'save'
        ], 'card-taskbar');

    $(`[unique-script-id="w-w-dm-id"] .btn-box`).click(function () {
        $(this).parent().children(".overlay").show();
    });
    
    $(`[unique-script-id="w-w-dm-id"] .close`).click(function () {
        $(`[unique-script-id="w-w-dm-id"] .overlay`).hide();
    });

    $('#fileInput').change(function () {
        var file = this.files[0];
        if (file && file.type.startsWith("image/")) {
            actionScreen.addImage(file);
            //var reader = new FileReader();
            //reader.onload = function (e) {
            //    var src = e.target.result;
            //    var element = `<div class="project">
            //                        <button class="close"><i class="fas fa-times"></i></button>
            //                        <img class="smallImage" src="${src}">
            //                        <div class="overlay">
            //                            <div class="overlay-inner">
            //                                <button class="close">
            //                                    Close X
            //                                </button>
            //                                <div class="hdImgs">
            //                                    <img class="squareImg" id="image-${0}" src="${src}">
            //                                </div>
            //                            </div>
            //                        </div>
            //                        <div class="btn-box">
            //                            <button class="btn">
            //                                View
            //                            </button>
            //                        </div>
            //                    </div>`;
            //    $('#container-product-image').append(element);
            //}
            //reader.readAsDataURL(file);
        }
    })
});

actionScreen = new function () {
    /**
     * xử lý button add
     */
    this.addHandler = function () {
        $("#fileInput").click();
    }

    this.deleteHandle = function () {

    }

    this.saveHandler = function () {

    }

    this.undoHandler = function () {

    }

    this.addImage = function (file) {
        var action = new Action('add', 0, file);
        actionList.push(action);
        var reader = new FileReader();
        reader.onload = function (e) {
            var src = e.target.result;
            var element = `<div class="project">
                                    <button class="close"><i class="fas fa-times"></i></button>
                                    <img class="smallImage" src="${src}">
                                    <div class="overlay">
                                        <div class="overlay-inner">
                                            <button class="close">
                                                Close X
                                            </button>
                                            <div class="hdImgs">
                                                <img class="squareImg" id="image-${0}" src="${src}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="btn-box">
                                        <button class="btn">
                                            View
                                        </button>
                                    </div>
                                </div>`;
            $('#container-product-image').append(element);
        }
        reader.readAsDataURL(file);
    }
}

/**
 * lưu giá trị vừa hành động để undo
 */
class Action {
    constructor(type, id, file) {
        this.type = type; 
        this.id = id;
        this.file = file;
    }
}