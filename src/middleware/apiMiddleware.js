module.exports = function apiMiddleWare(req, res, next) {
  if (
    !req.headers["authorization"] ||
    req.headers["authorization"] != process.env.AUTH_KEY
  )
    return res.status(405).send({ error: "Forbidden access" });
  else next();
};
