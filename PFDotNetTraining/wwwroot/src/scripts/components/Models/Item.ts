import { properties } from '../../utilities/constant';
import { IitemOperations } from '../Shared/_IitemOperations';
import { IMapping } from '../Shared/_IMapping';

export class Item implements IitemOperations, IMapping {
    Id: string;

    Name: string;

    CreatedDate: string;

    CreatedBy: string = 'An Tran Hoang';

    ModifiedAt: string;

    ModifiedBy: string;

    Size: string;

    Parent: string;

    Content: string;
    IsFile: Number;

    constructor(
        id?: string,
        name?: string,
        createDate?: string,
        createdBy?: string,
        modifiedAt?: string,
        modifiedBy?: string,
        size?: string,
        parent: string = properties.BASE_ID,
        content: string = null,
        isFile: Number = 1
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
        if (input.id) this.Id = input.id;
        if (input.name) this.Name = input.name;
        if (input.createdBy) this.CreatedBy = input.createdBy;
        if (input.createdDate) this.CreatedDate = input.createdDate;
        if (input.modifiedBy) this.ModifiedBy = input.modifiedBy;
        if (input.modifiedAt) this.ModifiedAt = input.modifiedAt;
        if (input.size) this.Size = input.size;
        if (input.parent) this.Parent = input.parent;
        if (input.content) this.Content = input.content;
        if (input.isFile) this.IsFile = input.isFile;
    }
}