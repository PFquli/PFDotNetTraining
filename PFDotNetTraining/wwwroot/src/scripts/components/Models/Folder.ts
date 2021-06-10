import { properties } from '../../utilities/constant';
import { Item } from './Item';

export class Folder extends Item {
  subItems: Array<any>;

  constructor(
    id?: string,
    name?: string,
    createDate?: string,
    creator?: string,
    modifiedAt?: string,
    modifiedBy?: string,
    icon?: string,
    parent?: string,
  ) {
    super(
      id,
      name,
      createDate,
      creator,
      modifiedAt,
      modifiedBy,
      icon,
      parent,
    );
    this.subItems = [];
    this.icon = properties.FOLDER_DEFAULT_URL;
  }

  addOrUpdate(mode: string) {
    // Add folder to local storage
    localStorage.setItem(this.id, JSON.stringify(this));

    // Add folder to folder
    if (this.parent !== properties.BASE_DIRECTORY) {
      const folder: Folder = JSON.parse(
        localStorage.getItem(this.parent),
      );
      if (mode === properties.CREATE_MODE) {
        folder.subItems.push(this);
      } else {
        for (let i = 0; i < folder.subItems.length; i += 1) {
          if (folder.subItems[i].id === this.id) {
            folder.subItems[i].mapping(this);
          }
        }
      }
      localStorage.setItem(folder.id, JSON.stringify(folder));
    }
  }

  remove() {
    // Remove folder from local storage
    super.remove();

    // Remove all items from folder
    if (this.subItems.length !== 0) {
      for (let i = 0; i < localStorage.length; i += 1) {
        const item: any = JSON.parse(
          localStorage.getItem(localStorage.key(i)),
        );
        console.log(item.parent);
        if (item.parent === this.id) {
          localStorage.removeItem(item.id);
        }
      }
    }

    // Remove folder from parent
    if (this.parent !== 'root') {
      const folder: Folder = JSON.parse(
        window.localStorage.getItem(this.parent),
      );
      let pos: number = 0;
      for (let i = 0; i < folder.subItems.length; i += 1) {
        if (folder.subItems[i].id === this.id) pos = i;
      }
      folder.subItems.splice(pos, 1);
      // Update local storage
      localStorage.setItem(folder.id, JSON.stringify(folder));
    }
  }

  mapping(input: any) {
    if (input.id) this.id = input.id;
    if (input.name) this.name = input.name;
    if (input.creator) this.creator = input.creator;
    if (input.createDate) this.createDate = input.createDate;
    if (input.modifiedBy) this.modifiedBy = input.modifiedBy;
    if (input.modifiedAt) this.modifiedAt = input.modifiedAt;
    if (input.subItems) this.subItems = input.subItems;
    if (input.icon) this.icon = input.icon;
    if (input.parent) this.parent = input.parent;
    // super.mapping(input);
    // if (input.subItems) this.subItems = input.subItems;
  }
}
