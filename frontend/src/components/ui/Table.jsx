import { Link } from "react-router-dom";
import editIcon from "../../assets/edit-icon.svg";
import trashIcon from "../../assets/trash-icon.svg";

/**
 * @param {number} data - Data to shoe in the table.
 * @param {object} column - {
 *                            name : string, - column name
 *                            handleDelete : function - a function to delete entry
 *                          }.
 * @returns {jsx} - Table.
 */

const Table = ({ data, column }) => {
  return (
    data.length > 0 && (
      <div className="mx-5 max-w-full my-10 hide-scroll rounded-md overflow-x-auto shadow-2xl border-slate-600 border-solid border ">
        <table className="border-0 text-[18px]">
          <thead>
            <tr className="bg-tc-blue text-white">
              <td>S.No</td>
              {Object.keys(data[0]).map((columnName, index) => {
                if (columnName === "userid" || columnName === "id") {
                  return; // Early return
                }
                return (
                  <th
                    key={index}
                    className={
                      "border-slate-600 border-t-0 " +
                      (index === 0 && "border-s-0")
                    }
                  >
                    {columnName}
                  </th>
                );
              })}
              {column && (
                <th className="border-slate-600 border-t-0 border-e-0">
                  {column.name}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  {Object.entries(row).map((cell, cellIndex) => {
                    if (cell[0] === "userid" || cell[0] === "id") {
                      return; // Early return
                    }
                    return (
                      <td
                        key={cellIndex}
                        className={
                          "border-slate-600 " +
                          (cellIndex === 0 && "border-s-0")
                        }
                      >
                        {cell[1]}
                      </td>
                    );
                  })}
                  {column && (
                    <td className="border-slate-600 border-e-0">
                      <div className="flex justify-center gap-x-1">
                        <Link
                          to={`/profile/${row.id}/edit`}
                          className="flex justify-center items-center"
                        >
                          <img
                            src={editIcon}
                            className="p-1 rounded hover:bg-slate-300 w-7 h-7"
                          />
                        </Link>
                        <img
                          src={trashIcon}
                          className="p-1 rounded hover:bg-slate-300 w-7 h-7"
                          onClick={column.handleDelete(row.id)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
