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
        assertOk(px > 3 && px < 5, "[Core Test]: mmToPx convierte correctamente mm a píxeles");
    } else {
        renderResult(false, "ERROR: mmToPx no definido");
    }
    assertOk(typeof version === "string" && version.startsWith("1.0"), "[Core Test]: La versión del software es 1.0.x");
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
        assertEquals(num_cartas, 1, "[Integration Test]: Añadir una carta incrementa el contador num_cartas");
        const cartaElem = document.querySelector('.carta');
        assertOk(cartaElem !== null, "[Integration Test]: El elemento .carta se ha creado en el DOM");
    } else {
        renderResult(false, "ERROR: anyadirCarta no definido");
    }
}

// 3. Overflow Tests (A4, A3, A5)
function testPageOverflow() {
    console.log("Testeando Desbordamiento de Páginas...");

    function runOverflowTest(nombre, w_pag_mm, h_pag_mm, w_carta_mm, h_carta_mm, num_cartas_a_anyadir, paginas_esperadas, cartas_en_ultima_esperadas) {
        console.log(`Ejecutando: ${nombre}`);

        // Reset ambiental
        $('#contenedor_paginas').empty();
        num_cartas = 0;
        num_pags = 0;
        autoconfigurada = false;
        num_cartas_por_pag = null;

        // Simular tamaño de página (el CSS controla las dimensiones físicas)
        // Actualizamos variables globales y CSS como hace configurarPagina()
        window.width_pag = w_pag_mm;
        window.height_pag = h_pag_mm;
        document.documentElement.style.setProperty('--width_pag', w_pag_mm + "mm");
        document.documentElement.style.setProperty('--height_pag', h_pag_mm + "mm");

        const firstPage = anyadirPagina();

        for (let i = 0; i < num_cartas_a_anyadir; i++) {
            anyadirCarta(w_carta_mm, h_carta_mm);
        }

        const totalPags = $('.pagina').length;
        const cartasEnUltima = $('.pagina').last().find('.carta').length;

        assertEquals(totalPags, paginas_esperadas, `[Overflow Test]: ${nombre}: Se han creado ${paginas_esperadas} páginas`);
        assertEquals(cartasEnUltima, cartas_en_ultima_esperadas, `[Overflow Test]: ${nombre}: La última página tiene ${cartas_en_ultima_esperadas} cartas`);
    }

    // Escenario 1: 22 cartas (63x88mm) en A4 (210x297mm)
    runOverflowTest("A4 Vertical (22 cartas)", 210, 297, 63, 88, 22, 3, 4);

    // Escenario 2: 25 cartas en A3 Horizontal (420x297mm)
    runOverflowTest("A3 Horizontal (25 cartas)", 420, 297, 63, 88, 25, 2, 7);

    // Escenario 3: 15 cartas en A5 Horizontal (148mmx210)
    runOverflowTest("A5 Horizontal (15 cartas)", 148, 210, 63, 88, 15, 4, 3);
}

// 4. Deletion and Reordering Tests
function testCardDeletion() {
    console.log("Testeando Eliminación y Reordenación...");

    // Setup: A4 con 19 cartas (deberían ser 3 páginas: 9 + 9 + 1)
    $('#contenedor_paginas').empty();
    num_cartas = 0;
    num_pags = 0;
    autoconfigurada = false;
    num_cartas_por_pag = null;

    window.width_pag = 210;
    window.height_pag = 297;
    document.documentElement.style.setProperty('--width_pag', "210mm");
    document.documentElement.style.setProperty('--height_pag', "297mm");

    anyadirPagina();
    for (let i = 0; i < 19; i++) {
        anyadirCarta(63, 88);
    }

    assertEquals($('.pagina').length, 3, "[Deletion Test]: Setup: 19 cartas generan 3 páginas");
    assertEquals($('.carta').length, 19, "[Deletion Test]: Setup: Hay 19 cartas en total");

    // Seleccionar la primera carta y eliminar
    $('.carta').first().addClass('carta_seleccionada');

    if (typeof eliminar_cartas_seleccionadas === "function") {
        eliminar_cartas_seleccionadas();

        assertEquals($('.carta').length, 18, "[Deletion Test]: Después de eliminar, quedan 18 cartas");
        assertEquals($('.pagina').length, 2, "[Deletion Test]: Después de eliminar, quedan 2 páginas (9+9)");
    } else {
        renderResult(false, "ERROR: eliminar_cartas_seleccionadas no definido");
    }
}

