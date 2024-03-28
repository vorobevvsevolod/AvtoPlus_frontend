import {IPriceFactor} from "./IPriceFactor";
import {INeed} from "./INeed";
import {IImages} from "./IImages";

export interface IWork{
    id: number,
    title: string,
    descriptionTitle: string,
    description: string,
    lastYear: string,
    features: string,
    slogan: string,
    price: string,
    priceDescription: string,
    categoryId: string,
    priceFactor: IPriceFactor,
    need: INeed,
    images: IImages[],
}