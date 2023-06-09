const Transaction = require('../model/transactions')
const { message, status } = require('../message/message')

async function getTotalSoldCar(req, res) {
    const totalSoldcar = await Transaction.find().count()
    return res.status(status.success).json({ "Total Sold Car": totalSoldcar })
}
console.log('repo test')

async function getSoldCarByCity(req, res) {
    try {
        const mostSoldCarByCity = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'sellers',
                    localField: 'iSellerId',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: {
                    path: "$seller",
                }
            },
            {
                $group: {
                    _id: '$seller.sSellerCity',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            { $limit: 1 }
        ]);
        return res.status(status.created).json({ City: mostSoldCarByCity });
    } catch (err) {
        console.log(err.message);
        return res.status(status.serverError).json(message.serverError)
    }
}

async function getMostSoldCar(req, res) {
    try {
        const mostSoldCar = await Transaction.aggregate([
            {
                $facet: {
                    cars: [
                        {
                            $lookup: {
                                from: "cars",
                                localField: "iCarId",
                                foreignField: "_id",
                                as: "car",
                            },
                        },
                        {
                            $unwind: {
                                path: "$car",
                            },
                        },
                        {
                            $group: {
                                _id: "$car.sCarName",
                                count: {
                                    $sum: 1,
                                },
                            },
                        },
                        {
                            $sort: {
                                count: -1,
                            },
                        },
                        { $limit: 1 },
                    ],
                }
            }, {
                $unwind:
                {
                    path: "$cars"
                }
            }
        ]);

        return res.status(status.success).json({ car: mostSoldCar });
    } catch (err) {
        console.log(err.message);
        return res.status(status.serverError).json(message.serverError)
    }
}

async function getMostSoldBrand(req, res) {
    try {
        const mostSoldbrand = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'cars',
                    localField: 'iCarId',
                    foreignField: '_id',
                    as: 'car'
                }
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'car.iBrandId',
                    foreignField: '_id',
                    as: 'brand'
                }
            },
            {
                $unwind: {
                    path: "$brand",
                }
            },
            {
                $group: {
                    _id: '$brand.sBrand',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            { $limit: 1 }
        ]);

        return res.status(status.success).json({ brand: mostSoldbrand });
    } catch (err) {
        console.log(err.message);
        return res.status(status.serverError).json(message.serverError)
    }
}

module.exports = { getTotalSoldCar, getSoldCarByCity, getMostSoldCar, getMostSoldBrand }