import InputField from "../../../../components/InputField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";
import TextareaField from "../../../../components/TextareaField.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb.jsx";

const AddDelayReason = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Master Data", href: "/master" },
    { label: "Project Master", href: "master" },
    { label: "Delay Reason", href: "/master/delay-reason" },
    { label: "Add", href: "/master/add-delay-reason" },
  ];

  const handleBackRoute = () => navigate(-1);
  return (
    <>
    <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />
      <div className="p-5 space-y-10">
        {/* ---------- Row 1:Customer Code & Name ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            label="Delay Reason Code"
            placeholder="Delay Reason Code"
            width="w-60"
          />

          <InputField
            label="Delay Reason Name"
            placeholder="Delay Reason Name"
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
export default AddDelayReason;
