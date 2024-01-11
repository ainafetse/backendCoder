const fs = require("fs").promises;

class ProductManager {
    static lastId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
        this.initialize();
    }

    // Método initialize  (cargar los products desde el archivo)
    async initialize() {
        await this.loadProductsFromFile();
    }

    // Cargando los productos desde el archivo
    async loadProductsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            //console.log('File data read successfully:', data);
            this.products = JSON.parse(data);
            //console.log('Products parsed from file:', this.products);
            // Actualizando el ultimo id asignado
            ProductManager.lastId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
            console.log('Last ID updated:', ProductManager.lastId);
        } catch (error) {
            // En caso de error, se ignora y se continúa con el array vacio
            this.products = [];
            console.error('Error occurred while loading products from file:', error);
        }
    }

    //Método agregar un producto con validaciones

    async addProduct(newObject) {
        const { title, description, code, price, stock, category, thumbnail} = newObject;

        //Validación de los campos obligatorios (todos menos thumbnail)
        if (!title || !description || !code || !price || !stock || !category) {
            console.log("All required fields are mandatory for adding a product.（￣ー￣）");
            return;
        }

        if (this.products.some((item) => item.code === code)) {
            console.log("Code must be U-N-I-Q-U-E");
            return;
        }

        try {
            // Crear un nuevo producto (objeto)
            const newProduct = {
                id: ProductManager.lastId++,
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail: thumbnail || [], // Valor por defecto ya que no es obligatorio
                status: true // Status es true por defecto
            };

            // Se agrega el producto a la lista
            this.products.push(newProduct);

            // Se guarda la lista actualizada con el nuevo producto
            await this.saveFile(this.products);

            console.log("Product added:", newProduct);
            return newProduct; // Regresa el producto recien agregado
        } catch (error) {
            console.error("Error occurred while adding the product:", error);
        }
    }

    async getProducts() {
        try {
            const arrayProducts = await this.readFile();
            console.log("Products loaded correctly", this.products);
            return arrayProducts;
        } catch (error) {
            console.log("Error reading the file", error);
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readFile();
            const searched = arrayProducts.find((item) => item.id === id);

            if (!searched) {
                console.log("Product not found ¯_◉‿◉_/¯");
            } else {
                console.log("Product has been located");
                return searched;
            }
        } catch (error) {
            console.log("File could not be read uwu", error);
        }
    }

    //Actualizando un product
    async updateProduct(id, productUpdated) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex((item) => item.id === id);

            if (index !== -1) {
                //Usando -array splice- para reemplazar el objeto en la posicion del index
                arrayProducts.splice(index, 1, productUpdated);
                console.log("Product has been updated succesfully!");
                await this.saveFile(arrayProducts);
            } else {
                console.log("Product not found ¯_◉‿◉_/¯");
            }
        } catch (error) {
            console.log("Error updating the product uwu", error);
        }
    }

    // Método para eliminar un producto por su id
    async deleteProduct(id) {
        try {
            const arrayProductos = await this.readFile();

            const index = arrayProductos.findIndex((item) => item.id === id);

            if (index !== -1) {
                // Utilizo el método de array splice para eliminar el objeto en la posición del index
                arrayProductos.splice(index, 1);
                await this.saveFile(arrayProductos);
                console.log("Product eliminated succesfully!");
            } else {
                console.log("Product was not found when trying to delete it");
            }
        } catch (error) {
            console.log("Error while trying to eliminate product", error);
        }
    }

    async readFile() {
        try {
            const answ = await fs.readFile(this.path, "utf-8");

            const arrayProducts = JSON.parse(answ);
            return arrayProducts;
        } catch (error) {
            console.log("File could not be read UwU", error);
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log("Error saving the file uwu", error);
        }
    }
}

module.exports = ProductManager;