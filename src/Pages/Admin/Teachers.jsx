import {useEffect, useState } from 'react';
import ServerUrl from '../../Const/ServerUrl';
import AuthService from '../../Services/AuthService';

const Teachers = () => {
    const [teacherName, setTeacherName] = useState("");
    const [teachersList, setTeachersList] = useState([]);

    const loadTeachers = () => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(ServerUrl + "teacher.php", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(obj => setTeachersList(obj))
            .catch(err => console.log("error: ", err));
    }

    useEffect(() => loadTeachers(), []);

    const addTeacher = () => {
        if(teacherName.length === 0){
            alert("Введите ФИО учителя");
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + AuthService.getToken()
        }

        var raw = JSON.stringify({
            "fullname": teacherName,
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        fetch(ServerUrl + "teacher.php", requestOptions)
            .then(response => {
                if (response.status === 201) {
                    alert("Учитель успешно создан");
                } else {
                    alert("При создании учителя произошла ошибка");
                }
            })
            .then(() => loadTeachers())
            .catch(error => console.log('error', error));

        setTeacherName("");
    }

    const deleteTeacher = (e) => {
        const teacher_id = e.target.getAttribute("teacher_id");
        const teacher = teachersList.find(x => x.id === teacher_id);
        let confirmation = window.confirm(`Вы уверены, что удалить "${teacher.fullname}"?`);

        if (confirmation) {
            const myHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AuthService.getToken()
            }

            var raw = JSON.stringify({
                "id": teacher_id
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(ServerUrl + "teacher.php", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("Учитель успешно удалён")
                } else {
                    alert("При удалении учителя произошла ошибка")
                }
            })
            .then(() => loadTeachers())
            .catch(error => console.log('error', error));

        }
    }

    return (
        <div className="edit_container">

            <div className="add_container">
                <h3>Создать учителя</h3>

                <div>
                    <label htmlFor="teacherName">ФИО учителя</label>
                    <input type='text' id="teacherName" value={teacherName} onChange={e => setTeacherName(e.target.value)}></input>
                </div>

                <div>
                    <button onClick={addTeacher}>Создать</button>
                </div>

            </div>

            <div className="edit_list">
                {teachersList !== null && teachersList.map(t => (
                    <div className="edit_element" key={t.id}>
                        <div>
                            <span>ФИО: {t['fullname']}</span>
                        </div>
                        <button teacher_id={t.id} onClick={e => deleteTeacher(e)}>Удалить</button>
                    </div>
                )
                )}

            </div>
        </div>

    )
}

export default Teachers

