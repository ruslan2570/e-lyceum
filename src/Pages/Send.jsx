import '../Styles/Send.css'

const Send = () => {

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
                        <input className="name" type="text" placeholder="Имя"></input>
                            <input className="surname" type="text" placeholder="Фамилия"></input>
                                <input className="login_journal" type="text" placeholder="Логин в эл. журнале"></input>
                                </div>
                                <div className="class">
                                    <select className="choose" name="class">
                                        <option className="list" value="1">5</option>
                                        <option className="list" value="2">6</option>
                                        <option className="list" value="3">7</option>
                                        <option className="list" value="4">8</option>
                                        <option className="list" value="5">9</option>
                                        <option className="list" value="6">10</option>
                                    </select>
                                </div>
                                <div className="theme">
                                    <select className="teacher_select" name="theme">
                                        <option className="list" value="1">Тема 1 - препод</option>
                                        <option className="list" value="2">Тема 2 - препод</option>
                                        <option className="list" value="3">Тема 2 - препод</option>
                                        <option className="list" value="4">Тема 2 - препод</option>
                                        <option className="list" value="5">Тема 2 - препод</option>
                                        <option className="list" value="6">Тема 2 - препод</option>
                                    </select>
                                </div>
                                <div className="button">
                                    <button className="send">отправить</button>
                                </div>
                            </div>
                    </div>

                    <div className="down"></div>
        </>

    )
}

export default Send;