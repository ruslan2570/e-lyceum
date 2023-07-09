import tableData1 from "../../data.json";
import Table from "../../Components/Table"

const Main = () => {

    const columns = [
        { label: "ФИО", accessor: "full_name", sortable: true },
        { label: "Email", accessor: "email", sortable: false },
        { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
        { label: "Age", accessor: "age", sortable: true },
        { label: "Start date", accessor: "start_date", sortable: true },
      ];
      

    return (
        <div>
            <Table
        caption="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
        data={tableData1}
        columns={columns}
      />
      <br />
        </div>
    )
}

export default Main