const fs = require("fs");
const path = "./db/product.json";

class ProductManager {
	constructor() {
		this.path = path;
	}

	getProductos = async () => {
		try {
			fs.existsSync(path);
			const result = await fs.promises.readFile(this.path, "utf-8");
			const productos = JSON.parse(result);
			return productos;
		} catch (error) {
			return [];
		}
	};

	//Logica anterior
	/* addProducto = async nuevoProducto => {
		console.log(nuevoProducto); //Agrege para ver que era el producto que llegaba
		if (
			!nuevoProducto.title ||
			!nuevoProducto.description ||
			!nuevoProducto.price ||
			!nuevoProducto.code ||
			!nuevoProducto.stock ||
			!nuevoProducto.category
		) {
			throw new Error("producto incompleto"); // Lanza el error
		}
		try {
			const productos = await this.getProductos();

			nuevoProducto.id = productos.length
				? productos[productos.length - 1].id + 1
				: 1;

			nuevoProducto.status = true;

			productos.push(nuevoProducto);

			await fs.promises.writeFile(
				this.path,
				JSON.stringify(productos, null, 2),
				"utf-8",
			);
			console.log("Producto agregado:", nuevoProducto);
			return nuevoProducto; // Retorna el producto agregado
		} catch (error) {
			console.error("Error al agregar producto:", error);

			throw error; // Re-lanza el error para manejo exterior }
		}
	};
} */

	//Logica nueva
	addProducto = async nuevoProducto => {
		console.log(nuevoProducto); //Agrege para ver que era el producto que llegaba
		if (
			nuevoProducto.title ||
			nuevoProducto.description ||
			nuevoProducto.price ||
			nuevoProducto.code ||
			nuevoProducto.stock ||
			nuevoProducto.category
		)
			try {
				const productos = await this.getProductos();

				nuevoProducto.id = productos.length
					? productos[productos.length - 1].id + 1
					: 1;

				nuevoProducto.status = true;

				productos.push(nuevoProducto);

				await fs.promises.writeFile(
					this.path,
					JSON.stringify(productos, null, 2),
					"utf-8",
				);
				console.log("Producto agregado:", nuevoProducto);
				return nuevoProducto; // Retorna el producto agregado
			} catch (error) {
				console.error("Error al agregar producto:", error);
				throw error; // Re-lanza el error para manejo exterior }
			}
		else {
			console.log(nuevoProducto);
			throw new Error("producto incompleto");
		}
	};

	getProductosById = async id_producto => {
		try {
			const productos = await this.getProductos();
			let producto = productos.find(
				producto => Number(producto.id) === Number(id_producto),
			);
			if (!producto) {
				console.log("No existe el producto");
				return "No existe el producto";
			}
			return producto;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	updateProducto = async (id_producto, nProducto) => {
		try {
			const productos = await this.getProductos();
			let producto = productos.findIndex(
				producto => Number(producto.id) === Number(id_producto),
			);
			let productoAModificar = productos.find(
				producto => Number(producto.id) === Number(id_producto),
			);
			let productoModificado = {
				...productos[producto],
				...nProducto,
				id: productoAModificar.id,
			};
			productos[producto] = productoModificado;
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(productos, null, 2),
				"utf8",
			);
			console.log(`Producto con ID ${id_producto} modificado: ${JSON.stringify(
				productoAModificar,
			)} 
            Nuevo producto: ${JSON.stringify(
							productoModificado,
						)}. Recuerda que el id siempre sera el mismo`);
			return `Producto con ID ${id_producto} modificado: ${JSON.stringify(
				productoAModificar,
			)} 
            Nuevo producto: ${JSON.stringify(
							productoModificado,
						)}. Recuerda que el id siempre sera el mismo`;
		} catch (error) {
			console.log("No se pudo modificar el producto");
		}
	};

	deleteProducto = async id_producto => {
		try {
			const productos = await this.getProductos();
			let indexProductoAEliminar = productos.findIndex(
				producto => Number(producto.id) === Number(id_producto),
			);
			let productoEliminado = productos.find(
				producto => Number(producto.id) === Number(id_producto),
			);
			productos.splice(indexProductoAEliminar, 1);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(productos, null, 2),
				"utf8",
			);
			return (
				`Producto con ID ${id_producto} eliminado: ` +
				JSON.stringify(productoEliminado)
			);
		} catch (error) {
			console.log("No se pudo eliminar el producto");
		}
	};
}
module.exports = ProductManager;
