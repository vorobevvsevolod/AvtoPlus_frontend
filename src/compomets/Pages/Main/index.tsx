import React from "react";
// @ts-ignore
import styles from './styles.module.scss'
const Main = () => {

    return (
        <>
            <div className="videoContainer">
                <video id="background-video" autoPlay muted loop>
                    <source src="/img/backgroundVideo.mp4" type="video/mp4"/>
                </video>

                <div className="down-arrow"></div>
            </div>
            <div className={styles.wrapperMain}>
                <div className={styles.containerMain}>
                    <video src=""></video>
                </div>
            </div>
        </>
    );

};

export default Main;





