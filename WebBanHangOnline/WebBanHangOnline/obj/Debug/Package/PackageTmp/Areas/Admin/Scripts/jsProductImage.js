var actionList = []
$(document).ready(function () {    
    createToolbar(
        [
            {
                type: 'add',
                action: actionToolBar.buttonAdd
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
            var reader = new FileReader();
            reader.onload = function (e) {
                var src = e.target.result;
                var action = new Action('add', 0, src);
                actionList.push(action);
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
    })
});

actionToolBar = new function () {
    this.buttonAdd = function () {
        $("#fileInput").click();
    }
}

/**
 * lưu giá trị vừa hành động để undo
 */
class Action {
    constructor(type, id, url) {
        this.type = type; 
        this.id = id;
        this.url = url;
    }
}