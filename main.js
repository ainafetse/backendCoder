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

//Testing: 

//Test 1: Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager("./products.json");

//Test 2: Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

manager.getProducts();

//Test 3: Se llamará al método “addProduct” con los campos establecidos:

const shirt = {
    title: "Shirt",
    description: "This is a shirt. Wow. Cool. A shirt.",
    price: 850,
    thumbnail: "no thumbnail",
    code: "abc123",
    stock: 25
}

manager.addProduct(shirt);

//Test 4: El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE



const hoodie = {
    title: "Hoodie",
    description: "This is a hoodie. Wow. Cool. A hoodie.",
    price: 1400,
    thumbnail: "no thumbnail",
    code: "abc124",
    stock: 40,
}


manager.addProduct(hoodie);

const sweater = {
    title: "Sweater",
    description: "This is a sweater. Wow. Cool. A sweater.",
    price: 950,
    thumbnail: "no thumbnail",
    code: "abc125",
    //stock: 40,
}

//Test 5: Repetimos el codigo: 

//manager.addProduct(sweater);
//Las validaciones funcionan. 

//Test 6: Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado


manager.getProducts();

//Test 7: Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

async function testingSearchById() {
    const productSearched = await manager.getProductById(2);
    console.log(productSearched);
}

testingSearchById();

//Test 8: Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.

const hat = {
    id: 1,
    title: "Hat", 
    description: "This is a hat. Wow. Cool. A hat.", 
    price: 600,
    thumbnail: "no thumbnail",
    code: "abc123",
    stock: 30
};

async function testingUpdating() {
    await manager.updateProduct(1, hat);
}

testingUpdating();
