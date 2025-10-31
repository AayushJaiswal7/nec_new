// config/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Generic multer configuration.
 * @param {string} folderName - The subfolder under /uploads where the file will be saved.
 * @param {string} [codeField="siteCode"] - Field name in req.body used to prefix the file name.
 * @returns {multer.Instance} Configured multer upload middleware
 */
const createUpload = (folderName, codeField = "siteCode") => {
  const uploadDir = path.join(__dirname, `../../uploads/${folderName}`);

  // Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Try to get the code from request body
      const code =
        req.body[codeField] && req.body[codeField] !== ""
          ? req.body[codeField]
          : "FILE";
      const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
      const ext = path.extname(file.originalname);
      cb(null, `${code}_${timestamp}${ext}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  });
};

module.exports = createUpload;
