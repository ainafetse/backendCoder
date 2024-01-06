const fs = require("fs").promises;

class ProductManager {
    static lastId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //Métodos DESAFIO 1: 

    async addProduct(newObject) {
        let { title, description, price, thumbnail, code, stock } = newObject;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("All fields are required!! （￣ー￣）");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("Code must be U-N-I-Q-U-E");
            return;
        }

        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }


        this.products.push(newProduct);

        //Guardamos el array 

        await this.saveFile(this.products);

    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readFile();
            const searched = arrayProducts.find(item => item.id === id);

            if (!searched) {
                console.log("Product not found ¯\_◉‿◉_/¯");
            } else {
                console.log("Product has been located");
                return searched;
            }

        } catch (error) {
            console.log("File could not be read uwu", error);
        }

    }

    //Nuevos metodos DESAFIO 2: 

    async readFile() {
        try {
            const respon = await fs.readFile(this.path, "utf-8");

            const arrayProducts = JSON.parse(respon);
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

    //Actualizando un product
    async updateProduct(id, productUpdated) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                //Usando -array splice- para reemplazar el objeto en la posicion del index
                arrayProducts.splice(index, 1, productUpdated);
                await this.saveFile(arrayProducts);
            } else {
                console.log("Product not found ¯\_◉‿◉_/¯");
            }

        } catch (error) {
            console.log("Error updating the product uwu", error);
        }
    }

}

module.exports = ProductManager;