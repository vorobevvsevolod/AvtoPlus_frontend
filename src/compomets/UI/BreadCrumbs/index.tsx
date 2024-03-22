import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../redux";
// @ts-ignore
import styles from './styles.module.scss';
import {setBreadCrumbs, setClearBreadCrumbs, setDeleteLastItemBreadCrumbs} from "../../../redux/slice/CategorySlice";
import {StatusFetch} from "../../../redux/interface/StatusFetch";

interface BreadcrumbsProps {}

const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
    const dispatch = useAppDispatch();
    const { breadCrumbs, status } = useSelector((state: RootState) => state.Category)
    const location = useLocation();

    React.useEffect(() =>{
        dispatch(setBreadCrumbs(decodeURIComponent(location.pathname).split('/').filter((x) => x)));
    }, [location.pathname, status])


    if (breadCrumbs.length) {
        return (
            <div className={styles.bread}>
                <Link to="/" className={styles.bread_link} onClick={() => dispatch(setClearBreadCrumbs())}>Главная</Link>

                {
                    breadCrumbs.map((breadCrumb, index) => {
                        if (index !== breadCrumbs.length - 1) {
                            return (
                                <React.Fragment key={index}>
                                    <span>/</span>
                                    <Link to={`/${breadCrumb}`} className={styles.bread_link} onClick={() => dispatch(setDeleteLastItemBreadCrumbs())}>{breadCrumb}</Link>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment key={index}>
                                    <span>/</span>
                                    <span className={`${styles.bread_link_last} ${styles.bread_link}`}>{breadCrumb}</span>
                                </React.Fragment>
                            )
                        }
                    })
                }
            </div>
        );
    } else return ( <></>);

};

export default Breadcrumbs;
