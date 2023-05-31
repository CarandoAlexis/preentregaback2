import { Router } from "express";
import Cart from '../cart.js';
import ProductManager from "../preentrega.js";

const router = Router();

const productManager = new ProductManager('products.json');
const cart = new Cart('carrito.json');

/*Con esto creamos un nuevo carrito*/
router.post('/', (req, res) => {
    const cartId = cart.addCart();
    res.status(201).json({ cartId });
});
  
router.get('/', (req, res) => {
    const carts = cart.getCarts();
    res.json(carts);
});
  
/*Con esto obetenemos un carrito por id*/
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cartData = cart.getCartById(cid);
    if (!cartData) {
      res.status(404).json({ error: 'Cart Not Found' });
    } else {
      res.json(cartData);
    }
});
  
/*Con esto agregamos productos por id a un carrito en especifico tambien mediante su id*/
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const cartId = parseInt(cid);       //les pase un parseInt para convertir a numero entero sino no me tomaba el id
    const productId = parseInt(pid);
    cart.addProductToCart(cartId, productId, productManager);
    res.status(201).json({ success: true });
});
  
export default router;