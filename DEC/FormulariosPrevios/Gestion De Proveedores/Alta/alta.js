window.onload = main;

function main () {
    document.getElementById("guardar").addEventListener("click", validar);
    document.getElementById("cancelar").addEventListener("click",()=>{
        document.location.href="../listar.html";
       });
    document.getElementById("codigo").value = generarNuevoCodigo();

    document.getElementById("nombreFiscal").addEventListener("blur", validarNomFiscal, false);
    document.getElementById("nombreComercial").addEventListener("blur", validarNomComercial, false);
    document.getElementById("nif").addEventListener("blur", validarNIF, false);
    document.getElementById("email").addEventListener("blur", validarEmail, false);
    document.getElementById("telefono").addEventListener("blur", validarTel, false);
}
/**
 * Genera un nuevo código con la secuencia 000000000
 * Lo hace de manera automatica para tener un orden
 * @returns int
 */
function generarNuevoCodigo() {
    const proveedores     = JSON.parse(localStorage.getItem("proveedores")) || [];
    const ultimoProveedor = proveedores.length ? proveedores[proveedores.length - 1] : null;
    const ultimoCodigo    = ultimoProveedor ? parseInt(ultimoProveedor.codigo) : 0;
    // Genera nuevo código incremental en formato 000000000
    const nuevoCodigo     = (ultimoCodigo + 1).toString().padStart(9, '0');
    return nuevoCodigo;   
}
/**
 * Guarda el objeto con los datos del formulario en el array de proveedores
 * que se encuentra en localStorage
 * @returns void
 */
function guardarProveedor() {
    const proveedor = obtenerDatosFormulario();
    if (!proveedor) return;
     // Trae la información de los proveedores existentes y lo convierte en un array
    let proveedores = JSON.parse(localStorage.getItem("proveedores"));
    if (proveedores === null){
        proveedores = [];
    }
    // Sube al nuevo proveedor al array
    proveedores.push(proveedor);
    // Convierte nuevamente el array en un archivo JSON
    localStorage.setItem("proveedores", JSON.stringify(proveedores));

    alert("Proveedor guardado correctamente.");
    document.getElementById("formulario").reset();
    
    
    window.location.href="../listar.html";
}
/**
 * Junta todos los datos del formulario
 * @returns object
 */
function obtenerDatosFormulario() {
    const codigo          = document.getElementById("codigo").value;
    const nombreFiscal    = document.getElementById("nombreFiscal").value.trim();
    const nombreComercial = document.getElementById("nombreComercial").value.trim();
    const nif             = document.getElementById("nif").value.trim();
    const direccion       = document.getElementById("direccion").value.trim();
    const cp              = document.getElementById("cp").value.trim();
    const ciudad          = document.getElementById("ciudad").value.trim();
    const provincia       = document.getElementById("provincia").value.trim();
    const pais            = document.getElementById("pais").value.trim();
    const email           = document.getElementById("email").value.trim();
    const telefono        = document.getElementById("telefono").value.trim();

    if (!nombreFiscal || !nombreComercial || !nif || !direccion || !cp || !ciudad || !provincia || !pais || !email || !telefono) {
        alert("Por favor, rellene todos los campos.");
        return null;
    }
   
    return { codigo, nombreFiscal, nombreComercial, nif, direccion, cp, ciudad, provincia, pais, email, telefono };
}

/**
 * Funciones que verifican que se siga el patrón especificado en el HTML
 * @returns boolean
 */

function validarNomFiscal() {
    let element = document.getElementById("nombreFiscal");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Debe introducir el nombre fiscal.");
        }
        if (element.validity.patternMismatch || element.value.length < 2) {
            error2(element, "El nombre fiscal debe tener entre 2 y 40 caracteres.");
        }
        return false;
    }
    valid();
    element.className = "valid"; 
    return true;
}

function validarNomComercial() {
    let element = document.getElementById("nombreComercial");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error2(element, "Debe introducir el nombre comercial.");
        }
        if (element.validity.patternMismatch || element.value.length < 2) {
            error2(element, "El nombre comercial debe tener entre 2 y 40 caracteres.");
        }
        return false;
    }
    valid();
    element.className = "valid"; 
    return true;
}

function validarNIF() {
    let element = document.getElementById("nif");
    let niePattern = /^[XYZxyz]?\d{7}[A-Za-z]$/;
    let nifPattern = /^\d{8}[A-Za-z]$/;

    if (!niePattern.test(element.value) && !nifPattern.test(element.value)) {
        error2(element, "NIF no válido.");
        return false;
    } 
    valid();
    element.className = "valid"; 
    return true;

}

function validarEmail () {
    let element = document.getElementById("email");

    if(!element.checkValidity ()){
        if(element.validity.valueMissing) {
            error2(element, "Debe introducir un correo electrónico.");
        } else if (element.validity.typeMismatch) {
            error2(element, "El formato del correo electrónico no es válido.")
        }

        return false;
    }
    valid();
    element.className = "valid";
    return true;
}

function validarTel(){
    var element = document.getElementById("telefono");
    if(!element.checkValidity()){
        if(element.validity.valueMissing){
            error2(element, "Debe introducir un número de teléfono");
        }
        if (element.validity.patternMismatch){
            error2(element, "El teléfono debe tener al menos 9 números");
        }
        return false;
    }
    valid();
    element.className = "valid";
    return true;
}

/**
 * En caso de cumplirse las validaciones, se guarda al nuevo proveedor
 * @param {*} e 
 * @returns boolean
 */
function validar (e) {
    borrarError();
    if (validarNomFiscal () && validarNomComercial () && validarNIF() && validarEmail () && validarTel() && confirm("¿Desea guardar proveedor?")){
        console.log("hola");
        guardarProveedor();
        return true;
    } else {
        e.preventDefault ();
        return false;
    }
}

function error2 (element, mensaje) {
    document.getElementById("mensajeError").innerHTML = mensaje;
    element.className = "error";
    element.focus ();
}

function valid () {
    document.getElementById("mensajeError").innerHTML = "";
}

function borrarError ()  {
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.elements.length; i++){
        formulario.elements[i].className = "";
    }

}