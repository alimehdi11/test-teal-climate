import { Link } from "react-router-dom";

/**
 * TODO :
 * 1. data and column default values should removed
 * 2. Table sholud style properly to match previous styles
 */

const Table = ({ data, column }) => {
  return (
    data.length > 0 && (
      <div className="mx-5 max-w-full my-10 hide-scroll rounded-md overflow-x-auto shadow-2xl border-slate-600 border-solid border ">
        <table className="border-0 text-[18px]">
          <thead>
            <tr className="bg-tc-blue text-white">
              {Object.keys(data[0]).map((columnName, index) => (
                <th
                  key={index}
                  className={
                    "border-slate-600 border-t-0 " +
                    (index === 0 && "border-s-0")
                  }
                >
                  {columnName}
                </th>
              ))}
              {column && (
                <th className="border-slate-600 border-t-0 border-e-0">
                  {column.name}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      "border-slate-600 " + (cellIndex === 0 && "border-s-0")
                    }
                  >
                    {cell}
                  </td>
                ))}
                {column && (
                  <td className="border-slate-600 border-e-0">
                    <div className="flex justify-center gap-x-1">
                      <Link
                        to={`/profile/${column.userId}/edit`}
                        className="flex justify-center items-center"
                      >
                        <img
                          src="edit-icon.svg"
                          className="p-1 rounded hover:bg-slate-300 w-7 h-7"
                        />
                      </Link>
                      <img
                        src="trash-icon.svg"
                        className="p-1 rounded hover:bg-slate-300 w-7 h-7"
                        onClick={column.handleDelete(column.userId)}
                      />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
