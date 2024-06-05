const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // console.log("VERIFY TOKEN",req)
  const authToken = req.headers.token;
  // console.log('authToken in verify token', authToken);
   
  if (!authToken) { 
    return res.status(401).json({ message: 'Authentication token is missing!' });
  }
  const token = authToken.split(' ')[1];  // Bearer kaat diya 
  // console.log('token in verify token', token);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid!' });
    // console.log('req.user in verify token', req.user);
    // console.log('user in verify token', user);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
                     