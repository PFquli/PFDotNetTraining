import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import { Folder } from '../components/Models/Folder';
import { File } from '../components/Models/File';
import { RenderTemplate } from '../components/Models/RenderTemplate';
import { getItemById } from '../data/dataOperation';
import { generateKey, getCurrentDate } from '../utilities/utilities-function';
import { properties } from '../utilities/constant';

let currentDir = '';
let template = new RenderTemplate(<HTMLTableElement>document.getElementById("content-table"), properties.ORDERING);
let clickedRow: string = 'root';
let hoverRow: string = '';
let editMode: boolean = false;
const randomLength: number = 5;


ready(() => {
    renderGrid();
    currentDir = properties.BASE_DIRECTORY;
    changeCurrentDirectory();
    renderLocalStorage();
    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName('btn-add')[0];
    addItemEvent(submitButton);
    checkboxEvent();
});

/**
 * Render all data with given array of Folder or Files.
 * @param {Array<Item>} input - Array of folders or files.
*/
function generateData(input: Array<any>) {
    //Generate Folder
    if (input[0].subItems) {
        for (let i = 0; i < input.length; i += 1) {
            let folder = new Folder();
            folder.mapping(input[i]);
            let row = template.render(folder);
            let id = row.cells[row.cells.length - 2].textContent;
            getRowIdOnHover(id, row);
            attachRemoveItemEvent(row);
            attachOnclickFolder(id, row);
            attachEditEvent(row);
        }
    }

    else {
        //Generate Files
        for (let i = 0; i < input.length; i += 1) {
            let file = new File();
            file.mapping(input[i]);
            let row = template.render(file);
            let id = row.cells[row.cells.length - 2].textContent;
            getRowIdOnHover(id, row);
            attachRemoveItemEvent(row);
            attachEditEvent(row);
        }
    }
};

//Render all items in local storage
function renderLocalStorage() {
    for (var i = 0; i < window.localStorage.length; i += 1) {
        let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (item.parent === clickedRow) generateData([item]);
    }
}

//Clear current page data excluding header
function clearCurrentData() {
    let tr = document.getElementsByTagName('tr');
    while (tr.length != 1) {
        tr[1].remove();
    }
};

/**
 * Attach on click event to view items in folder for <tr> tag
 */
function getItemInFolder(folderId: string) {
    let fold: Folder = new Folder();
    fold.mapping(JSON.parse(window.localStorage.getItem(folderId)));
    return fold;
}

/**
 * Attach on click event to view items in folder for <tr> tag
 * @param {string} id - folder id.
 * @param {HTMLTableRowElement}  tr - <tr> element.
 */
function attachOnclickFolder(id: string, tr: HTMLTableRowElement) {
    tr.addEventListener("click", function () {
        clearCurrentData();
        //Check if data is in local storage and render
        let fold = getItemInFolder(id);
        clickedRow = id;
        changeCurrentDirectory(fold.name);
        if (fold) {
            fold.subItems.forEach(element => {
                if (Array.isArray(element)) {
                    generateData(element);
                }
                else generateData([element]);
            });
        }
    });
}

/**
 * Passing Item id to global variable for a later use.
 */
function getRowIdOnHover(id: string, tr: HTMLTableRowElement) {
    tr.onmouseover = function () {
        hoverRow = id;
    }
}

/**
 * Attach add folder event to provided <button>.
 * @param {HTMLButtonElement}  btn - <tr> element.
 */
function addItemEvent(btn: HTMLButtonElement) {
    btn.onclick = function () {
        //Get ID field
        let idField: HTMLInputElement = <HTMLInputElement>document.getElementById("id");
        let id: string = idField.value;
        //Get Name field
        let nameField: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
        let name: string = nameField.value;
        //Check if in put is a file
        let inputElem = <HTMLInputElement>document.getElementById("file");
        let isFile: boolean = inputElem.checked;
        const prefix: string = isFile ? properties.FILE_PREFIX : properties.FOLDER_PREFIX;
        let result = generateKey(prefix, randomLength);
        idField.value = result;
        if (!editMode) {
            //Add file or folder
            if (isFile) {
                let item = new File(id, name, getCurrentDate(), null, null, null, null, clickedRow, '.xlxs');
                item.addOrUpdate(properties.CREATE_MODE);
            } else {
                let item = new Folder(id, name, getCurrentDate(), null, null, null, null, clickedRow);
                item.addOrUpdate(properties.CREATE_MODE);
            }
        } else {
            let type: Array<string> = hoverRow.split('-');
            if (type[0] === 'file') {
                let file: File = new File();
                file.mapping(getItemById(hoverRow));
                file.name = name;
                file.addOrUpdate(properties.EDIT_MODE);
            } else {
                let folder: Folder = new Folder();
                folder.mapping(getItemById(hoverRow));
                folder.name = name;
                folder.addOrUpdate(properties.EDIT_MODE);
            }
            editMode = false;
        }
        clearCurrentData();
        renderLocalStorage();
    }
}

/**
 * Attach event "Remove item" to provided <tr>.
 * @param {HTMLTableRowElement}  row - <tr> element.
 */
function attachRemoveItemEvent(row: HTMLTableRowElement) {
    let btn = row.getElementsByClassName('close');
    for (let i = 0; i < btn.length; i += 1) {
        btn[i].addEventListener('click', function () {
            let type: Array<string> = hoverRow.split('-');
            if (type[0] === 'file') {
                let file: File = new File();
                file.mapping(getItemById(hoverRow));
                clickedRow = file.parent;
                file.remove();
            } else {
                let folder: Folder = new Folder();
                folder.mapping(getItemById(hoverRow));
                clickedRow = folder.parent;
                folder.remove();
            }
            clearCurrentData();
            renderLocalStorage();
            event.stopImmediatePropagation();
        })
    }
};

/**
 * Add current folder to directory if folder name is provided 
 * else return current directory
 * @param {string}  folder - folder name.
 * @return {string} - result prefix & length.
 */
function changeCurrentDirectory(folder: string = ''): string {
    if (folder != '')
        currentDir += '/' + folder;
    document.getElementById('directory').innerHTML = currentDir;
    return currentDir;
}

// Checkbox event
function checkboxEvent() {
    let inputElem = <HTMLInputElement>document.getElementById("file");
    let idField: HTMLInputElement = <HTMLInputElement>document.getElementById("id");
    idField.value = generateKey(properties.FOLDER_PREFIX, randomLength);
    inputElem.onclick = function () {
        let isFile: boolean = inputElem.checked;
        const prefix: string = isFile ? properties.FILE_PREFIX : properties.FOLDER_PREFIX;
        let result = generateKey(prefix, randomLength);
        idField.value = result;
    }
}

/**
 * Edit item
 */
function attachEditEvent(tr: HTMLTableRowElement) {
    let btn = tr.getElementsByClassName('edit');
    for (let i = 0; i < btn.length; i += 1) {
        btn[i].addEventListener('click', function () {
            let btn = document.getElementById('toggle-button');
            btn.click();
            editMode = true;
            console.log(editMode);
            event.stopImmediatePropagation();
        });
    }
}
