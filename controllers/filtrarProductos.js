import { productoServices } from "../services/productos-service.js";
import {render_pagina_index} from "../controllers/productos.controller.js"
import {render_pagina_productos} from "../controllers/listaProducto.controller.js";

// Función para buscar y filtrar productos
function buscarProductos() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    productoServices.listaProducto()
        .then(data => {
            const productosFiltrados = data.filter(producto => {
                const descripcion = producto.descripcion.toLowerCase();
                const categoria = producto.categoria.toLowerCase();
                const nombre = producto.nombre.toLowerCase();
                
                // Compara el texto de búsqueda con la descripción, la categoría o el nombre del producto
                return descripcion.includes(searchText) || categoria.includes(searchText) || nombre.includes(searchText);
            });

            // Llama a una función para renderizar los productos filtrados en la página
            let productosContainer = document.querySelector('.tipo');
            if (productosContainer){
                productosContainer.innerHTML = '';
                render_pagina_index(productosFiltrados)
            } else {
                productosContainer = document.querySelector('.productos__section');
                render_pagina_productos(productosFiltrados);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Manejar la búsqueda cuando se presiona Enter
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        buscarProductos();
    }
});

