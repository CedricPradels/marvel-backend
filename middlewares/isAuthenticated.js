const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  const userFound = await User.findOne({
    "account.token": token
  });

  if (userFound) {
    req.userFound = userFound;
    return next();
  } else {
    return res.status(400).json({ error: "Wrong token" });
  }
};

module.exports = isAuthenticated;
