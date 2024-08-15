const socket = io();

let listContainer = document.querySelector("#list-container");
let inputTitle = document.querySelector("#title");
let inputPrice = document.querySelector("#price");
let inputCode = document.querySelector("#code");
let inputDescription = document.querySelector("#description");
let inputStock = document.querySelector("#stock");
let inputCategoria = document.querySelector("#category");
let button = document.querySelector("#submit");
let inputs = document.querySelectorAll(".productbox");

// Obtener productos
fetch("../db/product.json")
	.then(response => response.json())
	.then(data => socket.emit("productosBD", data));
// Agregar producto
function agregarProducto() {
	const producto = {
		title: inputTitle.value,
		price: inputPrice.value,
		code: inputCode.value,
		description: inputDescription.value,
		stock: inputStock.value,
		category: inputCategoria.value,
	};
	limpiarInputs();
	socket.emit("productoNuevo", producto);
}

function limpiarInputs() {
	inputs.forEach(input => {
		input.value = "";
	});
}

button.addEventListener("click", event => {
	event.preventDefault();
	agregarProducto();
});

socket.on("productosCargados", data => {
	listContainer.innerHTML = "";
	data.forEach(producto => {
		let div = document.createElement("div");
		div.classList.add("producto");
		div.innerHTML = `
        <div class="detalle-productos">
            <h3 class="producto-title">${producto.title}</h3>
            <p class="producto-price">$${producto.price}</p>
            <p class="producto-categoria">${producto.category}</p>
            <p class="producto-description">${producto.description}</p>
            <p class="producto-stock">${producto.stock}</p>
            <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
        </div>
        `;
		listContainer.append(div);
	});
});

socket.on("nuevoProductoCargado", data => {
	listContainer.innerHTML = "";
	data.forEach(producto => {
		let div = document.createElement("div");
		div.classList.add("producto");
		div.innerHTML = `
        <div class="detalle-productos">
            <h3 class="producto-title">${producto.title}</h3>
            <p class="producto-price">$${producto.price}</p>
            <p class="producto-categoria">${producto.category}</p>
            <p class="producto-description">${producto.description}</p>
            <p class="producto-stock">${producto.stock}</p>
            <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
        </div>
        `;
		listContainer.append(div);
	});
});
