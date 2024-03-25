import React from "react";
// @ts-ignore
import styles from "../categoryPages.module.scss";
import CategoryImage from "../Elements/CategoryImage";
import WorksItemCard from "../Elements/WorksItemCard";
import StagesWork from "../Elements/StagesWork";
import CarsPark from "../Elements/CarsPark";
import YandexMap from "../Elements/YandexMap";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux";

const RoadConstruction: React.FC = () => {
    const { activeCategory } = useSelector((root: RootState) => root.Category);
    return (
        <div>
            <h2 className={styles.categoryPages_title}>Строительство дорог: <span>наши дороги самые долговечные</span> </h2>
            <CategoryImage imgURL={"/img/дорожноестроительство.jpg"}/>

            <h1 className={styles.categoryPages_litleTitle}>Дороги от компании «СК Основа»</h1>
            <div className={styles.categoryPages_subTitle}>
                СК Основа — компания, которая профессионально занимается строительством дорог. Мы даем гарантию на выполненные работы, используем только проверенные материалы, современную спецтехнику. Наши сотрудники — люди с большим опытом, которые помогают находить оптимальные решения для каждого заказчика. Построенные нами дороги служат заявленный срок и даже дольше, соответствуют ГОСТ.
            </div>
            <h1 className={styles.categoryPages_titleCenter}>Какие дороги мы строим</h1>
            <WorksItemCard/>
            <StagesWork/>
            <h2 className={styles.categoryPages_title}>Наши преимущества </h2>
            <CarsPark/>

            <h2 className={styles.categoryPages_title}>География наших работ </h2>
            <YandexMap/>




        </div>
    );
}

export default RoadConstruction;