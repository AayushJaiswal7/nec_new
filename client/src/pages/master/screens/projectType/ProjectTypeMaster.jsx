import { useState } from "react";
import CustomTable from "../../../../components/CustomTable";
import InputField from "../../../../components/InputField";
import ButtonComponent from "../../../../components/ButtonComponent";
import { Pencil, Trash2, Plus } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb";

const ProjectTypeMaster = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Master Data", href: "/master" },
    { label: "Project Master", href: "/master" },
    { label: "Project Type", href: "/master/project-type" },
  ];
  const handleBackRoute = () => navigate(-1);

  const handleDelete = (id) => {
    console.log("Delete item with id:", id);
  };

  const handleAdd = () => {
    console.log("Add new project type clicked");
  };

  const columns = [
    {
      name: "S No",
      selector: (row, index) => index + 1,
      width: "100px",
      wrap: true,
    },
    {
      name: "Project Type Code",
      selector: (row) => row.code,
    },
    {
      name: "Project Type Name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      grow: 2,
      wrap: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`${
            row.status === "Active" ? "text-green-600" : "text-red-500"
          } font-medium`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Created By",
      selector: (row) => row.createdBy,
    },
    {
      name: "Updated By",
      selector: (row) => row.updatedBy,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2 justify-center">
          <button className="text-gray-600 hover:text-blue-500">
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const data = [
    {
      id: 1,
      code: "PTC0939",
      name: "Multi Level",
      description: "Project Type Description",
      status: "Active",
      createdBy: "User002, 12.12.2024 10:00PM",
      updatedBy: "User002, 12.12.2024 10:00PM",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />
      <div className="p-4 sm:p-6 bg-[#FFF9F6] min-h-screen">
        {/* Top bar with search and Add button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          {/* Search Input */}
          <div className="w-full sm:w-1/2 md:w-1/3">
            <InputField
              placeholder="Search"
              value={search}
              icon={<CiSearch />}
              onChange={(e) => setSearch(e.target.value)}
              hideLabel
            />
          </div>

          {/* Add Button */}
          <div className="flex justify-end w-full sm:w-auto">
            <ButtonComponent
              title="Add"
              onClick={() => navigate("/master/add-project-type")}
              icon={Plus}
              iconPosition={0}
              width="w-auto"
              type="button"
            />
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-x-auto">
          <div className="min-w-[800px]">
            <CustomTable
              data={data}
              columns={columns}
              paginationPerPage={10}
              paginationServer={false}
              paginationTotalRows={data.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTypeMaster;
