import React, { useState, useEffect } from "react";
import { Pencil, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomTable from "../../../../components/CustomTable";
import InputField from "../../../../components/InputField";
import ButtonComponent from "../../../../components/ButtonComponent";
import RestService from "../../../../rest-services/RestServices";
import ConfirmDeletePopup from "../../../../components/ConfirmDeletePopup";

/**
 * Roles Component
 * 
 * Manages role creation, listing, and deletion.
 * Features:
 * - Create new roles
 * - View all roles in a table
 * - Edit role permissions (navigates to Authorization page)
 * - Delete roles with confirmation
 * 
 * @component
 */
export default function Roles() {
  // State management
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  /**
   * Initialize component - fetch roles on mount
   */
  useEffect(() => {
    fetchRolesData();
  }, []);

  /**
   * Fetch all roles from the backend
   * @async
   */
  const fetchRolesData = async () => {
    try {
      const response = await RestService.GetAllData("/roles/get-roles-details");
      const data = response?.data.data;
      setRoles(data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to fetch roles");
      setRoles([]);
    }
  };

  /**
   * Handle role creation
   * Validates input and creates a new role
   * @async
   */
  const handleAddRole = async () => {
    if (!roleName.trim()) {
      toast.error("Please enter a role name");
      return;
    }

    try {
      setLoading(true);

      const response = await RestService.CreateData("/roles/add-role", {
        role_name: roleName,
      });

      if (response?.id) {
        setRoleName("");
        toast.success("Role added successfully!");
        fetchRolesData(); // Refresh table
      } else if (response?.message === "Role already exists") {
        toast.warning("This role already exists!");
      } else {
        toast.error(response?.message || "Failed to add role");
      }
    } catch (error) {
      console.error("Error adding role:", error);
      if (error.response?.status === 409) {
        toast.warning("This role already exists!");
      } else {
        toast.error("An error occurred while adding the role");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate to Authorization page with selected role
   * Pre-selects the role in the authorization dropdown
   * @param {number} roleId - The ID of the role to edit permissions for
   */
  const handleEditRole = (roleId) => {
    navigate('/admin/authorizations', { state: { roleId } });
  };

  /**
   * Open delete confirmation popup
   * @param {number} id - The ID of the role to delete
   * @param {string} roleName - The name of the role to delete
   */
  const openDeleteConfirm = (id, roleName) => {
    setRoleToDelete({ id, roleName });
    setShowDeletePopup(true);
  };

  /**
   * Confirm and execute role deletion
   * @async
   */
  const handleDeleteConfirm = async () => {
    if (!roleToDelete) return;

    try {
      const response = await RestService.DeleteData("/roles/delete-role", roleToDelete.id);

      if (response?.success) {
        toast.success(response.message || "Role deleted successfully!");
        fetchRolesData(); // Refresh table
      } else {
        toast.error(response.message || "Unable to delete role");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred while deleting the role";
      toast.error(msg);
    } finally {
      setShowDeletePopup(false);
      setRoleToDelete(null);
    }
  };

  /**
   * Cancel role deletion
   */
  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setRoleToDelete(null);
  };

  /**
   * Table column configuration
   */
  const columns = [
    {
      name: "S No",
      selector: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Role Name",
      selector: (row) => row.role_name,
      sortable: true,
    },
    {
      name: "Authorizations",
      selector: (row) => row.permission_count === 0 ? "Unassigned" : row.permission_count,
      cell: (row) => (
        <span className={row.permission_count === 0 ? "text-gray-500 italic" : ""}>
          {row.permission_count === 0 ? "Unassigned" : row.permission_count}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-3">
          <button 
            className="text-orange-600 hover:text-orange-800 transition-colors"
            onClick={() => handleEditRole(row.id)}
            title="Edit Role Permissions"
          >
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => openDeleteConfirm(row.id, row.role_name)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete Role"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F3] p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Create Role Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full md:w-1/3 self-start">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Create Role
          </h2>
          <InputField
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter Role Name"
          />
          <ButtonComponent 
            title={loading ? "Saving..." : "Save"} 
            onClick={handleAddRole}
            disabled={loading || !roleName.trim()}
          />
        </div>

        {/* Roles Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 w-full md:w-1/2 self-start">
          <CustomTable data={roles} columns={columns} />
        </div>
      </div>
      
      {/* Delete Confirmation Popup */}
      <ConfirmDeletePopup
        title="Delete Role"
        message={`Are you sure you want to delete the role "${roleToDelete?.roleName}"?`}
        isOpen={showDeletePopup}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      />
    </div>
  );
}