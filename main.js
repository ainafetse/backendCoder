class ProductManager {

    static lastId = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("All fields are required!! （￣ー￣）"); 
            return;
        }

        if(this.products.some(item => item.code === code)){
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
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Product not found ¯\_◉‿◉_/¯");
        } else {
            console.log("Product has been located:", product);
        }
        
    }


}

//Test 1
const manager = new ProductManager();

//Test 2
manager.getProducts();

//Test 3

manager.addProduct("Shirt", "This is a shirt. Wow. Cool. A shirt.", 850, "no thumbnail", "abc123", 25);

//Test 4

manager.addProduct("Hoodie", "This is a hoodie. Wow. Cool. A hoodie.", 1400, "no thumbnail", "abc124", 40);

manager.addProduct("Sweater", "This is a sweater. Wow. Cool. A sweater.", 950, "no thumbnail", "abc125", 40);

//Test 5

manager.getProducts();

//Test 6

manager.addProduct("Sweater", "This is a sweater. Wow. Cool. A sweater.", 950, "no thumbnail", "abc125", 40);

//Test 7

manager.getProductById(2);
manager.getProductById(9);