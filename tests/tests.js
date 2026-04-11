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
    if (typeof mmToPx === "function") {
        const px = mmToPx(1);
        assertOk(px > 3 && px < 5, "mmToPx convierte correctamente mm a píxeles");
    } else {
        renderResult(false, "ERROR: mmToPx no definido");
    }
    assertOk(typeof version === "string" && version.startsWith("1.0"), "La versión del software es 1.0.x");
}

// 2. Integration Tests para cdc-cards.js
function testCardsIntegration() {
    console.log("Testeando Integración de Cartas...");
    $('#contenedor_paginas').empty();
    num_cartas = 0;
    num_pags = 0;

    // Asegurar que existe al menos una página
    if (typeof anyadirPagina === "function") {
        anyadirPagina();
    }

    if (typeof anyadirCarta === "function") {
        anyadirCarta(63, 88);
        assertEquals(num_cartas, 1, "Añadir una carta incrementa el contador num_cartas");
        const cartaElem = document.querySelector('.carta');
        assertOk(cartaElem !== null, "El elemento .carta se ha creado en el DOM");
    } else {
        renderResult(false, "ERROR: anyadirCarta no definido");
    }
}

// Ejecutar todo
try {
    // Esperar un momento para asegurar que cartas.js e inicializar() hayan terminado (async)
    setTimeout(() => {
        testCore();
        testCardsIntegration();
    }, 500);
} catch (error) {
    if (typeof renderResult === "function") {
        renderResult(false, "ERROR FATAL DURANTE LAS PRUEBAS", error.message);
    }
    console.error(error);
}
