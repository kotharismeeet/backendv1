const router = require('express').Router();
const {getToppings,createToppings,deleteToppings,updateToppings} = require('../controllers/Toppings');

router.route('/:id').get(getToppings).post(createToppings);

module.exports = router;