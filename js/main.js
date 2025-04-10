const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const totalProductos = document.getElementById("totalProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let datos = [];

let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

function validarCantidad() {
    if (txtNumber.value.trim().length <= 0) return false;
    if (isNaN(txtNumber.value)) return false;
    if (Number(txtNumber.value) <= 0) return false;

    return true;
} /* validarCantidad */

/* Retorna un numero aleatorio entre 0.00 y 100.00 */
function getPrecio() {
    return Math.round((Math.random() * 10000)) / 100;
}

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true;

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto. </strong>";
        alertValidaciones.style.display = "block";

        isValid = false;
    }

    if (!validarCantidad()) {
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display = "block";

        isValid = false;
    }

    if (isValid) {
        cont++;
        let precio = getPrecio();
        let newRow = ` <tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;

        let elemento = {
            "cont" : cont,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio
        };
        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", newRow);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        
        let resumen = {
            "cont" : cont,
            "totalEnProductos" : totalEnProductos,
            "costoTotal" : costoTotal
        }
        localStorage.setItem("resumen", JSON.stringify(resumen));

        contadorProductos.innerText = cont;

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
});

btnClear.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    cuerpoTabla.innerHTML = "";

    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "0";

    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";
});

/*  */
window.addEventListener("load", function(event){
    event.preventDefault();
    
    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }

    datos.forEach((d) => {
        let newRow = 
        `<tr>
            <td>${d.cont}</d>
            <td>${d.nombre}</d>
            <td>${d.cantidad}</d>
            <td>${d.precio}</d>
        </tr>`;

        cuerpoTabla.insertAdjacentHTML("beforebegin", newRow);
    });

    if (this.localStorage.getItem("resumen") != null) {
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.totalEnProductos;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
});
