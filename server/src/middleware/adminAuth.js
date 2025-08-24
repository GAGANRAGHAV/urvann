require('dotenv').config();

const adminAuth = (req, res, next) => {
  // Check for admin key
  const adminKey = req.headers["x-admin-key"];
  
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized: Admin access required" });
  }
  
  next();
};

module.exports = adminAuth;
