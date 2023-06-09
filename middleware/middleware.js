const Seller = require('../model/sellers')
const User = require('../model/users')

async function checkCity(req, res, next) {
  try {
    const { iSellerId, iUserId } = req.body;
    console.log(req.body)
    const seller = await Seller.findOne({ _id: iSellerId });
    console.log("seller: ",seller);
    const user = await User.findOne({ _id: iUserId });
    console.log("user: ",user);
    if (seller.sSellerCity === user.sUserCity) {
      next();
    } else {
      return res.status(404).json({ error: 'Seller and user are not from the same city' });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { checkCity };