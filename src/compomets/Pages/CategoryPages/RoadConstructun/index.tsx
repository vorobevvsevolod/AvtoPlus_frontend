import React from "react";
// @ts-ignore
import styles from "../categoryPages.module.scss";
import CategoryImage from "../Elements/CategoryImage";
import WorksItemCard from "../Elements/WorksItemCard";
import StagesWork from "../Elements/StagesWork";
import CarsPark from "../Elements/CarsPark";
import YandexMap from "../Elements/YandexMap";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../redux";
import {clearWork} from "../../../../redux/slice/WorksSlice";

const RoadConstruction: React.FC = () => {
    const dispatch = useAppDispatch();
    const {categories, activeCategory} = useSelector((state:RootState) => state.Category)
    React.useEffect(() =>{
        dispatch(clearWork())
    },[])
    return (
        <div>
            <h2 className={styles.categoryPages_title}>Строительство дорог: <span>наши дороги самые долговечные</span> </h2>
            <CategoryImage imgURL={"/img/дорожноестроительство.jpg"}/>

            <h1 className={styles.categoryPages_litleTitle}>Дороги от компании «СК Основа»</h1>
            <div className={styles.categoryPages_text}>
                СК Основа — компания, которая профессионально занимается строительством дорог. Мы даем гарантию на выполненные работы, используем только проверенные материалы, современную спецтехнику. Наши сотрудники — люди с большим опытом, которые помогают находить оптимальные решения для каждого заказчика. Построенные нами дороги служат заявленный срок и даже дольше, соответствуют ГОСТ.
            </div>
            <h1 className={styles.categoryPages_titleCenter}>Какие дороги мы строим</h1>
            <WorksItemCard typeOfServiceId={categories.find(cat => cat.id === activeCategory) ? categories.find(cat => cat.id === activeCategory)?.typeOfServiceId : 0}/>

            <StagesWork title={"Технология и этапы строительства дороги"} subTitle={"При строительстве дорог мы следуем этапам технологии."}
                        stages={[{title: "Выемка грунта под основание дороги.", text: "Проводимые работы зависят от типа местности. Они могут включать в себя выкорчевывание, осушение, проведение дренажа (закрытого или открытого). Если предполагается укладка асфальта, то необходимо оборудование ливневого дренажа.", img: "/img/road1.jpg"},
                                 {title: "Уплотнение основания дороги и укладка геотекстиля.", text: "После выемки почвы уплотняем основу с помощью грунтового виброкатка. Сверху на ставшей плотной почве расстилаем гкотекстильное полотно, чтобы помешать перемешиванию дорожных слоев.", img: "/img/road2.jpg"},
                                 {title: "Устройство дорожной одежды.", text: "Этот этап включает в себя поочередную укладку следующих слоев: песка, щебенки и асфальта. Ширина каждого слоя зависит от предназначения дороги. Все материалы, используемые в строительстве, мы берем из собственных карьеров и доставляем на автотранспорте нашей компании. Подобный подход к делу обеспечивает нам первенство в области дорожного строительства.", img: "/img/road3.jpg"},
                                 {title: "Благоустройство обочин.", text: "На этой стадии производим насыпку обочин из асфальтовой крошки. Затем озеленяем обочины.", img: "/img/road4.jpg"}]}/>
            <h2 className={styles.categoryPages_title}>Преимущества сотрудничества с СК «ОСНОВА»</h2>
            <div className={styles.categoryPages_subTitle}>В нашей компании есть собственный автопарк, за счет чего все работы можно выполнять своими силами. Это позволяет гарантировать клиенту конкурентные цены в сочетании с отличными темпами работы. Опыт работы с 2007 года дает нам преимущества:</div>
            <CarsPark/>

            <h2 className={styles.categoryPages_title}>География наших работ </h2>
            <YandexMap/>




        </div>
    );
}

export default RoadConstruction;