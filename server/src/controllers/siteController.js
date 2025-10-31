const { Op } = require("sequelize");
const Site = require("../model/Site");
// POST: Add a new site
exports.addSite = async (req, res) => {
  try {
    const {
      siteCode,
      siteName,
      branch,
      userId,
      street,
      city,
      state,
      postalCode,
      country,
      latLong,
    } = req.body;

    // Validation
    if (!siteName) {
      return res.status(400).json({ message: "Site Name is required" });
    }

    // File upload
    let documentPath = "";
    if (req.file) {
      documentPath = `/uploads/sites/${req.file.filename}`;
    }

    // Create record
    await Site.create({
      siteCode,
      siteName,
      branch,
      userId,
      street,
      city,
      state,
      postalCode,
      country,
      latLong,
      document: documentPath,
      isDeleted: "0",
    });

    return res.status(201).json({
      status: 201,
      message: "Site added successfully",
    });
  } catch (err) {
    console.error("❌ Error adding site:", err);
    return res.status(500).json({ message: "Error adding site" });
  }
};

// GET: Get all sites
exports.getAllSites = async (req, res) => {
  try {
    const { siteName , limit = 10, page = 1 } = req.query;

    const whereCondition = {
      isDeleted: "0",
    };

    if (siteName) {
      whereCondition.siteCode = { [Op.like]: `%${siteName}%` };
    }

    const sites = await Site.findAndCountAll({
      where: whereCondition,
      order: [["id", "ASC"]],
      limit: parseInt(limit),
      offset: parseInt(page - 1) * parseInt(limit)
    });

    return res.status(200).json({
      message: "Fetched all sites successfully",
      total: sites.length,
      status: 200,
      data: sites,
    });
  } catch (err) {
    console.error("❌ Error fetching sites:", err);
    return res.status(500).json({ message: "Error fetching sites" });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findByPk(id);

    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }

    site.isDeleted = "1";
    await site.save();

    return res.status(200).json({ message: "Site deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting site:", err);
    return res.status(500).json({ message: "Error deleting site" });
  }
};

exports.getSiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findByPk(id);

    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }

    return res.status(200).json({
      status: 200,
      message: "Fetched site successfully",
      data: site,
    });
  } catch (err) {
    console.error("❌ Error fetching site:", err);
    return res.status(500).json({ message: "Error fetching site" });
  }
};

exports.updateSite = async (req, res) => {
  try {
    const { id } = req.params;

    // Find existing site
    const site = await Site.findByPk(id);

    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    // File upload
    let documentPath = "";
    if (req.file) {
      documentPath = `/uploads/sites/${req.file.filename}`;
    }
    // Extract fields from body
    const {
      siteCode,
      siteName,
      branch,
      userId,
      street,
      city,
      state,
      postalCode,
      country,
      latLong,
    } = req.body;

    // Update only the fields provided in the request
    await site.update({
      siteCode: siteCode ?? site.siteCode,
      siteName: siteName ?? site.siteName,
      branch: branch ?? site.branch,
      userId: userId ?? site.userId,
      street: street ?? site.street,
      city: city ?? site.city,
      state: state ?? site.state,
      postalCode: postalCode ?? site.postalCode,
      country: country ?? site.country,
      latLong: latLong ?? site.latLong,
      document: documentPath ?? site.documentPath,
    });

    return res.status(200).json({
      status: 200,
      message: "Site updated successfully",
      site,
    });
  } catch (err) {
    console.error("❌ Error updating site:", err);
    return res.status(500).json({ message: "Error updating site" });
  }
};


/**
 * Generate a new site code based on branch prefix
 * Example: BRIS0001, BRIS0002...
 */
exports.generateSiteCode = async (req, res) => {
  try {
    const { branch } = req.query;

    if (!branch || branch.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Branch name is required",
      });
    }

    //  Generate branch prefix (first 4 uppercase letters)
    const prefix = branch.replace(/[^a-zA-Z]/g, "").substring(0, 4).toUpperCase();

    //  Find latest code for this prefix
    const latestSite = await Site.findOne({
      where: {
        siteCode: { [Op.like]: `${prefix}%` },
      },
      order: [["id", "DESC"]],
    });

    //  Compute next sequential number
    let nextNumber = 1;
    if (latestSite && latestSite.siteCode) {
      const match = latestSite.siteCode.match(/\d+$/);
      if (match) nextNumber = parseInt(match[0], 10) + 1;
    }

    // Format site code (prefix + 4 digits)
    const siteCode = `${prefix}${nextNumber.toString().padStart(4, "0")}`;

    return res.status(200).json({
      status: 200,
      message: "Generated site code successfully",
      siteCode,
    });
  } catch (error) {
    console.error("Error generating site code:", error);
    return res.status(500).json({
      status: 500,
      message: "Error generating site code",
    });
  }
};