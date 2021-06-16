const express = require("express");
require("./db/connect");
const userRoute = require("./routers/user");
// const bodyParser = require("body-parser");

app = express();
app.use(express.json());
app.use(userRoute);

// app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
// app.use(bodyParser.json()); // Send JSON responses

port = process.env.PORT;

app.listen(port, () => {
  console.log("server up on port ", port);
});
