import jwt from 'jsonwebtoken';

// Middleware for verifying the token
export const adminMiddleware = (req, res, next) => {
  
  const token = req.headers['authorization']?.split(' ')[1]; 
  console.log(token);
  

  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }


  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // If the token is valid, store the decoded user data (e.g., userId) in the request object
    req.userId = decoded.userId; // Storing userId for later use
    console.log(req.userId);
    
    next(); // Proceed to the next middleware or route handler
  });
};

export default adminMiddleware
