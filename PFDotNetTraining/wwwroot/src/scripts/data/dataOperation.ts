import axios from "../../../node_modules/axios/index";
import { properties } from "../utilities/constant";

export function getItemById(id: number): File {
    let item;
    axios.get(properties.ITEM_ID_API_URL(id)).then(function (response) {
        item = response;
    }).catch(err => console.log(err));
    return item;
}