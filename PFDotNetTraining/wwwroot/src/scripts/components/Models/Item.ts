import { properties } from '../../utilities/constant';
import { IitemOperations } from '../Shared/_IitemOperations';
import { IMapping } from '../Shared/_IMapping';

export class Item implements IitemOperations, IMapping {
  id: string;

  name: string;

  createDate: string = '049/04/2021';

  creator: string = 'An Tran Hoang';

  modifiedAt: string;

  modifiedBy: string;

  icon: string;

  parent: string;

  constructor(
    id?: string,
    name?: string,
    createDate?: string,
    creator?: string,
    modifiedAt?: string,
    modifiedBy?: string,
    icon?: string,
    parent: string = properties.BASE_DIRECTORY,
  ) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (createDate) this.createDate = createDate;
    if (creator) this.creator = creator;
    if (modifiedAt) this.modifiedAt = modifiedAt;
    if (modifiedBy) this.modifiedBy = modifiedBy;
    if (icon) this.icon = icon;
    if (parent) this.parent = parent;
  }

  addOrUpdate(mode: string) {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  remove() {
    localStorage.removeItem(this.id);
  }

  mapping(input: any) {
    if (input.id) this.id = input.id;
    if (input.name) this.name = input.name;
    if (input.creator) this.creator = input.creator;
    if (input.createDate) this.createDate = input.createDate;
    if (input.modifiedBy) this.modifiedBy = input.modifiedBy;
    if (input.modifiedAt) this.modifiedAt = input.modifiedAt;
    if (input.icon) this.icon = input.icon;
    if (input.parent) this.parent = input.parent;
  }
}
