import React from 'react';
import './scss/app.scss';
import Header from "./compomets/UI/Header";
import {RootState, useAppDispatch} from "./redux";
import {fetchUserInfo, getTokenByCookie} from "./redux/slice/UserSlice";
import {useSelector} from "react-redux";
import Router from "./router";
import {fetchMaterials} from "./redux/slice/MaterialsSlice";
import HeaderSub from "./compomets/UI/HeaderSub";
function App() {
    const dispatch = useAppDispatch();
    const { token } = useSelector((state: RootState) => state.userInfo)
    React.useEffect(() =>{
        dispatch(getTokenByCookie())
        dispatch(fetchMaterials())
    }, [])

    React.useEffect(() =>{
        if(token){
            dispatch(fetchUserInfo())

        }
    }, [token])
  return (
      <div className="body">
          <HeaderSub/>
          <div className="main">
              <Header/>
              <Router/>

          </div>
      </div>
  );
}

export default App;
