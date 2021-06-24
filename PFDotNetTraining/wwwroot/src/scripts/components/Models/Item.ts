import { properties } from '../../utilities/constant';
import { IitemOperations } from '../Shared/_IitemOperations';
import { IMapping } from '../Shared/_IMapping';

export default class Item implements IMapping {
  Id: number;

  Name: string;

  CreatedDate: string;

  CreatedBy: string = 'An Tran Hoang';

  ModifiedAt: string;

  ModifiedBy: string;

  Size: number;

  Parent: number;

  Content: string;

  IsFile: number;

  constructor(
    id?: number,
    name?: string,
    createDate?: string,
    createdBy?: string,
    modifiedAt?: string,
    modifiedBy?: string,
    size?: number,
    parent: number = properties.BASE_ID,
    content: string = null,
    isFile: number = 1,
  ) {
    if (id) this.Id = id;
    if (name) this.Name = name;
    if (createDate) this.CreatedDate = createDate;
    if (createdBy) this.CreatedBy = createdBy;
    if (modifiedAt) this.ModifiedAt = modifiedAt;
    if (modifiedBy) this.ModifiedBy = modifiedBy;
    if (size) this.Size = size;
    if (parent) this.Parent = parent;
    if (content) this.Content = content;
    if (isFile) this.IsFile = isFile;
  }

  mapping(input: any) {
    if (input.hasOwnProperty('id')) this.Id = input.id;
    if (input.hasOwnProperty('name')) this.Name = input.name;
    if (input.hasOwnProperty('createdBy'))
      this.CreatedBy = input.createdBy;
    if (input.hasOwnProperty('createdDate'))
      this.CreatedDate = input.createdDate;
    if (input.hasOwnProperty('modifiedBy'))
      this.ModifiedBy = input.modifiedBy;
    if (input.hasOwnProperty('modifiedAt'))
      this.ModifiedAt = input.modifiedAt;
    if (input.hasOwnProperty('size')) this.Size = input.size;
    if (input.hasOwnProperty('parent')) this.Parent = input.parent;
    if (input.hasOwnProperty('content')) this.Content = input.content;
    if (input.hasOwnProperty('isFile')) this.IsFile = input.isFile;
  }
}
