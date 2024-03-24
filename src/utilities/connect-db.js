const { connect } = require("mongoose");

connect(process.env.MONGODBURI).then(() =>
  console.log("Database connection successfully made")
);
