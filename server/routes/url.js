const express=require("express");
const { handleGenerateShortUrl,handleGetAnalytics,handleGetAllAnalytics } = require("../controllers/url");
const router = express.Router();

router.post("/",handleGenerateShortUrl);
router.get("/analytics/:shortId",handleGetAnalytics);
router.get("/analytics",handleGetAllAnalytics);
module.exports=router