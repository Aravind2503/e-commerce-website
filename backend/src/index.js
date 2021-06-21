const express = require("express");
require("./db/connect");
const userRoute = require("./routers/user");
const productRoute = require("./routers/product");
const cors = require("cors");

app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use(userRoute);
app.use(productRoute);

port = process.env.PORT;

app.listen(port, () => {
    console.log("server up on port ", port);
});
