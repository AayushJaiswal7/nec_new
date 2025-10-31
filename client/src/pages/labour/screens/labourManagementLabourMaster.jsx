import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../components/ButtonComponent";
import InputField from "../../../components/InputField";
import Breadcrumb from "../../../components/BreadCrumb";
import CustomTable from "../../../components/CustomTable";

const LabourManagementLabourMaster = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const breadcrumbItems = [
    { label: "Labour Management", href: "/labour" },
    { label: "Labour Master", href: "/master" },
  ];

  const handleBackRoute = () => navigate("/labour");

  const [labour, setLabour] = useState([
    {
      labourId: 1,
      labourCode: "PTC0939",
      labourName: "Multi Level",
      description: "labour Description",
      createdBy: "User002, 12.12.2024 10:00PM",
      updatedBy: "User002, 12.12.2024 10:00PM",
    },
  ]);

  const handleDelete = (id) => {
    setLabour(labour.filter((r) => r.labourId !== id));
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.labourId,
      sortable: true,
      width: "100px",
    },
    {
      name: "Labour Code",
      selector: (row) => row.labourCode,
      sortable: true,
    },
    {
      name: "Labour Name",
      selector: (row) => row.labourName,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Created By",
      selector: (row) => row.createdBy,
      sortable: true,
    },
    {
      name: "Updated By",
      selector: (row) => row.updatedBy,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-3">
          <button className="text-gray-600 hover:text-gray-800">
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.labourId)}
            className="text-red-700 hover:text-red-900"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const paginatedData = labour.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />
      <div className="m-4">
        <div className="flex justify-between items-center w-full gap-3 m-2">
          <InputField
            placeholder="Search"
            icon={<CiSearch size={18} />}
            width="w-[250px]"
          />
          <ButtonComponent
            title="Create Labour"
            className="bg-primaryColor text-white text-sm px-4 py-2 rounded flex items-center"
            iconPosition={0}
            icon={IoMdAdd}
            onClick={() => navigate("/create-labour")}
          />
        </div>

        <div className="overflow-x-auto">
          <div className="m-2 mt-5">
            <CustomTable
              data={paginatedData}
              columns={columns}
              paginationTotalRows={labour.length}
              paginationPerPage={rowsPerPage}
              paginationDefaultPage={currentPage}
              onChangePage={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LabourManagementLabourMaster;
