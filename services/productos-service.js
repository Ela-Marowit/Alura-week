//get
const listaProducto = () => {
  return fetch ("http://localhost:3000/producto")
  .then((respuesta)=> respuesta.json())
  .catch(error => console.log(error))
}

const listarUnProducto = (id) => {
  return fetch(`http://localhost:3000/producto/${id}`)
  .then((respuesta) => {
    return respuesta.json();
  });
};
//post
const crearProducto = (categoria, url, nombre, precio, descripcion, id) => {
    return fetch (`http://localhost:3000/producto`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({categoria, url, nombre, precio, descripcion, id}),
    }).then((respuesta) =>{
      if (respuesta.ok){
        return respuesta.body;
      }
      throw new Error ("No se pudo crear producto");
    });
};
// put
const modificarProducto = async (categoria, url, nombre, precio, descripcion, id) => {
  return fetch(`http://localhost:3000/producto/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({categoria, url, nombre, precio, descripcion, id}),
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .catch((error) => console.log(error));
};

// delete
const eliminarProducto = async (id) => {
  return await fetch(`http://localhost:3000/producto/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const productoServices ={
  listaProducto,
  listarUnProducto,
  crearProducto,
  modificarProducto,
  eliminarProducto
};