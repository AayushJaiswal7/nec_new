const  sequelize = require("../config/dbconfig");
const Role = require("../model/Role");
const Module = require("../model/Module");
const Permission = require("../model/Permission");
const RolePermission = require("../model/RolePermission");

/**
 * 1️⃣ Get all roles for dropdown
 */
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      where: { is_deleted: "0" },
      attributes: ["id", "role_name"],
      order: [["role_name", "ASC"]],
    });

    return res.status(200).json({ success: true, data: roles });
  } catch (err) {
    console.error("Error fetching roles:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * 2️⃣ Get all modules with their permissions
 *    → Used to render the permission table/grid in UI
 */
const getModulesWithPermissions = async (req, res) => {
  try {
    const modules = await Module.findAll({
      where: { is_active: true },
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "permission_name", "permission_key", "description"],
        },
      ],
      attributes: ["id", "module_name", "description"],
      order: [
        ["module_name", "ASC"],
        [{ model: Permission, as: "permissions" }, "permission_name", "ASC"],
      ],
    });

    return res.status(200).json({ success: true, data: modules });
  } catch (err) {
    console.error("Error fetching modules with permissions:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * 3️⃣ Get all permissions currently assigned to a role
 *    → Used to pre-check boxes in UI when selecting a role
 */
const getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    if (!roleId) return res.status(400).json({ success: false, message: "Role ID is required" });

    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ success: false, message: "Role not found" });

    // Get assigned permission IDs for this role
    const assigned = await RolePermission.findAll({
      where: { role_id: roleId },
      attributes: ["permission_id"],
    });
    const assignedIds = assigned.map(rp => rp.permission_id);

    // Get all modules with permissions
    const modules = await Module.findAll({
      where: { is_active: true },
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["id", "permission_name", "permission_key", "description"],
        },
      ],
      attributes: ["id", "module_name", "description"],
      order: [
        ["module_name", "ASC"],
        [{ model: Permission, as: "permissions" }, "permission_name", "ASC"],
      ],
    });

    // Mark checked permissions
    const structured = modules.map(mod => ({
      id: mod.id,
      module_name: mod.module_name,
      description: mod.description,
      permissions: mod.permissions.map(perm => ({
        ...perm.toJSON(),
        checked: assignedIds.includes(perm.id),
      })),
    }));

    return res.status(200).json({
      success: true,
      data: {
        role_id: role.id,
        role_name: role.role_name,
        modules: structured,
      },
    });
  } catch (err) {
    console.error("Error fetching role permissions (detailed):", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


/**
 * 4️⃣ Save all selected permissions for a role
 *    → Called when Save button is clicked
 */
const saveRolePermissions = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { role_id, permission_ids } = req.body;

    if (!role_id || !Array.isArray(permission_ids)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Role ID and permission IDs (array) are required",
      });
    }

    const role = await Role.findByPk(role_id);
    if (!role) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    // Remove all old permissions for this role
    await RolePermission.destroy({ where: { role_id }, transaction });

    // Insert new permissions
    if (permission_ids.length > 0) {
      const rolePermissions = permission_ids.map((pid) => ({
        role_id,
        permission_id: pid,
      }));

      await RolePermission.bulkCreate(rolePermissions, {
        transaction,
        ignoreDuplicates: true,
      });
    }

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Role permissions saved successfully",
      data: { role_id, permission_count: permission_ids.length },
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Error saving role permissions:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllRoles,
  getModulesWithPermissions,
  getRolePermissions,
  saveRolePermissions,
};
