import React from "react";
// @ts-ignore
import styles from './styles.module.scss';
import {IImages} from "../../../../../redux/interface/IImages";
import {IImagesGalleryWorks} from "../../../../../redux/interface/Works/IImagesGalleryWorks";
const Slider:React.FC<{images: IImages[] | IImagesGalleryWorks[]}> = (props) =>{
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === props.images.length - 1 ? 0 : prevIndex + 1));
    };


    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? props.images.length - 1 : prevIndex - 1));
    };

    React.useEffect(() => {
        if(props.images.length){
            setCurrentIndex(0)
            const interval = setInterval(goToNextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [props.images.length, props.images]);

    return (
        <div className={styles.slider}>
            {
                props.images.length &&
                <>
                    {<img className={styles.slider_img}
                          src={`${process.env.REACT_APP_API_SERVER}${props.images[currentIndex]?.url}`}
                          alt={`Slide ${currentIndex + 1}`}/>}
                    <div className={styles.slider_conrainer}>
	                    <img width={35} height={35} className={styles.slider_prevBtn} src="/img/arrowSlider.png" alt="arrowSlider" onClick={goToPrevSlide}/>
                            <div className={styles.slider_containerPoints}>
                                {props.images.map((img, index) => (
                                    <div key={index}
                                         className={`${styles.slider_containerPoints_point} ${index === currentIndex ? styles.slider_containerPoints_point_active :""}`}
                                         onClick={() => setCurrentIndex(index)}></div>
                                ))}
                            </div>


	                    <img width={35} height={35} src="/img/arrowSlider.png" alt="arrowSlider" className={styles.slider_nextBtn} onClick={goToNextSlide}/>
                    </div>

                </>
            }
        </div>
    );
}

export default Slider;