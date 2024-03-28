import React from "react";
// @ts-ignore
import styles from "../categoryPages.module.scss";
import CategoryImage from "../Elements/CategoryImage";
import WorksItemCard from "../Elements/WorksItemCard";
import StagesWork from "../Elements/StagesWork";
import CarsPark from "../Elements/CarsPark";
import YandexMap from "../Elements/YandexMap";
import {clearWork} from "../../../../redux/slice/WorksSlice";
import {useAppDispatch} from "../../../../redux";
const EarthWorks: React.FC = () =>{
    const dispatch = useAppDispatch();

    React.useEffect(() =>{
        dispatch(clearWork())
    },[])
    return (
        <div>
            <h2 className={styles.categoryPages_title}>Земляные работы: <span>современные технологии в действии</span> </h2>
            <CategoryImage imgURL={"/img/земляные работы.jpg"}/>

            <h1 className={styles.categoryPages_litleTitle}>Земляные работы от компании «СК Основа»</h1>


            <div className={styles.categoryPages_subTitle}>
                Компания «СК Основа» специализируется на профессиональном выполнении земляных работ. Мы гарантируем качество выполненных работ, используем только надежные материалы и современную спецтехнику. Наши сотрудники обладают обширным опытом и всегда готовы предложить оптимальные решения для каждого клиента. Выполненные нами земляные работы прослужат долгое время и соответствуют всем стандартам качества.
            </div>

            <h1 className={styles.categoryPages_titleCenter}>Виды земляные работ</h1>
            <WorksItemCard/>


            <StagesWork title={"Технология и этапы земляных работ"} subTitle={"Изначально есть три основные группы работ:"}
                        stages={[{title: "Подготовительные", text: "Сюда входит разработка площадки, другие запланированные работы.", img: "/img/earth1.jpg"},
                            {title: "Основные", text: "В этом разделе – рытье котлованов и траншей, перемещение грунта, вывоз, уплотнение.", img: "/img/earth2.jpg"},
                            {title: "Вспомогательные", text: "Это достаточно объемный раздел, сюда могут войти и работы по благоустройству, и другие – все что потребуется в процессе строительства и обустройства площадок, территория, террас, крыш и т. д.", img: "/img/earth3.jpg"}]}/>
            <h2 className={styles.categoryPages_title}>Наши преимущества </h2>
            <CarsPark/>

            <h2 className={styles.categoryPages_title}>География наших работ </h2>
            <YandexMap/>
        </div>
    )
}
export default EarthWorks;