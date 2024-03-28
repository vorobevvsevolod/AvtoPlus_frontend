import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
// @ts-ignore
import styles from './styles.module.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux";
import {IGalleryWorks} from "../../../../../redux/interface/Works/IGalleryWorks";
import carsPark from "../CarsPark";
import {ISubCategory} from "../../../../../redux/interface/ISubcategory";
import Slider from "../../../WorkItem/Elements/Slider";
import {log} from "util";
import {setActiveCategory} from "../../../../../redux/slice/CategorySlice";
const YandexMap:React.FC<{workId?: number}> = (props) => {
    const { galleryWorks } = useSelector((root: RootState) => root.Works);
    const [galleryWorksFilter, setGalleryWorksFilter] = React.useState<IGalleryWorks[]>(galleryWorks);
    const { categories, activeCategory } = useSelector((root: RootState) => root.Category);

    const [centerCord, setCenterCord] = React.useState<{cordX: number, cordY: number}>({
        cordX: 0,
        cordY: 0
    })
    const [zoomMapCof, setZoomMapCof] = React.useState<number>(1);
    const [zoomMap, setZoomMap] = React.useState<number>(9);


    let centerCordDefault = {
        cordX: 0,
        cordY: 0
    }

    const [activeCategoryInner, setActiveCategoryInner] = React.useState<string | null>(null)

    const [activeSubCategory, setActiveSubCategory] = React.useState<number | null>(null)
    const [activeSubCategoryHover, setActiveSubCategoryHover] = React.useState<number | null>(null)
    const [subCategoriesArray, setSubCategoriesArray] = React.useState<ISubCategory[]>([])
    const [showArrayPoints, setShowArrayPoints] = React.useState<boolean>(false)

    const [activePoint, setActivePoint] = React.useState<number>();
    const [activePointItem, setActivePointItem] = React.useState<IGalleryWorks>();
    const [activePointWithActiveCategory, setActivePointWithActiveCategory] = React.useState<number>(0);

    interface Coordinates {
        cordX: number;
        cordY: number;
    }

    const smoothChangeCenterCord = (start: Coordinates, end: Coordinates, startZoom: number, endZoom: number, duration: number) => {
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            const newX = start.cordX + (end.cordX - start.cordX) * easeInOutQuad(progress / duration);
            const newY = start.cordY + (end.cordY - start.cordY) * easeInOutQuad(progress / duration);
            const newZoom = startZoom * Math.pow((endZoom / startZoom), easeInOutQuad(progress / duration));

            setCenterCord({ cordX: newX, cordY: newY });
            setZoomMap(newZoom);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };
    const calculationCenterCardDefualt = (): {cordX: number, cordY:number} =>{

    const filteredWorks = activeCategoryInner !== null ?  galleryWorks.filter(work => work.categoryId === Number(activeCategoryInner)) : galleryWorks;

        const center: [number, number] = filteredWorks.reduce((accumulator, work) => {
            let maxX = Number.MIN_VALUE;
            let maxY = Number.MIN_VALUE;
            let minX = Number.MAX_VALUE;
            let minY = Number.MAX_VALUE;

            for (const work of filteredWorks) {
                const cordX = parseFloat(work.cordX);
                const cordY = parseFloat(work.cordY);

                maxX = Math.max(maxX, cordX);
                maxY = Math.max(maxY, cordY);
                minX = Math.min(minX, cordX);
                minY = Math.min(minY, cordY);
            }

            const deltaX = maxX - minX;
            const deltaY = maxY - minY;


            return [
                accumulator[0] + parseFloat(work.cordX),
                accumulator[1] + parseFloat(work.cordY)
            ];
        }, [0, 0]);

        return {
            cordX: (center[0] / filteredWorks.length) ,
            cordY: (center[1] / filteredWorks.length)
        }
    }

    React.useEffect(() =>{
        if( activeCategoryInner){
            const subCategories = categories.find(cat => cat.id === activeCategoryInner) ? categories.find(cat => cat.id === activeCategoryInner)?.sub : [];
            setSubCategoriesArray(subCategories ? subCategories : []);
        } else{
            const subCategories:ISubCategory[] = [];
            categories.map(cat => {
                cat.sub.map(catS => {
                    subCategories.push(catS)
                })
            })
            setSubCategoriesArray(subCategories ? subCategories : []);
            smoothChangeCenterCord({cordX: 59.9343, cordY: 30.3351} ,calculationCenterCardDefualt(), zoomMap, zoomMap, 1000)
        }
    }, [activeCategoryInner])

    React.useEffect(() =>{
        if(galleryWorks.length)
            if(activeCategoryInner){
                const filteredWorks = galleryWorks.filter(work => work.categoryId === Number(activeCategoryInner));
                setGalleryWorksFilter(filteredWorks);
                smoothChangeCenterCord({cordX: 59.9343, cordY: 30.3351} ,calculationCenterCardDefualt(), zoomMap, zoomMap * zoomMapCof, 1000)
            } else if(props.workId){
                const filteredWorks = galleryWorks.filter(work => work.workId === Number(props.workId));
                setGalleryWorksFilter(filteredWorks);
            }
        if(activeCategoryInner === null){
                setGalleryWorksFilter(galleryWorks);
        }
    }, [galleryWorks, activeCategoryInner])

    React.useEffect(() =>{
        if(activePoint){
            setActivePointItem(galleryWorksFilter.find(gal => gal.id === activePoint))
            smoothChangeCenterCord(calculationCenterCardDefualt(),
                {cordX: Number(galleryWorks.filter(gal => gal.id === activePoint)[0].cordX) ,
                        cordY: Number(galleryWorks.filter(gal => gal.id === activePoint)[0].cordY) } ,
                        zoomMap, 12, 1000)
        } else {
            smoothChangeCenterCord(centerCord ,calculationCenterCardDefualt(), zoomMap, 9 * zoomMapCof, 1000)
        }
    },[activePoint])
    React.useEffect(() => {
        if(activeCategory) setActiveCategoryInner(activeCategory)
    }, [activeCategory])

    React.useEffect(() =>{
        if(props.workId){
            setActiveSubCategory(props.workId);
        }
    }, [props.workId])

    React.useEffect(() =>{
        if(categories.length){
            const noFilterSubCat = [...subCategoriesArray].map(noFilter => {
                return {
                    ...noFilter,
                    count: 0
                }
            });

            const worksCountSort = categories.map(category =>{
                category.sub.map(cat => {
                    galleryWorksFilter.map(gall => {
                        if(gall.workId === cat.idSub){
                            const foundIndex = noFilterSubCat.findIndex(filter => filter.idSub === cat.idSub);
                            if (foundIndex !== -1) {
                                noFilterSubCat[foundIndex].count += 1;
                            }
                        }
                    })
                })
            })

            noFilterSubCat.sort((a, b) => b.count - a.count);
            setSubCategoriesArray(noFilterSubCat)

        }

    }, [galleryWorksFilter])

        return (
        <div className={styles.yandexMap}>
            <div className={styles.yandexMap_tabsCategories}>
                <div className={`${styles.yandexMap_tabsCategories_item} ${ (activeCategoryInner === null ) ? styles.yandexMap_tabsCategories_item_firstActive : ""}`}
                     onClick={() => {setActiveCategoryInner(null); setActiveSubCategory(null)}}>
                    Все
                </div>
                {
                    categories && categories.map((category, index) => {
                        if(index < 3)
                            return(
                                <div className={`${styles.yandexMap_tabsCategories_item} ${category.id === activeCategoryInner ? styles.yandexMap_tabsCategories_item_active : ""}`}
                                     key={index}
                                     onClick={() => setActiveCategoryInner(category.id)}>
                                    {category.name}
                                </div>
                            )
                    })
                }
            </div>
            <div className={styles.yandexMap_container}>
                <YMaps>
                    <Map
                        key={`1`}
                        defaultState={{ center: [59.9343, 30.3351], zoom: zoomMap, controls: ["zoomControl"] }}
                        state={{center: [centerCord.cordX ? centerCord.cordX :59.9343, centerCord.cordY ? centerCord.cordY :30.3351], zoom: zoomMap}}
                        style={{ width: '65%', height: '600px', borderRadius: "10px" }}
                        modules={["control.ZoomControl"]}
                    >
                        {galleryWorksFilter.map(galleryWork => (
                            <Placemark
                                key={galleryWork.id}
                                geometry={[Number(galleryWork.cordX), Number(galleryWork.cordY)]}
                                properties={{
                                    iconCaption: galleryWork.title,
                                }}
                                options={
                                    {
                                        iconColor: (
                                            (!activePointWithActiveCategory && activePoint === galleryWork.id) ||
                                            (!activePointWithActiveCategory && !activePoint && !activeSubCategory && activeSubCategoryHover !== null && galleryWork.workId === subCategoriesArray[activeSubCategoryHover].idSub) ||
                                            (!activePoint && activeSubCategory && !activePointWithActiveCategory && galleryWork.workId === activeSubCategory) ||
                                            (activePointWithActiveCategory && galleryWork.id == activePointWithActiveCategory)
                                        ) ? '#ff0000' : '#14a414'
                                    }

                                }
                                //'#ff0000' : '#14a414'
                                onClick={() => {
                                    setActivePoint(galleryWork.id)
                                    setActiveSubCategory(galleryWork.workId)

                                }}
                            />
                        ))}
                    </Map>
                </YMaps>
                <div className={styles.yandexMap_list}>
                    <div className={styles.yandexMap_containerList}>
                        {
                            subCategoriesArray.length && subCategoriesArray.map((Subcategory, index ) => (
                                <div className={
                                    `${styles.yandexMap_list_item} 
                             ${  ((activeSubCategoryHover === index && index === 0) || (index === 0 && Subcategory.idSub === activeSubCategory))
                                        ? styles.yandexMap_list_item_activFirst
                                        : ((activeSubCategoryHover === subCategoriesArray.length -1 && activeSubCategoryHover === index) || (Subcategory.idSub === activeSubCategory && index === subCategoriesArray.length -1))
                                            ? styles.yandexMap_list_item_activLast
                                            : ((activeSubCategoryHover !== null && index !== 0 && activeSubCategoryHover === index) || (Subcategory.idSub === activeSubCategory))
                                                ? styles.yandexMap_list_item_activ
                                                : ((activeSubCategoryHover !== null && index === activeSubCategoryHover - 1) ||
                                                    (activeSubCategory && index ===  subCategoriesArray.findIndex(sub => sub.idSub === activeSubCategory) - 1))
                                                    ? styles.yandexMap_list_item_borderLeftDown
                                                    : ((activeSubCategoryHover !== null && index === activeSubCategoryHover + 1)||
                                                        (activeSubCategory && index ===  subCategoriesArray.findIndex(sub => sub.idSub === activeSubCategory) + 1))
                                                        ? styles.yandexMap_list_item_borderLeftUp
                                                        :  styles.yandexMap_list_item_defualt
                                    } ${activeSubCategory === Subcategory.idSub ? styles.yandexMap_list_item_open : ""}`}
                                     style={{height: `${!activePoint && activeSubCategory === Subcategory.idSub ? String(galleryWorksFilter.filter(gall => gall.workId === Subcategory.idSub ).length * 45 + 50 + "px")
                                             : activePoint && activeSubCategory === Subcategory.idSub ? "430px" : ""}`}}
                                     key={Subcategory.idSub}

                                     onMouseEnter={() => {
                                         if(!showArrayPoints) {setActiveSubCategoryHover(index)}

                                     }}
                                     onMouseLeave={() => {
                                         if(!showArrayPoints) setActiveSubCategoryHover(null)
                                     }}
                                     onClick={() => {
                                         if(!showArrayPoints || activeSubCategory !== Subcategory.idSub) {
                                             setShowArrayPoints(true)
                                             setActiveSubCategory(Subcategory.idSub)
                                         }
                                         setActiveSubCategoryHover(null)
                                         if(activePoint && !activeSubCategory)setActivePoint(0);

                                         if(activePoint && activeSubCategory && Subcategory.idSub !== activeSubCategory) {
                                             setActivePoint(0)
                                         }
                                     }}
                                >
                                    <div className={styles.yandexMap_list_item_open_ContainerTitle}>
                                        <div className={`${styles.yandexMap_list_item_open_ContainerTitle_Title}`}>
                                            {activePoint && Subcategory.idSub === activeSubCategory ? activePointItem?.title :
                                                (activeSubCategory !== Subcategory.idSub) ?
                                                <> {Subcategory.title} <div className={styles.yandexMap_list_item_open_ContainerTitle_count}><div className={styles.yandexMap_list_item_open_ContainerTitle_count_number}>{galleryWorksFilter.filter(gall => gall.workId === Subcategory.idSub).length}</div> </div> </>
                                                : Subcategory.title}
                                        </div>

                                        {
                                            activePoint && Subcategory.idSub === activeSubCategory
                                                ? <img className={styles.yandexMap_list_item_open_ContainerTitle_img_back}
                                                       src="/img/back.svg" alt="close"
                                                       onClick={() => {
                                                           setActivePoint(0)
                                                       }}/>
                                                : activeSubCategory === Subcategory.idSub ?
                                                    <img className={styles.yandexMap_list_item_open_ContainerTitle_img}
                                                         src="/img/close.svg" alt="close"
                                                         onClick={() => {
                                                             setShowArrayPoints(false)
                                                             setActivePoint(0)
                                                             setActiveSubCategory(null)
                                                         }}/> : ""
                                        }

                                    </div>
                                    {
                                        (activeSubCategory === Subcategory.idSub) &&
                                        <div className={styles.yandexMap_ListPoints_container}>
                                            {!activePoint ?
                                                <div className={styles.yandexMap_ListPoints}>
                                                    {
                                                        galleryWorksFilter.filter(gall => gall.workId === Subcategory.idSub ).map(gallery =>(
                                                            <div className={styles.yandexMap_ListPoints_item}
                                                                 onMouseEnter={() => {
                                                                     setActivePointWithActiveCategory(gallery.id);
                                                                 }}
                                                                 onMouseLeave={() => {
                                                                     setActivePointWithActiveCategory(0)
                                                                 }}
                                                                 onClick={() => {
                                                                     setActivePoint(gallery.id)
                                                                     setActivePointWithActiveCategory(0);
                                                                 }}
                                                                 key={`${gallery.id}_item`}
                                                            > {gallery.title}</div>
                                                        ))
                                                    }
                                                </div>
                                                : <div className={styles.yandexMap_fullItem}>
                                                    <div className={styles.yandexMap_fullItem_slider}>
                                                        <Slider images={activePointItem?.img ? activePointItem?.img : []}/>
                                                    </div>
                                                    <div className={styles.yandexMap_fullItem_work}>
                                                        Вид работы:
                                                        <span>{Subcategory.title}</span>
                                                    </div>
                                                    <div className={styles.yandexMap_fullItem_scopeWork}>
                                                        Обьем Работы:
                                                        <span>{activePointItem?.scopeWork}</span>
                                                    </div>
                                                    <div className={styles.yandexMap_fullItem_subtitle}>
                                                        {activePointItem?.subTitle}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            ))
                        }
                        <div className={styles.yandexMap_backWhite}></div>
                    </div>
                </div>
            </div>
        </div>

        );

}

export default YandexMap;
