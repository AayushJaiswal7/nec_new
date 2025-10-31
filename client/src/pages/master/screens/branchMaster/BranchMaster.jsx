import { useState } from "react";
import CustomTable from "../../../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb";
import InputField from "../../../../components/InputField";
import { CiSearch } from "react-icons/ci";

const BranchMaster = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Master Data", href: "/master" },
    { label: "Project Master", href: "/master" },
    { label: "Branch Master", href: "/master/branch-master" },
  ];
  const handleBackRoute = () => navigate(-1);
  const [branchData, setBranchData] = useState([
    {
      id: 1,
      companyCode: "PTC0939",
      companyName: "Multi Level",
      branchCode: "PTC0939",
      branchName: "Multi Level",
      description: "Branch Master Description",
    },
    {
      id: 2,
      companyCode: "PTC0939",
      companyName: "Multi Level",
      branchCode: "PTC0939",
      branchName: "Multi Level",
      description: "Branch Master Description",
    },
    {
      id: 3,
      companyCode: "PTC0939",
      companyName: "Multi Level",
      branchCode: "PTC0939",
      branchName: "Multi Level",
      description: "Branch Master Description",
    },
  ]);
  const columns = [
    { name: "S.No", selector: (row) => row.id, sortable: true },
    {
      name: "Company Code",
      selector: (row) => row.companyCode,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    { name: "Branch Code", selector: (row) => row.branchCode, sortable: true },
    { name: "Branch Name", selector: (row) => row.branchName, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
  ];

  const paginatedData = branchData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />
      <div className="m-4">
        <div className="flex justify-between items-center w-full gap-3 mb-4">
          <InputField
            placeholder="Search"
            icon={<CiSearch size={18} />}
            width="w-[250px]"
          />
        </div>
        <div className="bg-white border border-gray-100 rounded shadow-sm inline-block align-left min-w-[1000px] lg:min-w-[1200px] xl:min-w-[1400px] overflow-x-auto">
          <CustomTable
            data={paginatedData}
            columns={columns}
            paginationTotalRows={branchData.length}
            paginationPerPage={rowsPerPage}
            paginationDefaultPage={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default BranchMaster;