const Seller = require('../model/sellers')
const User = require('../model/users')
const { message, status } = require('../message/message')

async function checkCity(req, res, next) {
  try {
    const { iSellerId, iUserId } = req.body
    console.log(req.body)
    const seller = await Seller.findOne({ _id: iSellerId })
    console.log("seller: ",seller)
    const user = await User.findOne({ _id: iUserId })
    console.log("user: ",user);
    if (seller.sSellerCity === user.sUserCity) {
      next();
    } else {
      return res.status(status.notFound).json(message.checkSameCity)
    }
  } catch (err) {
    console.log(err.message)
    return res.status(status.serverError).json(message.serverError)
  }
}


module.exports = { checkCity };