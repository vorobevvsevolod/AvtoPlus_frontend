import React from "react";
// @ts-ignore
import styles from "../CategoryPages/categoryPages.module.scss";
import YandexMap from "../CategoryPages/Elements/YandexMap";
import {useAppDispatch} from "../../../redux";
import {clearMaterials} from "../../../redux/slice/MaterialsSlice";
import { clearWork } from "../../../redux/slice/WorksSlice";
import { setActiveCategory } from "../../../redux/slice/CategorySlice";
const GalleryWorks = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() =>{
        dispatch(clearMaterials())
        dispatch(clearWork())
        dispatch(setActiveCategory(""))
    },[])
    return (
        <>
            <h2 className={styles.categoryPages_title} style={{margin: "0px 0px 10px 0"}}>География наших работ </h2>
            <YandexMap/>
        </>
    );

};

export default GalleryWorks;





