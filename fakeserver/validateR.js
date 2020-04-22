const express         = require("express");
const router          = express.Router();

const validateControll = require("./validateC.js");

router.get("/", validateControll.getValidate);


router.post("/", validateControll.postValidate);



module.exports = router;