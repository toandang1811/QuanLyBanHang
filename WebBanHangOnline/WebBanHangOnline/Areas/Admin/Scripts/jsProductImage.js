var listAction = []
var idx = 0;
$(document).ready(function () {
    createToolbar(
        [
            {
                type: 'add',
                action: actionScreen.addHandler
            },
            {
                type: 'save',
                action: actionScreen.saveHandler
            },
            {
                type: 'undo',
                action: actionScreen.undoHandler
            }
        ], 'card-taskbar');

    actionScreen.loadDefault();

    $('#fileInput').change(function () {
        var file = this.files[0];
        if (file && file.type.startsWith("image/")) {
            actionScreen.addImage(file);
        }
    })

    $('body').on('click', '.close', function () {
        var id = $(this).data('id');
        actionScreen.deleteImage(id);
    });
});

actionScreen = new function () {
    this.loadDefault = function () {
        $('#undo-btn').attr("aria-disabled", true);
    }

    /**
     * action add handler
     */
    this.addHandler = function () {
        $("#fileInput").click();
    }

    this.saveHandler = function () {
        var listAdd = listAction.filter(x => x.actionType == 'add');
        var listDelete = listAction.filter(x => x.actionType == 'delete' && x.id.startsWith('image-add'))
    }

    this.undoHandler = function () {
        if (listAction.length == 0) return;

        var item = listAction.pop();
        switch (item.actionType) {
            case 'add':
                if (!IsNullOrEmpty(item.id)) {
                    $("#" + item.id).remove();
                }
                break;
            case 'delete':
                var element = `<div class="project" id="${item.id}">
                                    <button class="close" data-id="${item.id}"><i class="fas fa-times"></i></button>
                                    <img class="smallImage" id="src-${item.id}" src="{0}">
                                </div>`
                if (!IsNullOrEmpty(item.prevNodeId)) {
                    var prevNode = $('#' + item.prevNodeId)
                    if (item.docType == 0) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            let src = e.target.result;
                            prevNode.after(formatString(element, src));
                        }
                        reader.readAsDataURL(item.file);
                    }
                    else {
                        prevNode.after(formatString(element, item.url));
                    }
                    prevNode.after()
                }
                else if (!IsNullOrEmpty(item.nextNodeId)) {
                    var container = $('#container-product-image');
                    var nextNode = $('#' + item.nextNodeId);
                    var newNode = null;
                    if (item.docType == 0) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            let src = e.target.result;
                            newNode = document.createElement(formatString(element, src));
                            container.insertBefore(newNode, nextNode);
                        }
                        reader.readAsDataURL(item.file);
                    }
                    else {
                        newNode = document.createElement(formatString(element, item.url));
                        container.insertBefore(newNode, nextNode);
                    }
                }
                else {
                    actionScreen.addImage(item.file);
                }
                break;
            default: break;
        }
        if (listAction.length == 0) {
            $('#undo-btn').attr("aria-disabled", true);
        }
    }

    /**
     * thêm 1 ảnh vào collections của sản phẩm
     * @param {any} file
     */
    this.addImage = function (file) {
        var firstChildId = $('#container-product-image').children().first().attr('id');
        var action = new Action('add', 'image-add-' + idx, file, null, 0, null, firstChildId);
        listAction.push(action);
        var reader = new FileReader();
        reader.onload = function (e) {
            let src = e.target.result;
            let element = `<div class="project" id="image-add-${idx}">
                                    <button class="close" data-id="image-add-${idx}"><i class="fas fa-times"></i></button>
                                    <img class="smallImage" id="src-image-add-${idx}" src="${src}">
                                </div>`;
            $('#container-product-image').append(element);
            idx++;
            $('#undo-btn').attr("aria-disabled", false);
        }
        reader.readAsDataURL(file);
    }

    this.deleteImage = function (id) {
        var action = new Action();
        action.actionType = 'delete';
        action.id = id;
        action.prevNodeId = $(`#${id}`).prev('div')?.attr('id');
        action.nextNodeId = $(`#${id}`).next('div')?.attr('id');
        if (id.startsWith('image-add')) {
            var item = listAction.find(x => x.id == id);
            if (item != null) {
                action.url = null;
                action.docType = 0;
                action.file = item.file;
            }
        }
        else {
            action.url = $(`src-${id}`).attr('src');
            action.docType = 1;
            action.file = null;
        }
        $(`#${id}`).remove();
        listAction.push(action);
        $('#undo-btn').attr("aria-disabled", false);
    }
}

/**
 * lưu giá trị vừa hành động để undo
 */
class Action {
    /**
     * Hàm khởi tạo với đầy đủ properties
     * @param {any} actionType - loại hành động: add, delete
     * @param {any} id - id của thẻ div project
     * @param {any} file - file
     * @param {any} url - url
     * @param {any} docType - là loại file: 0, url: 1
     * @param {any} prevNodeId - id của node trước đó
     * @param {any} nextNodeId - id của node sau đó
     */
    constructor(actionType = null, id = null, file = null, url = null, docType = null, prevNodeId = null, nextNodeId = null) {
        this.actionType = actionType; 
        this.id = id;
        this.file = file;
        this.url = url;
        this.docType = docType;
        this.prevNodeId = prevNodeId;
        this.nextNodeId = nextNodeId;
    }
}