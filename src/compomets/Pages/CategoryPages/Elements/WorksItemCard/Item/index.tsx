import React from "react";
// @ts-ignore
import styles from './style.module.scss';
import {IWork} from "../../../../../../redux/interface/Works/IWork";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux";
const Item:React.FC<IWork> = (props) =>{
    const { breadCrumbs } = useSelector((root:RootState) => root.Category);
    return (
        <>
            <Link to={`/${breadCrumbs[0]}/${props.id}`}>
                <div className={styles.item}>
                    <img className={styles.item_img} src={`${process.env.REACT_APP_API_SERVER}${props.images[0].url}`} alt={props.title}/>

                    <div className={styles.item_contaierTitle}>
                        <h4 className={styles.item_contaierTitle_title}>{props.title}</h4>
                        <div className={styles.item_contaierTitle_subtitle}>{props.lastYear}</div>
                    </div>
                    <div className={styles.item_contaierTitle_price}>Ценa: <span>{(props.price === "смета") ? props.price : props.price + "р."}</span></div>

                </div>



            </Link>
        </>


    );

}
export default Item;