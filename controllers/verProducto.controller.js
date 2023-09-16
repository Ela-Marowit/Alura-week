import { productoServices } from "../services/productos-service.js";

// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Luego, utiliza la función listaProducto() para obtener todos los productos de tu base de datos JSON.
// Después, busca el producto con el ID correspondiente.
productoServices.listarUnProducto(productId)
  .then(producto => {
    if (producto) {
      // Actualiza los elementos HTML con los detalles del producto
      document.querySelector('.producto-nombre').textContent = producto.nombre;
      document.querySelector('.producto-imagen').src = producto.url;
      document.querySelector('.producto-descripcion').textContent = producto.descripcion;
      document.querySelector('.producto-precio').textContent = `$${producto.precio}`;
    } else {
      console.error('Producto no encontrado');
    }
  })
  .catch(error => console.error('Error:', error));
