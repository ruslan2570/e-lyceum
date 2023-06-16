import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ServerUrl from "../Const/ServerUrl";
import '../Styles/Send.css'

const Send = () => {
    const location = useLocation();
    const [topicsList, setTopicsList] = useState([]);
    const [classesList, setClassesList] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [login, setLogin] = useState("");
    const selectorClass = useRef(null);


    useEffect(() => {
        setTopicsList(location.state.topicsList);

        let classes = [];
        topicsList.forEach(
            el => {
                classes.push({ id: el.class_id, value: el.class });
            }
        );

        classes = classes.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id && t.value === value.value
            ))
        )
        setClassesList(classes);

    }, [location, topicsList]);

    const onTopicChange = (e) => {

        if (e.target.selectedOptions[0].id !== undefined) {
            const topic = topicsList.filter(el => el.id === e.target.selectedOptions[0].id)[0];
            setSelectedTopic(topic);
            const topicClass = classesList.filter(el => el.id === topic.class_id)[0];
            const options = selectorClass.current.children;
            const thatOption = Array.from(options).filter(el => el.value === topicClass.value)[0];
            selectorClass.current.selectedIndex = thatOption.index;
        }
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeSurname = (e) => {
        setSurname(e.target.value);
    }

    const onChangeLogin = (e) => {
        setLogin(e.target.value);
    }

    const send = () => {
        if (name !== "" && surname !== "" && login !== "" && selectedTopic !== null) {
            const selectedClass = classesList.filter(el => el.value === selectorClass.current.selectedOptions[0].value)[0].id;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/javascript");

            var raw = `{ "name": ${name}, "surname": ${surname}, "login": ${login}, "topic_id": ${selectedTopic.id}, "class_id": ${selectedClass} }`;

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${ServerUrl}write.php`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        }
    }

    return (

        <>
            <div className="main">
                <div className="info">
                    <div className="title">
                        <p className="title_text">
                            Для выбора темы проекта, пожалуйста, заполните свои персональные данные
                        </p>
                    </div>
                    <div className="input">
                        <input className="name" type="text" value={name} onChange={e => onChangeName(e)} placeholder="Имя"></input>
                        <input className="surname" type="text" value={surname} onChange={e => onChangeSurname(e)} placeholder="Фамилия"></input>
                        <input className="login_journal" type="text" value={login} onChange={e => onChangeLogin(e)} placeholder="Логин в эл. журнале"></input>
                    </div>
                    <div className="class">
                        <select className="choose" name="class" ref={selectorClass} >
                            {classesList !== null &&

                                classesList.map(c =>
                                (

                                    <option className="list" key={c['id']}>{c['value']}</option>

                                )
                                )
                            }
                        </select>
                    </div>
                    <div className="theme">
                        <select className="teacher_select" name="theme" onChange={e => onTopicChange(e)}>
                            {topicsList !== null &&

                                topicsList.map(topic =>
                                (
                                    <option className="list" id={topic['id']} key={topic['id']} >{topic['topic']} - {topic['teacher']}</option>
                                )
                                )

                            }
                        </select>
                    </div>
                    <div className="button">
                        <button className="send" onClick={() => send()}>отправить</button>
                    </div>
                </div>
            </div>

            <div className="down"></div>
        </>

    )
}

export default Send;