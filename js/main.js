const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont = 0;

function validarCantidad() {
    if (txtNumber.value.trim().length <= 0) return false;
    if (isNaN(txtNumber.value)) return false;
    if (Number(txtNumber.value) <= 0) return false;

    return true;
} /* validarCantidad */

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
        cuerpoTabla.insertAdjacentHTML("beforeend", newRow);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
});
