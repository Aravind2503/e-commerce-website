const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/e_commerce", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // for deprecation warning
});
