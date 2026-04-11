/**
 * CDC TEST SUITE - Motor de pruebas didáctico
 */

const resultsContainer = document.getElementById('test-results');
const summaryContainer = document.getElementById('test-summary');

let testsRun = 0;
let testsPassed = 0;

// Assertion Engine
function assertEquals(actual, expected, message) {
    testsRun++;
    if (actual === expected) {
        testsPassed++;
        renderResult(true, message);
    } else {
        renderResult(false, message, `Esperado: ${expected}, Obtenido: ${actual}`);
    }
}

function assertOk(condition, message) {
    testsRun++;
    if (condition) {
        testsPassed++;
        renderResult(true, message);
    } else {
        renderResult(false, message);
    }
}

function renderResult(passed, message, details = "") {
    const div = document.createElement('div');
    div.className = `test-case ${passed ? 'passed' : 'failed'}`;
    div.innerHTML = `
        <div>
            <span class="status-tag">${passed ? '✅ PASSED' : '❌ FAILED'}</span>
            <span>${message}</span>
            ${details ? `<div class="details">${details}</div>` : ''}
        </div>
    `;
    resultsContainer.appendChild(div);
    updateSummary();
}

function updateSummary() {
    summaryContainer.innerHTML = `
        <strong>Progreso:</strong> ${testsPassed} de ${testsRun} pruebas pasadas.
    `;
    if (testsRun > 0 && testsPassed === testsRun) {
        summaryContainer.style.borderColor = "#22c55e";
    } else if (testsRun > 0) {
        summaryContainer.style.borderColor = "#ef4444";
    }
}

// --- TEST CASES ---

console.log("Iniciando Suite de Pruebas...");

// 1. Unit Tests para cdc-core.js
function testCore() {
    console.log("Testeando Core...");
    const px = mmToPx(1);
    assertOk(px > 3 && px < 5, "mmToPx convierte correctamente mm a píxeles");
    assertOk(version.startsWith("1.0"), "La versión del software es 1.0.x");
}

// 2. Integration Tests para cdc-cards.js
function testCardsIntegration() {
    console.log("Testeando Integración de Cartas...");
    $('#contenedor_paginas').empty();
    num_cartas = 0;
    num_pags = 0;

    anyadirCarta(63, 88);

    assertEquals(num_cartas, 1, "Añadir una carta incrementa el contador num_cartas");
    const cartaElem = document.querySelector('.carta');
    assertOk(cartaElem !== null, "El elemento .carta se ha creado en el DOM");
    assertEquals(cartaElem.style.width, "63mm", "La carta tiene el ancho correcto en el estilo");
}

// 3. Overflow Tests (A4, A3, A5)
function testPageOverflow() {
    console.log("Testeando Desbordamiento de Páginas...");

    function runOverflowTest(nombre, w_pag_mm, h_pag_mm, num_cartas_a_anyadir, paginas_esperadas, cartas_en_ultima_esperadas) {
        console.log(`Ejecutando: ${nombre}`);

        // Reset ambiental
        $('#contenedor_paginas').empty();
        num_cartas = 0;
        num_pags = 0;
        autoconfigurada = false;
        num_cartas_por_pag = null;

        // Simular tamaño de página en CSS para que autoConfigurarPagina funcione
        const firstPage = anyadirPagina();
        firstPage.css({ width: w_pag_mm + 'mm', height: h_pag_mm + 'mm' });

        for (let i = 0; i < num_cartas_a_anyadir; i++) {
            anyadirCarta(63, 88);
        }

        const totalPags = $('.pagina').length;
        const cartasEnUltima = $('.pagina').last().find('.carta').length;

        assertEquals(totalPags, paginas_esperadas, `${nombre}: Se han creado ${paginas_esperadas} páginas`);
        assertEquals(cartasEnUltima, cartas_en_ultima_esperadas, `${nombre}: La última página tiene ${cartas_en_ultima_esperadas} cartas`);
    }

    runOverflowTest("Prueba A4 Vertical", 210, 297, 10, 2, 1);
    runOverflowTest("Prueba A3 Horizontal", 420, 297, 19, 2, 1);
    runOverflowTest("Prueba A5 Vertical", 148, 210, 5, 2, 1);
    runOverflowTest("Prueba A4 Vertical", 210, 297, 19, 3, 1);
    runOverflowTest("Prueba A3 Horizontal", 420, 297, 37, 3, 1);
    runOverflowTest("Prueba A5 Vertical", 148, 210, 9, 3, 1);
}

// Ejecutar todo
try {
    testCore();
    testCardsIntegration();
    testPageOverflow();
} catch (error) {
    renderResult(false, "ERROR FATAL DURANTE LAS PRUEBAS", error.message);
    console.error(error);
}
