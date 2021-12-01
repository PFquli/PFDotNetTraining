"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.properties = void 0;
const baseApiUrl = 'https://localhost:44390/api/';
const userApiUrl = `${baseApiUrl}User`;
function itemsForParentApiUrl(parentId) {
    return `${baseApiUrl}Items/parent/${parentId}`;
}
function itemIdApiUrl(id) {
    return `${baseApiUrl}Items/id/${id}`;
}
exports.properties = {
    CREATE_MODE: 'create',
    EDIT_MODE: 'edit',
    ORDERING: ['Icon', 'Name', 'ModifiedAt', 'ModifiedBy', 'Id'],
    BASE_DIRECTORY: 'root',
    BASE_ID: 0,
    FILE_PREFIX: 'file-',
    FOLDER_PREFIX: 'folder-',
    FILE_DEFAULT_URL: './dist/image/excel.png',
    FOLDER_DEFAULT_URL: './dist/image/folder.png',
    USER_API_URL: userApiUrl,
    ITEMS_FOR_PARENT_API_URL: itemsForParentApiUrl,
    ITEM_ID_API_URL: itemIdApiUrl,
    ITEM_API_URL: `${baseApiUrl}Items`,
};
