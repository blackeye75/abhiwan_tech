import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1].replace(/^"|"$/g, "");
  // console.log(token);
  // console.log(process.env.JWT_SECRET);


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure JWT_SECRET is in your .env
    req.user = decoded; // includes user ID and any info you encoded during login
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    console.log(error.message);

  }
};

export default authMiddleware;
