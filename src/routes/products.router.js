const express = require("express");
const router = express.Router(); 

const ProductManager = require("../controllers/product-manager"); 
const productManager = new ProductManager("./src/models/products.json");


//Pasamos las rutas que teniamos en la app: 

// Endpoint to get all products with the possibility to limit results
router.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = parseInt(req.query.limit);

        if (limit && limit > 0) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get a product by its ID
router.get('/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await productManager.getProductById(productId);

        if (product && Object.keys(product).length !== 0) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to add a new product
router.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;

        // Call the addProduct method from the ProductManager instance
        await productManager.addProduct(newProduct);

        // Return a success message or the newly created product
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para actualizar un producto por su ID usando el método PUT
router.put('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = req.body;

        // Verificar si el producto con el ID dado existe
        const existingProduct = await productManager.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Actualizar el producto excluyendo el campo ID
        delete updatedProduct.id; // Evitar actualizar el ID
        await productManager.updateProduct(productId, updatedProduct);

        return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para eliminar un producto por su ID usando el método DELETE
router.delete('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        // Verificar si el producto con el ID dado existe
        const existingProduct = await productManager.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Eliminar el producto
        await productManager.deleteProduct(productId);

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;