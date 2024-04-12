import {ISubCategory} from "./ISubcategory";

export interface ICategory{
    id: string;
    name: string;
    img: string,
    typeOfServiceId: number,
    sub: ISubCategory[];
}

