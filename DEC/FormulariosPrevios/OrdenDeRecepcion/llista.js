window.onload = iniciar;

function iniciar() {
    if (document.getElementById('llistaTable')) {
        mostrarOrdres();
    }
}

function mostrarOrdres() {
    const ordres = JSON.parse(localStorage.getItem('ordresRecepcio')) || [];
    const tbody = document.querySelector('#llistaTable tbody');
    tbody.innerHTML = ""; 

    ordres.forEach((ordre, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td><input type="text" value="${ordre.ordreId}" disabled></td>
            <td><input type="text" value="${ordre.operari}" disabled></td>
            <td><input type="text" value="${ordre.proveidor}" disabled></td>
            <td><input type="text" value="${ordre.descripcioProducte}" disabled></td>
            <td><input type="number" value="${ordre.quantitatEsperada}" disabled></td>
            <td><input type="number" value="${ordre.quantitatRecibida}" disabled></td>
            <td><input type="date" value="${ordre.dataEstimada}" disabled></td>
            <td>
                <select disabled>
                    <option value="Forçosa" ${ordre.acceptacio === 'Forçosa' ? 'selected' : ''}>Forçosa</option>
                    <option value="Rebutjada" ${ordre.acceptacio === 'Rebutjada' ? 'selected' : ''}>Rebutjada</option>
                    <option value="Completada" ${ordre.acceptacio === 'Completada' ? 'selected' : ''}>Completada</option>
                </select>
            </td>
            <td>
                <select disabled>
                    <option value="Pendent" ${ordre.estatProces === 'Pendent' ? 'selected' : ''}>Pendent</option>
                    <option value="Descarregada" ${ordre.estatProces === 'Descarregada' ? 'selected' : ''}>Descarregada</option>
                    <option value="Desempaquetada" ${ordre.estatProces === 'Desempaquetada' ? 'selected' : ''}>Desempaquetada</option>
                    <option value="Emmagatzemada" ${ordre.estatProces === 'Emmagatzemada' ? 'selected' : ''}>Emmagatzemada</option>
                    <option value="Completada" ${ordre.estatProces === 'Completada' ? 'selected' : ''}>Completada</option>
                </select>
            </td>
            <td>
                <button class="modificaBtn" data-index="${index}">Modifica</button>
                <button class="guardaBtn" data-index="${index}" style="display:none;">Guarda</button>
            </td>
        `;

        tbody.appendChild(fila);
    });

    document.querySelectorAll('.modificaBtn').forEach(button => {
        button.addEventListener('click', habilitarEdicion);
    });

    document.querySelectorAll('.guardaBtn').forEach(button => {
        button.addEventListener('click', guardarCambios);
    });
}

function habilitarEdicion(event) {
    const index = event.target.dataset.index;
    const fila = event.target.closest('tr');
    const inputs = fila.querySelectorAll('input, select');

    inputs.forEach(input => input.disabled = false);

    fila.querySelector('.modificaBtn').style.display = 'none';
    fila.querySelector('.guardaBtn').style.display = 'inline';
}

function guardarCambios(event) {
    const index = event.target.dataset.index;
    const fila = event.target.closest('tr');
    const inputs = fila.querySelectorAll('input, select');

    const ordreModificada = {
        ordreId: inputs[0].value,
        operari: inputs[1].value,
        proveidor: inputs[2].value,
        descripcioProducte: inputs[3].value,
        quantitatEsperada: inputs[4].value,
        quantitatRecibida: inputs[5].value,
        dataEstimada: inputs[6].value,
        acceptacio: inputs[7].value,
        estatProces: inputs[8].value
    };

    let ordres = JSON.parse(localStorage.getItem('ordresRecepcio')) || [];

    ordres[index] = ordreModificada;

    localStorage.setItem('ordresRecepcio', JSON.stringify(ordres));

    inputs.forEach(input => input.disabled = true);

    fila.querySelector('.modificaBtn').style.display = 'inline';
    fila.querySelector('.guardaBtn').style.display = 'none';

    alert('Canvis guardaos');
}
