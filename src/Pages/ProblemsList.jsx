import "../Styles/ProblemsList.css"

const ProblemsList = () => {

    return (
        <>
            <table className="table">
                <tbody>
                    <tr className="title">
                        <th className="title_name">Класс</th>
                        <th className="title_name">ФИО преподователя (полностью)</th>
                        <th className="title_name">Тема выпускной квалификационной работы</th>
                    </tr>
                    <tr className="list">
                        <td className="list_name class_item">6</td>
                        <td className="list_name teacher">Препод</td>
                        <td className="list_name theme">Тема</td>
                    </tr>
                    
                </tbody>
            </table>

            <div className="button">
                <button className="button_regestration">Зарегистрироваться</button>
            </div>

            <div className="down"></div>
        </>


    )

}

export default ProblemsList;