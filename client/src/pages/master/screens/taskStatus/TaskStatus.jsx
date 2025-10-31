import { useState } from "react";
import CustomTable from "../../../../components/CustomTable";

const taskStatus = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [taskStatus, settaskStatus] = useState([
    { id: 1, taskStatus: "Not Started" },
    { id: 2, taskStatus: "Inprogress" },
    { id: 3, taskStatus: "Done" },
    { id: 4, taskStatus: "On Hold" },
    
  ]);

  const columns = [
    { name: "S.No", selector: (row) => row.id, width: "100px", sortable: true },
    {
      name: "Project Status",
      selector: (row) => row.taskStatus,
      sortable: true,
      minWidth: "200px",
      maxWidth: "250px",
      wrap: false,
    },
  ];

  const paginatedData = taskStatus.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Custom styles for smaller row height
  const customStyles = {
    rows: {
      style: {
        minHeight: '35px',
        paddingTop: '4px',
        paddingBottom: '4px',
      },
    },
    headCells: {
      style: {
        paddingTop: '6px',
        paddingBottom: '6px',
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        paddingTop: '4px',
        paddingBottom: '4px',
        fontSize: '13px',
      },
    },
  };

  return (
    <div className="p-2">
      <div className="bg-white border border-gray-100 rounded shadow-sm inline-block">
        <CustomTable
          data={paginatedData}
          columns={columns}
          paginationTotalRows={taskStatus.length}
          paginationPerPage={rowsPerPage}
          paginationDefaultPage={currentPage}
          onChangePage={(page) => setCurrentPage(page)}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default taskStatus;
