const express = require("express");
const productRouter = require("./routes/productRouter.js");
const cartsRouter = require("./routes/cartsRouter.js");
const realtimeproducts = require("./routes/viewsRouter.js");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/db"));

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", realtimeproducts);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.use((error, req, res, next) => {
	console.log(error.stack);
	res.status(500).send("error de server");
});

const httpServer = app.listen(PORT, () => {
	console.log("escuchando en el puerto: ", PORT);
});

const io = new Server(httpServer);
let productos = [];

io.on("connection", socket => {
	console.log("Nuevo cliente conectado");

	socket.emit("productosCargados", productos);

	socket.on("productosBD", data => {
		productos = [...data];
		io.emit("productosCargados", productos);
	});

	socket.on("productoNuevo", data => {
		productos.push(data);
		io.emit("nuevoProductoCargado", productos);
	});
});
