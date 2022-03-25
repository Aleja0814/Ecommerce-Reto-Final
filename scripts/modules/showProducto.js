export let showProducto = (data, container) => {

  data.forEach(card => {
    //se desestructura el array data
    let { id, name, price, image } = card
    //Se agrega una tarjeta para cada producto en el contenedor principal
    container.innerHTML +=
      ` <div class="card d-inline-flex m-3 mx-5" style="width: 16rem; height: 25rem;">
    <img src="${image}" class="card-img-top mt-3 w-75 h-50 d-block m-auto">
    <div class="card-body">
      <h5 class="card-title text-center">${name}</h5>
          <div class="text-center" >$${price}</div>
          <br>
      <center>
      <a id=${id} href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn btn-outline-primary" >Ver más</a>
    </center>
    </div>
  </div>`
  });

}