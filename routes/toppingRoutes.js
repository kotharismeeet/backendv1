const router = require('express').Router();
const {getToppings,createToppings,deleteToppings,updateToppings} = require('../controllers/Toppings');

router.route('/:id/:toppingId').get(getToppings).delete(deleteToppings).put(updateToppings).post(createToppings);

module.exports = router;