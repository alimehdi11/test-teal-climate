import React from "react";
import { Table, TableContainer, TableHeader } from "../../components/ui/Table";

const ReportPage3 = () => {
  return (
    <>
      <div className="flex p-10">
        <div className="left">
          <h1 className="text-tc-blue text-4xl font-bold">
            Top 5 business units with highest emissions
          </h1>
          <TableContainer>
            <Table>
              <TableHeader></TableHeader>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ReportPage3;
