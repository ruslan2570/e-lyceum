import AuthService from "../../Services/AuthService";
import ServerUrl from "../../Const/ServerUrl";

const Funcs = () => {

    const changePassword = () => {
        let newPassword = window.prompt("Введите новый пароль");

        if(newPassword){

        
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + AuthService.getToken()
        }

        var raw = `{\"password\": \"${newPassword}\"}`;


        var requestOptions = {
            method: 'PUT',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        fetch(ServerUrl + "func.php", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("Пароль успешно изменён")
                } else {
                    alert("При изменении пароля произошла ошибка")
                }
            })
            .catch(error => console.log('error', error));

        }
    }

    const deleteAllStudents = () => {
        const confirmation = window.confirm("Вы уверены, что хотите удалить всех учеников? После удаления все тему станут свободными");

        if (confirmation) {
            const headers = {
                "Authorization": "Bearer " + AuthService.getToken()
            }

            var raw = '{\"target\": \"students\"}';

            var requestOptions = {
                method: 'DELETE',
                body: raw,
                headers: headers,
                redirect: 'follow'
            };

            

            fetch(ServerUrl + "func.php", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        alert("Ученики успешно удалены")
                    } else {
                        alert("При удалении учеников произошла ошибка")
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    const deleteAllTopics = () => {
        const confirmation = window.confirm("Вы уверены, что хотите удалить все темы?");

        if (confirmation) {
            const headers = {
                "Authorization": "Bearer " + AuthService.getToken()
            }

            var raw = '{\"target\": \"topics\"}';

            var requestOptions = {
                method: 'DELETE',
                body: raw,
                headers: headers,
                redirect: 'follow'
            };

            fetch(ServerUrl + "func.php", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        alert("Все темы удалены")
                    } else {
                        alert("При удалении тем произошла ошибка ")
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    return (
        <div>
            <button className="send" onClick={changePassword}>Сменить пароль на главной странице</button>
            <button className="send" onClick={deleteAllTopics}>Удалить все темы</button>
            <button className="send" onClick={deleteAllStudents}>Удалить всех учеников</button>
        </div>
    )
}

export default Funcs;