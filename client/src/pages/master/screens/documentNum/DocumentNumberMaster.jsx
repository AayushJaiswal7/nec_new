import React from "react";
import { CiSearch } from "react-icons/ci";
import InputField from "../../../../components/InputField";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb";
import DocumentNumberTable from "./DocumentNumberTable"

const DocumentNumberMaster = () => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Master Data", href: "/master" },
    { label: "Project Master", href: "/master" },
    { label: "Document Numbering Series", href: "/master/document-num-series" },
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
        </div>

        <div>
            <DocumentNumberTable />
        </div>
      </div>
    </>
  );
};

export default DocumentNumberMaster;
