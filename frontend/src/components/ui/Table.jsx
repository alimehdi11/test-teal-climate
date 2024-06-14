import { Link } from "react-router-dom";

/**
 * TODO :
 * 1. data and column default values should removed
 * 2. Table sholud style properly to match previous styles
 */

const Table = ({
  data = [
    { name: "abdullah", age: 25, nationality: "sumalian" },
    { name: "abdul mailk", age: 19, nationality: "bangladesh" },
    { name: "abdul rehman", age: 17, nationality: "african" },
    { name: "hamza", age: 21, nationality: "indian" },
  ],
  column = {
    name: "Actions",
    value: (id, handleDelete) => {
      return (
        <div className="flex justify-center items-center">
          <Link className="h-[23px]" to={`/profile/${id}/edit`}>
            <img
              src="edit-icon.svg"
              className="p-1 rounded hover:bg-slate-300 w-5"
            />
          </Link>
          <img
            src="trash-icon.svg"
            className="p-1 rounded hover:bg-slate-300 w-5"
            onClick={handleDelete(id)}
          />
        </div>
      );
    },
  },
}) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((columnName, index) => (
            <th key={index}>{columnName}</th>
          ))}
          {column && <th>{column.name}</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
            {column && <th>{column.value(row.id, () => {})}</th>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
