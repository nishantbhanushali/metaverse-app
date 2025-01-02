import jwt from "jsonwebtoken";

// Admin middleware to check if the user is authorized based on the token
export const userMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token after 'Bearer'
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token not found" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Attach user ID to the request for further use
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(400).json({ message: "Unauthorized", error: error.message });
    }
};
