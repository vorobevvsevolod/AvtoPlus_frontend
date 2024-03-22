import React from "react";
// @ts-ignore
import styles from './styles.module.scss';
import Item from "./Item";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux";
const WorksItemCard: React.FC = (props) =>{
    const { works } = useSelector((root: RootState) => root.Works);
    const { activeCategory } = useSelector((root: RootState) => root.Category);
    return(
        <div className={styles.worksItem_container}>


            {
                works.filter(work => work.categoryId === activeCategory).map((work) => (
                    <>
                        <Item key={work.id} {...work} />


                    </>
            ))
            }



        </div>
    );
}

export default WorksItemCard;