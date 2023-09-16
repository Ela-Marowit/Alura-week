import { productoServices } from "../services/productos-service.js";
import { formatPrice } from "../formatterPrices.js";

const getProducts = (categoria, url, nombre, precio, descripcion, id) => {
  const card = document.createElement("div");
  const contenido = `
    <div class="producto">
        <div class="container">
            <button class="buttonEliminar" type="button">
              <img class="tipo__eliminar" src="../img/eliminar.png" alt="Eliminar" />
            </button>
            
            <a href="../editarProducto.html?id=${id}">
            
              <button class="buttonEditar" type="button">
                <img class="tipo__editar" src="../img/editar.png" alt="Editar" />
              </button>
            
            </a>
        </div>

        <div class="tipo__producto">
            <img class="tipo__foto" src=${url}>
            <p class="tipo__nombreProducto">${nombre}</p>
            <p class="tipo__precio">${formatPrice(precio)}</p>
            <a class="tipo__verProducto" href= "#">Ver Producto</a>
        </div>
    </div>
    `;

  card.innerHTML = contenido;
  card.dataset.id = id;
  return card;
};

let productos = document.querySelector("[data-allProducts]");
if (!productos){
  productos = document.createElement("p");
} else {
productos.addEventListener("click", async (evento) => {
  const isDeleteButton = evento.target.classList.contains("tipo__eliminar");
  if (isDeleteButton) {
    const producto = evento.target.closest("[data-id]");
    if (producto) {
      const id = producto.dataset.id;
      try {
        await productoServices.eliminarProducto(id);
        producto.remove();
        console.log(`Producto con ID ${id} eliminado.`);
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
      }
    }
  }
});}




const render = async (Lista_de_Productos) => {
    const productosContainer = document.querySelector('.productos');
    if (productosContainer) {
    productosContainer.innerHTML = '';
    }
    let listaProductos = [];
    try{
        if (!Lista_de_Productos){
            listaProductos = await productoServices.listaProducto();
        } else {
            listaProductos = Lista_de_Productos;
        }

    listaProductos.forEach((producto) => {
      productos.appendChild(
        getProducts(
            producto.categoria, 
            producto.url, 
            producto.nombre, 
            producto.precio, 
            producto.descripcion, 
            producto.id
        )
      );
    });
  } catch (err) {
    console.log(err);
  }
};

render();
export const render_pagina_productos = render;