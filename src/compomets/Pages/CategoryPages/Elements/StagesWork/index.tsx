import React from "react";
import {inspect} from "util";
// @ts-ignore
import stylesCategory from "../../categoryPages.module.scss";
// @ts-ignore
import styles from "./styles.module.scss"

const StagesWork:React.FC =() =>{
    return(
      <div className={stylesCategory.stagesWork_container}>
            <h1 className={stylesCategory.categoryPages_title}>Технология и этапы строительства дороги</h1>
            <div className={stylesCategory.categoryPages_subTitle}>При строительстве дорог мы следуем этапам технологии.</div>

          <div className={`${styles.stagesWork_item} ${styles.stagesWork_item_shadowRight}`}>
                <div className={styles.stagesWork_item_TitleText}>
                    <div className={styles.stagesWork_item_TitleText_title_container}>
                        <div className={styles.stagesWork_item_TitleText_title}><span>01</span></div>
                        <span className={styles.stagesWork_item_TitleText_title_back}></span>
                        <div className={styles.stagesWork_item_TitleText_title_subtitle}>Выемка грунта под <br/> основание дороги.</div>
                    </div>
                    <div className={styles.stagesWork_item_TitleText_text}>
                        Проводимые работы зависят от типа местности. Они могут включать в себя выкорчевывание, осушение, проведение дренажа (закрытого или открытого). Если предполагается укладка асфальта, то необходимо оборудование ливневого дренажа.
                    </div>
                </div>

                <img className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusRight}`} src="/img/road1.jpg" alt=""/>
            </div>
          <div className={`${styles.stagesWork_item} ${styles.stagesWork_item_shadowLeft}`}>
              <img className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusLeft}`} src="/img/road2.jpg" alt=""/>
              <div className={styles.stagesWork_item_TitleText}>
                  <div className={styles.stagesWork_item_TitleText_title_container}>
                      <div className={styles.stagesWork_item_TitleText_title}><span>02</span></div>
                      <span className={styles.stagesWork_item_TitleText_title_back}></span>
                      <div className={styles.stagesWork_item_TitleText_title_subtitle}>Уплотнение основания дороги <br/>и укладка геотекстиля.</div>
                  </div>
                  <div className={styles.stagesWork_item_TitleText_text}>
                      После выемки почвы уплотняем основу с помощью грунтового виброкатка. Сверху на ставшей плотной почве расстилаем гкотекстильное полотно, чтобы помешать перемешиванию дорожных слоев.
                  </div>
              </div>
          </div>

          <div className={`${styles.stagesWork_item} ${styles.stagesWork_item_shadowRight}`}>
              <div className={styles.stagesWork_item_TitleText}>
                  <div className={styles.stagesWork_item_TitleText_title_container}>
                      <div className={styles.stagesWork_item_TitleText_title}><span>03</span></div>
                      <span className={styles.stagesWork_item_TitleText_title_back}></span>
                      <div className={styles.stagesWork_item_TitleText_title_subtitle}>Устройство <br/>дорожной одежды.</div>
                  </div>
                  <div className={styles.stagesWork_item_TitleText_text}>
                      Этот этап включает в себя поочередную укладку следующих слоев: песка, щебенки и асфальта. Ширина каждого слоя зависит от предназначения дороги. Все материалы, используемые в строительстве, мы берем из собственных карьеров и доставляем на автотранспорте нашей компании. Подобный подход к делу обеспечивает нам первенство в области дорожного строительства.
                  </div>
              </div>

              <img className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusRight}`} src="/img/road3.jpg" alt=""/>
          </div>
          <div className={`${styles.stagesWork_item} ${styles.stagesWork_item_shadowLeft}`}>
              <img className={`${styles.stagesWork_item_img} ${styles.stagesWork_item_img_radiusLeft}`} src="/img/road4.jpg" alt=""/>
              <div className={styles.stagesWork_item_TitleText}>
                  <div className={styles.stagesWork_item_TitleText_title_container}>
                      <div className={styles.stagesWork_item_TitleText_title}><span>04</span></div>
                      <span className={styles.stagesWork_item_TitleText_title_back}></span>
                      <div className={styles.stagesWork_item_TitleText_title_subtitle}>Благоустройство <br/>обочин.</div>
                  </div>
                  <div className={styles.stagesWork_item_TitleText_text}>
                      На этой стадии производим насыпку обочин из асфальтовой крошки. Затем озеленяем обочины.
                  </div>
              </div>
          </div>


      </div>
    );
}

export default StagesWork;