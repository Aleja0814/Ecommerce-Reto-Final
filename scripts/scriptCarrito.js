import { showCarrito } from "./modules/showCarrito.js"

//Definir variables
let containerCarrito = document.getElementById("containerCarrito")
let addCarrito = JSON.parse(localStorage.getItem("addCarrito"))
let totalPago = document.getElementById("totalPago")
let inforPago = document.getElementById("infoPago")
let totalUnits = []
let arrPago = []
let valorTotal = 0
let valorCantidad = document.getElementById("carrito-Cantidad")
let cantidad = 0



//Apenas carga la página, se agrega el contenido al carrito
window.addEventListener("DOMContentLoaded", (e) => {


    showCarrito(addCarrito, containerCarrito)

    //Se añade contador del carrito
    totalUnits = addCarrito.map(item => {
        return Number(item.units)
    })
    console.log(totalUnits)
    for (let i = 0; i < totalUnits.length; i++) {
        cantidad += totalUnits[i]
    }
    valorCantidad.innerHTML = cantidad

    //Se añade el precio total
    arrPago = addCarrito.map(item => {
        let subTotal = item.units * item.price
        return subTotal
    })

    for (let i = 0; i < arrPago.length; i++) {
        valorTotal += arrPago[i]
    }
    totalPago.innerHTML = valorTotal

    localStorage.setItem("totalPago", valorTotal)


})

//Se borra del carrito el producto
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cerrar")) {

        let idEnCarrito = e.target.id
        // console.log(idEnCarrito)
        let aBorrar = addCarrito.find(item => item.id == idEnCarrito)
        // console.log(aBorrar)
        let indice = addCarrito.indexOf(aBorrar)
        //  console.log(indice)

        addCarrito.splice(indice, 1)

        showCarrito(addCarrito, containerCarrito)
        localStorage.setItem("addCarrito", JSON.stringify(addCarrito))
        showCarrito(addCarrito, containerCarrito)

        //Se añade contador del carrito
        cantidad = 0
        totalUnits = addCarrito.map(item => {
            return Number(item.units)
        })
        console.log(totalUnits)
        for (let i = 0; i < totalUnits.length; i++) {
            cantidad += totalUnits[i]
        }
        valorCantidad.innerHTML = cantidad

        //Se añade el precio total
        arrPago = addCarrito.map(item => {
            let subTotal = item.units * item.price
            return subTotal
        })
        // console.log(arrPago)
        // console.log(arrPago.length)
        valorTotal = 0

        for (let i = 0; i < arrPago.length; i++) {
            valorTotal += arrPago[i]
        }

        // console.log(valorTotal)
        totalPago.innerHTML = valorTotal

    }
    localStorage.setItem("totalPago", valorTotal)
})

//Funcionalidad al botón sumar y restar
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("sumar")) {


        // console.log(addCarrito[e.target.id])
        addCarrito[e.target.id].units++

        //Se añade contador del carrito
        cantidad = 0
        totalUnits = addCarrito.map(item => {
            return Number(item.units)
        })
        console.log(totalUnits)
        for (let i = 0; i < totalUnits.length; i++) {
            cantidad += totalUnits[i]
        }
        valorCantidad.innerHTML = cantidad

        //Se añade el precio total
        valorTotal = 0
        arrPago = addCarrito.map(item => {
            let subTotal = item.units * item.price
            return subTotal
        })
        // console.log(totalUnits)
        // console.log(arrPago)
        for (let i = 0; i < arrPago.length; i++) {
            valorTotal += arrPago[i]
        }
        // console.log(valorTotal)
        totalPago.innerHTML = valorTotal
        showCarrito(addCarrito, containerCarrito)
    }

    else if (e.target.classList.contains("restar")) {

        if ((addCarrito[e.target.id].units) <= 1) {
            addCarrito[e.target.id].units = 1
            showCarrito(addCarrito, containerCarrito)

        }
        else {
            addCarrito[e.target.id].units--
            showCarrito(addCarrito, containerCarrito)

        }
        //Se añade contador del carrito
        cantidad = 0
        totalUnits = addCarrito.map(item => {
            return Number(item.units)
        })
        console.log(totalUnits)
        for (let i = 0; i < totalUnits.length; i++) {
            cantidad += totalUnits[i]
        }
        valorCantidad.innerHTML = cantidad
        //Se añade el precio total
        valorTotal = 0
        arrPago = addCarrito.map(item => {
            let subTotal = item.units * item.price
            return subTotal
        })
        // console.log(arrPago)
        for (let i = 0; i < arrPago.length; i++) {
            valorTotal += arrPago[i]
        }
        // console.log(valorTotal)
        totalPago.innerHTML = valorTotal
    }
    localStorage.setItem("totalPago", valorTotal)

})

//Mostrar información pago en modal
document.addEventListener("click", (e) => {
    let nombre = document.getElementById("nombre").value
    let email = document.getElementById("email").value
    let tc = document.getElementById("tc").value
    let vencimiento = document.getElementById("vencimiento").value
    let cvv = document.getElementById("clave").value
    let totalPago = localStorage.getItem("totalPago")
    let arrInfo = []
    //Se crea un array solo con la información deseada del producto a comprar
    arrInfo = addCarrito.map(item => {
        let producto = item.name
        let cantidad = item.units
        let precioProducto = item.price
        return ["Producto: " + producto, "Cantidad: " + cantidad, "Precio unitario: $" + precioProducto]
    })
    if (e.target.classList.contains("enviarPago")) {
        //    console.log(arrInfo)
        inforPago.addEventListener('submit', (e) => {
            e.preventDefault();

            fetch("http://localhost:4000/InformacionPago", {
                method: "POST",
                body: JSON.stringify({
                    userName: nombre,
                    userEmail: email,
                    userTC: tc,
                    tcExpiration: vencimiento,
                    tcCode: cvv,
                    infoProducts: arrInfo,
                    totalAPagar: "$" + totalPago
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then(() => {
                alert("Información enviada con éxito")
            }).catch((error) => {
                alert(error)
            })

        })
    }
})



