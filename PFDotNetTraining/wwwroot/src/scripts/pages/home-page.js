"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _helper_1 = __importDefault(require("../utilities/_helper"));
const _grid_1 = __importDefault(require("../components/_grid"));
const RenderTemplate_1 = require("../components/Models/RenderTemplate");
const dataOperation_1 = require("../data/dataOperation");
const utilities_function_1 = require("../utilities/utilities-function");
const constant_1 = require("../utilities/constant");
const Item_1 = __importDefault(require("../components/Models/Item"));
const jquery_1 = __importDefault(require("jquery"));
let currentDir = '';
let template = new RenderTemplate_1.RenderTemplate(document.getElementById("content-table"), constant_1.properties.ORDERING);
let clickedRow = 0;
let hoverRow = 0;
let editMode = false;
const randomLength = 5;
//function callback(mutationsList, observer) {
//    let classString: string = mutationsList[0].target.className;
//    let list: Array<string> = classString.split(" ");
//    if (!list.includes("show")) {
//        /*        setTimeout(() => { editMode = false }, 2000);*/
//        editMode = false
//    }
//}
//const mutationObserver = new MutationObserver(callback);
_helper_1.default(async () => {
    _grid_1.default();
    currentDir = constant_1.properties.BASE_DIRECTORY;
    addToCurrentDirectoryPath();
    await renderItemsOfCurrentFolder();
    let submitButton = document.getElementById('add-btn');
    addItemEvent(submitButton);
    let toggleButton = document.getElementById('toggle-button');
    addToggleButtonEvent(toggleButton);
    let modalEle = document.getElementById('add-modal');
    /*    mutationObserver.observe(modalEle, { attributes: true });*/
    //$('#add-modal').on('hidden.bs.modal', function (e) {
    //    setTimeout(function () {
    //        alert('The modal is completely hidden now!');
    //    }, 300);
    //})
    jquery_1.default('#add-modal').on('hidden.bs.modal', function () {
        console.log("modal dong ne");
        editMode = false;
    });
    checkboxEvent();
    attachGoUpEvent();
});
/**
 * Render all data with given array of Folder or Files.
 * @param {Array<Item>} input - Array of folders or files.
*/
function generateData(input) {
    clearCurrentData();
    for (let i = 0; i < input.length; i += 1) {
        let item = new Item_1.default();
        item.mapping(input[i]);
        let row = template.render(item);
        let id = item.Id;
        getRowIdOnHover(id, row);
        attachRemoveItemEvent(row);
        attachEditEvent(row);
        if (!item.IsFile) {
            attachOnclickFolder(id, row);
        }
    }
}
;
//Render all items in local storage
async function renderItemsOfCurrentFolder() {
    let items = [];
    items = await dataOperation_1.getItemsInFolder(clickedRow);
    await generateData(items);
}
//Clear current page data excluding header
function clearCurrentData() {
    let tr = document.getElementsByTagName('tr');
    while (tr.length != 1) {
        tr[1].remove();
    }
}
;
/**
 * Attach on click event to view items in folder for <tr> tag
 * @param {number} id - folder id.
 * @param {HTMLTableRowElement}  tr - <tr> element.
 */
function attachOnclickFolder(id, tr) {
    tr.addEventListener("click", async function () {
        //Check if data is in local storage and render
        let fold = await dataOperation_1.getItemById(id);
        clickedRow = id;
        let item = new Item_1.default();
        item.mapping(fold['data']);
        addToCurrentDirectoryPath(item.Name);
        let items = await dataOperation_1.getItemsInFolder(id);
        await generateData(items);
    });
}
/**
 * Passing Item id to global variable for a later use.
 */
function getRowIdOnHover(id, tr) {
    tr.onmouseover = function () {
        hoverRow = id;
    };
}
function addToggleButtonEvent(btn) {
    btn.onclick = function () {
        if (editMode) {
            let addBtn = document.getElementById("add-btn");
            addBtn.innerHTML = "Update";
        }
        else {
            let addBtn = document.getElementById("add-btn");
            addBtn.innerHTML = "Add";
        }
    };
}
/**
 * Attach add folder event to provided <button>.
 * @param {HTMLButtonElement}  btn - <tr> element.
 */
