const baseApiUrl = 'https://localhost:44390/api/';
const userApiUrl = `${baseApiUrl}User`;
function itemsForParentApiUrl(parentId: number) {
  return `${baseApiUrl}Items/parent/${parentId}`;
}
function itemIdApiUrl(id: number) {
  return `${baseApiUrl}Items/id/${id}`;
}
export const properties = {
  CREATE_MODE: 'create',
  EDIT_MODE: 'edit',
  ORDERING: ['icon', 'name', 'createDate', 'creator', 'id'],
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
