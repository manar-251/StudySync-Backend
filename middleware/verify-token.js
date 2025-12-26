const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.get("Authorization"); // "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ err: "Missing Authorization header" });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ err: "Invalid Authorization format" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ err: "Invalid/expired token" });
  }
}

module.exports = verifyToken;
