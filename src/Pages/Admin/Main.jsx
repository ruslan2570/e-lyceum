import { useEffect, useState } from 'react';
import Table from "../../Components/Table";
import ServerUrl from "../../Const/ServerUrl";
import AuthService from '../../Services/AuthService';

const Main = () => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [topics, setTopics] = useState([]);

  const makeFree = async (e) => {
    let topic = topics.find(x => x.id == e.target.getAttribute('topic_id'));

    let confirmation = window.confirm(`Вы уверены, что освободить тему "${topic.topic}"?`);

    if (confirmation) {
      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", "Bearer " + AuthService.getToken());


      var myHeaders = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + AuthService.getToken()
      }


      var raw = `{"id": ${e.target.getAttribute('topic_id')}}`;

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        let response = await fetch(ServerUrl + "topic.php", requestOptions);
        // alert(response.status);
        if (response.status === 200) {
          alert("Тема освобождена");
        } else {
          alert("Произошла ошибка");
        }
      } catch (error) {
        console.log("Произошла ошибка: ", error);
      }

      updateTopics(selectedShow);
    }
  }


  useEffect(() => {
    updateTopics(selectedShow);
  }, [selectedShow]);

  const columns = [
    { label: "ID", accessor: "id", sortable: true },
    { label: "Тема", accessor: "topic", sortable: true },
    { label: "Учитель", accessor: "teacher", sortable: true },
    { label: "Имя ученика", accessor: "student_firstname", sortable: true },
    { label: "Фамилия ученика", accessor: "student_lastname", sortable: true },
    { label: "Логин в эл.журе", accessor: "student_login", sortable: false },
    { label: "Класс", accessor: "class", sortable: true },
    { label: "Дата выбора темы", accessor: "selection_date", sortable: true, sortbyOrder: "desc" }
  ];

  const updateTopics = (show) => {
    setTopics(null);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    console.log(show);
    if (show === null) { show = "all"; }

    console.log(ServerUrl + "topic.php" + "?show=" + show);
    fetch(ServerUrl + "topic.php" + "?show=" + show, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(obj => setTopics(obj))
      .catch(error => console.log('error', error));

    console.log(topics);
  }

  useEffect(() => {
    updateTopics("all");
    console.log("Use effect");
  }, []);


  const downloadExcel = () => {
    const myHeaders = {
      "Authorization": "Bearer " + AuthService.getToken()
    }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch(ServerUrl + "export.php", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Произошла ошибка при загрузке файла.");
        }
        return response.blob();
      })
      .then((blob) => {
        // Создаем временный ссылочный объект (URL) для файла
        const url = window.URL.createObjectURL(blob);

        // Создаем ссылку на файл
        const a = document.createElement("a");
        a.href = url;
        a.download = "Выгрузка " + new Date().toLocaleDateString("ru-RU") + ".xlsx";

        // Добавляем ссылку на страницу и кликаем по ней, чтобы скачать файл
        document.body.appendChild(a);
        a.click();

        // Удаляем ссылку и освобождаем ресурсы
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch((error) => {
        console.error("Ошибка при скачивании файла: ", error.message);
        alert("Произошла ошибка при скачивании файла.");
      });
  }


  return (
    <>
      <div className='btn_excel_container'>
        <select value={selectedShow} onChange={e => setSelectedShow(e.target.value)} className='select_show'>
          <option value="all">Все</option>
          <option value="busy">Занятые</option>
          <option value="available">Свободные</option>
        </select>
        <button className='btn_excel' onClick={downloadExcel}>Экспортировать в Excel</button>
      </div>

      {topics != null && topics.length !== 0 &&
        <div>
          <Table
            data={topics}
            columns={columns}
            makeFree={makeFree}
          />
          <br />
        </div>
      }
    </>
  )
}

export default Main