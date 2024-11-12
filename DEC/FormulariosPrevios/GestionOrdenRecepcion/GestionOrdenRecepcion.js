function iniciar(){
    cargarDatos();
}

function validarDatos(event){
    var errores = document.getElementById("errores");
    errores.innerHTML = "";

    if(validarIdentificador() && validarOperario() && validarProveidor() && validarDataEstima() && validarDescripcion() && validarCantidadPedida() && validarCantidadRecibida() && validarEstado() && validarEstadoRecepcion()){
        var identificador = document.getElementById("identificador").value;
        var operario = document.getElementById("operario").value;
        var proveidor = document.getElementById("proveidor").value;
        var dataEstimada = document.getElementById("dataEstimada").value;
        var descripcion = document.getElementById("descripcion").value;
        var cantidadPedida = document.getElementById("pedido").value;
        var cantidadRecibida = document.getElementById("recibido").value;
        var estado = document.getElementById("estado").value;
        var estadoRecepcion = document.getElementById("recepcion").value;

        let nuevoRegistro = {
            identificador: identificador,
            operario: operario,
            proveidor: proveidor,
            dataEstimada: dataEstimada,
            descripcion: descripcion,
            cantidadPedida: cantidadPedida,
            cantidadRecibida: cantidadRecibida,
            estado: estado,
            estadoRecepcion: estadoRecepcion
        };

        let registros = JSON.parse(localStorage.getItem("registros")) || [];                                                // Comprobar si ya hay registros almacenados
        let registroExistente = registros.findIndex(registro => registro.identificador === identificador);                  // Buscar si existe un registro con el mismo identificador

        if (registroExistente !== -1 && document.getElementById("identificador").disabled !== true) {                       // Si el identificador ya existe y estás creando un nuevo registro, mostrar error
            error(document.getElementById("identificador"), "Error: ya existe una orden con ese ID.");
            event.preventDefault();
            return;
        }

        if (registroExistente !== -1 && document.getElementById("identificador").disabled === true) {                      // Si el identificador ya existe y está editando, actualiza el registro
            registros[registroExistente] = nuevoRegistro;
        } 
        else if(registroExistente === -1) {
            registros.push(nuevoRegistro);                                                                       // Si no existe, agregar el nuevo registro
        }

        localStorage.setItem("registros", JSON.stringify(registros));                                           // Guardar el array actualizado en localStorage
        mostrarRegistrosEnTabla();
    }
    else{
        event.preventDefault();
    }
}

function error(element,message){
    element.focus();
    var error = document.getElementById("errores");
    error.innerHTML += message;
}

function validarIdentificador(){
    var identificador = document.getElementById("identificador");
    if(!identificador.checkValidity()){
        if(identificador.validity.valueMissing){
            error(identificador,"Introduce un identificador");
        }
        else if(identificador.validity.patternMismatch){ 
            error(identificador,"Introduce un identificador válido");
        } 
        return false;
    }
    return true;
}

function validarOperario(){
    var operario = document.getElementById("operario");
    if(!operario.checkValidity()){
        if(operario.validity.valueMissing){
            error(operario,"Llena el campo de empleado");
        }
        else if(operario.validity.patternMismatch){
            error(operario,"Solo se permiten letras, hasta un máximo de 15 carácteres");
        }
        return false;
    }
    return true;
}


function validarProveidor(){
    var proveidor = document.getElementById("proveidor");
    if(!proveidor.checkValidity()){
        if(proveidor.validity.valueMissing){
            error(proveidor,"Selecciona un proveedor");
        }
        return false;
    }
    return true;
}

function validarDataEstima(){
    var dataEstimada = document.getElementById("dataEstimada");
    if(!dataEstimada.checkValidity()){
        if(dataEstimada.validity.valueMissing){
            error(dataEstimada,"Selecciona una data esperada de recepción");
        }
        return false;
    }
    return true;
}

function validarDescripcion(){
    var descripcion = document.getElementById("descripcion");
    if(!descripcion.checkValidity()){
        if(descripcion.validity.valueMissing){
            error(descripcion,"Introduce una descripción del producto");
        }
        else if(descripcion.validity.patternMismatch){
            error(descripcion,"Introduce una descripción entre 15 y 40 caracteres.");
        }
        return false;
    }
    return true;
}

function validarCantidadPedida(){
    var cantidadPedida = document.getElementById("pedido");
    if(!cantidadPedida.checkValidity()){
        if(cantidadPedida.validity.valueMissing){
            error(cantidadPedida,"Introduce la cantidad pedida");
        }
        else if(cantidadPedida.validity.patternMismatch){
            error(cantidadPedida,"Introduce solo numeros");
        }
        return false;
    }
    return true;
}

function validarCantidadRecibida(){
    var cantidad = document.getElementById("recibido");
    if(!cantidad.checkValidity()){
        if(cantidad.validity.valueMissing){
            error(cantidad,"Introduce la cantidad recibida");
        }
        else if(cantidad.validity.patternMismatch){
            error(cantidad,"Introduce solo numeros");
        }
        return false;
    }
    return true;
}

function validarEstado(){
    var estado = document.getElementById("estado");
    if(!estado.checkValidity()){
        if(estado.validity.valueMissing){
            error(estado,"Selecciona un estado");
        }
        return false;
    }
    return true;
}


function validarEstadoRecepcion(){
    var recepcion = document.getElementById("recepcion");
    if(!recepcion.checkValidity()){
        if(recepcion.validity.valueMissing){
            error(recepcion,"Selecciona un estado de recepción");
        }
        return false;
    }
    return true;
}

function cargarDatos() {
    const urlParams = new URLSearchParams(window.location.search);                                          // Recuperar el ID del producto desde la URL
    const idProducto = urlParams.get('id');
    let registros = JSON.parse(localStorage.getItem("registros")) || [];                                    // Recuperar todos los registros desde localStorage
    let registroSeleccionado = registros.find(registro => registro.identificador === idProducto);           // Buscar el registro que coincida con el ID del producto
    
    if (registroSeleccionado) {
        document.getElementById("identificador").value = registroSeleccionado.identificador;
        document.getElementById("operario").value = registroSeleccionado.operario;
        document.getElementById("proveidor").value = registroSeleccionado.proveidor;
        document.getElementById("dataEstimada").value = registroSeleccionado.dataEstimada;
        document.getElementById("descripcion").value = registroSeleccionado.descripcion;
        document.getElementById("pedido").value = registroSeleccionado.cantidadPedida;
        document.getElementById("recibido").value = registroSeleccionado.cantidadRecibida;
        document.getElementById("estado").value = registroSeleccionado.estado;
        document.getElementById("recepcion").value = registroSeleccionado.estadoRecepcion;

        document.getElementById("identificador").disabled = true;
    }
}

window.onload = iniciar;