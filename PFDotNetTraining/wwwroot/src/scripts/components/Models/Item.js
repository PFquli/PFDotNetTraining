import { properties } from '../../utilities/constant';
export default class Item {
    constructor(id, name, createDate, createdBy, modifiedAt, modifiedBy, size, parent = properties.BASE_ID, content = null, isFile = 1) {
        this.CreatedBy = 'An Tran Hoang';
        if (id)
            this.Id = id;
        if (name)
            this.Name = name;
        if (createDate)
            this.CreatedDate = createDate;
        if (createdBy)
            this.CreatedBy = createdBy;
        if (modifiedAt)
            this.ModifiedAt = modifiedAt;
        if (modifiedBy)
            this.ModifiedBy = modifiedBy;
        if (size)
            this.Size = size;
        if (parent)
            this.Parent = parent;
        if (content)
            this.Content = content;
        if (isFile)
            this.IsFile = isFile;
    }
    mapping(input) {
        if (input.id)
            this.Id = input.id;
        if (input.name)
            this.Name = input.name;
        if (input.createdBy)
            this.CreatedBy = input.createdBy;
        if (input.createdDate)
            this.CreatedDate = input.createdDate;
        if (input.modifiedBy)
            this.ModifiedBy = input.modifiedBy;
        if (input.modifiedAt)
            this.ModifiedAt = input.modifiedAt;
        if (input.size)
            this.Size = input.size;
        if (input.parent)
            this.Parent = input.parent;
        if (input.content)
            this.Content = input.content;
        if (input.isFile)
            this.IsFile = input.isFile;
    }
}
