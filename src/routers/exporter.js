const { Router } = require("express");
const getBoatRouter = require("./api/getBoats");
const postBoatApi = require("./api/postBoat");
const apiMiddleWare = require("../middleware/apiMiddleware");

const apiRouter = Router();
apiRouter.use(apiMiddleWare);
apiRouter.use("/get-boats", getBoatRouter);
apiRouter.use("/post-boat", postBoatApi);

module.exports = apiRouter;
