const express = require('express');
const siteRouter = express.Router();
const siteController = require('../controllers/siteController');
const createUpload = require('../middleware/multer');

const upload = createUpload("sites", "siteCode");

siteRouter.post("/add-site", upload.single("document"), siteController.addSite);
siteRouter.get('/generate-site-code', siteController.generateSiteCode);
siteRouter.get('/all-sites', siteController.getAllSites);
siteRouter.get('/get-site-by-id/:id', siteController.getSiteById);
siteRouter.put('/update-site/:id', upload.single("document"), siteController.updateSite);
siteRouter.delete('/delete-site/:id', siteController.deleteSite);

module.exports = siteRouter;
