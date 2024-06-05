const verifyAdmin = (req, res, next) => {
    // console.log("Req.user in verifyAdmin",req.user);
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "You don't have required Permission!" });
  }
  next();
};

module.exports = verifyAdmin;
