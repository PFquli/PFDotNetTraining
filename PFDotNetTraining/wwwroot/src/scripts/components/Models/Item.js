import { properties } from '../../utilities/constant';
export class Item {
    constructor(id, name, createDate, creator, modifiedAt, modifiedBy, icon, parent = properties.BASE_DIRECTORY) {
        this.createDate = '049/04/2021';
        this.creator = 'An Tran Hoang';
        if (id)
            this.id = id;
        if (name)
            this.name = name;
        if (createDate)
            this.createDate = createDate;
        if (creator)
            this.creator = creator;
        if (modifiedAt)
            this.modifiedAt = modifiedAt;
        if (modifiedBy)
            this.modifiedBy = modifiedBy;
        if (icon)
            this.icon = icon;
        if (parent)
            this.parent = parent;
    }
    addOrUpdate(mode) {
        localStorage.setItem(this.id, JSON.stringify(this));
    }
    remove() {
        localStorage.removeItem(this.id);
    }
    mapping(input) {
        if (input.id)
            this.id = input.id;
        if (input.name)
            this.name = input.name;
        if (input.creator)
            this.creator = input.creator;
        if (input.createDate)
            this.createDate = input.createDate;
        if (input.modifiedBy)
            this.modifiedBy = input.modifiedBy;
        if (input.modifiedAt)
            this.modifiedAt = input.modifiedAt;
        if (input.icon)
            this.icon = input.icon;
        if (input.parent)
            this.parent = input.parent;
    }
}
