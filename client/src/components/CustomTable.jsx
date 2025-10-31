import React from "react";
import DataTable from "react-data-table-component";
import CustomPagination from "./CustomPagination";

const CustomTable = ({
  data,
  columns,
  paginationPerPage = 10,
  paginationServer = false,
  paginationTotalRows,
  paginationDefaultPage = 1,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  console.log(onChangePage);
  const customStyles = {
    tableWrapper: {
      style: {
        height: "50vh",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff",
        borderRadius: "2px",
        margin: "1px 0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        minHeight: "50px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#FFEFE7",
        fontWeight: "bold",
        borderBottom: "none",
        color: "#374151",
        minHeight: "48px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: 600,
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        fontWeight: 500,
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    pagination: {
      style: {
        display: "none",
      },
    },
  };

  return (
    // <div className="relative flex flex-col h-[600px] max-h-[1000px]">
    <div className="relative flex flex-col ">
      <div className="flex flex-col flex-grow">
        <div className="flex-grow">
          <DataTable
            columns={columns}
            data={data}
            pagination={false}
            customStyles={customStyles}
            paginationServer={paginationServer}
            paginationPerPage={paginationPerPage}
            paginationTotalRows={paginationTotalRows}
            paginationDefaultPage={paginationDefaultPage}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            selectableRowsHighlight
            persistTableHead
            noDataComponent={
              <div className="text-center py-40 text-sm text-green-800">
                No records found.
              </div>
            }
          />
        </div>
      </div>

      {paginationTotalRows > paginationPerPage && (
        <div className="relative border-t border-gray-300 p-3 bg-white">
          <CustomPagination
            rowsPerPage={paginationPerPage}
            rowCount={paginationTotalRows}
            onChangePage={onChangePage}
            currentPage={paginationDefaultPage}
          />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
