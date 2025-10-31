import { CiSearch } from "react-icons/ci";
import ButtonComponent from "../../../../components/ButtonComponent";
import InputField from "../../../../components/InputField";
import SiteTable from "./SiteTable";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const SiteMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Use URL parameter for reliable detection
  const searchParams = new URLSearchParams(location.search);
  const isFromProjectMaster = searchParams.get("source") === "project-master";

  const handleBackRoute = () => {
    // ✅ Navigate back to appropriate location based on source
    if (isFromProjectMaster) {
      navigate("/master");
    } else {
      navigate("/admin");
    }
  };

  const [searchParam, setSearchParam] = useState("");

  return (
    <>
      {/* ✅ NO breadcrumbs here - Admin.jsx handles them */}

      <div className="m-4">
        {/* --- Top Control Bar --- */}
        <div
          className="
          flex flex-col sm:flex-row 
          sm:justify-between sm:items-center 
          gap-3 mb-4
        "
        >
          {/* Search input */}
          <div className="w-full sm:w-auto">
            <InputField
              placeholder="Search"
              icon={<CiSearch size={18} />}
              width="w-full sm:w-[250px]"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </div>

          {/* Add Site button */}
          <div className="flex justify-start sm:justify-end w-full sm:w-auto">
            <Link
              to={`/admin/site/add-site${
                isFromProjectMaster ? "?source=project-master" : ""
              }`}
            >
              <ButtonComponent
                title="Add Site"
                iconPosition={0}
                icon={IoMdAdd}
                className="w-full sm:w-auto"
              />
            </Link>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="overflow-x-auto">
          <SiteTable searchParam={searchParam} />
        </div>
      </div>
    </>
  );
};

export default SiteMaster;
