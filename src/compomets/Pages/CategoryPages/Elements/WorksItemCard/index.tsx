import React from "react";
// @ts-ignore
import styles from './styles.module.scss';
import Item from "./Item";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux";
const WorksItemCard: React.FC = (props) =>{
    const { works, work } = useSelector((root: RootState) => root.Works);
    const { activeCategory } = useSelector((root: RootState) => root.Category);
    return(
        <div className={styles.worksItem_container}>

            {
                work.id ?
                    works.filter(workFilter => workFilter.categoryId === activeCategory && workFilter.id !== work.id).map((workMap) => (
                        <Item key={workMap.id} {...workMap} />
                    ))
                : works.filter(workFilter => workFilter.categoryId === activeCategory).map((workMap) => (
                        <Item key={workMap.id} {...workMap} />
                     ))
            }



        </div>
    );
}

export default WorksItemCard;