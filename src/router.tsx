import {Route, Routes} from "react-router-dom";

import React from "react";
import Main from "./compomets/Pages/Main";
import Contact from "./compomets/Pages/Contact";
import RoadConstruction from "./compomets/Pages/CategoryPages/RoadConstructun";
import WorkItem from "./compomets/Pages/WorkItem";
import EarthWorks from "./compomets/Pages/CategoryPages/EarthWorks";
import LandscapingWorks from "./compomets/Pages/CategoryPages/LandscapingWorks";
import FertileLand from "./compomets/Pages/CategoryPages/FertileLand";
import GalleryWorks from "./compomets/Pages/GalleryWorks";
import MaterialItem from "./compomets/Pages/MaterialItem";
import NonMetallicMaterials from "./compomets/Pages/CategoryPages/NonMetallicMaterials";


const Router = () => {
	return (
		<Routes>
            <Route path='/home' element={<Main/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/Галерея работ' element={<GalleryWorks/>}/>
            <Route path='*' element={<Main/>}/>

            <Route path='/Дорожное строительство' element={<RoadConstruction/>}/>
            <Route path='/Земляные работы' element={<EarthWorks/>}/>
            <Route path='/Благоустройство' element={<LandscapingWorks/>}/>
            <Route path='/Плодородная земля' element={<FertileLand/>}/>
            <Route path='/Нерудные материалы' element={<NonMetallicMaterials/>}/>


            <Route path='/Земляные работы/:id' element={<WorkItem/>}/>
            <Route path='/Дорожное строительство/:id' element={<WorkItem/>}/>
            <Route path='/Благоустройство/:id' element={<WorkItem/>}/>
            <Route path='/Плодородная земля/:id' element={<MaterialItem/>}/>
            <Route path='/Нерудные материалы/:id' element={<MaterialItem/>}/>
		</Routes>
	);
};

export default Router;
