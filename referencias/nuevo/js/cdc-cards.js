/* 
 * CDC CARDS - Lógica de manipulación de cartas (añadir, seleccionar, eliminar, duplicar)
 */

function anyadirCarta(width_mm, height_mm) {
    width_mm = parseFloat(width_mm);
    height_mm = parseFloat(height_mm);
    hayCambiosPendientes = true;

    if (num_cartas % num_cartas_por_pag == 0 && num_cartas > 0) {
        anyadirPagina();
    }
    
    var pagina = getUltimaPagina();
    if (pagina.length == 0) {
        pagina = anyadirPagina();
    }
    
    num_cartas++;
    
    // Calcular margen (usar global o reverso por defecto)
    let margen = vista_reverso ? margen_reverso_defecto : borde_cartas_mm;

    // Si es la primera carta, intentar autoconfigurar antes para obtener el padding correcto
    if (num_cartas <= 1 && !autoconfigurada) {
        autoConfigurarPagina(pagina, null, width_mm, height_mm);
    }

    // Calcular posición en la cuadrícula
    const cols = columnas || 3;
    var carta_en_esta_pag = (num_cartas - 1) % (num_cartas_por_pag || 9);
    var col_idx = carta_en_esta_pag % cols;
    var fila_idx = Math.floor(carta_en_esta_pag / cols);
    
    // Aplicar padding de la página para centrado
    var left_mm = (col_idx * width_mm) + pxToMm(padding_pagina_left);
    var top_mm = (fila_idx * height_mm) + pxToMm(padding_pagina_top);

    pagina.append("<div id='carta_" + num_cartas + "' style='width:" + width_mm + "mm; height:" + height_mm + "mm; left:" + left_mm + "mm; top:" + top_mm + "mm; --borde_mm:" + margen + "mm;' class='carta' data-id='" + num_cartas + "' data-margen='" + margen + "'> </div>");

    $("#carta_" + num_cartas).click(function(event) {
        var id = $(this).attr('data-id');
        if (event.shiftKey && ultima_carta_seleccionada > 0) {
            desseleccionarCartas();
            var inicio = Math.min(id, ultima_carta_seleccionada);
            var fin = Math.max(id, ultima_carta_seleccionada);
            for (var i = inicio; i <= fin; i++) {
                seleccionarCarta(i);
            }
        } else {
            if (!event.ctrlKey) {
                desseleccionarCartas();
            }
            seleccionarCarta(id);
        }
        event.stopPropagation();
    });

    var carta = getUltimaCarta();
    
    // Frente
    var img_frente = $('<div>');
    carta.append(img_frente);
    img_frente.attr('data-id', 'carta_fondo');
    img_frente.attr('class', 'img carta_fondo face-front');
    
    // Reverso (Capa oculta por ahora)
    var img_reverso = $('<div>');
    carta.append(img_reverso);
    img_reverso.attr('data-id', 'reverso_fondo');
    img_reverso.attr('class', 'img reverso_fondo face-back');
    if (reverso_defecto) {
        img_reverso.css('background-image', 'url("' + reverso_defecto + '")');
        img_reverso.css('background-size', 'cover');
    }

    if (num_cartas <= 1 && !autoconfigurada) {
        autoConfigurarPagina(pagina, carta);
    }

    // Dibujar líneas de corte/guía (opcional, traído de cartas.js)
    const pos = carta.position();
    if (!pos) return carta; // Evitar error si no se puede obtener posición (ej: tests ocultos)

    const width = mmToPx(width_mm);
    const height = mmToPx(height_mm);
    const x0 = pos.left + 2;
    const y0 = pos.top + 2;
    const x1 = x0 + width - 3;
    const y1 = y0 + height - 3;
    
    $('#izq' + num_cartas + ', #der' + num_cartas + ', #sup' + num_cartas + ', #inf' + num_cartas).remove();
    pagina.prepend("<div class='linea_vertical' id='izq" + num_cartas + "' style='left:" + x0 + "px;' />");
    pagina.prepend("<div class='linea_vertical' id='der" + num_cartas + "' style='left:" + x1 + "px;' />");
    pagina.prepend("<div class='linea_horizontal' id='sup" + num_cartas + "' style='top:" + y0 + "px;' />");
    pagina.prepend("<div class='linea_horizontal' id='inf" + num_cartas + "' style='top:" + y1 + "px;' />");

    return carta;
}

