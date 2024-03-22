import React from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../redux";
import {setWorkById} from "../../../redux/slice/WorksSlice";
// @ts-ignore
import styles from './styles.module.scss';
import ImagesTitleBlock from "./Elements/ImagesTitleBlock";


const WorkItem : React.FC = () => {
    const dispatch = useAppDispatch();
    const { work,works } = useSelector((state:RootState) => state.Works);
    const location = useLocation();
    React.useEffect(() =>{
        if(works.length)
            dispatch(setWorkById({id: Number(location.pathname.split('/')[2] ) } )   )
    },[works.length])

    return (
        <div className={styles.workItem_container}>

            {work && <ImagesTitleBlock images={work.images} title={work.title} titleDesc={work.descriptionTitle} lastYear={work.lastYear}/>}
        </div>
    );
}

export default WorkItem;

