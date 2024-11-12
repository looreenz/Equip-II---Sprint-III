window.onload = main;

function main () {
   //document.getElementById("listar").addEventListener("click",listarProveedores);
   listarProveedores();
   document.getElementById("alta").addEventListener("click",()=>{
    document.location.href = "Alta/alta.html";
   });
   
}

/*
function listarProveedores (){
    let proveedores = JSON.parse(localStorage.getItem("proveedores"))
    if (proveedores===null) {proveedores=[]}
        console.log(proveedores)
}*/


function listarProveedores() {
    let proveedores = JSON.parse(localStorage.getItem("proveedores"));
    if (proveedores === null){
        proveedores = [];
    }
    let tabla = document.getElementById("tablaProveedores");
    tabla.innerHTML = "";  // Limpia la tabla

    proveedores.forEach(proveedor => {
        let row   = tabla.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();
        let cell5 = row.insertCell();
        let cell6 = row.insertCell()
        let cell7 = row.insertCell();
        let cell8 = row.insertCell();
        let cell9 = row.insertCell();
        let cell10 = row.insertCell();
        let cell11 = row.insertCell();
        let cell12 = row.insertCell();


        cell1.innerHTML = proveedor.codigo;
        cell2.innerHTML = proveedor.nombreFiscal;
        cell3.innerHTML = proveedor.nombreComercial;
        cell4.innerHTML = proveedor.nif;
        cell5.innerHTML = proveedor.direccion;
        cell6.innerHTML = proveedor.cp;
        cell7.innerHTML = proveedor.ciudad;
        cell8.innerHTML = proveedor.provincia;
        cell9.innerHTML = proveedor.pais;
        cell10.innerHTML = proveedor.email;
        cell11.innerHTML = proveedor.telefono;
        
        
        
        const btnVer = document.createElement('button');
        btnVer.innerHTML = 'Ver';
        btnVer.addEventListener("click",   () => {
               verProveedor(proveedor.codigo)
            });
        
        const btnEditar = document.createElement('button');
        btnEditar.innerHTML = 'Editar';
        btnEditar.addEventListener ("click", () => { 
            editarProveedor(proveedor.codigo)
        });
        
        const btnEliminar = document.createElement('button');
        btnEliminar.innerHTML = 'Eliminar';
        btnEliminar.addEventListener ("click", () => {
            eliminarProveedor(proveedor.codigo);
        });
        
        cell12.appendChild(btnVer);
        cell12.appendChild(btnEditar);
        cell12.appendChild(btnEliminar);
    });

}


function verProveedor (codigo){
    console.log("Visualizar/ver.html?id=" + codigo)

    window.location.href = "Visualizar/ver.html?id=" + codigo;
}

function editarProveedor (codigo){
    console.log("Modificar/modificar.html?id=" + codigo)

    window.location.href = "Modificar/modificar.html?id=" + codigo;
}


function eliminarProveedor(codigo) {
    let proveedores = JSON.parse(localStorage.getItem("proveedores"));
    if (confirm('¿Está seguro de que desea eliminar este proveedor?')) {
        console.log(codigo);
        // Armo un nuevo array con todos los proveedores que no coincidan con el código proporcionado
        proveedores = proveedores.filter(p => p.codigo !== codigo);
        localStorage.setItem('proveedores', JSON.stringify(proveedores));
        listarProveedores();
    }
}