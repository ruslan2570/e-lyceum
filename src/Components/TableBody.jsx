const TableBody = ({ tableData, columns, makeFree }) => {

  

    return (
      <tbody>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? data[accessor] : "——";
                return <td key={accessor}>{tData}</td>;
              })}
              
              <td>
              { data.selection_date !== null &&  <button topic_id={data.id} onClick={makeFree}>Освободить</button> }
              </td> 
            </tr>
          );
        })}
      </tbody>
    );
  };
  
  export default TableBody;