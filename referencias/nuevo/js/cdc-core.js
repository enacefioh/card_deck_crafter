/* 
 * CDC CORE - Control de datos y estado de Card Deck Crafter
 */

var version = "1.0.260205";
var num_cartas = 0;
var num_pags = 1;
var width_pag = 210; //mm
var height_pag = 297; //mm
var num_cartas_por_pag = 9;
var columnas = 3;
var filas = 3;
var ultima_carta_seleccionada = -1;
var orientacion_vertical = true;
var borde_cartas_mm = 4; 
var borde_cartas_color = "#000000";
var zoom = 1;

// Página
var autoconfigurada = false;
var padding_pagina_top = 25;
var padding_pagina_left = 25;
var padding_pagina_right = 25;
var padding_pagina_bottom = 25;

// Reverso y Márgenes
var habilitar_reversos = false;
var reverso_defecto = "";
var vista_reverso = false; // false = Anverso, true = Reverso
var margen_reverso_defecto = 0; 

let hayCambiosPendientes = false;

// Operativa
var modo_edicion = "clasico"; // clasico | impresion

// Constantes
const MARGEN_IMPRESION = 0; // Se puede ajustar si es necesario

// Funciones de utilidad de datos
function getUltimaPagina() {
    return $('#contenedor_paginas').children('.pagina').last();
}

function getUltimaCarta() {
    var ultima_pagina = getUltimaPagina();
    return ultima_pagina.children('.carta').last();
}

function mmToPx(mm) {
    return mm * 3.7795275591; // 96 DPI
}

function pxToMm(px) {
    return px / 3.7795275591;
}

function anyadirPagina() {
    num_pags++;
    $('#contenedor_paginas').append("<div id='pagina_" + num_pags + "' class='pagina'></div>");
    return $('#pagina_' + num_pags);
}
