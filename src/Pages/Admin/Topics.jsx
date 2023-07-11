import { useState, useEffect } from 'react';
import ServerUrl from '../../Const/ServerUrl';

const Topics = () => {
    const [teachersList, setTeachersList] = useState(null);
    const [classesList, setClassesList] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(ServerUrl + "teacher.php", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(obj  => setTeachersList(obj))
            .catch(err => console.log("error: ", err));

        fetch(ServerUrl + "class.php", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(obj => setClassesList(obj))
            .catch(err => console.log("error: ", err));
    }, []);

    useEffect(() => {
        console.log(selectedClass);
        console.log(selectedTeacher);
    }, [selectedClass, selectedTeacher]);

    return (
        <div className="topic_container">
            <div className='add_topic_container'>
                <h3>Создать тему</h3>
 
                <label htmlFor="selectTeacher">Учитель</label>
                <select id='selectTeacher' onChange={e => setSelectedTeacher(e.target.value)}>
                <option className="list" key="">Выберите учителя</option>
                    {teachersList !== null &&
                        teachersList.map(t => (
                            <option className="list" key={t['id']}>{t['fullname']}</option>
                        )
                        )
                    }
                </select>

                <label htmlFor="selectClass">Класс</label>
                <select id='selectClass' onChange={e => setSelectedClass(e.target.value)}>
                    <option className="list" key="">Выберите класс</option>
                    {classesList !== null &&
                        classesList.map(c =>
                        (
                            <option className="list" key={c['id']}>{c['value']}</option>
                        )
                        )
                    }
                </select>
            </div>

            <div>

            </div>
        </div>
    )
}

export default Topics