// 5. Dual Face Tests
function testDualFace() {
    console.log("Testeando Cartas Doble Cara...");

    $('#contenedor_paginas').empty();
    num_cartas = 0;
    num_pags = 0;
    autoconfigurada = false;
    num_cartas_por_pag = null;
    
    window.width_pag = 210;
    window.height_pag = 297;
    document.documentElement.style.setProperty('--width_pag', "210mm");
    document.documentElement.style.setProperty('--height_pag', "297mm");

    anyadirPagina();

    for (let i = 0; i < 12; i++) {
        anyadirCarta(63, 88);
    }

    const paginasFrontales = $('.pagina');
    const paginasTraseras = $('.pagina_traseras');
    
    assertEquals(paginasFrontales.length, 2, "[Dual-Face Test]: Hay 2 páginas frontales");
    assertEquals(paginasTraseras.length, 2, "[Dual-Face Test]: Hay 2 páginas traseras");
    
    const cartasFrontales = $('.carta');
    const cartasTraseras = $('.carta_trasera');

    assertEquals(cartasFrontales.length, 12, "[Dual-Face Test]: Hay 12 cartas frontales");
    assertEquals(cartasTraseras.length, 12, "[Dual-Face Test]: Hay 12 cartas traseras");

    const cartasEnUltimaFrontal = paginasFrontales.last().find('.carta').length;
    const cartasEnUltimaTrasera = paginasTraseras.last().find('.carta_trasera').length;

    assertEquals(cartasEnUltimaFrontal, 3, "[Dual-Face Test]: La última página frontal tiene 3 cartas");
    assertEquals(cartasEnUltimaTrasera, 3, "[Dual-Face Test]: La última página trasera tiene 3 cartas");
}

// 6. Bug Reproduction: Border Reset on Duplication
function testCardDuplicationBorderBug() {
    console.log("Testeando Bug: Reset de bordes al duplicar...");

    // Reset ambiental
    $('#contenedor_paginas').empty();
    num_cartas = 0;
    num_pags = 0;
    autoconfigurada = false;
    num_cartas_por_pag = 9;

    window.width_pag = 210;
    window.height_pag = 297;
    document.documentElement.style.setProperty('--width_pag', "210mm");
    document.documentElement.style.setProperty('--height_pag', "297mm");

    anyadirPagina();

    // 1. Añadir 6 cartas
    for (let i = 0; i < 6; i++) {
        anyadirCarta(63, 88);
    }

    // Funciones auxiliares para el test
    const getBorder = (id) => {
        const el = document.getElementById('carta_' + id);
        if (!el) return null;
        const bw = el.style.borderWidth;
        // Si no hay estilo inline, devolvemos el valor por defecto (4)
        return bw ? parseFloat(bw) : 4;
    };

    const setBorder = (id, val) => {
        // Simulamos la acción del usuario seleccionando y cambiando el valor
        desseleccionarCartas();
        $('#carta_' + id).addClass('carta_seleccionada');
        cargarBarraLateralCartaSeleccionada();
        $('#config_borde_seleccionadas').val(val).trigger('input');
    };

    // 2. Modificar el margen de la 2ª y 5ª poniéndolas a 1mm y 6mm
    setBorder(2, 1);
    setBorder(5, 6);

    // 3. Duplicar la segunda carta (que tiene 1mm)
    desseleccionarCartas();
    $('#carta_2').addClass('carta_seleccionada');
    duplicar_cartas_seleccionadas();

    // Después de duplicar la 2, el orden es:
    // 1(4), 2(1), 3(clon 1), 4(ex3, 4), 5(ex4, 4), 6(ex5, 6), 7(ex6, 4)

    // 4. Comprobar ahora que la 1, 4, 5, y 7 tienen 4mm y la 2, 3 tienen 1mm y la 6 tiene 6mm
    assertEquals(getBorder(1), 4, "[Bug Test]: Carta 1 tiene 4mm");
    assertEquals(getBorder(2), 1, "[Bug Test]: Carta 2 tiene 1mm");
    assertEquals(getBorder(3), 1, "[Bug Test]: Carta 3 (clon) tiene 1mm");
    assertEquals(getBorder(4), 4, "[Bug Test]: Carta 4 tiene 4mm");
    assertEquals(getBorder(5), 4, "[Bug Test]: Carta 5 tiene 4mm");
    assertEquals(getBorder(6), 6, "[Bug Test]: Carta 6 tiene 6mm");
    assertEquals(getBorder(7), 4, "[Bug Test]: Carta 7 tiene 4mm");
}

// Ejecutar todo
try {
    // Esperar un momento para asegurar que cartas.js e inicializar() hayan terminado (async)
    setTimeout(() => {
        testCore();
        testCardsIntegration();
        testPageOverflow();
        testCardDeletion();
        testDualFace();
        testCardDuplicationBorderBug();
    }, 500);
} catch (error) {
    if (typeof renderResult === "function") {
        renderResult(false, "ERROR FATAL DURANTE LAS PRUEBAS", error.message);
    }
    console.error(error);
}
