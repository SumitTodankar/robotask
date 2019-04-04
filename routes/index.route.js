var express = require('express');
var router = express.Router();
var userController = require('../controller/user.controller')
var orderController = require('../controller/order.controller')
var testController = require('../controller/test.controller')

router.get('/alluser',userController.getAllUserAndOrder)
router.get('/allorderperuser',userController.getOrderPerUser)

router.get('/allorderdelivered',orderController.getOrderDelivered)
router.get('/allorderdelayed',orderController.getOrderDelayed)
router.get('/allordercancelled',orderController.getOrderCancelled)
router.get('/trypopulate',userController.tryPopulate);
router.get('/trypaginate',userController.tryPaginate)

router.get('/brand',testController.getBrand)
router.get('/category',testController.getCategory)
router.get('/allcategory',testController.getAllCategory)
router.get('/getcolgate',testController.getColgate)
router.get('/answer',testController.answer)
router.get('/order',testController.getEmbeddedOrders)
router.get('/date',testController.date)
router.get('/anduser',testController.andUser)
router.get('/oruser',testController.orUser)
router.get('/nordata',testController.norData)
router.get('/notdata',testController.notData)



module.exports = router;