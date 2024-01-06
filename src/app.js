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
const fs = require("fs").promises;

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send("Working server with Express");
});

// Obtener todos los productos con opción de limitar los resultados
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const products = await getAllProducts(limit);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Obtener un producto específico por su ID
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await getProductById(productId);
        
        if (Object.keys(product).length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

// Obtener todos los productos con opción de limitar los resultados
async function getAllProducts(limit = null) {
    try {
        const rawData = await fs.readFile('./src/products.json', 'utf-8');
        let products = JSON.parse(rawData);
        
        if (limit !== null) {
            products = products.slice(0, limit);
        }
        
        return products;
    } catch (error) {
        throw error;
    }
}

// Obtener un producto por su ID
async function getProductById(id) {
    try {
        const rawData = await fs.readFile('./src/products.json', 'utf-8');
        const products = JSON.parse(rawData);
        const product = products.find(prod => prod.id === parseInt(id));
        return product || {};
    } catch (error) {
        throw error;
    }
}


