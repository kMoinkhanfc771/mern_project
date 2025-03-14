import jwt from 'jsonwebtoken';

const adminMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        
        if (!token) {
            return res.status(401).json({ message: "Admin authentication required" });
        }
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid admin token or session expired" });
    }
};

export default adminMiddleware;
