const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((columnName, index) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
