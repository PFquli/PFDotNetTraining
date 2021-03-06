import axios from '../../../node_modules/axios/index';
import Item from '../components/Models/Item';
import { properties } from '../utilities/constant';

export async function getItemById(id: number): Promise<File> {
  let item;
  await axios
    .get(properties.ITEM_ID_API_URL(id))
    .then(function(response) {
      item = response;
    })
    .catch(err => console.log(err.response));
  return await item;
}

/**
 * Get an array of items in a folder
 * @param folderId - parentId
 */
export async function getItemsInFolder(folderId: number) {
  let items = [];
  await axios
    .get(properties.ITEMS_FOR_PARENT_API_URL(folderId))
    .then(response => (items = response.data))
    .catch(err => console.log(err.response));
  return await items;
}

/**
 * Get user name from cookies after authentication
 * */
export async function getUserName() {
  let name = '';
  await axios
    .get(properties.USER_API_URL)
    .then(res => (name = res.data))
    .catch(err => console.log(err.response));
  return await name;
}

/**
 * Save new item to the Db by calling Post with new item
 * @param item - new item
 */
export async function createNewItem(item: Item) {
  let created = false;
  await axios
    .post(properties.ITEM_API_URL, item)
    .then(res => (created = true))
    .catch(err => console.log(err.response));
  return await created;
}

/**
 * Update item by calling Put
 * @param id - id of the current item
 * @param item - updated item
 */
export async function updateExistingItem(id: number, item: Item) {
  let updated = false;
  await axios
    .put(properties.ITEM_API_URL, item)
    .then(res => (updated = true))
    .catch(err => console.log(err.response));
  return await updated;
}

export async function removeExistingItem(id: number) {
  let removed = false;
  await axios
    .delete(properties.ITEM_ID_API_URL(id))
    .then(res => (removed = true))
    .catch(err => console.log(err.response));
  return await removed;
}
