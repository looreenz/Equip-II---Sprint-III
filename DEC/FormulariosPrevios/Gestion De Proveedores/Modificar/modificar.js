window.onload = main;

function main () {
    cargarDatosProveedor();
    document.getElementById("guardar").addEventListener("click", validar);
    document.getElementById("cancelar").addEventListener("click", () => {
        document.location.href = "../listar.html";
    });

    document.getElementById("nombreFiscal").addEventListener("blur", validarNomFiscal, false);
    document.getElementById("nombreComercial").addEventListener("blur", validarNomComercial, false);
    document.getElementById("nif").addEventListener("blur", validarNIF, false);
    document.getElementById("email").addEventListener("blur", validarEmail, false);
    document.getElementById("telefono").addEventListener("blur", validarTel, false);
}
/**
 * Carga todos los datos del formulario antes de su modificación
 */
function cargarDatosProveedor () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    
    let proveedores = JSON.parse (localStorage.getItem("proveedores"));
    if (proveedores === null){
        proveedores = [];
    }
    
    const indiceProveedor = proveedores.findIndex(p => p.codigo === id);
    
    const proveedor = proveedores[indiceProveedor];

    if (proveedor) {
        document.getElementById('codigo').value = id;
        document.getElementById('codigo').disabled = true;
        document.getElementById('nombreFiscal').value = proveedor.nombreFiscal;
        document.getElementById('nombreComercial').value = proveedor.nombreComercial;
        document.getElementById('nif').value = proveedor.nif;
        document.getElementById('direccion').value = proveedor.direccion;
        document.getElementById('cp').value = proveedor.cp;
        document.getElementById('ciudad').value = proveedor.ciudad;
        document.getElementById('provincia').value = proveedor.provincia;
        document.getElementById('pais').value = proveedor.pais;
        document.getElementById('email').value = proveedor.email;
        document.getElementById('telefono').value = proveedor.telefono;
    }
}
    
/**
 * Toma todos los datos nuevos y los guarda en el mismo index en el que se encontraba 
 * el proveedor a modificar
 */
function modificarProveedor() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let proveedores = JSON.parse (localStorage.getItem("proveedores"));
    
    if (proveedores === null){
        proveedores = [];
    }   
    
    const indiceProveedor = proveedores.findIndex(p => p.codigo === id);
    const proveedor = proveedores[indiceProveedor];

    const pModificado = {
        codigo: id,
        nombreFiscal: document.getElementById("nombreFiscal").value.trim(),
        nombreComercial: document.getElementById("nombreComercial").value.trim(),
        nif: document.getElementById("nif").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        cp: document.getElementById("cp").value.trim(),
        ciudad: document.getElementById("ciudad").value.trim(),
        provincia: document.getElementById("provincia").value.trim(),
        pais: document.getElementById("pais").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
    }
    
    if (!pModificado.nombreFiscal || !pModificado.nombreComercial || !pModificado.nif || !pModificado.direccion || !pModificado.cp || !pModificado.provincia || !pModificado.pais || !pModificado.email || !pModificado.telefono) {
        alert("Por favor, rellene todos los campos.");
    }
    proveedores[indiceProveedor] = pModificado;
    localStorage.setItem("proveedores", JSON.stringify(proveedores));

    alert("Proveedor modificado correctamente.");
    document.location.href = "../listar.html";

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
 * En caso de cumplirse las validaciones, se guarda al proveedor modificado
 * @param {*} e 
 * @returns boolean
 */
function validar (e) {
    borrarError();
    if (validarNomFiscal () && validarNomComercial () && validarNIF() && validarEmail () && validarTel() && confirm("¿Desea guardar los cambios realizados?")){
        console.log("hola");
        modificarProveedor();
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