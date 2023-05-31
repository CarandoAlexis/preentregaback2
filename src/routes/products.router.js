import { Router } from "express"; 
import ProductManager from "../preentrega.js";

const router = Router();

const productManager = new ProductManager('products.json');

router.get('/', (req, res) => {
    const { limit } = req.query;
    let products = productManager.getProducts();
    
    if (limit) {
      const limitNum = parseInt(limit);
      products = products.slice(0, limitNum);
    }
    
    res.json(products);
  });

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = productManager.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
}); 

router.post('/', (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;
    productManager.updateProduct(id, updatedFields);
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    productManager.deleteProduct(id);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
  
export default router;