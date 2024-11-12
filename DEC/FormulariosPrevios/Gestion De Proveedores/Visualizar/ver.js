window.onload = main;

function main () {
    document.getElementById("volver").addEventListener("click", () => {
        document.location.href = "../listar.html";

    })
    // Toma el id del proveedor desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log (id);

    let proveedores = JSON.parse(localStorage.getItem('proveedores'));
    if (proveedores === null){
        proveedores = [];
    }
    const formulario = document.getElementById("formulario");

    const proveedor = proveedores.find( p => p.codigo === id);
    console.log (proveedor);
    if (proveedor){
        document.getElementById("codigo").value          = proveedor.codigo;
        document.getElementById("nombreFiscal").value    = proveedor.nombreFiscal;
        document.getElementById("nombreComercial").value = proveedor.nombreComercial;
        document.getElementById("nif").value             = proveedor.nif;
        document.getElementById("direccion").value       = proveedor.direccion;
        document.getElementById("cp").value              = proveedor.cp;
        document.getElementById("ciudad").value          = proveedor.ciudad;
        document.getElementById("provincia").value       = proveedor.provincia;
        document.getElementById("pais").value            = proveedor.pais;
        document.getElementById("email").value           = proveedor.email;
        document.getElementById("telefono").value        = proveedor.telefono;
    }

    // Deshabilita la opción de escribir en los campos de texto
    Array.from(formulario.elements).forEach(element => element.disabled = true);
}