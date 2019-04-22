import express from 'express'
import shopListController from './shoppingListController'
const router = express.Router();

router.post('/api/shoplist', shopListController.createShopList);
router.get('/api/shoplist/:id', shopListController.getShopListById);
router.get('/api/shoplist/session/:sessionId', shopListController.getShopListBySessionId);
router.put('/api/shoplist/:id', shopListController.updateShopListById);
router.put('/api/shoplist/session/:sessionId', shopListController.updateShopListBySessionId);

module.exports = router;
