import {ISubCategory} from "../ISubcategory";

export interface IPriceFactory{
    workId: number,
    list: [
        {
            id: string;
            name: string;
        }
    ]
}
