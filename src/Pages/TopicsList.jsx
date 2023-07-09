import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ServerUrl from '../Const/ServerUrl';
import '../Styles/TopicsList.css';

const TopicsList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [topicsList, setTopicsList] = useState([]);

    useEffect(() => {

        const loadTopics = (classes) => {

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`${ServerUrl}topic.php?show=available&classes=${classes}`, requestOptions)
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .then(json => setTopicsList(json))
                .catch(error => {
                    alert(`При загрузке произошла ошибка: ${error}`);
                    navigate("/");
                });
        }


        if (location.state === null) {
            navigate("/");
        } else {
            const { classes } = location.state;
            loadTopics(classes);
        }
    }, [location, navigate]);

    return (
        <>
            {topicsList.length !== 0 ? (
                <>
                    <table className="table">
                        <tbody>
                            <tr className="title">
                                <th className="title_name">Класс</th>
                                <th className="title_name">ФИО преподователя (полностью)</th>
                                <th className="title_name">Тема выпускной квалификационной работы</th>
                            </tr>

                            {topicsList.map(
                                topic => (

                                    <tr className="list" key={topic['id']}>
                                        <td className="list_name class_item">{topic['class']}</td>
                                        <td className="list_name teacher">{topic['teacher']}</td>
                                        <td className="list_name theme">{topic['topic']}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    <div className="button">
                        <button className="button_regestration" onClick={() => navigate("/send", {state: {topicsList: topicsList}})}>Зарегистрироваться</button>
                    </div>
                </>
            )
                : (<h1 className='title'>На данный момент нет доступных тем</h1>)
            }
            < div className="down"></div>
        </>
    )
}

export default TopicsList;