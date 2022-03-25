
import { showDetalle } from "./modules/showDetalle.js"
import { showProducto } from "./modules/showProducto.js"

//Definición de variables
let containerPerro = document.getElementById("containerPerro")
let containerModal = document.getElementById("modal-content")
let infoCarrito = JSON.parse(localStorage.getItem("addCarrito"))
let carrito = infoCarrito !== null ? infoCarrito : []
let botonCarrito = document.getElementById("Ircarrito")
let valorCantidad = document.getElementById("carrito-Cantidad")
let totalUnits = []


//Mostrar productos por categoría (perro)
document.addEventListener("DOMContentLoaded", async () => {
    let res = await fetch(" http://localhost:4000/Productos")
    let data = await res.json()
    // console.log(data)

    let categoriaPerro = data.filter(item => item.categorie == "Perros")
    showProducto(categoriaPerro, containerPerro)
})

//Mostrar detalle producto en modal
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-outline-primary")) {
        // console.log(e.target.id)
        let id = e.target.id
        showDetalle(id, containerModal)

    }
})

//Agregar producto al carrito (capturar id del producto con botón)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("addCarrito")) {
        // console.log(e.target.id)
        let idCarrito = e.target.id
        let nuevoProducto = JSON.parse(localStorage.getItem("nuevoProducto"))
        //Verificar que el producto no se ha agregado al carrito
        if (carrito.length === 0) {
            nuevoProducto.units = document.getElementById("inputCant").value
            //Verificar que se ingrese la cantidad
            if (nuevoProducto.units == "") {
                alert("Favor ingresar la cantidad")
            }
            else {
                carrito.push(nuevoProducto)
                alert("Nuevo producto añadido al carrito")
                console.log(nuevoProducto)
            }

        }
        //Verificar que el producto no se ha agregado al carrito
        else {
            let addProducto = carrito.find(item => item.id == idCarrito)
            if (addProducto === undefined) {
                nuevoProducto.units = document.getElementById("inputCant").value
                //Verificar que se ingrese la cantidad
                if (nuevoProducto.units == "") {
                    alert("Favor ingresar la cantidad")
                }
                else {

                    carrito.push(nuevoProducto)
                    alert("Nuevo producto añadido al carrito")


                }
            }
            else {
                alert("El producto ya se encuentra en el carrito")
            }
        }
        //Aumentar contador de carrito
        let cantidad = 0
        console.log(carrito)
        totalUnits = carrito.map(item => {
            return Number(item.units)
        })
        console.log(totalUnits)

        for (let i = 0; i < totalUnits.length; i++) {
            cantidad += totalUnits[i]
        }
        console.log(cantidad)
        valorCantidad.innerHTML = cantidad

        localStorage.setItem("addCarrito", JSON.stringify(carrito))
        //    valorCantidad= localStorage.getItem("cantidadTotal")

    }
})

//Agregar producto al carrito (mostrar productos en el carrito)
botonCarrito.addEventListener("click", (e) => {
    e.preventDefault()
    // console.log("boton")
    window.location.href = "../pages/showCarrito.html"
})

//Poder ver el contador del carrito en todo momento
window.addEventListener("DOMContentLoaded", () => {
    let cantidad = 0
    console.log(carrito)
    totalUnits = carrito.map(item => {
        return Number(item.units)
    })
    console.log(totalUnits)

    for (let i = 0; i < totalUnits.length; i++) {
        cantidad += totalUnits[i]
    }
    console.log(cantidad)
    valorCantidad.innerHTML = cantidad
})




