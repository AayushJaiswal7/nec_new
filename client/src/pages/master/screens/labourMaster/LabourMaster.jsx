import React from "react";
import { CiSearch } from "react-icons/ci";
import ButtonComponent from "../../../../components/ButtonComponent";
import InputField from "../../../../components/InputField";
import LabourMasterTable from "./LabourMasterTable";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb";

const LabourMaster = () => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Master Data", href: "/master" },
    { label: "Project Master", href: "/master" },
    { label: "Labour Master", href: "/master/labour-master" },
  ];
  const handleBackRoute = () => navigate(-1);
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
          title="Add"
            className="bg-primaryColor text-white text-sm px-4 py-2 rounded flex items-center "
            iconPosition={0}
            icon={IoMdAdd}
            onClick={() => navigate("/master/add-labour-master")} 
          />
        </div>

        <div>
            <LabourMasterTable />
        </div>
      </div>
    </>
  );
};

export default LabourMaster;
