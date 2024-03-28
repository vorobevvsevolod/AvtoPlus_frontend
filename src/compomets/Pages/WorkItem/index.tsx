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


const WorkItem : React.FC = () => {
    const dispatch = useAppDispatch();
    const { work, works } = useSelector((state:RootState) => state.Works);
    const { activeCategory } = useSelector((state:RootState) => state.Category);
    const location = useLocation();
    React.useEffect(() =>{
        if(works.length)
            dispatch(setWorkById({id: Number(location.pathname.split('/')[2] ) } )   )
    },[location.pathname, works.length])

    return (
        <div className={styles.workItem_container}>

            {work && <ImagesTitleBlock images={work.images} title={work.title} titleDesc={work.descriptionTitle} lastYear={work.lastYear}/>}
            <h2 className={categoryStyles.categoryPages_litleTitle}>Особенности строительства</h2>
            <div className={categoryStyles.categoryPages_subTitle}>
                {work.features}
            </div>

            <h2 className={categoryStyles.categoryPages_title}>Стоимость строительства</h2>
            <table className={styles.workItem_priceTable}>
                <thead>
                <tr >
                    <td className={styles.workItem_priceTable_head}>Наименование</td>
                    <td className={styles.workItem_priceTable_head}>Стоимость руб./м2</td>
                </tr>
                </thead>
                <tbody className={styles.workItem_priceTable_body}>
                <tr>
                    <td className={styles.workItem_priceTable_body_title}>{work.priceDescription}</td>
                    <td className={styles.workItem_priceTable_body_subtitle}>от<strong className={styles.workItem_priceTable_price}> {work.price}</strong> (в зависимости от толщины слоя дорожной одежды)</td>
                </tr>
                </tbody>
            </table>
            <div className={styles.workItem_priceFactor}>
                {
                    work?.need?.list.length ?
                        <>
                            <h2 className={categoryStyles.categoryPages_title}>{work.need.title}</h2>
                            <div className={categoryStyles.categoryPages_subTitle}>
                                {work.need.description}
                            </div>
                            <div className={styles.workItem_need}>
                                {
                                    work.need.list.map((list, index) => (
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
            <h2 className={categoryStyles.categoryPages_title}>География работ</h2>

            <YandexMap workId={work.id}/>
            <div className={styles.workItem_priceFactor}>
                {
                    work.priceFactor.list.length ?
                        <>
                            <h2 className={categoryStyles.categoryPages_title}> На цену строительства влияют несколько факторов:</h2>
                            {
                                work.priceFactor.list.map((list, index) => (
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

            <h2 className={categoryStyles.categoryPages_titleCenter}>Быстрое и недорогое строительство</h2>
            <div className={categoryStyles.categoryPages_subTitle}>
                СК «Основа» — компания, которой доверяют. Мы работаем с 2007 года, за это время показали себя как надежный и ответственный партнер и поставщик нерудных материалов. Сделать заявку на расчет стоимости асфальтовой дороги, площадки, парковки вы всегда можете онлайн или по телефону.
                Построенные нами дороги ежедневно выдерживают большие нагрузки, без проблем переносят любые погодные изменения, долго не нуждаются в ремонте благодаря тщательному соблюдению строгих стандартов качества материалов и технологий укладки асфальта.
            </div>

            <h2 className={categoryStyles.categoryPages_titleCenter}>Другие виды работ:</h2>
            <WorksItemCard/>

        </div>
    );
}

export default WorkItem;

