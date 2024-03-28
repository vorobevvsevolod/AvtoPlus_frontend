import React from "react";
// @ts-ignore
import styles from './style.module.scss';
import Slider from "../Slider";
import {IImages} from "../../../../../redux/interface/Works/IImages";
const ImagesTitleBlock: React.FC<{images: IImages[], title: string, lastYear: string,titleDesc: string}> = (props) =>{
    return(
     <div className={styles.images_container}>
         <div>
             <div className={styles.images_containerSlider}>
                 <Slider images={props.images}/>
                 <div className={styles.images_containerSlider_number}>
                     <img width={30} height={30} src="/img/call.png" alt="call"/>
                     <div className={styles.images_containerSlider_number_containerTitle}>
                         <div className={styles.images_containerSlider_number_containerTitle_title}>Свяжитесь с нами</div>
                         <span>+7 (921) 779-33-19</span>
                     </div>
                 </div>
             </div>
             <span className={styles.images_img_back}></span>
         </div>
         <div className={styles.images_TitleDesc_container}>
             <div className={styles.images_TitleDesc_title}>{props.title}</div>

             <div className={styles.images_TitleDesc}>
                 <div className={styles.images_TitleDesc_container}>
                     <div className={styles.images_TitleDesc_desc}>
                         {props.titleDesc}
                     </div>

                     <div className={styles.images_TitleDesc_YearContainer}>
                         <span className={styles.images_TitleDesc_YearContainer_text}>{props.lastYear}</span>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    )
}

export default ImagesTitleBlock;
