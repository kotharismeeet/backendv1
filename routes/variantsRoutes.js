const router = require('express').Router();
const {getVariants, createVariants, deleteVariants, updateVariants} = require('../controllers/Variants');

router.route('/:id/:variantId').delete(deleteVariants).get(getVariants).put(updateVariants).post(createVariants);

module.exports = router;