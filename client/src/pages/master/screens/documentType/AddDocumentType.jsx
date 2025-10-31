import InputField from "../../../../components/InputField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";
import TextareaField from "../../../../components/TextareaField.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb.jsx";

const AddDocumentType = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Master Data", href: "/master" },
    { label: "Project Master", href: "master" },
    { label: "Document Type", href: "/master/document-type" },
    { label: "Add", href: "/master/add-document-type" },
  ];

  const handleBackRoute = () => navigate(-1);
  return (
    <>
    <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />
      <div className="p-5 space-y-10">
        {/* ---------- Row 1:Customer Code & Name ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            label="Document Type Code"
            placeholder="Document Type Code"
            width="w-60"
          />

          <InputField
            label="Document Type Name"
            placeholder="Document Type Name"
            width="w-60"
          />
        </div>
        {/* ---------- Row 2: Description ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <TextareaField
            label="Description"
            placeholder="Enter Description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            width="w-[35rem]"
            rows={6} //Height
          />
        </div>

        {/* ---------- Save Button ---------- */}
        <div className="pt-5">
          <ButtonComponent
            title="Save"
            color="primary"
            onClick={() => alert("Site details saved")}
          />
        </div>
      </div>
    </>
  );
};
export default AddDocumentType;
