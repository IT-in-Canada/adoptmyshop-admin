const express         = require("express");
const router          = express.Router();

const validateControll = require("./validateC.js");


// router.get("/", checkAuth, validateControll.getValidate);
router.get("/", validateControll.getValidate);


router.post("/", validateControll.postValidate);



module.exports = router;