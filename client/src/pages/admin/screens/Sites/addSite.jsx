// Importing reusable components
import InputField from "../../../../components/InputField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";
import FileUploadInput from "../../../../components/FileUploadInput.jsx";
import { useEffect, useState } from "react";
import Breadcrumb from "../../../../components/BreadCrumb.jsx";
import { toast } from "react-toastify";
import RestService from "../../../../rest-services/RestServices.js";
import { useLocation, useNavigate } from "react-router-dom";

const AddSite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [formData, setFormData] = useState({
    siteCode: "Auto Generated",
    siteName: "",
    branch: "",
    userId: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latLong: "",
    document: "",
  });

  const items = [
    { label: "Admin", href: "/admin" },
    { label: "Site", href: "/admin/site" },
    { label: id ? "Edit Site" : "Add Site", href: "/admin/site-master/add" },
  ];
  const handleBackRoute = () => {
    navigate("/admin/site");
  };

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await RestService.CreateData(
        "/sites/add-site",
        formDataToSend
      );

      if (response.status === 201) {
        toast.success("Site added successfully!");
        navigate(-1);
      } else {
        toast.error("Failed to add site");
      }
    } catch (error) {
      console.error("Error while adding site:", error);
      toast.error("Failed to add site");
    }
  };

  useEffect(() => {
    handleGenerateCode("Animi");
  }, []);
  useEffect(() => {
    if (id) {
      fetchSites();
    }
  }, [id]);

  //TODO: For Now I created generatecode with default branch if branch completed from SAP need to fix this
  const handleGenerateCode = async () => {
    const response = await RestService.GetAllData(
      `/sites/generate-site-code?branch=Animi`
    );
    if (response.status === 200) {
      setFormData((prev) => ({ ...prev, siteCode: response.data.siteCode }));
    }
  };

  const handleEdit = async () => {
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const response = await RestService.UpdateData(
        `/sites/update-site/${id}`,
        formDataToSend
      );
      if (response.status === 200) {
        toast.success("Site updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error while updating site:", error);
      toast.error("Failed to update site");
    }
  };

  const fetchSites = async () => {
    try {
      const response = await RestService.GetByIdData(
        `/sites/get-site-by-id`,
        id
      );
      if (response.status === 200) {
        const site = response.data;
        setFormData({
          siteCode: site.siteCode || "Auto Generated",
          siteName: site.siteName || "",
          branch: site.branch || "",
          userId: site.userId || "",
          street: site.street || "",
          city: site.city || "",
          state: site.state || "",
          postalCode: site.postalCode || "",
          country: site.country || "",
          latLong: site.latLong || "",
          document: site.document || "",
        });
      } else {
        toast.error("Failed to fetch site");
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
      toast.error("Something went wrong while fetching site details");
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
            placeholder="Auto Generated"
            label="Site Code"
            width="w-60"
            value={formData.siteCode}
            onChange={(e) => handleChange("siteCode", e.target.value)}
            readOnly={true}
          />

          <InputField
            placeholder="Enter Site Name here"
            label="Site Name"
            width="w-60"
            value={formData.siteName}
            onChange={(e) => handleChange("siteName", e.target.value)}
          />

          <InputField
            placeholder="Select Branch"
            label="Branch"
            width="w-60"
            value={formData.branch}
            onChange={(e) => handleChange("branch", e.target.value)}
          />

          <InputField
            placeholder="Select Site Manager"
            label="Site Manager"
            width="w-60"
            value={formData.userId}
            onChange={(e) => handleChange("userId", e.target.value)}
          />
        </div>

        {/* ---------- Row 2: Address Info ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Enter Street Name here"
            label="Street Name"
            width="w-60"
            value={formData.street}
            onChange={(e) => handleChange("street", e.target.value)}
          />

          <InputField
            placeholder="Enter City Name here"
            label="City"
            width="w-60"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <InputField
            placeholder="Enter State Name here"
            label="State"
            width="w-60"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />

          <InputField
            placeholder="Enter Postal Code here"
            label="Postal Code"
            width="w-60"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        {/* ---------- Row 3: Country, GPS, and Upload ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Select Country Name"
            label="Country"
            width="w-60"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />

          <InputField
            placeholder="Paste GPS Location here"
            label="GPS Location (Optional)"
            width="w-60"
            value={formData.latLong}
            onChange={(e) => handleChange("latLong", e.target.value)}
          />

          {/* Upload Documents */}
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
            onClick={id ? handleEdit : handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

// Exporting the component
export default AddSite;
