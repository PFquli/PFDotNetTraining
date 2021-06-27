import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import { RenderTemplate } from '../components/Models/RenderTemplate';
import { removeExistingItem, updateExistingItem, createNewItem, getUserName, getItemsInFolder, getItemById } from '../data/dataOperation';
import { generateKey, getCurrentDate } from '../utilities/utilities-function';
import { properties } from '../utilities/constant';
import Item from '../components/Models/Item';
import $ from "jquery";
let currentDir = '';
let template = new RenderTemplate(document.getElementById("content-table"), properties.ORDERING);
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
ready(async () => {
    renderGrid();
    currentDir = properties.BASE_DIRECTORY;
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
    $('#add-modal').on('hidden.bs.modal', function () {
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
        let item = new Item();
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
    items = await getItemsInFolder(clickedRow);
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
        let fold = await getItemById(id);
        clickedRow = id;
        let item = new Item();
        item.mapping(fold['data']);
        addToCurrentDirectoryPath(item.Name);
        let items = await getItemsInFolder(id);
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
        let creator = await getUserName();
        if (!editMode) {
            //Add file or folder
            let temp = {
                id: id,
                name: name,
                createdBy: creator,
                createdDate: getCurrentDate(),
                modifiedBy: creator,
                modifiedAt: getCurrentDate(),
                size: 50,
                parent: clickedRow,
                content: null,
                isFile: isFile ? 1 : 0
            };
            let item = new Item();
            item.mapping(temp);
            await createNewItem(item);
        }
        else {
            let file = await getItemById(hoverRow);
            let item = new Item();
            item.mapping(file['data']);
            item.Name = name;
            await updateExistingItem(hoverRow, item);
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
            let fold = await getItemById(hoverRow);
            let item = new Item();
            item.mapping(fold['data']);
            clickedRow = item.Parent;
            await removeExistingItem(hoverRow);
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
    idField.value = generateKey(properties.FOLDER_PREFIX, randomLength);
    inputElem.onclick = function () {
        let isFile = inputElem.checked;
        const prefix = isFile ? properties.FILE_PREFIX : properties.FOLDER_PREFIX;
        let result = generateKey(prefix, randomLength);
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
        if (clickedRow !== properties.BASE_ID) {
            let parent = await getItemById(clickedRow);
            let item = new Item();
            item.mapping(parent['data']);
            if (item.Parent >= properties.BASE_ID) {
                if (item.Parent !== clickedRow) {
                    clickedRow = item.Parent;
                    removeFromCurrentDirectoryPath();
                    await renderItemsOfCurrentFolder();
                }
            }
        }
    };
}
