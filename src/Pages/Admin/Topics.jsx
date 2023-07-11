import { useState, useEffect } from 'react';
import ServerUrl from '../../Const/ServerUrl';
import AuthService from '../../Services/AuthService';

const Topics = () => {
    const [teachersList, setTeachersList] = useState(null);
    const [classesList, setClassesList] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [topicName, setTopicName] = useState("");

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(ServerUrl + "teacher.php", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(obj => setTeachersList(obj))
            .catch(err => console.log("error: ", err));

        fetch(ServerUrl + "class.php", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(obj => setClassesList(obj))
            .catch(err => console.log("error: ", err));
    }, []);

    const onSelectedTeacher = (e) => {
        const teacher = teachersList.find(el => el.fullname === e.target.value);
        setSelectedTeacher(teacher);
    }

    const onSelectedClass = (e) => {
        const _class = classesList.find(el => el.value === e.target.value);
        setSelectedClass(_class);
    }

    const addTopic = () => {
        if (selectedClass === null || selectedTeacher === null || topicName.length === 0) {
            alert("Введите все данные");
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + AuthService.getToken()
        }

        var raw = JSON.stringify({
            "name": "Это база",
            "teacher_id": 6,
            "class_id": 1
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/topic.php", requestOptions)
            .then(response => {
                if (response.code === 201) {
                    alert("Тема успешно добавлена");
                } else {
                    alert("При добавлении произошла ошибка");
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="topic_container">
            <div className='add_topic_container'>
                <h3>Создать тему</h3>

                <div>
                    <label htmlFor="selectTeacher">Учитель</label>
                    <select id='selectTeacher' onChange={e => onSelectedTeacher(e)}>
                        <option className="list" key="">Выберите учителя</option>
                        {teachersList !== null &&
                            teachersList.map(t => (
                                <option className="list" teacher_id={t['id']} key={t['id']}>{t['fullname']}</option>
                            )
                            )
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="selectClass">Класс</label>
                    <select id='selectClass' onChange={e => onSelectedClass(e)}>
                        <option className="list" key="">Выберите класс</option>
                        {classesList !== null &&
                            classesList.map(c =>
                            (
                                <option className="list" class_id={c['id']} key={c['id']}>{c['value']}</option>
                            )
                            )
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="topicName">Название темы</label>
                    <input type='text' id="topicName" value={topicName} onChange={e => setTopicName(e.target.value)}></input>
                </div>


                <div>
                    <button onClick={addTopic}>Создать тему</button>
                </div>

            </div>

            <div className="topics_edit_list">
                <div>
                    <div>
                        <span>Тема:</span>
                        <span>Хех</span>
                    </div>
                    <div>
                        <span>Учитель:</span>
                        <span>Иванов Иван Иванович</span>
                    </div>
                    <div>
                        <span>Класс:</span>
                        <span>42</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Topics