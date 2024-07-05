const { connect } = require("mongoose");

connect(Netlify.env.MONGODBURI).then(() =>
  console.log("Database connection successfully made")
);
