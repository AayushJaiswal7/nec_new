import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import DropDown from "../../../../components/Dropdown";
import ButtonComponent from "../../../../components/ButtonComponent";
import SecondaryButton from "../../../../components/SecondaryButton";
import RestService from "../../../../rest-services/RestServices";
import CustomCheckbox from "../../../../components/CustomCheckBox";

/**
 * Authorization Component
 * 
 * Manages role-based permissions by allowing users to:
 * - Select a role from dropdown
 * - View all modules and their permissions
 * - Assign/unassign permissions to the selected role
 * - Save permission assignments
 * 
 * @component
 * @example
 * // Direct navigation
 * <Authorization />
 * 
 * // Navigation with pre-selected role (from edit action)
 * navigate('/authorization', { state: { roleId: 5 } })
 */
const Authorization = () => {
  // State management
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [modules, setModules] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [openMain, setOpenMain] = useState({});
  const [loading, setLoading] = useState(false);

  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Initialize component
   * - Fetch all roles on mount
   */
  useEffect(() => {
    fetchRoles();
  }, []);

  /**
   * Handle role selection from navigation state
   * This runs after roles are fetched
   */
  useEffect(() => {
    if (location.state?.roleId && roles.length > 0) {
      setSelectedRoleId(location.state.roleId.toString());
    }
  }, [location.state, roles]);

  /**
   * Fetch modules and permissions based on role selection
   * - If role is selected: fetch role-specific permissions
   * - If no role selected: fetch all modules with unchecked permissions
   */
  useEffect(() => {
    if (selectedRoleId) {
      fetchRolePermissions(selectedRoleId, true); // true = open all on initial load
    } else {
      fetchModulesWithPermissions();
    }
  }, [selectedRoleId]);

  /**
   * Fetch all available roles for dropdown
   * @async
   */
  const fetchRoles = async () => {
    try {
      const res = await RestService.GetAllData("/authorization/get-all-roles");
      const roleArray = Array.isArray(res.data.data) ? res.data.data : [];
      setRoles(roleArray);
    } catch (err) {
      console.error("Error fetching roles:", err);
      toast.error("Failed to fetch roles");
      setRoles([]);
    }
  };

  /**
   * Fetch all modules with their permissions (unchecked state)
   * Used when no role is selected
   * @async
   */
  const fetchModulesWithPermissions = async () => {
    try {
      setLoading(true);
      const res = await RestService.GetAllData("/authorization/get-all-modules-with-permissions");
      const modulesData = res.data.data || [];
      
      setModules(modulesData);
      
      // Initialize permissions state (all unchecked)
      const permState = {};
      modulesData.forEach(module => {
        permState[module.id] = {};
        if (module.permissions && Array.isArray(module.permissions)) {
          module.permissions.forEach(perm => {
            permState[module.id][perm.id] = false;
          });
        }
      });
      setPermissions(permState);
    } catch (err) {
      console.error("Error fetching modules:", err);
      toast.error("Failed to fetch modules and permissions");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch role-specific permissions
   * Pre-checks permissions that are already assigned to the role
   * @async
   * @param {string|number} roleId - The ID of the role to fetch permissions for
   * @param {boolean} openAll - If true, open all module toggles (for initial load)
   */
  const fetchRolePermissions = async (roleId, openAll = false) => {
    try {
      setLoading(true);
      const res = await RestService.GetAllData(`/authorization/get-role-permissions/${roleId}`);
      const roleData = res.data.data;
      
      setModules(roleData.modules);
      
      // Initialize permissions state with checked values
      const permState = {};
      const openState = {};
      
      roleData.modules.forEach(module => {
        permState[module.id] = {};
        
        if (module.permissions && Array.isArray(module.permissions)) {
          module.permissions.forEach(perm => {
            // FIXED: Properly handle the checked state (could be boolean or number)
            permState[module.id][perm.id] = perm.checked === true || perm.checked === 1;
          });
        }
        
        // Open all toggles if requested (initial load only)
        if (openAll) {
          openState[module.id] = true;
        }
      });
      
      setPermissions(permState);
      
      if (openAll) {
        setOpenMain(openState);
      }
    } catch (err) {
      console.error("Error fetching role permissions:", err);
      toast.error("Failed to fetch role permissions");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle all permissions within a module
   * If all are selected, deselect all; otherwise, select all
   * @param {number} moduleId - The ID of the module
   */
  const handleModuleToggle = (moduleId) => {
    const modulePerms = permissions[moduleId];
    if (!modulePerms || Object.keys(modulePerms).length === 0) return;
    
    const allSelected = Object.values(modulePerms).every(Boolean);
    
    const updated = Object.fromEntries(
      Object.entries(modulePerms).map(([key]) => [key, !allSelected])
    );
    
    setPermissions({ ...permissions, [moduleId]: updated });
  };

  /**
   * Toggle individual permission checkbox
   * @param {number} moduleId - The ID of the module
   * @param {number} permissionId - The ID of the permission
   */
  const handlePermissionToggle = (moduleId, permissionId) => {
    setPermissions({
      ...permissions,
      [moduleId]: {
        ...permissions[moduleId],
        [permissionId]: !permissions[moduleId][permissionId],
      },
    });
  };

  /**
   * Toggle expansion/collapse of module permissions
   * @param {number} moduleId - The ID of the module
   */
  const handleToggleOpen = (moduleId) => {
    setOpenMain({ ...openMain, [moduleId]: !openMain[moduleId] });
  };

  /**
   * Handle role selection from dropdown
   * @param {Event} e - Change event from select element
   */
  const handleRoleChange = (e) => {
    setSelectedRoleId(e.target.value);
  };

  /**
   * Reset permission selections while keeping the selected role
   * Reloads the current role's permissions to their original state
   */
  const handleReset = () => {
    if (!selectedRoleId) {
      toast.info("No role selected");
      return;
    }
    
    // Keep current toggle states, only reset permissions
    fetchRolePermissions(selectedRoleId, false); // false = don't change toggle states
    toast.info("Permissions reset to original state");
  };

  /**
   * Save permission assignments for the selected role
   * Collects all checked permissions and sends to backend
   * @async
   */
  const handleSave = async () => {
    if (!selectedRoleId) {
      toast.warning("Please select a role first");
      return;
    }
    
    // Collect all selected permission IDs
    const selectedPermissionIds = [];
    Object.entries(permissions).forEach(([moduleId, modulePerms]) => {
      Object.entries(modulePerms).forEach(([permId, isChecked]) => {
        if (isChecked) {
          selectedPermissionIds.push(parseInt(permId));
        }
      });
    });
    
    try {
      setLoading(true);
      const res = await RestService.PostData("/authorization/save-role-permissions", {
        role_id: parseInt(selectedRoleId),
        permission_ids: selectedPermissionIds
      });
      
      if (res.success) {
        toast.success("Permissions saved successfully!");
        // Refresh the role permissions to show updated state
        fetchRolePermissions(selectedRoleId, false);
      } else {
        toast.error(res.message || "Failed to save permissions");
      }
    } catch (err) {
      console.error("Error saving permissions:", err);
      toast.error("Failed to save permissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl shadow-sm w-full p-4">
      {/* Header Section - Role Dropdown and Action Buttons */}
      <div className="flex items-center justify-between w-full gap-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-1">
          <DropDown
            label="Select Role"
            width="w-60"
            value={selectedRoleId}
            onChange={handleRoleChange}
            options={roles.map((r) => ({
              label: r.role_name,
              value: r.id
            }))}
          />
        </div>
        <SecondaryButton 
          text="Reset" 
          onClick={handleReset}
          disabled={!selectedRoleId || loading}
        />
        <ButtonComponent 
          title={loading ? "Loading..." : "Save"} 
          onClick={handleSave} 
          disabled={!selectedRoleId || loading}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8 text-gray-500">
          Loading...
        </div>
      )}

      {/* Modules and Permissions Grid */}
      {!loading && modules.map((module) => (
        <div
          key={module.id}
          className="border border-gray-200 rounded-lg overflow-hidden mb-4"
        >
          {/* Module Header - Clickable Area for Toggle (except checkbox) */}
          <div
            className="flex justify-between items-center bg-gray-50 px-4 py-3 cursor-pointer select-none"
            onClick={(e) => {
              // prevent toggle if checkbox was clicked
              if (e.target.type !== "checkbox") {
                handleToggleOpen(module.id);
              }
            }}
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <CustomCheckbox
              checked={
                  permissions[module.id] &&
                  Object.values(permissions[module.id]).length > 0 &&
                  Object.values(permissions[module.id]).every(Boolean)
                }
              onChange={() => handleModuleToggle(module.id)}
              />
              <span className="text-sm font-semibold text-gray-800">
                {module.module_name}
              </span>
            </label>

            <button
              className="text-gray-500 hover:text-gray-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleOpen(module.id);
              }}
              aria-label={openMain[module.id] ? "Collapse" : "Expand"}
            >
              {openMain[module.id] ? (
                <FiChevronUp className="h-5 w-5" />
              ) : (
                <FiChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Individual Permissions List */}
          {openMain[module.id] && (
            <div className="px-6 py-4 flex flex-wrap gap-4 bg-white">
              {module.permissions && module.permissions.length > 0 ? (
                module.permissions.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex items-center space-x-2 w-48 cursor-pointer"
                  >
                    {/* <input
                      type="checkbox"
                      checked={permissions[module.id]?.[perm.id] || false}
                      onChange={() => handlePermissionToggle(module.id, perm.id)}
                      className="accent-primaryColor w-4 h-4"
                    /> */}
                    <CustomCheckbox
                    checked={permissions[module.id]?.[perm.id] || false}
                    onChange={() => handlePermissionToggle(module.id, perm.id)}
                    />
                    <span className="text-sm text-gray-700">
                      {perm.permission_name}
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500">No permissions available</p>
              )}
            </div>
          )}
        </div>
      ))}
      
      {/* Empty State */}
      {!loading && modules.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No modules available
        </div>
      )}
    </div>
  );
};

export default Authorization;