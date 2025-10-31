// Importing reusable components
import InputField from "../../../components/InputField.jsx";
import ButtonComponent from "../../../components/ButtonComponent.jsx";
import FileUploadInput from "../../../components/FileUploadInput.jsx";
import { useState } from "react";
import Breadcrumb from "../../../components/BreadCrumb.jsx";
import DatePickerField from "../../../components/DatePickerField.jsx";
import DropDown from "../../../components/Dropdown.jsx";
import { Navigate } from "react-router-dom";

const CreateLabour = () => {
  const [formData, setFormData] = useState({
    site_code: "Auto Generated",
    site_name: "",
    branch: "",
    user_id: 1, // Temporary, replace later with logged-in user's ID
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    lat_long: "",
    document: "",
  });

  const items = [
    { label: "Labour Management", href: "/labour" },
    { label: "Labour Master", href: "/labour-management-labour-master" },
    { label: "Add ", href: "" },
  ];
  const handleBackRoute = () => {
    Navigate("/labour-management-labour-master");
  };

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };
  const handleSubmit = async () => {
    try {
      //  Log all form data in browser console
      console.log("Sending site data", formData);

      const response = await fetch("http://localhost:5000/api/add-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      alert(data.message || "Site added successfully");
    } catch (error) {
      console.error("Error while adding site:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
     <Breadcrumb items={items} onBackRoute={handleBackRoute} />
      {/* Main container with padding and spacing */}
      <div className="p-5 space-y-10">
        {/* ---------- Row 1: Site Basic Info ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Labour ID"
            label="Labour ID (Auto Generated)"
            width="w-60"
            onChange={(e) => handleChange("site_code", e.target.value)}
          />
          <InputField
            placeholder="Enter Labour Name here"
            label="Labour Name"
            width="w-60"
            onChange={(e) => handleChange("site_name", e.target.value)}
          />
          <DatePickerField
            label="DOB"
            width="w-60"
            
          />
         
        </div>

        {/* ---------- Row 2: Address Info ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Enter Skill/Trade here"
            label="Skill/Trade"
            width="w-60"
            onChange={(e) => handleChange("street", e.target.value)}
          />
          <DropDown
            label="Select Vendor"
            width="w-60"
            
          />
          <DropDown
            label="Select Status"
            width="w-60"
            
          />
          
        </div>

        {/* ---------- Row 3: Country, GPS, and Upload ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
         
          {/* Upload Documents Button */}

          <div className="flex flex-col justify-end">
            <FileUploadInput
              onChange={(filePath) => handleChange("document", filePath)}
            />
          </div>
        </div>

        {/* ---------- Save Button ---------- */}
        <div className="pt-5">
          <ButtonComponent
            title="Save"
            color="primary"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

// Exporting the component
export default CreateLabour;
