const express         = require("express");
const router          = express.Router();

const publishControll = require("./publishC.js");


router.get("/", publishControll.getPublish);


router.post("/", publishControll.postPublish);



module.exports = router;