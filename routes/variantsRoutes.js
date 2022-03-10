const router = require('express').Router();
const {getVariants, createVariants, deleteVariants, updateVariants} = require('../controllers/Variants');

router.route('/:id/:variantId').delete(deleteVariants).put(updateVariants)
router.route('/:id').post(createVariants).get(getVariants);

module.exports = router;