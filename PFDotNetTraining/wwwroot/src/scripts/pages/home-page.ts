import ready from '../utilities/_helper';
import renderGrid from '../components/_grid';
import { RenderTemplate } from '../components/Models/RenderTemplate';
import { removeExistingItem, updateExistingItem, createNewItem, getUserName, getNextIdForInsert, getItemsInFolder, getItemById } from '../data/dataOperation';
import { generateKey, getCurrentDate } from '../utilities/utilities-function';
import { properties } from '../utilities/constant';
import Item from '../components/Models/Item';

let currentDir = '';
let template = new RenderTemplate(<HTMLTableElement>document.getElementById("content-table"), properties.ORDERING);
let clickedRow: number = 0;
let hoverRow: number = 0;
let editMode: boolean = false;
const randomLength: number = 5;

ready(async () => {
    renderGrid();
    currentDir = properties.BASE_DIRECTORY;
    addToCurrentDirectoryPath();
    await renderItemsOfCurrentFolder();
    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName('btn-add')[0];
    addItemEvent(submitButton);
    checkboxEvent();
    attachGoUpEvent();
});

/**
 * Render all data with given array of Folder or Files.
 * @param {Array<Item>} input - Array of folders or files.
*/
function generateData(input: Array<any>) {
    clearCurrentData();
    //Generate Folder
    //if (input[0].subItems) {
    //    for (let i = 0; i < input.length; i += 1) {
    //        let folder = new Folder();
    //        folder.mapping(input[i]);
    //        let row = template.render(folder);
    //        let id = row.cells[row.cells.length - 2].textContent;
    //        getRowIdOnHover(id, row);
    //        attachRemoveItemEvent(row);
    //        attachOnclickFolder(id, row);
    //        attachEditEvent(row);
    //    }
    //}

    //else {
    //    //Generate Files
    //    for (let i = 0; i < input.length; i += 1) {
    //        let file = new File();
    //        file.mapping(input[i]);
    //        let row = template.render(file);
    //        let id = row.cells[row.cells.length - 2].textContent;
    //        getRowIdOnHover(id, row);
    //        attachRemoveItemEvent(row);
    //        attachEditEvent(row);
    //    }
    //}
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
};

//Render all items in local storage
async function renderItemsOfCurrentFolder() {
    let items = [];
    items = await getItemsInFolder(clickedRow);
    await generateData(items);
    //for (var i = 0; i < window.localStorage.length; i += 1) {
    //    let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
    //    if (item.parent === clickedRow) generateData([item]);
    //}
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
 * @param {number} id - folder id.
 * @param {HTMLTableRowElement}  tr - <tr> element.
 */
function attachOnclickFolder(id: number, tr: HTMLTableRowElement) {
    tr.addEventListener("click", async function () {
        //Check if data is in local storage and render
        let fold = await getItemById(id);
        clickedRow = id;
        let item = new Item();
        item.mapping(fold['data']);
        addToCurrentDirectoryPath(item.Name);
        //if (!fold.IsFile) {
        //    fold.subItems.forEach(element => {
        //        if (Array.isArray(element)) {
        //            generateData(element);
        //        }
        //        else generateData([element]);
        //    });
        //}
        let items = await getItemsInFolder(id);
        await generateData(items);
    });
}

/**
 * Passing Item id to global variable for a later use.
 */
function getRowIdOnHover(id: number, tr: HTMLTableRowElement) {
    tr.onmouseover = function () {
        hoverRow = id;
    }
}

/**
 * Attach add folder event to provided <button>.
 * @param {HTMLButtonElement}  btn - <tr> element.
 */
function addItemEvent(btn: HTMLButtonElement) {
    btn.onclick = async function () {
        //Get ID field
        let idField: HTMLInputElement = <HTMLInputElement>document.getElementById("id");
        let id: string = idField.value;
        //Get Name field
        let nameField: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
        let name: string = nameField.value;
        //Check if in put is a file
        let inputElem: HTMLInputElement = <HTMLInputElement>document.getElementById("file");
        let isFile: boolean = inputElem.checked;
        //const prefix: string = isFile ? properties.FILE_PREFIX : properties.FOLDER_PREFIX;
        //let result = generateKey(prefix, randomLength);
        idField.value = await getNextIdForInsert().toString();
        let creator = await getUserName();
        if (!editMode) {
            //Add file or folder
            let item = new Item(parseInt(id), name, getCurrentDate(), creator, getCurrentDate(), creator, 50, clickedRow, null, isFile ? 1 : 0);
            await createNewItem(item);
        } else {
            //let type: Array<string> = hoverRow.split('-');
            //if (type[0] === 'file') {
            //    let file: File = new File();
            //    file.mapping(getItemById(hoverRow));
            //    file.name = name;
            //    file.addOrUpdate(properties.EDIT_MODE);
            //} else {
            //    let folder: Folder = new Folder();
            //    folder.mapping(getItemById(hoverRow));
            //    folder.name = name;
            //    folder.addOrUpdate(properties.EDIT_MODE);
            //}
            let file = await getItemById(hoverRow);
            let item = new Item();
            item.mapping(file['data']);
            item.Name = name;
            await updateExistingItem(hoverRow, item);
            editMode = false;
        }
        await renderItemsOfCurrentFolder();
    }
}

/**
 * Attach event "Remove item" to provided <tr>.
 * @param {HTMLTableRowElement}  row - <tr> element.
 */
function attachRemoveItemEvent(row: HTMLTableRowElement) {
    let btn = row.getElementsByClassName('close');
    for (let i = 0; i < btn.length; i += 1) {
        btn[i].addEventListener('click', async function () {
            //let type: Array<string> = hoverRow.split('-');
            //if (type[0] === 'file') {
            //    let file: File = new File();
            //    file.mapping(getItemById(hoverRow));
            //    clickedRow = file.parent;
            //    file.remove();
            //} else {
            //    let folder: Folder = new Folder();
            //    folder.mapping(getItemById(hoverRow));
            //    clickedRow = folder.parent;
            //    folder.remove();
            //}
            let fold = await getItemById(hoverRow);
            let item = new Item();
            item.mapping(fold['data']);
            clickedRow = item.Parent;
            await removeExistingItem(hoverRow);
            await renderItemsOfCurrentFolder();
            event.stopImmediatePropagation();
            renderItemsOfCurrentFolder();
        })
    }
};

/**
 * Add current folder to directory if folder name is provided
 * else return current directory
 * @param {string}  folder - folder name.
 * @return {string} - result prefix & length.
 */
function addToCurrentDirectoryPath(folder: string = ''): string {
    if (folder != '')
        currentDir += '/' + folder;
    document.getElementById('directory').innerHTML = currentDir;
    return currentDir;
}

function removeFromCurrentDirectoryPath() {
    let arr: Array<string> = currentDir.split('/');
    arr.pop();
    currentDir = arr.join("/");
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
            //    getData(properties.BASE_API_URL + 'Folder/GetFolderById/' + clickedRow, {}).then(data => {
            //        if (data.parentID != null)
            //            clickedRow = data.parentID;
            //        else clickedRow = '0';
            //        refresh();
            //    });
            //}
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
    }
}