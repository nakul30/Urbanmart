const verifyPermission = (req, res, next) => {
  console.log("Req.user in verifypermission",req.user.id);
  console.log("Req.params.id in verifypermission",req.params.userId);
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        // console.log("Req.user in verifypermission",req.user);
        // console.log("Req.params.id in verifypermission",req.params);
      next();
    } else {
      return res.status(403).json({ message: "You don't have required Permission!" });
    }
  };
  
  module.exports = verifyPermission;
  