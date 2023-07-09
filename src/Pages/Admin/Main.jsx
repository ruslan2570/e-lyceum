import { useEffect, useState } from 'react';
import Table from "../../Components/Table";
import ServerUrl from "../../Const/ServerUrl";

const Main = () => {
  const [topics, setTopics] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const makeFree = (e) => {
    console.log(e.target.getAttribute('topic_id'));
  }
 

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

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    if (show === null) { show = "all"; }

    console.log(ServerUrl + "topic.php" + "?show=" + show);
    fetch(ServerUrl + "topic.php" + "?show=" + show, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(json => setTopics(json))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    updateTopics("all");
  }, []);

  return (
    <>
      <select value={selectedShow} onChange={e => {setSelectedShow(e.target.value); updateTopics(selectedShow)}}>
        <option value="all">Все</option>
        <option value="busy">Занятые</option>
        <option value="available">Свободные</option>
      </select>

      {topics.length !== 0 &&
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