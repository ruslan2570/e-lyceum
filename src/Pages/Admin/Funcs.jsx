import AuthService from "../../Services/AuthService";
import ServerUrl from "../../Const/ServerUrl";

const Funcs = () => {

    const changePassword = () => {
        let newPassword = window.prompt("Введите новый пароль");

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + AuthService.getToken()
        }

        var raw = `{\"password\": ${newPassword}}`;


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

    const deleteAllStudents = () => {
        const confirmation = window.confirm("Вы уверены, что хотите удалить всех учеников? После удаления все тему станут свободными");

        if (confirmation) {
            const headers = {
                "Authorization": "Bearer " + AuthService.getToken()
            }

            var requestOptions = {
                method: 'DELETE',
                headers: headers,
                redirect: 'follow'
            };

            fetch(ServerUrl + "func.php", requestOptions)
                .then(response => {
                    if (response.status === 200) {
                        alert("Ученики успешно удалены")
                    } else {
                        alert("При удалении учеников произошла ошибка ")
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    return (
        <div>
            <button className="send" onClick={changePassword}>Сменить пароль на главной странице</button>
            <button className="send" onClick={deleteAllStudents}>Удалить всех учеников</button>
        </div>
    )
}

export default Funcs;