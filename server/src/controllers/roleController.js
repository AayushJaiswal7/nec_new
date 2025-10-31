const sequelize = require("../config/dbconfig");
const Role = require("../model/Role");
const User = require("../model/User");

const addRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    // Validate request
    if (!role_name || !role_name.trim()) {
      return res.status(400).json({ message: "Role name is required" });
    }

    const trimmedRole = role_name.trim();

    // Check for duplicates (case-insensitive)
    const existingRole = await Role.findOne({
      where: { role_name: trimmedRole, is_deleted: "0" },
    });

    if (existingRole) {
      return res
        .status(409) // 409 Conflict
        .json({ message: "Role already exists" });
    }

    // Create new role
    const newRole = await Role.create({
      role_name: trimmedRole,
    });

    return res.status(201).json({
      id: newRole.id,
      role_name: newRole.role_name,
      message: "Role created successfully",
    });
  } catch (err) {
    console.error("Error creating role:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllRolesDetails = async (req, res) => {
  try {
    const roles = await Role.findAll({
      where: { is_deleted: "0" },
      attributes: [
        "id",
        "role_name",
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM role_permissions AS rp
            WHERE rp.role_id = Role.id
          )`),
          "permission_count",
        ],
      ],
      order: [["role_name", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (err) {
    console.error("Error fetching roles with permission counts:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


/**
 *  Delete a role only if it's not assigned to any user
 */
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Check if role exists
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    // 2️⃣ Check if any user has this role assigned
    const userCount = await User.count({
      where: { role_id: id, is_deleted: "0" }, 
    });
    if (userCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete this role — it is assigned to ${userCount} user(s).`,
      });
    }

    // 3️⃣ Soft delete the role
    role.is_deleted = "1";
    await role.save();

    return res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting role:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addRole,
  getAllRolesDetails,
  deleteRole
};
