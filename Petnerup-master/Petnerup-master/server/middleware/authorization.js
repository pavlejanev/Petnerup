const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization.split(' ')[1];
    if (!jwtToken) {
      return res.status(403).json({ msg: 'Not Authorized' });
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;
    
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(403).json({ msg: 'Not Authorized' });
  }
};
