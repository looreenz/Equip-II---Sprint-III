function iniciar(){
    mostrarRegistrosEnTabla();
}

function mostrarRegistrosEnTabla() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];                    // Recuperar los registros desde localStorage
    var tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];          // Obtener el cuerpo de la tabla
    tabla.innerHTML = "";                                                                   // Limpiar el contenido actual de la tabla

    registros.forEach(function(registro) {                                                  // Recorrer los registros y agregarlos a la tabla
        var fila = tabla.insertRow();                                                       // Crear una nueva fila

        // Insertar las celdas de la fila
        var celdaId = fila.insertCell(0);
        var celdaOperario = fila.insertCell(1);
        var celdaProveidor = fila.insertCell(2);
        var celdaDataEstimada = fila.insertCell(3);
        var celdaDescripcion = fila.insertCell(4);
        var celdaCantidadPedida = fila.insertCell(5);
        var celdaCantidadRecibida = fila.insertCell(6);
        var celdaEstado = fila.insertCell(7);
        var celdaEstadoRecepcion = fila.insertCell(8);
        var celdaBotonModificacion = fila.insertCell(9);
        var celdaBotonEliminar = fila.insertCell(10);

        // Asignar los valores a cada celda
        celdaId.textContent = registro.identificador;
        celdaOperario.textContent = registro.operario;
        celdaProveidor.textContent = registro.proveidor;
        celdaDataEstimada.textContent = registro.dataEstimada;
        celdaDescripcion.textContent = registro.descripcion;
        celdaCantidadPedida.textContent = registro.cantidadPedida;
        celdaCantidadRecibida.textContent = registro.cantidadRecibida;
        celdaEstado.textContent = registro.estado;
        celdaEstadoRecepcion.textContent = registro.estadoRecepcion;

        var botonModificacion = document.createElement('button');
        botonModificacion.textContent = 'Modificar';
        botonModificacion.addEventListener('click',function(){
            localStorage.setItem("registroSeleccionado", JSON.stringify(registro));
            document.location.href="GestionOrdenRecepcion.html?id=" + registro.identificador;
        })
        celdaBotonModificacion.appendChild(botonModificacion);                              //Añadir el boton modificar a la celda

        var botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click',function(){
            eliminarRegistro(registro.identificador);
        })
        celdaBotonEliminar.appendChild(botonEliminar);                                      //Añadir el boton eliminar a la celda
    });
}

function eliminarRegistro(identificador) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros = registros.filter(function(registro) {                                // Si el identificador pasado no coincide con el del registro, este se mantiene. Si coincide se elimina.
        return registro.identificador !== identificador;
    });
     
    localStorage.setItem("registros", JSON.stringify(registros));                   // Actualizar localStorage
    mostrarRegistrosEnTabla();                                                      // Actualizar la tabla
}

window.onload = iniciar;