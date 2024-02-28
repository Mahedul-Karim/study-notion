exports.checkRole = (req, role) => {
  if (req.user.accountType !== role) {
    return false;
  } else {
    return true;
  }
};
