"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExistingItem = exports.updateExistingItem = exports.createNewItem = exports.getUserName = exports.getItemsInFolder = exports.getItemById = void 0;
const index_1 = __importDefault(require("../../../node_modules/axios/index"));
const constant_1 = require("../utilities/constant");
async function getItemById(id) {
    let item;
    await index_1.default
        .get(constant_1.properties.ITEM_ID_API_URL(id))
        .then(function (response) {
        item = response;
    })
        .catch(err => console.log(err.response));
    return await item;
}
exports.getItemById = getItemById;
/**
 * Get an array of items in a folder
 * @param folderId - parentId
 */
async function getItemsInFolder(folderId) {
    let items = [];
    await index_1.default
        .get(constant_1.properties.ITEMS_FOR_PARENT_API_URL(folderId))
        .then(response => (items = response.data))
        .catch(err => console.log(err.response));
    return await items;
}
exports.getItemsInFolder = getItemsInFolder;
/**
 * Get user name from cookies after authentication
 * */
async function getUserName() {
    let name = '';
    await index_1.default
        .get(constant_1.properties.USER_API_URL)
        .then(res => (name = res.data))
        .catch(err => console.log(err.response));
    return await name;
}
exports.getUserName = getUserName;
/**
 * Save new item to the Db by calling Post with new item
 * @param item - new item
 */
async function createNewItem(item) {
    let created = false;
    await index_1.default
        .post(constant_1.properties.ITEM_API_URL, item)
        .then(res => (created = true))
        .catch(err => console.log(err.response));
    return await created;
}
exports.createNewItem = createNewItem;
/**
 * Update item by calling Put
 * @param id - id of the current item
 * @param item - updated item
 */
async function updateExistingItem(id, item) {
    let updated = false;
    await index_1.default
        .put(constant_1.properties.ITEM_API_URL, item)
        .then(res => (updated = true))
        .catch(err => console.log(err.response));
    return await updated;
}
exports.updateExistingItem = updateExistingItem;
async function removeExistingItem(id) {
    let removed = false;
    await index_1.default
        .delete(constant_1.properties.ITEM_ID_API_URL(id))
        .then(res => (removed = true))
        .catch(err => console.log(err.response));
    return await removed;
}
exports.removeExistingItem = removeExistingItem;
