import { useState, useEffect } from 'react';
import ServerUrl from '../../Const/ServerUrl';
import AuthService from '../../Services/AuthService';
import { findAllInRenderedTree } from 'react-dom/test-utils';

const Topics = () => {
    const [teachersList, setTeachersList] = useState(null);
    const [classesList, setClassesList] = useState(null);
    const [topicList, setTopicList] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [topicName, setTopicName] = useState("");

    const loadData = () => {

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

        fetch(ServerUrl + "topic.php", requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(obj => setTopicList(obj))
            .catch(err => console.log("error: ", err));
    }

    useEffect(() => {
        loadData();
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
            "name": topicName,
            "teacher_id": selectedTeacher.id,
            "class_id": selectedClass.id
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        fetch(ServerUrl + "topic.php", requestOptions)
            .then(response => {
                if (response.status === 201) {
                    alert("Тема успешно добавлена");
                } else {
                    alert("При добавлении произошла ошибка");
                }
            })
            .then(() => loadData())
            .catch(error => console.log('error', error));

        setTopicName("");
    }

    const deleteTopic = (e) => {
        const topic_id = e.target.getAttribute("topic_id");
        const topic = topicList.find(x => x.id === topic_id);
        let confirmation = window.confirm(`Вы уверены, что удалить тему "${topic.topic}"?`);

        if (confirmation) {
            const myHeaders = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AuthService.getToken()
            }

            var raw = JSON.stringify({
                "id": topic_id
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(ServerUrl + "topic.php", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        alert("Тема успешно удалена")
                    } else {
                        alert("При удалении темы произошла ошибка ")
                    }
                })
                .then(() => loadData())
                .catch(error => console.log('error', error));

        }
    }

    let uploadFile;

    function handleFile() {
        uploadFile = this.files[0];

        const myHeaders = {
            "Authorization": "Bearer " + AuthService.getToken()
        }

        let formdata = new FormData();
        formdata.append("file", uploadFile);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: myHeaders
        };

        fetch(ServerUrl + "import.php", requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    alert("Произошла ошибка");
                }
                return response.text()
            })
            .then(text => {if(text !== undefined) {JSON.parse(text)}} )
            .catch(error => console.log('error', error));
    }

    const getTemplate = () => {
        const myHeaders = {
            "Authorization": "Bearer " + AuthService.getToken()
        }

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch(ServerUrl + "import.php", requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    alert("Произошла ошибка");
                }
                return response.text()
            })
            .then(data => {

                var file = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                if (window.navigator.msSaveOrOpenBlob) // IE10+
                    window.navigator.msSaveOrOpenBlob(file, "import.xlsx");
                else { // Others
                    var a = document.createElement("a"),
                            url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = "import.xlsx";
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }, 0);
                }

            } )
            .catch(error => console.log('error', error));
    }


    const uploadExcel = () => {

        let fileInput = document.createElement('input');
        fileInput.type = "file";
        fileInput.accept = ".xls, .xlsx, .cvs";
        fileInput.addEventListener("change", handleFile, false);
        fileInput.click();


    }

    return (
        <>
            <div className='btn_excel_container'>
                <button className='btn_excel' onClick={uploadExcel}>Загрузить из Excel</button>
                <button className='btn_excel' onClick={getTemplate}>Скачать шаблон</button>
            </div>
            <div className="edit_container">

                <div className='add_container'>
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

                <div className="edit_list">
                    {topicList !== null && topicList.map(t => (
                        <div className="edit_element" key={t.id}>
                            <div>
                                <span>Тема: {t['topic']}</span>
                            </div>
                            <div>
                                <span>Учитель: {t['teacher']}</span>
                            </div>
                            <div>
                                <span>Класс: {t['class']}</span>
                            </div>
                            <button topic_id={t.id} onClick={e => deleteTopic(e)}>Удалить</button>
                        </div>
                    ))
                    }
                </div>

            </div>
        </>
    )
}

export default Topics