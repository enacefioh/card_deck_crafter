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
    num_cartas++;

    pagina.append("<div id='carta_" + num_cartas + "' style='width:" + width_mm + "mm; height:" + height_mm + "mm' class='carta' data-id='" + num_cartas + "'> </div>");

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
    var img = $('<div>');
    carta.append(img);
    img.attr('data-id', 'carta_fondo');
    img.attr('class', 'img carta_fondo');

    if (num_cartas <= 1 && !autoconfigurada) {
        autoConfigurarPagina(pagina, carta);
    }

    // Dibujar líneas de corte/guía (opcional, traído de cartas.js)
    const pos = carta.position();
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

function autoConfigurarPagina(pagina, carta) {
    if (autoconfigurada) return;
    autoconfigurada = true;
    const w_pag = parseInt(pagina.css("width"));
    const h_pag = parseInt(pagina.css("height"));
    const w_carta = parseInt(carta.css("width")) + 1;
    const h_carta = parseInt(carta.css("height")) + 1;
    var columnas = parseInt(w_pag / w_carta);
    var filas = parseInt(h_pag / h_carta);
    padding_pagina_left = (w_pag - w_carta * columnas) / 2;
    padding_pagina_top = (h_pag - h_carta * filas) / 2;
    if (padding_pagina_left < 25) { columnas--; padding_pagina_left = (w_pag - w_carta * columnas) / 2; }
    if (padding_pagina_top < 25) { filas--; padding_pagina_top = (h_pag - h_carta * filas) / 2; }
    if (num_cartas_por_pag == null || Number.isNaN(num_cartas_por_pag))
        num_cartas_por_pag = filas * columnas;

    document.documentElement.style.setProperty('--pag_padding_top', padding_pagina_top + "px");
    document.documentElement.style.setProperty('--pag_padding_bottom', padding_pagina_bottom + "px");
    document.documentElement.style.setProperty('--pag_padding_left', padding_pagina_left + "px");
    document.documentElement.style.setProperty('--pag_padding_right', padding_pagina_right + "px");
}
