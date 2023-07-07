import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ServerUrl from "../Const/ServerUrl";
import AuthService from '../Services/AuthService';
// import '../Styles/Send.css'

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onChangeInput = (e) => {
        if(e.target.id === "password"){
            setPassword(e.target.value);
        }
        if(e.target.id === "login"){
            setLogin(e.target.value);
        }
    }

    const makeLogin = () => {
        AuthService.login(login, password);
        // checkAuth();
    }

    const checkAuth = () => {
        alert(AuthService.validateToken("eeee"));

        // alert(AuthService.isAuthenticated());
        // if(AuthService.isAuthenticated()){
        //     navigate("/admin");
        // }
    }

    useEffect(() => {
        checkAuth();
    },[])

    return (
        <>
            <div className="main">
                <div className='info'>
                <h1>Вход в контрольную панель</h1>

                <div>
                    <div>
                        <label htmlFor='login'>Логин:</label>
                        <input type='text' id='login' className='login_input' value={login} onChange={e => onChangeInput(e)}></input>
                    </div>
                    <div>
                        <label htmlFor='password'>Пароль:</label>
                        <input type='text' id='password' className='login_input' value={password} onChange={e => onChangeInput(e)}></input>
                    </div>


                    <button className='send' onClick={makeLogin}>Войти</button>
                </div>


                </div>
            </div>

            <div className="down"></div>
        </>

    )
}

export default Login;