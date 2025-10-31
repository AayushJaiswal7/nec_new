import { useState } from "react";
import ButtonComponent from "../../../../components/ButtonComponent";
import InputField from "../../../../components/InputField";
import UserTable from "./UserTable";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import LogoutButton from "../../../login/LogoutButton";
 
const UserMaster = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
 
  return (
    <div className="m-4">
      <div className="flex justify-between items-center w-full mx-2 pr-2">
        <LogoutButton />
        <InputField
          placeholder="Search"
          icon={<CiSearch size={18} />}
          width="w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonComponent
          title="Add User"
          className="bg-primaryColor text-white text-sm px-1 py-2 rounded flex items-center "
          iconPosition={0}
          icon={IoMdAdd}
          onClick={() => navigate("/add-user")}
        />
      </div>
 
      <UserTable searchTerm={searchTerm} />
    </div>
  );
};
 
export default UserMaster;