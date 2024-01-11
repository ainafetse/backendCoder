const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager");
const cartManager = new CartManager("./src/models/carts.json");

// Endpoint para crear un nuevo carrito
router.post('/carts', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        return res.status(201).json({ message: 'New cart created', cart: newCart });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para listar los productos de un carrito específico
router.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        await cartManager.loadCarts();
        const cart = cartManager.getCartById(parseInt(cartId));
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para ver todos los carritos y su contenido
router.get('/carts', async (req, res) => {
    try {
        await cartManager.loadCarts();
        res.json(cartManager.carts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para agregar un producto específico a un carrito especifico por id
router.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        // Asignar la cantidad 1 si no esta definida
        const { quantity } = req.body;
        const productQuantity = quantity !== undefined ? parseInt(quantity) : 1;

        //Validación si la cantidad no es un número o es menor a cero
        if (isNaN(productQuantity) || productQuantity <= 0) {
            return res.status(400).json({ error: 'Invalid quantity' });
        }

        await cartManager.loadCarts();
        const cart = await cartManager.addProductToCart(parseInt(cartId), parseInt(productId), productQuantity);

        if (cart) {
            res.status(201).json(cart);
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
