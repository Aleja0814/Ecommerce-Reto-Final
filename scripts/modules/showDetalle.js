export let showDetalle = async (idProducto, container) => {
    let res = await fetch(` http://localhost:4000/Productos/${idProducto}`)
    let data = await res.json()
    //se añade data como un nuevo producto al localStorage
    localStorage.setItem("nuevoProducto", JSON.stringify(data))
    //Se desestructura el array data que trae al producto según su id
    let { id, image, price, description, name } = data
    //Se inserta un modal para cada producto con sus características
    container.innerHTML =
        `               <div class="modal-header">
<h5 class="modal-title " id="exampleModalLabel">${name}</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body d-inline-block text-center">

<img class="w-50 " src="${image}">
<div class="m-3 bg-white ">
    <h4 class="modal-subtitle ">$${price}</h4>
    <p class=" px-3 ">${description}</p>
</div>

</div>
<div class="modal-footer">

<input class="inputCant w-25  text-center" type="number" name="number" id="inputCant"
    placeholder="Cantidad" autocomplete="off" required>

<button id="${id}" type="button" class="btn btn-primary addCarrito">Agregar al carrito</button>
</div>`
}