const { Router } = require("express");
const getBoatsRouter = require("./api/getBoats");
const postBoatApi = require("./api/postBoat");
const apiMiddleWare = require("../middleware/apiMiddleware");

const apiRouter = Router();
apiRouter.use(apiMiddleWare);
apiRouter.use("/get-boats", getBoatsRouter);
apiRouter.use("/post-boat", postBoatApi);

module.exports = apiRouter;
