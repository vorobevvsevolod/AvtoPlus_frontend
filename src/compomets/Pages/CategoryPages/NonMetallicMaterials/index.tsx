import React from "react";
// @ts-ignore
import categoryStyles from "../categoryPages.module.scss";
// @ts-ignore
import styles from "./styles.module.scss";
import CategoryImage from "../Elements/CategoryImage";
import WorksItemCard from "../Elements/WorksItemCard";
import StagesWork from "../Elements/StagesWork";
import CarsPark from "../Elements/CarsPark";
import YandexMap from "../Elements/YandexMap";
import {clearMaterials} from "../../../../redux/slice/MaterialsSlice";
import {RootState, useAppDispatch} from "../../../../redux";
import ImagesTitleBlock from "../../WorkItem/Elements/ImagesTitleBlock";
import {useSelector} from "react-redux";
import YandexMapMarsh from "../../MaterialItem/Elements/YandexMapMarsh";
const NonMetallicMaterials: React.FC = () =>{
    const dispatch = useAppDispatch();
    const {categories, activeCategory} = useSelector((state:RootState) => state.Category)
    const {materials} = useSelector((state:RootState) => state.Materials)

    React.useEffect(() =>{
        dispatch(clearMaterials())
    },[])
    return (
        <div>
            <ImagesTitleBlock images={[{url: "/img/нерудные материалы.jpg", id: "1", workId: "1"}]}
                              title={"Нерудные материалы"} lastYear={"Доставили более 15000 м3 в 2020 году"}
                              titleDesc={"СТРОИТЕЛЬНЫЙ ПЕСОК ИСПОЛЬЗУЕТСЯ: для строительных работ; для производства смесей; для отсыпки участка."}
                              price={350}/>

            <h1 className={categoryStyles.categoryPages_litleTitle}>Нужны Нерудные материалы?</h1>

            <div className={categoryStyles.categoryPages_text}>
                Компания «Основа» занимается поставкой нерудных материалов для строительства и дорожных работ с 2007 года. Одним из направлений является доставка щебня всех популярных фракций непосредственно с карьеров. Щебень отгружается в необходимом для заказчика объеме. Компания работает в Санкт-Петербурге и по всему региону.
            </div>

            <h1 className={categoryStyles.categoryPages_titleCenter}>Виды поставляемых нерудных материалов</h1>
            {categories.length ? <WorksItemCard typeOfServiceId={categories.find(cat => cat.id === activeCategory) ? categories.find(cat => cat.id === activeCategory)?.typeOfServiceId : 0}/> : ""}



            <h1 className={categoryStyles.categoryPages_titleCenter}>Цена куб/m3 нерудного материала</h1>
            <table className={styles.fertileLand_priceTable} >
                <thead>
                <tr >
                    <td className={styles.fertileLand_priceTable_head}>Вид нерудного материала</td>
                    <td className={styles.fertileLand_priceTable_head}>ЦЕНА ЗА КУБ/М3</td>

                </tr>
                </thead>
                <tbody className={styles.fertileLand_priceTable_body}>
                    {
                        materials.length && materials
                            .filter(mat => mat.categoryId === activeCategory)
                            .map(material => (
                                material.sub.map(subMaterial => (
                                    <tr key={subMaterial.id}>
                                        <td className={styles.fertileLand_priceTable_body_subtitle}>{subMaterial.priceDescription}</td>
                                        <td className={styles.fertileLand_priceTable_body_title}>от {subMaterial.Price_Up_To_100} руб.</td>
                                    </tr>
                                ))
                            ))
                    }
                </tbody>
            </table>


            <h2 className={categoryStyles.categoryPages_title}>Преимущества сотрудничества с СК «ОСНОВА»</h2>
            <div className={categoryStyles.categoryPages_subTitle}>В нашей компании есть собственный автопарк, за счет чего все работы можно выполнять своими силами. Это позволяет гарантировать клиенту конкурентные цены в сочетании с отличными темпами работы. Опыт работы с 2007 года дает нам преимущества:</div>
            <CarsPark/>


        </div>
    )
}
export default NonMetallicMaterials;