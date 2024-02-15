console.log("Conection works");

const socket = io();

//socket.emit("message", "Socket working!!")

//Recibimos saludito
/*socket.on("holiwis" , (data) => {
    console.log(data);
});*/
//Renderizar productos
socket.on("products", (data) => {
    renderProducts(data);
}); 

//Funciones

//Función para renderizar la tabla de productos:
const renderProducts = (products) => {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";


    products.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("col-sm-3", "mb-3", "mb-sm-0");
        //Agregamos boton para eliminar: 
        card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="fw-bold">Title:${item.title}</h5>
                            <p>Id: ${item.id}</p>
                            <p>Description:${item.description}</p>
                            <p class="fw-bold">Price:${item.price}.00</p>
                            <button class="btn btn-primary">Delete Button</button>
                        </div>
                    </div>
        
        `;
        productContainer.appendChild(card);

        //Agregamos el evento eliminar producto:
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        });
    });
}

//Eliminar producto: 
const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
}

//Agregar producto:

document.getElementById("addProductBtn").addEventListener("click", () => {
    addProduct();
});


const addProduct = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        status: document.getElementById("status").value === "true",
        category: document.getElementById("category").value
    };
    
    socket.emit("addProduct", product);
};

