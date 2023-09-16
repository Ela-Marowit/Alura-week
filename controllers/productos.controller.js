import { productoServices } from "../services/productos-service.js";

const nuevoProducto = (categoria, url, nombre, precio, descripcion, id) => {
    const card = document.createElement("div");
    // console.log("Categoria:",categoria,"\nurl:",url,"\nnombre:",nombre,"\nprecio:",precio,"\ndescripcion:",descripcion,"\nid:",id)
    const contenido = `
        <div class="tipo__producto" >
            <img class="tipo__foto" src=${url}>
            <p class="tipo__nombreProducto">${nombre}</p>
            <p class="tipo__precio">${precio}</p>
            <a class="tipo__verProducto" href= "./verProducto.html?id=${id}">Ver Producto</a>
        </div>
    `;
    card.innerHTML = contenido;
    return card;
};

const productos = document.querySelector("[data-product]")

function filtrarProductosPorCategoria(productos, categoria) {
    return productos.filter(producto => producto.categoria === categoria);
  }

const render = async (Lista_de_Productos) =>{
    let listaProducto = [];
    try{
        if (!Lista_de_Productos){
            listaProducto = await productoServices.listaProducto();
        } else {
            listaProducto = Lista_de_Productos;
        }

        const categorias = [...new Set(listaProducto.map(producto => producto.categoria))];
        categorias.forEach(categoria => {
            const productosPorCategoria = filtrarProductosPorCategoria(listaProducto, categoria);
            const categoriaElement = document.createElement('div');
            categoriaElement.classList.add('tipo__descripcion');
            // categoriaElement.classList.add('tipo');
            const categoriaTTitulo = document.createElement('div');
            categoriaTTitulo.classList.add('tipo__titulo');
            
            // Crea el título de la categoría y el botón para ver todos los productos
            const tituloCategoria = document.createElement('h2');
            tituloCategoria.classList.add('tipo__nombre');
            tituloCategoria.textContent = categoria;

            const verTodoButton = document.createElement('button');
            verTodoButton.classList.add('tipo__boton');
            verTodoButton.textContent = 'Ver Todo ➡';

            // Crea la lista de productos para la categoría
            const listaProductos = document.createElement('div');
            listaProductos.classList.add('productos');

            productosPorCategoria.forEach(elemento => {
                listaProductos.appendChild(
                    nuevoProducto(
                        elemento.categoria,
                        elemento.url,
                        elemento.nombre,
                        elemento.precio,
                        elemento.descripcion,
                        elemento.id
                    )
                );
            });

            // Agrega todos los elementos al DOM
            categoriaElement.appendChild(categoriaTTitulo);
            categoriaTTitulo.appendChild(tituloCategoria);
            categoriaTTitulo.appendChild(verTodoButton);
            categoriaElement.appendChild(listaProductos);

            // Agrega la categoría al contenedor principal
            document.querySelector('.tipo').appendChild(categoriaElement);
        });
    }catch(error){

    }
}

render()
export const render_pagina_index=render;
// productoServices.listaProducto()
//   .then(data => {
//     console.log(data[0]); // Verifica que los datos sean correctos
//   })
//   .catch(error => console.error('Error:', error));
