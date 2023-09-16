import { productoServices } from "../services/productos-service.js";

const form = document.querySelector("[data-form]");
console.log("form: ",form);

form.addEventListener("submit", (event) => {
    console.log("a");
    event.preventDefault();
    const categoria = document.querySelector("[data-categoria]").value;
    const url = document.querySelector("[data-url]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    
    productoServices
    .crearProducto(categoria, url, nombre, precio, descripcion)
    .then ((respuesta)=>{
        console.log("respuesta\n",respuesta);
        window.location.href= "../productos.html";
    })
    .catch((err) => {
        console.log("err",err);
    })
});    

