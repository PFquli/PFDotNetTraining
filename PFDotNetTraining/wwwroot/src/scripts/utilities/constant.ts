const baseApiUrl = 'https://localhost:44390/api/';
const userApiUrl = baseApiUrl + "User";
function itemApiUrl(id: number) {
    return baseApiUrl + "Items/" + id;
}
export const properties = {
  CREATE_MODE: 'create',
  EDIT_MODE: 'edit',
  ORDERING: ['icon', 'name', 'createDate', 'creator', 'id'],
  BASE_DIRECTORY: 'root',
  BASE_ID: '0',
  FILE_PREFIX: 'file-',
  FOLDER_PREFIX: 'folder-',
  FILE_DEFAULT_URL: './dist/image/excel.png',
  FOLDER_DEFAULT_URL: './dist/image/folder.png',
  USER_API_URL: userApiUrl,
  ITEM_API_URL: itemApiUrl
};
