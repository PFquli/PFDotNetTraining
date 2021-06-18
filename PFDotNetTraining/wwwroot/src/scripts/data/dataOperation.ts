import axios from "../../../node_modules/axios/index";
import { properties } from "../utilities/constant";

export function getItemById(id: string): File {
    let item;
    axios.get(properties.ITEM_API_URL(parseInt(id))).then(function (response) {
        item = response;
    }).catch(err => console.log(err));
    return item;
}
