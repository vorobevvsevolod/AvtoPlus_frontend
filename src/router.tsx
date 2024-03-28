import {Route, Routes} from "react-router-dom";

import React from "react";
import Main from "./compomets/Pages/Main";
import Contact from "./compomets/Pages/Contact";
import RoadConstruction from "./compomets/Pages/CategoryPages/RoadConstructun";
import WorkItem from "./compomets/Pages/WorkItem";
import EarthWorks from "./compomets/Pages/CategoryPages/EarthWorks";


const Router = () => {
	return (
		<Routes>
            <Route path='/home' element={<Main/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='*' element={<Main/>}/>

            <Route path='/Дорожное строительство' element={<RoadConstruction/>}/>
            <Route path='/Земляные работы' element={<EarthWorks/>}/>


            <Route path='/Земляные работы/:id' element={<WorkItem/>}/>
            <Route path='/Дорожное строительство/:id' element={<WorkItem/>}/>
		</Routes>
	);
};

export default Router;
