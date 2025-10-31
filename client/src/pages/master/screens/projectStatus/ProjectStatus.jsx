import { useState } from "react";
import CustomTable from "../../../../components/CustomTable";

const ProjectStatus = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [projectStatus, setProjectStatus] = useState([
    { id: 1, projectStatus: "Initiated" },
    { id: 2, projectStatus: "Setup in Progress" },
    { id: 3, projectStatus: "Fully Planned" },
    { id: 4, projectStatus: "Execution Started" },
    { id: 5, projectStatus: "Variance Detected" },
    { id: 6, projectStatus: "QA Progress" },
    { id: 7, projectStatus: "Project Closed" },
    { id: 8, projectStatus: "Archived" },
  ]);

  const columns = [
    { name: "S.No", selector: (row) => row.id, width: "100px", sortable: true },
    {
      name: "Project Status",
      selector: (row) => row.projectStatus,
      sortable: true,
      minWidth: "150px",
      maxWidth: "250px",
      wrap: false,
    },
  ];

  const paginatedData = projectStatus.slice(
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
          paginationTotalRows={projectStatus.length}
          paginationPerPage={rowsPerPage}
          paginationDefaultPage={currentPage}
          onChangePage={(page) => setCurrentPage(page)}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default ProjectStatus;
