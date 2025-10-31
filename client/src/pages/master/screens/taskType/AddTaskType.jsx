import InputField from "../../../../components/InputField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";
import TextareaField from "../../../../components/TextareaField.jsx";
import { useState } from "react";

const AddTaskType = () => {
    const [description, setDescription] = useState("");
  return (
    <>
      <div className="p-5 space-y-10">
        {/* ---------- Row 1:Task Type Code & Name ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            label="Task Type Code"
            placeholder="Task Type Code"
            width="w-60"
          />

          <InputField
            label="Task Type Name"
            placeholder="Task Type Name"
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
export default AddTaskType;
