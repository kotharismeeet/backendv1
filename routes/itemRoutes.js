const router = require('express').Router();
const {addItem, updateItem, deleteItem, getAllItems,getItemById,getItemsByCategory,getItemsByVendor} = require('../controllers/item.js');


/*router.get('/:categoryId',getItemsByCategory);
router.get('/:vendorId',getItemsByVendor);*/
router.post('',addItem);
router.put('/:itemId',updateItem);
router.delete('/:itemId',deleteItem);
router.get('/all',getAllItems);
router.get('/:itemId',getItemById);
router.get('/vendor/:vendorId',getItemsByVendor);
router.get('/category/:categoryId',getItemsByCategory);   
module.exports = router;