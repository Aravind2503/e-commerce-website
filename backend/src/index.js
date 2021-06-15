const express = require("express");
const loginRoute = require("./routers/login");

app = express();
app.use("/login", loginRoute);

port = process.env.PORT || 9001;

app.get("/", (req, res) => {
  res.status(200).send("this is the / route");
});

app.listen(port, () => {
  console.log("server up on port ", port);
});