function addItemEvent(btn) {
    btn.onclick = async function () {
        //Get Name field
        let nameField = document.getElementById("name");
        let name = nameField.value;
        //Check if in put is a file
        let inputElem = document.getElementById("file");
        let isFile = inputElem.checked;
        let id = null;
        let creator = await dataOperation_1.getUserName();
        if (!editMode) {
            //Add file or folder
            let temp = {
                id: id,
                name: name,
                createdBy: creator,
                createdDate: utilities_function_1.getCurrentDate(),
                modifiedBy: creator,
                modifiedAt: utilities_function_1.getCurrentDate(),
                size: 50,
                parent: clickedRow,
                content: null,
                isFile: isFile ? 1 : 0
            };
            let item = new Item_1.default();
            item.mapping(temp);
            await dataOperation_1.createNewItem(item);
        }
        else {
            let file = await dataOperation_1.getItemById(hoverRow);
            let item = new Item_1.default();
            item.mapping(file['data']);
            item.Name = name;
            await dataOperation_1.updateExistingItem(hoverRow, item);
            editMode = false;
        }
        await renderItemsOfCurrentFolder();
    };
}
/**
 * Attach event "Remove item" to provided <tr>.
 * @param {HTMLTableRowElement}  row - <tr> element.
 */
function attachRemoveItemEvent(row) {
    let btn = row.getElementsByClassName('close');
    for (let i = 0; i < btn.length; i += 1) {
        btn[i].addEventListener('click', async function () {
            // Prevent calling onClick folder in folder case
            event.stopImmediatePropagation();
            let fold = await dataOperation_1.getItemById(hoverRow);
            let item = new Item_1.default();
            item.mapping(fold['data']);
            clickedRow = item.Parent;
            await dataOperation_1.removeExistingItem(hoverRow);
            await renderItemsOfCurrentFolder();
        });
    }
}
;
/**
 * Add current folder to directory if folder name is provided
 * else return current directory
 * @param {string}  folder - folder name.
 * @return {string} - result prefix & length.
 */
function addToCurrentDirectoryPath(folder = '') {
    if (folder != '')
        currentDir += '/' + folder;
    document.getElementById('directory').innerHTML = currentDir;
    return currentDir;
}
function removeFromCurrentDirectoryPath() {
    let arr = currentDir.split('/');
    // Check array length to ensure the root stay
    if (arr.length > 1) {
        arr.pop();
    }
    currentDir = arr.join("/");
    document.getElementById('directory').innerHTML = currentDir;
    return currentDir;
}
// Checkbox event
function checkboxEvent() {
    let inputElem = document.getElementById("file");
    let idField = document.getElementById("id");
    idField.value = utilities_function_1.generateKey(constant_1.properties.FOLDER_PREFIX, randomLength);
    inputElem.onclick = function () {
        let isFile = inputElem.checked;
        const prefix = isFile ? constant_1.properties.FILE_PREFIX : constant_1.properties.FOLDER_PREFIX;
        let result = utilities_function_1.generateKey(prefix, randomLength);
        idField.value = result;
    };
}
/**
 * Edit item. Change edit mode to true, get the toggle button and click it, stop immediate propagation
 */
function attachEditEvent(tr) {
    let btn = tr.getElementsByClassName('edit');
    for (let i = 0; i < btn.length; i += 1) {
        btn[i].addEventListener('click', function () {
            editMode = true;
            let btn = document.getElementById('toggle-button');
            btn.click();
            event.stopImmediatePropagation();
        });
    }
}
/**
 * Event for back button
 */
function attachGoUpEvent() {
    document.getElementById('go-up-button').onclick = async function () {
        if (clickedRow !== constant_1.properties.BASE_ID) {
            let parent = await dataOperation_1.getItemById(clickedRow);
            let item = new Item_1.default();
            item.mapping(parent['data']);
            if (item.Parent >= constant_1.properties.BASE_ID) {
                if (item.Parent !== clickedRow) {
                    clickedRow = item.Parent;
                    removeFromCurrentDirectoryPath();
                    await renderItemsOfCurrentFolder();
                }
            }
        }
    };
}
