import {IImagesGalleryWorks} from "./IImagesGalleryWorks";

export interface IGalleryWorks {
    id: number,
    title:string,
    subTitle:string,
    scopeWork:string,
    cordX:string,
    cordY:string,
    workId: number,
    categoryId: number,
    img: IImagesGalleryWorks[]
}