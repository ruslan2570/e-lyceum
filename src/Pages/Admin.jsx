import { useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import ServerUrl from '../Const/ServerUrl';
import '../Styles/Admin.css';
import logo from '../img/stupeni.png';

const Admin = () => {


    return (
        <div className="admin_wrap">

            <div className="admin_header">
                <img src={logo} className="admin_logo"></img>

                <nav className="admin_nav">
                    <Link to="/admin/">Главная</Link>
                    <Link to="topics">Темы</Link>
                    <Link to="teachers">Учителя</Link>
                    <Link to="funcs">Функции</Link>

                </nav>

            </div>


            <Outlet></Outlet>

        </div>
    )
}

export default Admin;