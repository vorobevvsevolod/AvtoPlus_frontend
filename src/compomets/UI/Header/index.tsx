import React from 'react';
import { useLocation } from 'react-router-dom';
// @ts-ignore
import styles from "./styles.module.scss"
import { useSelector} from "react-redux";
import {selectToken} from "../../../redux/slice/UserSlice";
import {Link} from "react-router-dom";
import {RootState, useAppDispatch} from "../../../redux";
import {setBreadCrumbs, setClearBreadCrumbs} from "../../../redux/slice/CategorySlice";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories , activeCategory} = useSelector((state: RootState) => state.Category)

    const location = useLocation()
    const [showSubcategories, setShowSubcategories] = React.useState<string | null>(null);
    const [selectCategory, setSelectCategory] = React.useState<{
        categoryId: string
    } >({categoryId: ""});

    const сhangeExtantion = (str:string): string =>{
        const parts = str.split('.');
        parts[parts.length - 1] = 'gif';
        return parts.join('.');
    }

    return (
		<div className={styles.header}>
			<div className={styles.container}>
				<Link to='/' onClick={ () => dispatch(setClearBreadCrumbs())}>
					<div className={styles.header__logo}>
						<div>
							<h1>Основа</h1>
							<p>Путь качества в  каждой горсти</p>
						</div>

					</div>
				</Link>
                <div className={styles.header_left}>
                    {categories.map((category) =>
                        <div
                            key={category.id}
                            className={`${styles.link} ${(selectCategory.categoryId === category.id || category.id === activeCategory) ? styles.link_active : ''}`}
                            onMouseEnter={() => setShowSubcategories(category.id)}
                            onMouseLeave={() => setShowSubcategories(null)}
                        >
                            {
                                (showSubcategories === category.id || selectCategory.categoryId === category.id || category.id === activeCategory)
                                ? <Link to={`/${encodeURIComponent(category.name)}`}>
                                        <div className={styles.header_left_img}>
                                            <img width={80} height={80} src={`${process.env.REACT_APP_API_SERVER}${сhangeExtantion(category.img)}`} alt={category.name}/>
                                        </div>

                                    </Link>
                                :
                                    <Link to={`/${encodeURIComponent(category.name)}`}>
                                        <div>
                                            <img width={50} height={50} src={`${process.env.REACT_APP_API_SERVER}${category.img}`} alt={category.name} />
                                        </div>
                                        <span>{category.name}</span>
                                    </Link>
                            }

                            {showSubcategories === category.id &&
				                <div className={styles.subcategories}>
                                    {category.sub.map(subcategory => (
                                        <Link key={subcategory.idSub} to={`/${encodeURIComponent(category.name)}/${encodeURIComponent(subcategory.idSub)}`} className={styles.subcategory}>
                                            {subcategory.title}
                                        </Link>
                                    ))}
				                </div>
                            }
                        </div>
                    )}

                </div>
			</div>
		</div>
	);
};

export default Header;