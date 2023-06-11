

const express =require("express");
const router = express.Router();


const {localfileUpload , imageUpload  , videoUpload } = require("../controllers/fileUpload");

//api route 
router.post("/localFileUpload" , localfileUpload );
router.post("/imageUpload" , imageUpload );
router.post("/videoUpload" , videoUpload );

module.exports = router ; 
