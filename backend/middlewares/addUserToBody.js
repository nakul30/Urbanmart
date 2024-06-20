const addUserIdToBody = (req, res, next) => {
    console.log("From Middlware", req.user);
    if (req.user) {  
      req.body.userId= req.user.id;
      console.log("From Middlware if statement", req.body);
    }
    next();
  }; 
  
module.exports = addUserIdToBody;