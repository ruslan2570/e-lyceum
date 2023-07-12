import { Outlet, useNavigate, NavLink } from "react-router-dom";
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
                <img src={logo} alt="Ступени" className="admin_logo"></img>

                <nav className="admin_nav">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "active_navlink" : ""
                        } to="/admin">Главная</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive ? "active_navlink" : ""
                    } to="topics">Темы</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive ? "active_navlink" : ""
                    } to="teachers">Учителя</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive ? "active_navlink" : ""
                    } to="funcs">Функции</NavLink>
                    <p className="link_logout" onClick={() => { logout() }}>Выход</p>
                </nav>




            </div>

            <Outlet></Outlet>

        </div>
    )
}

export default Admin;