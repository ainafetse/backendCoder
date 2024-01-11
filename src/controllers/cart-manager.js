const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.loadCarts();
    }
    //Método para cargar los carritos existentes del JSON
    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            console.log('Carts loaded successfully:', this.carts);
        } catch (error) {
            console.error('Error loading carts:', error);
        }
    }
    //Método para guardar carrito
    async saveCarts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log('Carts saved successfully');
        } catch (error) {
            console.error('Error saving carts:', error);
        }
    }
    //Método para crear un carrito nuevo con un array vacío
    async createCart(products = []) {
        try {
            const lastId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 0;
            const newCart = {
                id: lastId + 1,
                products: products
            };
            this.carts.push(newCart);
            await this.saveCarts(); // Guardar cambios al crear un nuevo carrito
            console.log('New cart created:', newCart);
        } catch (error) {
            console.error('Error creating cart:', error);
        }
    }

    //Método para llamar a un carrito por su ID
    getCartById(cartId) {
        const foundCart = this.carts.find(cart => cart.id === cartId);
        if (foundCart) {
            console.log('Cart found with ID', cartId, ':', foundCart);
            return foundCart;
        } else {
            console.log('Cart not found with ID', cartId);
            return null;
        }
    }

    //Método para agregar un producto específico a un carrito específico con validaciones.
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            // Verificar si el carrito existe
            const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                console.log('Cart not found with ID:', cartId);
                return null;
            }

            // Cargar productos existentes desde products.json
            const products = await this.loadProductsFromFile();

            // Verificar si el producto existe en products.json
            const productExists = products.find(product => product.id === productId);
            if (!productExists) {
                console.log('Product not found with ID:', productId);
                return null;
            }

            // Verificar si el producto ya existe en el carrito
            const cart = this.carts[cartIndex];
            const productIndex = cart.products.findIndex(product => product.productId === productId);

            if (productIndex !== -1) {
                // Si el producto ya existe, actualizamos la cantidad
                cart.products[productIndex].quantity += quantity;
            } else {
                // Si el producto no existe, lo agregamos al carrito
                cart.products.push({ productId, quantity });
            }

            await this.saveCarts(); // Guardar cambios después de agregar el producto al carrito
            console.log('Product added to cart with ID', cartId, ':', cart);
            return cart;
        } catch (error) {
            console.error('Error adding product to cart:', error);
            return null;
        }
    }

    //Método para cargar los productos
    async loadProductsFromFile() {
        try {
            const data = await fs.readFile('./src/models/products.json', 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }
}



module.exports = CartManager;
