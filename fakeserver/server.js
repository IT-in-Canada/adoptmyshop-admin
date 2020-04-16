const express     = require("express");
const PORT        = process.env.PORT || 3333;
const app         = express();
const morgan      = require("morgan");
const bodyParser  = require("body-parser");

const validateRoutes = require("./validateR.js");
const publishRoutes  = require("./publishR.js");

// it logs the actions on the screen
app.use(morgan("dev"));



// settings related to boy-parser, which allows extended urlencoder and enables to receive json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// settings related to CORS
// it allows other clients (other than the SPA provided for this app) access these APIs
app.use((req, res, next) => {
// console.log(" checking headers")  
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
// console.log(" logging OPTIONS");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// shop to be validate's route
app.use("/toValidate", validateRoutes);

// shop to be publish's route
app.use("/toPublish", publishRoutes);


// default's route
app.use((req, res) => res.json({message: "if you sent ping, pong"}));


app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

