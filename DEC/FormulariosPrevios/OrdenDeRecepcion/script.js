window.onload = iniciar;

function iniciar() {
    const enviarBtn = document.getElementById('enviar');
    const volverIndexBtn = document.getElementById('volverIndex');

    if (enviarBtn) {
        enviarBtn.addEventListener('click', validarFormulari);
    }

    if (volverIndexBtn) {
        volverIndexBtn.addEventListener('click', function() {
            window.location.href = 'index.html'; 
        });
    }
}

function validarFormulari(event) {
    let esValido = true;
    const errorDiv = document.getElementById("errorMensaje");
    errorDiv.innerHTML = ""; 

    esValido = validarID() && esValido;
    esValido = validarOperari() && esValido;
    esValido = validarProveidor() && esValido;
    esValido = validarDescripcioProducte() && esValido;
    esValido = validarQuantitatEsperada() && esValido;
    esValido = validarQuantitatRecibida() && esValido;
    esValido = validarDataEstimada() && esValido;
    esValido = validarAcceptacio() && esValido;
    esValido = validarEstatProces() && esValido;

    if (!esValido) {
        event.preventDefault();
    } else {
        guardarEnLocalStorage();
        alert('Formulari enviat correctament');
        document.getElementById('ordreForm').reset();
    }
}

function guardarEnLocalStorage() {
    const ordreId = document.getElementById("ordreId").value;
    const operari = document.getElementById("operari").value;
    const proveidor = document.getElementById("proveidor").value;
    const descripcioProducte = document.getElementById("descripcioProducte").value;
    const quantitatEsperada = document.getElementById("quantitatEsperada").value;
    const quantitatRecibida = document.getElementById("quantitatRecibida").value;
    const dataEstimada = document.getElementById("dataEstimada").value;
    const acceptacio = document.getElementById("acceptacio").value;
    const estatProces = document.getElementById("estatProces").value;

    const novaOrdre = {
        ordreId,
        operari,
        proveidor,
        descripcioProducte,
        quantitatEsperada,
        quantitatRecibida,
        dataEstimada,
        acceptacio,
        estatProces
    };

    let ordres = JSON.parse(localStorage.getItem('ordresRecepcio')) || [];
    ordres.push(novaOrdre);
    localStorage.setItem('ordresRecepcio', JSON.stringify(ordres));
}

function validarID() {
    const element = document.getElementById("ordreId");
    if (!element.checkValidity()) {
        error(element, "Has d'introduir un ID correcte. Només números.");
        return false;
    }
    return true;
}

function validarOperari() {
    const element = document.getElementById("operari");
    if (!element.checkValidity()) {
        error(element, "Has d'introduir el nom de l'operari. Només es permeten lletres.");
        return false;
    }
    return true;
}

function validarProveidor() {
    const element = document.getElementById("proveidor");
    if (!element.checkValidity()) {
        error(element, "Has d'introduir el nom del proveïdor. Només es permeten lletres.");
        return false;
    }
    return true;
}

function validarDescripcioProducte() {
    const element = document.getElementById("descripcioProducte");
    if (!element.checkValidity()) {
        error(element, "La descripció del producte ha de tenir entre 5 i 100 caràcters.");
        return false;
    }
    return true;
}

function validarQuantitatEsperada() {
    const element = document.getElementById("quantitatEsperada");
    if (!element.checkValidity()) {
        error(element, "La quantitat esperada ha de ser un número positiu.");
        return false;
    }
    return true;
}

function validarQuantitatRecibida() {
    const element = document.getElementById("quantitatRecibida");
    if (!element.checkValidity()) {
        error(element, "La quantitat rebuda ha de ser un número positiu o zero.");
        return false;
    }
    return true;
}

function validarDataEstimada() {
    const element = document.getElementById("dataEstimada");
    if (!element.checkValidity()) {
        error(element, "Has d'introduir una data vàlida.");
        return false;
    }
    return true;
}

function validarAcceptacio() {
    const element = document.getElementById("acceptacio");
    if (!element.checkValidity()) {
        error(element, "Has de seleccionar una opció d'acceptació.");
        return false;
    }
    return true;
}

function validarEstatProces() {
    const element = document.getElementById("estatProces");
    if (!element.checkValidity()) {
        error(element, "Has de seleccionar l'estat del procés.");
        return false;
    }
    return true;
}

function error(element, message) {
    element.focus();
    const errorDiv = document.getElementById("errorMensaje");
    errorDiv.innerHTML += message + "<br>";
}
