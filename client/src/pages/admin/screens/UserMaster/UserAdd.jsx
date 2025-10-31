import InputField from "../../../../components/InputField.jsx";
import DatePickerField from "../../../../components/DatePickerField.jsx";
import ButtonComponent from "../../../../components/ButtonComponent.jsx";
import Breadcrumb from "../../../../components/BreadCrumb.jsx";
import { useState, useEffect } from "react";
import RestService from "../../../../rest-services/RestServices";
import Dropdown from "../../../../components/Dropdown.jsx";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

const AddUser = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [roles,setRoles]=useState([]);
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [initialPassword, setInitialPassword] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
   
  });

  // Hardcoded department options
  const departmentOptions = [
    { label: "QS/ ENGG.", value: "QS/ ENGG." },
    { label: "Person In charge", value: "Person In charge" },
    { label: "PM/ HoD", value: "PM/ HoD" },
    { label: "Admn.", value: "Admn." },
    { label: "CCC/Purchase", value: "CCC/Purchase" },
    { label: "Accounts", value: "Accounts" },
    { label: "Assistant Managing Director", value: "Assistant Managing Director" },
    { label: "Administrative Director", value: "Administrative Director" },
    { label: "Managing Director", value: "Managing Director" }
  ];

//  Auto-generate User ID and Password on load

const navigate=useNavigate();

useEffect(() => {
  fetchUserId();
  setInitialPassword(initialPasswordGenrator());
  fetchRoles();
}, []);



  const fetchUserId = async () => {
   
    try {
      setLoading(true);
      if(loading) return;
      const res = await RestService.GetAllData("/users/get-user-id");
      console.log("Fetched user ID:", res.data);
      if (res.data && res.data.userId) {
        setUserId(res.data.userId);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching user ID:", err);
    }
  };



  const initialPasswordGenrator = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
    let password = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

 // geting the role for dropdown
const fetchRoles = async () => {
  try {
    const res = await RestService.GetAllData("/roles/get-roles-details");
    console.log("Fetched roles:", res.data.data);

    // Correctly get the roles array from res.data.data
    const roleArray = Array.isArray(res.data.data) ? res.data.data : [];
    console.log("Role array:", roleArray);

    setRoles(roleArray);
    console.log("Roles set in state:", roleArray);
  } catch (err) {
    console.error("Error fetching roles:", err);
    setRoles([]);
  }
};




  const validateForm = () => {
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "User name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const items = [
    { label: "Admin", href: "/admin" },
    { label: "User Master", href: "/admin/user-master" },
    { label: "Add User", href: "/admin/user-master/add" },
  ];

  const handleBackRoute = () => {
    navigate("/admin/user-master");
  };

 const submitaddUser = async () => {

  if (!validateForm()) {
    toast.error("Please fill in all required fields");
    return;
  }

  try {
    setLoading(true);

    const allData = {
      user_id: userId,
      user_name: userName,
      email: email,
      phone: phone,
      role_id: role,
      department: department,
      branch: branch,
      initial_password: initialPassword,
      valid_from: validFrom,
      valid_to: validTo,
      is_active: isActive,
    };

    const response = await RestService.CreateData("/users/add-user", allData);

    // If backend sends created object with id
    if (response?.id) {
      toast.success("User added successfully!");

      // Reset form
      setUserId("");
      setUserName("");
      setEmail("");
      setPhone("");
      setRole("");
      setDepartment("");
      setBranch("");
      setInitialPassword("");
      setValidFrom("");
      setValidTo("");
      setIsActive(true);

      navigate("/admin/user-master");

    } else if (response?.message === "Email already exists") {
      toast.warning("This email already exists!");
    } else {
      toast.error(response?.message || "Failed to add user");
    }

  } catch (error) {
    console.error("Error adding user:", error);

    // Backend error handling
    if (error.response?.status === 400 && error.response?.data?.message) {
      toast.warning(error.response.data.message); // show backend validation like "Email already exists"
    } else {
      toast.error("An error occurred while adding the user");
    }

  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Breadcrumb items={items} onBackRoute={handleBackRoute} />

      <div className="p-5 space-y-10">
        <div className="flex flex-wrap gap-5 md:gap-20">

         {/* user id auto generated*/}
          <div>
            <InputField
              placeholder="User ID"
              label="User ID (auto-generated)"
              width="w-60"
              value={userId}
              readOnly
            />
          </div>

         
          <div>
            <InputField
              placeholder="Enter User Name here"
              label="User Name"
              width="w-60"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

         
          <div>
            <InputField
              placeholder="Enter Email ID here"
              label="Email ID"
              width="w-60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

     
          <div>
            <InputField
              placeholder="Enter Contact Number here"
              label="Contact Number"
              width="w-60"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
           
          </div>
        </div>

        <div className="flex flex-wrap gap-5 md:gap-20">
          {/* Role Dropdown */}
          <Dropdown
            label="Select Role"
            width="w-60"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={roles.map((r) => ({
              label: r.role_name,
              value: r.id
            }))}
          />

          {/* Department Dropdown */}
          <Dropdown
            label="Select Department"
            width="w-60"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            options={departmentOptions}
          />

          <InputField
            placeholder="Select Branch"
            label="Branch"
            width="w-60"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-5 md:gap-20">
          {/* Auto Generated Password */}
          <InputField
            placeholder="Auto Generated Password"
            label="Initial Password"
            width="w-60"
            value={initialPassword}
            onChange={(e) => setInitialPassword(e.target.value)}
          />
          <DatePickerField
            label="Valid From"
            width="w-60"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
          />
          <DatePickerField
            label="Valid To"
            width="w-60"
            value={validTo}
            onChange={(e) => setValidTo(e.target.value)}
          />

          <div className="p-3">
            <input
              type="checkbox"
              className="mt-7"
              checked={!isActive}
              onChange={(e) => setIsActive(!e.target.checked)}
            />
            <span className="mt-7 px-2 text-sm font-medium text-gray-700">
              Inactive
            </span>
          </div>
        </div>

        <ButtonComponent
          title="Save"
          color="primary"
          onClick={() => submitaddUser()}
        />
      </div>
    </>
  );
};

export default AddUser;