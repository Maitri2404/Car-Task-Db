const router = require('express').Router();
const { checkCity} = require('../middleware/middleware')

const {
  brand,
  car,
  user,
  seller,
  transaction
} = require('../controller/controller');

const {
  getTotalSoldCar, 
  getSoldCarByCity, 
  getMostSoldCar, 
  getMostSoldBrand
} = require('../controller/admin')

router.post('/addBrand', brand);

router.post('/addCar', car);

router.post('/addUser', user);

router.post('/addSeller', seller);

router.post('/buyCar', checkCity, transaction);

router.get('/admin/getTotalSoldCar', getTotalSoldCar)

router.get('/admin/getSoldByCity', getSoldCarByCity)

router.get('/admin/getMostSoldCar', getMostSoldCar)

router.get('/admin/getMostSoldBrand', getMostSoldBrand)

module.exports = router;
