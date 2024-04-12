import React from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../redux";
import {setWorkById} from "../../../redux/slice/WorksSlice";
// @ts-ignore
import styles from './styles.module.scss';
// @ts-ignore
import categoryStyles from "../CategoryPages/categoryPages.module.scss"
import ImagesTitleBlock from "./Elements/ImagesTitleBlock";
import YandexMap from "../CategoryPages/Elements/YandexMap";
import Item from "../CategoryPages/Elements/WorksItemCard/Item";
import WorksItemCard from "../CategoryPages/Elements/WorksItemCard";
import { setMaterialById } from "../../../redux/slice/MaterialsSlice";
import YandexMapMarsh from "./Elements/YandexMapMarsh";


const MaterialItem : React.FC = () => {
    const dispatch = useAppDispatch();
    const { material, materials } = useSelector((state:RootState) => state.Materials);
    const { activeCategory, categories } = useSelector((state:RootState) => state.Category);
    const location = useLocation();

    React.useEffect(() =>{
        if(materials.length)
            dispatch(setMaterialById({id: Number(location.pathname.split('/')[2] ) } )   )
    },[location.pathname, materials.length])

    return (
        <div className={styles.workItem_container}>

            {material && <ImagesTitleBlock images={material.images} title={material.title} titleDesc={material.descriptionTitle} lastYear={material.lastYear} price={material.Price_Over_300 ? material.Price_Over_300 : material?.sub ? Math.min(...material.sub.map(sub => sub.Price_Up_To_100)) : material.Price_Up_To_100}/>}
            <h2 className={categoryStyles.categoryPages_litleTitle}>Особенности материала</h2>
            <div className={categoryStyles.categoryPages_text}>
                {material.features}
            </div>

            {
                (material.categoryId && material.sub && material.sub.length) && (
                    <>
                        <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                        <WorksItemCard typeOfServiceId={categories.find(cat => cat.id === activeCategory) ? categories.find(cat => cat.id === activeCategory)?.typeOfServiceId : 0}/>
                    </>
                )
            }


            {
                !material.sub && material.Price_Up_To_300 && material.Price_Over_300 ?
                    <>
                        <h2 className={categoryStyles.categoryPages_title}>Стоимость материала</h2>
                        <table className={styles.workItem_priceTable}>
                            <thead>
                            <tr>
                                <td className={styles.workItem_priceTable_head}>Вид грунта</td>
                                <td className={styles.workItem_priceTable_head}>ЦЕНА ЗА КУБ ОТ 300 М3</td>
                                <td className={styles.workItem_priceTable_head}>ЦЕНА ЗА КУБ ДО 300 М3</td>
                                <td className={styles.workItem_priceTable_head}>ЦЕНА ЗА КУБ от 12 ДО 100 М3</td>
                            </tr>
                            </thead>
                            <tbody className={styles.workItem_priceTable_body}>
                            <tr key={material.id}>
                                <td className={styles.workItem_priceTable_body_subtitle}>{material.priceDescription} </td>
                                <td className={styles.workItem_priceTable_body_title}>от {material.Price_Over_300} руб.</td>
                                <td className={styles.workItem_priceTable_body_title}>от {material.Price_Up_To_300} руб.</td>
                                <td className={styles.workItem_priceTable_body_title}>от {material.Price_Up_To_100} руб.</td>
                            </tr>
                            </tbody>
                        </table>
                    </> : <></>
            }

            { material.categoryId && !material.sub.length ? <>
                <h1 className={categoryStyles.categoryPages_title}>Рассчитайте стоимость доставки!</h1>
                
                <YandexMapMarsh/>
            </> : ""}


            <div className={styles.workItem_priceFactor}>
                {
                    material?.need?.list.length ?
                        <>
                            <h2 className={categoryStyles.categoryPages_title}>{material.need.title}</h2>
                            <div className={categoryStyles.categoryPages_subTitle}>
                                {material.need.description}
                            </div>
                            <div className={styles.workItem_need}>
                                {
                                    material.need.list.map((list, index) => (
                                        <div className={styles.workItem_need_item} key={list.id}>
                                            <img width={30} height={30} src="/img/rostok.png" alt="rostok"/>
                                            <div className={styles.workItem_need_item_text}>
                                                <span>{list.name}:</span>{list.description}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                        : <></>
                }

            </div>

            {
                material.description ? <div className={categoryStyles.categoryPages_description}>
                    {material.description}
                </div> : <></>
            }
            <div className={styles.workItem_priceFactor}>
                {
                    material.priceFactor.list.length ?
                        <>
                            <h2 className={categoryStyles.categoryPages_title}> На цену строительства влияют несколько факторов:</h2>
                            {
                                material.priceFactor.list.map((list, index) => (
                                    <div className={styles.workItem_priceFactor_item} key={list.id}>
                                        <img width={30} height={30} src="/img/rostok.png" alt="rostok"/>
                                        <div className={styles.workItem_priceFactor_item_text}>{list.name}</div>
                                    </div>
                                ))
                            }
                        </>
                        : <></>
                }
            </div>

            <h2 className={categoryStyles.categoryPages_title}>Быстрая и недорогая доставка материалов</h2>
            <div className={categoryStyles.categoryPages_subTitle}>
                СК «Основа» — компания, которой доверяют. Мы работаем с 2007 года, за это время показали себя как надежный и ответственный партнер и поставщик нерудных материалов. Сделать заявку на расчет стоимости асфальтовой дороги, площадки, парковки вы всегда можете онлайн или по телефону.
                Построенные нами дороги ежедневно выдерживают большие нагрузки, без проблем переносят любые погодные изменения, долго не нуждаются в ремонте благодаря тщательному соблюдению строгих стандартов качества материалов и технологий укладки асфальта.
            </div>
            {
                material.categoryId && !material.sub.length ? <>
                    <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                    <WorksItemCard typeOfServiceId={categories.find(cat => cat.id === activeCategory) ? categories.find(cat => cat.id === activeCategory)?.typeOfServiceId : 0}/>
                </> : <></>
            }
            {
                 (!material.categoryId && !material.sub) && (
                    <>
                        <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды материала:</h2>
                        <WorksItemCard typeOfServiceId={categories.find(cat => cat.id === activeCategory) ? categories.find(cat => cat.id === activeCategory)?.typeOfServiceId : 0}/>
                    </>
                )
            }

        </div>
    );
}

export default MaterialItem;

