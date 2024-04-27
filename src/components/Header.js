import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Header.css"
import Home from '../pages/Home'
const Header = () => {
    const [activeTab, setActivetab] = useState("Home")

    const location = useLocation();

    useEffect(()=>{
        if(location.pathname==="/"){
            setActivetab("Home");
        } else if(location.pathname==="/add"){
            setActivetab("AddNewStudent");
        }
        else if(location.pathname==="/about"){
            setActivetab("About");
        }
},[location]);
    return (
        <div className='header'>
            <p className='logo'> Student Portal</p>
            <div className="header-right">
                <Link to="/">
                    <p className={`${activeTab === "Home" ? "active" : ""}`}
                        onClick={() => setActivetab("Home")}> Home</p>
                </Link>
                <Link to="/add">
                    <p className={`${activeTab === "AddNewStudent" ? "active" : ""}`}
                        onClick={() => setActivetab("AddNewStudent")}> New Student</p>
                </Link>
                <Link to="/about">
                    <p className={`${activeTab === "About" ? "active" : ""}`}
                        onClick={() => setActivetab("About")}> About</p>
                </Link>
            </div>

        </div>
    )
}

export default Header;