import { useState } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ServerUrl from '../Const/ServerUrl';
import '../Styles/Admin.css';
import logo from '../img/stupeni.png';
import AuthService from "../Services/AuthService";

const Admin = () => {
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout();
        navigate("/login");
    }

    return (
        <div className="admin_wrap">

            <div className="admin_header">
                <img src={logo} className="admin_logo"></img>

                <nav className="admin_nav">
                    <Link to="/admin/">Главная</Link>
                    <Link to="topics">Темы</Link>
                    <Link to="teachers">Учителя</Link>
                    <Link to="funcs">Функции</Link>
                    <a className="link_logout" onClick={() => {logout()}}>Выход</a>
                </nav>
              

            </div>

            <Outlet></Outlet>

        </div>
    )
}

export default Admin;