import React from "react";
// @ts-ignore
import styles from './style.module.scss';
import {IWork} from "../../../../../../redux/interface/Works/IWork";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux";
import { IMaterial } from "../../../../../../redux/interface/Materials/IMaterial";
const Item:React.FC<{work:IWork, linkURL?: string }> = (props) =>{
    const { breadCrumbs } = useSelector((root:RootState) => root.Category);
    return (
        <>
            <Link to={`${props.linkURL ? props.linkURL : "/"+ breadCrumbs[0] + "/" + props.work.id}`}>
                <div className={styles.item}>
                    <img className={styles.item_img} src={`${process.env.REACT_APP_API_SERVER}${props.work.images[0].url}`} alt={props.work.title}/>

                    <div className={styles.item_contaierTitle}>
                        <h4 className={styles.item_contaierTitle_title}>{props.work.title}</h4>
                        <div className={styles.item_contaierTitle_subtitle}>{props.work.lastYear}</div>
                    </div>
                    <div className={styles.item_contaierTitle_price}>Ценa: <span>{(props.work.price === "смета") ? props.work.price : props.work.price + "р."}</span></div>

                </div>
            </Link>
        </>


    );

}
export default Item;