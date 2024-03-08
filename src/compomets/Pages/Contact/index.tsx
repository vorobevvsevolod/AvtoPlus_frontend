import React from "react";
import {useLocation} from "react-router-dom";

const Contact = () => {
    const location = useLocation()

    return (
        <>

            <div className="wrapper">
                <div className="container">
                    <h1>Контакты</h1>
                </div>
            </div>
        </>
    );

};

export default Contact;





