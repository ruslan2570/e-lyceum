import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ServerUrl from "../Const/ServerUrl";
import "../Styles/Welcome.css";

const Welcome = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const goToProblemList = e => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${ServerUrl}auth.php`, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    if (e.target.className.split(' ').find(o => o === "low_class") !== undefined) {
                        navigate("/topicsList", { state: { classes: "low" } });
                    }
                    if (e.target.className.split(' ').find(o => o === "higth_class") !== undefined) {
                        navigate("/topicsList", { state: { classes: "high" } });
                    }
                } else {
                    alert("Введите верный пароль");
                }
            })
    }

    return (

        <div className="main">
            <div className="info">
                <div className="title">
                    <p className="title_text">
                        Добро пожаловать в систему автоматизированного выбора темы проектной работы Московского лицея
                        &laquo;Ступени&raquo;
                    </p>
                </div>
                <div className="instruction">
                    <p className="instruction_text">Инструкция:</p>
                    <ol className="instruction_list">
                        <li className="list_one">После выбора класса, ввода пароля и нажания кнопки &laquo;Просмотр доступных тем&raquo;
                            вам
                            будет продемонстрирован список свободных на текущий момент тем для проектной деятельности. </li>
                        <li className="list_two">После ознакомления с перечнем тем Вам будет предложено осуществить свой выбор
                            темы,
                            дл чего необходимо нажать кнопку &laquo;Зарегистрироваться&raquo;.</li>
                        <li className="list_three">Для успешной регистрации введите свои данные: имя, фамилию, класс и логин в
                            электронном журнале. </li>
                        <li className="list_four">Внимательно проверьте свои данные и, если все верно, приступите к выбору темы
                            (обращайте внимание на номер класса). </li>
                        <li className="list_five">Финальный шаг: из раскрывающегося списка Вам необходимо выбрать тему работы,
                            после
                            чего подтвердить свой выбор нажатием кнопки. </li>
                        <li className="list_six">Для выбора завершения сеанса закройте текущую вкладку. </li>
                    </ol>
                </div>
                <div className="button">
                    <button className="low_class class" onClick={e => goToProblemList(e)}>4-5 классы</button>
                    <button className="higth_class class" onClick={e => goToProblemList(e)}>8-10 классы</button>
                </div>
                <div className="login">
                    <p className="login_text">Вход в систему</p>
                </div>
                <div className="password">
                    <input className="password_box" onChange={e => setPassword(e.target.value)} value={password} type="password" maxLength="25" size="40"></input>
                </div>
            </div>
            <div className="down"></div>
        </div>
    )
}

export default Welcome;