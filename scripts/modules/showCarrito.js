export let showCarrito = (data, container) => {
    container.innerHTML = ''

    data.forEach((item, index) => {
        //Se multiplica precio por unida para obtener el subtotal de cada producto
        let subTotal = item.price * item.units

        //Se añade a una fila a la tabla por cada producto agregado
        container.innerHTML +=
            `               <tr class="text-center">
        <th scope="row">${index + 1}</th>
        <td class="w-25 ">
            <div class="d-block ">
                <h6>${item.name}</h6>
                <img class="w-50  " src="${item.image}" >
            </div>
        </td>
        <td class="w-25 ">
            <div class="d-flex justify-content-center ">
                <button style='height: 50px;' id=${index} class='my-1 btn btn-outline-primary  sumar'>+</button>
                <h6 class='mx-3 my-3' id='cantidad'>${item.units}</h6>
                <button style='height: 50px;' id=${index} class='my-1 btn btn-outline-primary  restar'>-</button>
            </div>
        </td>
        <td >$${item.price}</td>
        <td id='subTotal-id${index}' class='subTotal'>${subTotal}</td>
        <td><button id=${item.id} type="button" class="btn-close cerrar "  aria-label="Close"></button></td>
        </tr>`

    });
}