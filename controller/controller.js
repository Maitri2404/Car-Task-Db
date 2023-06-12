const Transaction = require('../model/transactions')
const Brand = require('../model/brands')
const Car = require('../model/cars')
const Seller = require('../model/sellers')
const User = require('../model/users')
const { message, status } = require('../message/message')

async function brand(req, res) {
    try {
        const brand = new Brand(req.body)
        await brand.save()
        return res.status(status.created).json({ message: brand })
    } catch (err) {
        console.log(err.message)
        return res.status(status.serverError).json(message.serverError)
    }
}

async function car(req, res) {
    try {
        const { sCarName, iBrandId, nYear } = req.body
        const brand = await Brand.findById({ _id: iBrandId })
        console.log(brand)
        if (!brand) {
            return res.status(status.notFound).json(message.brandNotFound)
        }
        const car = new Car({
            iBrandId: brand,
            sCarName,
            nYear
        })
        await car.save()
        return res.status(201).json(car)
    } catch (err) {
        console.log(err.message)
        return res.status(status.serverError).json(message.serverError)
    }
}

async function user(req, res) {
    try {
        const user = new User(req.body)
        await user.save()
        return res.status(status.created).json(user)
    } catch (err) {
        console.log(err.message)
        return res.status(status.serverError).json(message.serverError)
    }
}

async function seller(req, res) {
    try {
        const { sSellerName, sSellerCity, aCar } = req.body
        const carArr = []

        for (let car of aCar) {
            const carId = await Car.findById({ _id: car })
            console.log(carId)
            if (!carId) {
                return res.status(status.notFound).json(message.carNotFound)
            }
            carArr.push(carId)
        }

        const seller = new Seller({
            sSellerName,
            sSellerCity,
            iCarId: carArr
        })

        await seller.save()
        return res.status(status.created).json(seller)
    } catch (err) {
        console.log(err.message)
        return res.status(status.serverError).json(message.serverError)
    }
}

async function transaction(req, res) {
    try {

        const { iCarId, iSellerId, iUserId } = req.body
        const sellerId = await Seller.findById({ _id: iSellerId })
        // console.log("sellerId:",sellerId)
        const userId = await User.findById({ _id: iUserId })
        // console.log(userId)
        const carId = await Car.findById({ _id: iCarId })
        // console.log(carId)
        if (!carId) {
            return res.status(status.notFound).json(message.carNotFound)
        }

        const transaction = new Transaction({
            iSellerId: sellerId,
            iUserId: userId,
            iCarId: carId
        })

        carId.isSold = true;
        await transaction.save()
        return res.status(status.created).json(transaction)
    } catch (err) {
        console.log(err.message)
        return res.status(status.serverError).json(message.serverError)
    }
}

module.exports = {
    brand,
    car,
    user,
    seller,
    transaction
}