import React from "react";
// @ts-ignore
import categoryStyles from '../CategoryPages/categoryPages.module.scss'
// @ts-ignore
import styles from './styles.module.scss';
import {RootState, useAppDispatch} from "../../../redux";
import {clearMaterials} from "../../../redux/slice/MaterialsSlice";
import {clearWork} from "../../../redux/slice/WorksSlice";
import {setActiveCategory, setClearBreadCrumbs} from "../../../redux/slice/CategorySlice";
import { useSelector } from "react-redux";
import Item from "../CategoryPages/Elements/WorksItemCard/Item";
import YandexMap from "../CategoryPages/Elements/YandexMap";
import { Link } from "react-router-dom";
import YandexMapMarsh from "../MaterialItem/Elements/YandexMapMarsh";
const Main = () => {
    const dispatch = useAppDispatch();
    const {categories, activeCategory} = useSelector((root: RootState) => root.Category);
    const {works} = useSelector((root: RootState) => root.Works);
    const {materials} = useSelector((root: RootState) => root.Materials);



    React.useEffect(() => {
        dispatch(clearMaterials())
        dispatch(clearWork())
        dispatch(setActiveCategory(""))
        dispatch(setClearBreadCrumbs())
    }, [])

    return (
        <>

            <div className={categoryStyles.categoryPages_title}>Рассчитайте стоимость доставки Плодородной земли!</div>
            <YandexMapMarsh/>
            <div style={{margin: "40px 0px 0px 0px"}} className={categoryStyles.categoryPages_titleCenter}>Дорожное строительство <br/>и поставка строительных материалов</div>

            {
                categories.length && categories.map(category => {
                    if (category.typeOfServiceId === 1)
                        if(works.length)
                        if ( works.filter(work => work.categoryId === category.id).length >= 3)
                            return (
                                <>
                                    <div className={categoryStyles.categoryPages_title}>{category.name}</div>
                                    <div className={styles.containerItem}>

                                        <div className={styles.containerItem_left}>
                                            <img
                                                src={`${process.env.REACT_APP_API_SERVER}${works.filter(work => work.categoryId === category.id)[0]?.images[0].url}`}
                                                alt=""/>
                                            <Link to={`/${category.name}/${works.filter(work => work.categoryId === category.id)[0].id}`}
                                                className={styles.containerItem_left_title}>{works.filter(work => work.categoryId === category.id)[0].title}
                                                <img width={40} height={40} src="/img/back.svg" alt=""/>
                                            </Link>
                                        </div>
                                        <div className={styles.containerItem_right}>
                                            <div
                                                className={`${styles.containerItem_right_item} ${styles.containerItem_right_item_top}`}>
                                                <img
                                                    className={`${styles.containerItem_right_item_top_img} ${styles.containerItem_right_item_img}`}
                                                    src={`${process.env.REACT_APP_API_SERVER}${works.filter(work => work.categoryId === category.id)[1].images[0].url}`}
                                                    alt=""/>
                                                <Link to={`/${category.name}/${works.filter(work => work.categoryId === category.id)[1].id}`}
                                                    className={styles.containerItem_right_item_title}>{works.filter(work => work.categoryId === category.id)[1].title}
                                                    <img className={styles.containerItem_right_item_title_img}
                                                         src="/img/back.svg" alt=""/>
                                                </Link>
                                            </div>

                                            <div
                                                className={`${styles.containerItem_right_item} ${styles.containerItem_right_item_bottom}`}>
                                                <img
                                                    className={`${styles.containerItem_right_item_bottom_img} ${styles.containerItem_right_item_img}`}
                                                    src={`${process.env.REACT_APP_API_SERVER}${works.filter(work => work.categoryId === category.id)[2].images[0].url}`}
                                                    alt=""/>
                                                <Link to={`/${category.name}/${works.filter(work => work.categoryId === category.id)[2].id}`}
                                                    className={styles.containerItem_right_item_title}>{works.filter(work => work.categoryId === category.id)[2].title}
                                                    <img className={styles.containerItem_right_item_title_img}
                                                         src="/img/back.svg" alt=""/>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            ); else return (
                            <>
                                <div className={categoryStyles.categoryPages_title}>{category.name}</div>
                                <div className={styles.containerItem}>

                                    <div className={styles.containerItem_left}>
                                        <img
                                            src={`${process.env.REACT_APP_API_SERVER}${works.filter(work => work.categoryId === category.id)[0].images[0].url}`}
                                            alt=""/>
                                        <Link to={`/${category.name}/${works.filter(work => work.categoryId === category.id)[0].id}`}
                                              className={styles.containerItem_left_title}>{works.filter(work => work.categoryId === category.id)[0].title}
                                            <img width={40} height={40} src="/img/back.svg" alt=""/>
                                        </Link>
                                    </div>
                                    <div className={styles.containerItem_right}>
                                        <div
                                            className={`${styles.containerItem_right_item} ${styles.containerItem_right_item_top}`}>
                                            <img
                                                className={`${styles.containerItem_right_item_top_img} ${styles.containerItem_right_item_img}`}
                                                src={`${process.env.REACT_APP_API_SERVER}${works.filter(work => work.categoryId === category.id)[1].images[0].url}`}
                                                alt=""/>
                                            <Link to={`/${category.name}/${works.filter(work => work.categoryId === category.id)[1].id}`}
                                                  className={styles.containerItem_right_item_title}>{works.filter(work => work.categoryId === category.id)[1].title}
                                                <img className={styles.containerItem_right_item_title_img}
                                                     src="/img/back.svg" alt=""/>
                                            </Link>
                                        </div>

                                    </div>

                                </div>
                            </>
                        )

                })
            }

            <div className={categoryStyles.categoryPages_title}>География наших работ</div>
            <YandexMap/>

            {
                categories.length && categories.map(category=> {
                    if(category.typeOfServiceId === 2) {
                        // Создаем массив элементов, содержащих компоненты для каждого материала
                        const materialItems = materials
                            .filter(mat => mat.categoryId === category.id)
                            .map(material => {
                                if(material.sub.length){
                                    return material.sub.map(sub => (
                                        <div className={styles.containerItemCardSlider_item}>
                                            <Item key={sub.id} work={{...sub, price: "от " + String(sub.Price_Up_To_100)}} linkURL={`${category.name}/${sub.id}`}/>

                                        </div>
                                    ))
                                }else {
                                    return (
                                        <div className={styles.containerItemCardSlider_item}>
                                            <Item key={material.id}
                                                  work={{...material, price: `от ${String(material.Price_Over_300)} до ${String(material.Price_Up_To_100)}`}}
                                                  linkURL={`${category.name}/${material.id}`}/>

                                        </div>
                                    )
                                }

                            });

                        return (
                            <>
                                <div className={categoryStyles.categoryPages_title}>{category.name}</div>

                                <div className={styles.containerItemCardSlider}>
                                    {materialItems}
                                </div>
                            </>
                        );
                    }
                    return null;
                })
            }


        </>
    );
}
export default Main;