function seleccionarCarta(n) {
    var carta = $("#carta_" + n);
    if (carta.hasClass('carta_seleccionada')) {
        carta.removeClass("carta_seleccionada");
    } else {
        carta.addClass("carta_seleccionada");
    }
    cargarBarraLateralCartaSeleccionada();
    ultima_carta_seleccionada = n;
    return carta;
}

function desseleccionarCartas() {
    $(".carta_seleccionada").removeClass('carta_seleccionada');
    cargarBarraLateralGeneral();
}

function eliminar_cartas_seleccionadas() {
    $('.carta_seleccionada').remove();
    reordenarCartas();
    cargarBarraLateralGeneral();
}

function duplicar_cartas_seleccionadas() {
    hayCambiosPendientes = true;
    var seleccionadas = $('.carta_seleccionada');
    if (seleccionadas.length === 0) return;

    seleccionadas.each(function() {
        var original = $(this);
        var clon = original.clone();
        clon.removeClass('carta_seleccionada');
        original.after(clon);
    });
    reordenarCartas();
}

function reordenarCartas() {
    var cartas_guardadas = [];
    $('.carta').each(function() {
        cartas_guardadas.push($(this));
    });

    $('.carta').remove();
    $('.pagina').remove();
    num_pags = 0;
    num_cartas = 0;
    anyadirPagina();

    for (var i = 0; i < cartas_guardadas.length; i++) {
        var nueva_carta = anyadirCarta(cartas_guardadas[i].css('width'), cartas_guardadas[i].css('height'));
        nueva_carta.html(cartas_guardadas[i].html());
        $(nueva_carta).attr("class", $(cartas_guardadas[i]).attr('class'));
        nueva_carta.css('width', cartas_guardadas[i].css('width'));
        nueva_carta.css('height', cartas_guardadas[i].css('height'));
    }
}

function anyadirCartaDesdePlantilla(slug_modulo, slug_plantilla) {
    hayCambiosPendientes = true;
    const plantillas = window.Plantillas[slug_modulo];
    for (var i = 0; i < plantillas.plantillas.length; i++) {
        if (plantillas.plantillas[i].slug == slug_plantilla) {
            var w = plantillas.plantillas[i].width || 65;
            var h = plantillas.plantillas[i].height || 90;
            const carta = anyadirCarta(w + MARGEN_IMPRESION, h + MARGEN_IMPRESION);
            carta.html(plantillas.plantillas[i].html);
            return carta;
        }
    }
    return anyadirCarta(65, 90);
}

function autoConfigurarPagina(pagina, carta, w_mm, h_mm) {
    if (autoconfigurada) return;
    autoconfigurada = true;
    
    // Si no se pasan mm, intentar medir el elemento
    const w_pag_px = parseInt(pagina.css("width")) || mmToPx(210);
    const h_pag_px = parseInt(pagina.css("height")) || mmToPx(297);
    
    const w_carta_px = w_mm ? mmToPx(w_mm + 1) : (parseInt(carta.css("width")) || mmToPx(64));
    const h_carta_px = h_mm ? mmToPx(h_mm + 1) : (parseInt(carta.css("height")) || mmToPx(91));

    columnas = Math.floor(w_pag_px / w_carta_px);
    filas = Math.floor(h_pag_px / h_carta_px);
    
    // Evitar valores absurdos
    if (columnas < 1) columnas = 1;
    if (filas < 1) filas = 1;

    padding_pagina_left = (w_pag_px - w_carta_px * columnas) / 2;
    padding_pagina_top = (h_pag_px - h_carta_px * filas) / 2;
    
    // Margen mínimo de seguridad (25px ~ 6mm)
    if (padding_pagina_left < 20 && columnas > 1) { 
        columnas--; 
        padding_pagina_left = (w_pag_px - w_carta_px * columnas) / 2; 
    }
    if (padding_pagina_top < 20 && filas > 1) { 
        filas--; 
        padding_pagina_top = (h_pag_px - h_carta_px * filas) / 2; 
    }

    num_cartas_por_pag = filas * columnas;

    document.documentElement.style.setProperty('--pag_padding_top', padding_pagina_top + "px");
    document.documentElement.style.setProperty('--pag_padding_left', padding_pagina_left + "px");
}
