import { productoServices } from "../services/productos-service.js";

const form = document.querySelector("[data-form]");
console.log("form: ",form);

const obtenerInformacion = async() =>{
    const urlN = new URL(window.location);
    const id = urlN.searchParams.get("id");

    if (id == null){
        window.location.href = "#";
    }

    const categoria = document.querySelector("[data-categoria]");
    const url = document.querySelector("[data-url]");
    const nombre = document.querySelector("[data-nombre]");
    const precio = document.querySelector("[data-precio]");
    const descripcion = document.querySelector("[data-descripcion]");


    try{
        const perfil = await productoServices.listarUnProducto(id);
        if (perfil.categoria && perfil.url && perfil.nombre && perfil.precio && perfil.descripcion){
            categoria.value = perfil.categoria;
            url.value = perfil.url;
            nombre.value = perfil.nombre;
            precio.value = perfil.precio;
            descripcion.value = perfil.descripcion;


        } else {
            console.log("Producto no encontrado");
            // throw new Error();
        }
    } catch(error){
        window.location.href="";
    }
};

obtenerInformacion();

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    const urlN = new URL(window.location);
    const id = urlN.searchParams.get("id");

    const categoria = document.querySelector("[data-categoria]").value;
    const url = document.querySelector("[data-url]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;


    productoServices.modificarProducto(categoria, url, nombre, precio, descripcion,id).then(()=>{
        window.location.href= "../productos.html";
    })

});

  