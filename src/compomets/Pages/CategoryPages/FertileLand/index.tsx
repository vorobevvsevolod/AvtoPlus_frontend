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
const EarthWorks: React.FC = () =>{
    const dispatch = useAppDispatch();
    const {categories, activeCategory} = useSelector((state:RootState) => state.Category)
    const {materials} = useSelector((state:RootState) => state.Materials)

    React.useEffect(() =>{
        dispatch(clearMaterials())
    },[])
    return (
        <div>
            <ImagesTitleBlock images={[{url: "/img/плодородная земля.jpg", id: "1", workId: "1"}]}
                              title={"Земля плодородная"} lastYear={"Доставили более 9000 м3 земли в 2020 году"}
                              titleDesc={"ПЛОДОРОДНАЯ ЗЕМЛЯ В СК ОСНОВА ПОДОЙДЕТ: для благоустройства территории; для повышения плодородности садового участка; для производства ландшафтных работ."}
                              price={260}/>

            <h1 className={categoryStyles.categoryPages_litleTitle}>Нужна земля плодородная?</h1>

            <div className={categoryStyles.categoryPages_text}>
                Компания «Основа» готова доставить нужный объем материала в удобное для вас время. Мы занимаемся поставками грунта, песка, щебня с 2007 года, успев за эти годы обрасти большим числом постоянных заказчиков. Для доставки используются самосвалы из нашего автопарка, заказать машину плодородной земли мы предлагаем в количестве от 12 кубов — это минимальный выгодный заказ.
            </div>

            <h1 className={categoryStyles.categoryPages_titleCenter}>ВИДЫ ПОСТАВЛЯЕМОГО ГРУНТА</h1>
            {categories.length ? <WorksItemCard typeOfServiceId={categories.find(cat => cat.id === activeCategory) ? categories.find(cat => cat.id === activeCategory)?.typeOfServiceId : 0}/> : ""}



            <h1 className={categoryStyles.categoryPages_titleCenter}>Цена куб/m3 плодородной земли</h1>
            <table className={styles.fertileLand_priceTable} >
                <thead>
                <tr >
                    <td className={styles.fertileLand_priceTable_head}>Вид грунта</td>
                    <td className={styles.fertileLand_priceTable_head}>ЦЕНА ЗА КУБ ОТ 300 М3</td>
                    <td className={styles.fertileLand_priceTable_head}>ЦЕНА ЗА КУБ ДО 300 М3</td>
                    <td className={styles.fertileLand_priceTable_head}>ЦЕНА ЗА КУБ от 12 ДО 100 М3</td>
                </tr>
                </thead>
                <tbody className={styles.fertileLand_priceTable_body}>
                {
                    materials.length && materials.filter(mat => mat.categoryId === activeCategory).map(material => (
                        <tr key={material.id}>
                            <td className={styles.fertileLand_priceTable_body_subtitle}>{material.priceDescription} </td>
                            <td className={styles.fertileLand_priceTable_body_title}>от {material.Price_Over_300} руб.</td>
                            <td className={styles.fertileLand_priceTable_body_title}>от {material.Price_Up_To_300} руб.</td>
                            <td className={styles.fertileLand_priceTable_body_title}>от {material.Price_Up_To_100} руб.</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <h1 className={categoryStyles.categoryPages_title}>Рассчитайте стоимость доставки!</h1>
            <YandexMapMarsh/>
            <h2 className={categoryStyles.categoryPages_title}>Преимущества сотрудничества с СК «ОСНОВА»</h2>
            <div className={categoryStyles.categoryPages_subTitle}>В нашей компании есть собственный автопарк, за счет чего все работы можно выполнять своими силами. Это позволяет гарантировать клиенту конкурентные цены в сочетании с отличными темпами работы. Опыт работы с 2007 года дает нам преимущества:</div>
            <CarsPark/>
            <h2 className={categoryStyles.categoryPages_litleTitle}>Где применяется плодородная земля?</h2>
            <div className={categoryStyles.categoryPages_text}>Сфера применения материала обусловлена его спецификой. Так, плодородная земля состоит из песка, торфа и чернозема, что обеспечивает ей хорошую влагопроницаемость. Поэтому ее используют для улучшения качества глинистых, песчаных обедненных почв, для повышения урожайности.</div>

            <h2 className={categoryStyles.categoryPages_litleTitle}>Доставка плодородной земли</h2>
            <div className={categoryStyles.categoryPages_text}>У нашей компании — собственный автопарк спецтехники, куда входят 3-х и 4-хосные самосвалы Вольво, Скания и Мерседес от 12 до 30 кубов. Машины всегда исправны, они надежные, маневренные, проходимые. Наши водители — профессионалы с большим опытом, которые всегда выполняют работу вовремя и в полном объеме. Если вам нужны регулярные поставки крупных партий нерудных материалов, мы можем привлечь к доставке своих партнеров.</div>

        </div>
    )
}
export default EarthWorks;