//$(document).ready(function () {
//    createToolbar(['add', 'edit', 'delete'], 'card-taskbar');
//});

const buttonTypes = {
    'add': {
        icon: "fas fa-plus",
        label: "Thêm mới",
        action: function () { alert("Thêm mới được nhấn!"); }
    },
    'edit': {
        icon: "fas fa-edit",
        label: "Chỉnh sửa",
        action: function () { alert("Chỉnh sửa được nhấn!"); }
    },
    'delete': {
        icon: "fas fa-trash",
        label: "Xóa",
        action: function () { alert("Xóa được nhấn!"); }
    },
    'save': {
        icon: "fas fa-save",
        label: "Lưu",
        action: function () { alert("Lưu được nhấn!"); }
    },
    'import': {
        icon: "fas fa-file-import",
        label: "Import",
        action: function () { alert("Import được nhấn!"); }
    },
    'export': {
        icon: "fas fa-file-export",
        label: "Export",
        action: function () { alert("Export được nhấn!"); }
    },
    'undo': {
        icon: "fas fa-undo",
        label: "Undo",
        action: function () { alert("Hoàn tác"); }
    }
};

function createToolbar(buttonConfigs, containerId) {
    // Xóa toolbar cũ nếu có
    $(`#${containerId}`).empty();
    
    var taskbar = $('<div class="taskbar"></div>');

    // Duyệt qua từng nút trong cấu hình đầu vào
    buttonConfigs.forEach(function (config) {
        let buttonType, buttonAction;
        
        if (typeof config === 'string') {
            buttonType = config;
            buttonAction = buttonTypes[buttonType].action;
        } else {
            buttonType = config.type;
            buttonAction = config.action || buttonTypes[buttonType].action; 
        }
        
        if (buttonTypes[buttonType]) {
            var buttonElement = $(`<a href="javascript:void(0);" class="taskbar-button" id="${buttonType}-btn" title="${buttonTypes[buttonType].label}">
                                                <i class="${buttonTypes[buttonType].icon}"></i>
                                            </a>`);
                                            
            buttonElement.click(buttonAction);
            
            taskbar.append(buttonElement);
        }
    });
    
    $(`#${containerId}`).append(taskbar);
}

/**
 * 
 * @param {any} value
 * @param {any} style
 * @param {any} language
 * @param {any} currency
 * @param {any} numberZero
 * @returns
 */
function NumberFormat(value, style, language, currency, numberZero) {
	var gasPrice = new Intl.NumberFormat(language, {
		style: style,
		currency: currency,
		minimumFractionDigits: numberZero
	});

	if (typeof value == "string") {
		return gasPrice.format(0);
	}
	return gasPrice.format(value);
}