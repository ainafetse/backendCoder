//Instancia de socket.io del lado del cliente
const socket = io();

//Creamos una variable para guardar el usuario
let user;
const chatBox = document.getElementById("chatBox");

//Swal metodo para usar la libreria de sweet alert
//Fire metodo para configurar la alerta
Swal.fire({
    title: "Identify",
    input: "text",
    text: "Enter your username to identify in the chat",
    inputValidator: (value) => {
        return !value && "You need identify yourself to continue"
    },
    allowOutsideClick: false,
}).then( result => {
    user = result.value;
})


chatBox.addEventListener("keyup", (event) =>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
})

//Listener de mensajes
socket.on("messagesLogs", data =>{
    let log = document.getElementById("messagesLogs");
    let messages = "";

    data.forEach (message =>{
        messages = messages + `${message.user} dice: ${message.message} <br>`
    });
    log.innerHTML = messages;
})
