// Import reusable components
import InputField from "../../../../components/InputField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../../components/BreadCrumb.jsx";

const MasterAddProjectType = () => {
  const navigate = useNavigate();
  
    const breadcrumbItems = [
      { label: "Master Data", href: "/master" },
      { label: "Project Master", href: "/master" },
      { label: "Project Type", href: "/master/project-type" },
      { label: "Add", href: "/master/add-project-type" },
    ];
    const handleBackRoute = () => navigate(-1);
  return (
    <>
    <Breadcrumb items={breadcrumbItems} onBackRoute={handleBackRoute} />
      <div className="p-5 space-y-10">

        {/* ---------- Row 1: Project Type Code & Name ---------- */}
        <div className="flex flex-wrap gap-5 md:gap-20">
          <InputField
            placeholder="Project Type Code"
            label="Project Type Code"
            width="w-60"
          />
          <InputField
            placeholder="Project Type Name"
            label="Project Type Name"
            width="w-60"
          />
        </div>

        {/* ---------- Row 2: Description ---------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter Description here"
            className="w-full md:w-[50%] h-24 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* ---------- Row 3: Inactive Checkbox ---------- */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="inactive" className="w-4 h-4" />
          <label
            htmlFor="inactive"
            className="text-sm font-medium text-gray-700"
          >
            In Active
          </label>
        </div>

        {/* ---------- Save Button ---------- */}
        <div className="pt-3">
          <ButtonComponent
            title="Save"
            color="primary"
            onClick={() => alert("Project Type Saved")}
          />
        </div>
      </div>
    </>
  );
};

export default MasterAddProjectType;
