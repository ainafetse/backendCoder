///////////// 3ER DESAFIO ///////////////
const express = require("express");
const app = express();
const viewsRouter = require("./routes/views.router");
const exphbs = require ("express-handlebars");
const socket = require("socket.io");
const PORT = 8080;

/*const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");*/

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars",  exphbs.engine());
app.set("view engine", "handlebars");
app.set("views" , "./src/views");

//Rutas: 
/*app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);*/
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

//socket.io

/*const io = socket(httpServer);

io.on("connection", (socket) =>{
    console.log("Client Connected Succesfully");

    socket.on("message", (data) => {
        console.log(data);
        io.sockets.emit("message", data)
    })

    //Enviar mensajito
    socket.emit("holiwis", "Hello are you there?");
})*/

/*
const ioChat = new socket.Server(httpServer)

let messages = [];

io.on("connection", (socket) => {
    console.log("Connection succesful with server")

    socket.on("message", data => {
        messages.push(data);
        io.emit("messagesLogs", messages);
    });
})*/

const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");
const io = socket(server);

io.on("connection", async (socket) => {
    console.log("Connection succesful with server");

    //Enviamos el array de productos al cliente que se conectó:
    socket.emit("products", await productManager.getProducts());  
    
    //Recibimos mensajes del chat
    socket.on("message", (data) => {
        console.log(data);
        io.sockets.emit("message", data)
    })

    //Recibimos el evento "eliminarProducto" desde el cliente:
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        //Enviamos el array de productos actualizado a todos los productos:
        io.sockets.emit("products", await productManager.getProducts());
    });

    //Recibimos el evento "agregarProducto" desde el cliente:
    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);
        //Enviamos el array de productos actualizado a todos los productos:
        io.sockets.emit("products", await productManager.getProducts());
    });
});