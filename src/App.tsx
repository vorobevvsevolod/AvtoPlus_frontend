import React from 'react';
import './scss/app.scss';
import Header from "./compomets/UI/Header";
import {RootState, useAppDispatch} from "./redux";
import {fetchUserInfo, getTokenByCookie} from "./redux/slice/UserSlice";
import {useSelector} from "react-redux";
import Router from "./router";
import {fetchCategory} from "./redux/slice/CategorySlice";
import HeaderSub from "./compomets/UI/HeaderSub";
import {fetchGalleryWorks, fetchWorks} from "./redux/slice/WorksSlice";
import BreadCrumbs from "./compomets/UI/BreadCrumbs";
function App() {
    const dispatch = useAppDispatch();
    const { token } = useSelector((state: RootState) => state.userInfo)
    React.useEffect(() =>{
        dispatch(getTokenByCookie())
        dispatch(fetchCategory())
        dispatch(fetchWorks())
        dispatch(fetchGalleryWorks())

    }, [])

    React.useEffect(() =>{
        if(token){
            dispatch(fetchUserInfo())

        }
    }, [token])
  return (
      <div className="body">
          <Header/>
          <div className="main">
              <HeaderSub/>
              <div className="container">
                  <div className='wrapper'>
                      <BreadCrumbs/>
                      <Router/>
                  </div>
              </div>


          </div>
      </div>
  );
}

export default App;
