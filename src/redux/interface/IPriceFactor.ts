import {ISubCategory} from "./ISubcategory";

export interface IPriceFactor {
    workId: number,
    list: [
        {
            id: string;
            name: string;
        }
    ]
}
