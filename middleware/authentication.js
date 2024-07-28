const authenticationMiddleWare = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  const header = req.headers["authorization"];

  if (!header || header !== key)
    return res.status(403).send({ error: "Access Forbidden" });
  else next();
};
module.exports = { authenticationMiddleWare };
