import {Route, Routes} from "react-router-dom";

import React from "react";
import Main from "./compomets/Pages/Main";
import Contact from "./compomets/Pages/Contact";


const Router = () => {
	return (
		<Routes>
            <Route path='/home' element={<Main/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='*' element={<Main/>}/>
		</Routes>
	);
};

export default Router;
