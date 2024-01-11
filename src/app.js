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
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");


//Middleware empleada para gestión de APIs
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//Endpoint de la ruta raíz
app.get("/", (req, res) => {
    // "/" hace referencia a la ruta raiz de mi aplicación
    res.send("Working server with Express");
});

//Rutas de cart y products 
app.use("/api", productsRouter);
app.use("/api", cartsRouter);



app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
