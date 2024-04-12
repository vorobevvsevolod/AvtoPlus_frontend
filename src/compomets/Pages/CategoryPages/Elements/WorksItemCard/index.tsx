import React from "react";
// @ts-ignore
import styles from './styles.module.scss';
import Item from "./Item";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux";
const WorksItemCard: React.FC<{typeOfServiceId: number | undefined}> = (props) =>{
    const { works, work } = useSelector((root: RootState) => root.Works);
    const { materials, material } = useSelector((root: RootState) => root.Materials);
    const { activeCategory } = useSelector((root: RootState) => root.Category);
    return(
        <div className={styles.worksItem_container}>

            {
                props.typeOfServiceId === 1
                    ? <>
                        {
                            work.id ?
                                works.filter(workFilter => workFilter.categoryId === activeCategory && workFilter.id !== work.id).map((workMap) => (
                                    <Item key={workMap.id}  work={workMap} />
                                ))
                                : works.filter(workFilter => workFilter.categoryId === activeCategory).map((workMap) => (
                                    <Item key={workMap.id} work={workMap} />
                                ))
                        }
                    </>
                    :<>
                        {
                            material.id ? (
                                // Если у материала есть идентификатор
                                (material.sub && material.sub.length) ? (
                                    // Если у материала есть подкатегории
                                    materials
                                        .filter(workFilter => workFilter.categoryId === activeCategory && workFilter.id === material.id)
                                        .map((matMap) => (
                                            // Рендеринг элементов для каждой подкатегории
                                            matMap.sub.map(subMap => (
                                                <Item key={subMap.id} work={{...subMap, price: `от ${String(subMap.Price_Up_To_100)}`}}  />
                                            ))
                                        ))
                                ) : (

                                    (material.categoryId ? (
                                        materials
                                            .filter(workFilter => workFilter.categoryId === activeCategory && workFilter.id !== material.id)
                                            .map((matMap) => {
                                                if (matMap.sub.length) {
                                                    // Если есть подкатегории
                                                    matMap.sub.map(sub => (
                                                        <Item key={matMap.id} work={{...matMap, price: `от ${String(matMap.Price_Up_To_100)}`}}/>
                                                    ));
                                                } else {
                                                    // Если нет подкатегорий
                                                    return <Item key={matMap.id} work={{...matMap, price: `от ${String(matMap.Price_Over_300)} до ${String(matMap.Price_Up_To_100)}`}}/>;
                                                }
                                            })
                                    ) : (
                                        materials
                                            .filter(workFilter => workFilter.categoryId === activeCategory && workFilter.id === material.parentMaterialId)
                                            .map((matMap) => {

                                                if (matMap.sub && matMap.sub.length) {
                                                    console.log(matMap.id);
                                                   return  matMap.sub.map(sub => {
                                                       if(sub.id !== material.id) return  <Item key={sub.id} work={{...sub, price: `от ${String(sub.Price_Up_To_100)}`}}/>
                                                   }
                                                    );
                                                }
                                            })
                                    ))
                                )
                            ) : (
                                materials
                                    .filter(workFilter => workFilter.categoryId === activeCategory)
                                    .map((matMap) => {
                                        if (matMap.sub.length) {
                                            // Если есть подкатегории
                                            let min = matMap.sub[0].Price_Up_To_100, max = 0;

                                            matMap.sub.forEach(subMap => {
                                                if (subMap.Price_Up_To_100 > max) max = subMap.Price_Up_To_100;
                                                if (subMap.Price_Up_To_100 < min) min = subMap.Price_Up_To_100;
                                            });

                                            return <Item key={matMap.id} work={{...matMap, price: `от ${String(min)} до ${String(max)}`}}/>;
                                        } else {
                                            // Если нет подкатегорий
                                            return <Item key={matMap.id} work={{...matMap, price: `от ${String(matMap.Price_Over_300)} до ${String(matMap.Price_Up_To_100)}`}} />;
                                        }
                                    })
                            )
                        }

                    </>

            }
        </div>
    );
}

export default WorksItemCard;