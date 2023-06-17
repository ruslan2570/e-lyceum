import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Consolusion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [seconds, setSeconds] = useState(10);
   
    useEffect(
        () => {


            var timer = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);

            if(location.state == null){
                setTitle("Произошла неизвестная ошибка");
                setDescription("Переход на главную страницу произойдёт через " + seconds);
            }
            else{
                switch (location.state.code) {
                    case 201:
                        setTitle("Тема успешно выбрана");
                        setDescription("Переход на главную страницу произойдёт через " + seconds);
                        break;
                    case 409:
                        setTitle("При выборе темы произошел конфликт. Выберите другую тему и повторите попытку");
                        setDescription("Переход на главную страницу произойдёт через " + seconds);
                        break;
                    default:
                        setTitle("Произошла неизвестная ошибка");
                        setDescription("Переход на главную страницу произойдёт через " + seconds);
                        break;
                }
            }

            if (seconds <= 0) {
                navigate("/");
            }
     
            return () => {
                clearInterval(timer);
              };

        }, [location, seconds]
    )

    return (

        <div className="main">
            <div className="info">

                <div className="title">
                    <p className="title_text">
                        {title}
                    </p>
                </div>
                <div className="instruction">
                    <p className="instruction_text">{description}</p>
                </div>

            </div>
            <div className="down"></div>
        </div>


    )
}

export default Consolusion;