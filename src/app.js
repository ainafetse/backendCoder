/*//Paso 1: importar http 

const http = require("http");

//Paso 2: crear el servidor

const server = http.createServer((request, response) => {
    response.end("Working server");
    //Este método del objeto response me permite enviar una respuesta al cliente. 
});

//Tercer pasito: vamos a poner a escuchar a nuestro server en un puerto. 

const PORT = 8080;

server.listen(PORT, ()=> {
    //console.log(`Listening at ${PORT}`);
    console.log(`Listening at http://localhost:${PORT}`);
})*/

/*
///////////////////////////////////////////// MODO EXPRESS /////////////////////////////////////////
//Instalamos con el comando: npm install express

//Paso 1: Declaramos variable de servidor

const PORT = 8080;

//Paso 2: Importamos el modulo

const express = require("express");

//Paso 3: Creamos una app

const app = express();

//Paso 4: Creamos nuestra ruta

app.get("/", (req, res) => {
    //Cuando utilizo "/" estoy haciendo referencia a la ruta raíz de mi aplicación. 
    res.send("Working server with Express");
});

//Paso 5: Ponemos a escuchar nuestro server

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

/////////// PRÁCTICA CON MÁS RUTAS (endpoints) /////////////
const ProductManager = require('./product-manager');
const productManager = new ProductManager();
app.get('/shop', (req, res)=> {
    res.send("Welcome to my crib");
});

app.get('/contact', (req, res)=> {
    res.send("Call me maybe?");
});
*/

///////////// 3ER DESAFIO ///////////////
const express = require("express");
const ProductManager = require("./product-manager");
const app = express();
const PORT = 8080;

app.use(express.json());

const productManager = new ProductManager('./src/products.json');

app.get("/", (req, res) => {
    // "/" hace referencia a la ruta raiz de mi aplicacion
    res.send("Working server with Express");
});

// Endpoint to get all products with the possibility to limit results
app.get('/products', async (req, res) => {
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
app.get('/products/:id', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
