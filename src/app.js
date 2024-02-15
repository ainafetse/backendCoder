///////////// 3ER DESAFIO ///////////////
const express = require("express");
const app = express();
const PORT = 8080;
const viewsRouter = require("./routes/views.router");
const socket = require("socket.io");
/*const productsRouter = require("./routes/products.router.js");
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

*/
const exphbs = require ("express-handlebars")

app.engine("handlebars",  exphbs.engine());

app.set("view engine", "handlebars");

app.set("views" , "./src/views");

//Usamos el router

app.use(express.static("./src/public"));
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

//socket.io

const io = socket(httpServer);

io.on("connection", (socket) =>{
    console.log("Client Connected Succesfully");

    socket.on("message", (data) => {
        console.log(data);
        io.sockets.emit("message", data)
    })

    //Enviar mensajito
    socket.emit("holiwis", "Hello are you there?");
})

