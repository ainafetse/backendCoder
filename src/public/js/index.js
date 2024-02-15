console.log("Conection works");

const socket = io();

socket.emit("message", "Socket working!!")

//Recibimos saludito
socket.on("holiwis" , (data) => {
    console.log(data);
})