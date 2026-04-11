/* 
 * CDC UI - Control de la interfaz de Card Deck Crafter
 */

function inicializarUI() {
    cargarBarraLateralGeneral();
    cargarFuncionalidadMenuPrincipal();
    
    $('#contenedor_paginas').click(function() { desseleccionarCartas(); });
    $('#cerrar_popup').on('click', cerrarPopup);
    
    $('#toggle_vista_reverso').on('change', function() {
        toggleVistaReverso();
    });
    
    funcionalidadBarraLateralRedimensionadora();
    
    // Avisar antes de salir
    window.addEventListener('beforeunload', (event) => {
        if (hayCambiosPendientes) {
            event.preventDefault();
            event.returnValue = '';
        }
    });

    // Actualizar versión en la ayuda
    $('#app_version').html("Card Deck Editor v" + version);
}

function funcionalidadBarraLateralRedimensionadora() {
    const resizer = document.getElementById('resizer');
    const panel = document.getElementById('menu_lateral_padre');
    const contenido = document.getElementById('contenedor_paginas');
    let isResizing = false;

    resizer.addEventListener('mousedown', function() {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;

        let newWidth = e.clientX;
        const minWidth = 450;
        const maxWidth = 800;
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

        panel.style.width = newWidth + 'px';
        resizer.style.left = newWidth + 'px';
        contenido.style.marginLeft = (newWidth + 5) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = 'default';
        }
    });
}

function abrirPopup() {
    $('#fondo_popup').fadeIn(200);
    $('#contenedor_popup').empty();
}

function cerrarPopup() {
    $('#fondo_popup').fadeOut(200);
}

function setZoom(z) {
    if (z < 0.1) z = 0.1;
    if (z > 10) z = 10;
    zoom = z;
    document.documentElement.style.setProperty('--zoom', zoom);
    if ($('#zoom_personalizado').length) {
        $('#zoom_personalizado').val('' + parseInt(zoom * 100));
    }
}

function cargarFuncionalidadMenuPrincipal() {
    $('#menu_archivo_nuevo').click(function() {
        if (confirm("¿Estás seguro de que quieres empezar un nuevo proyecto? Se perderán los cambios no guardados.")) {
            $('#contenedor_paginas').empty();
            num_cartas = 0;
            num_pags = 0;
            anyadirPagina();
            hayCambiosPendientes = false;
        }
    });

    $('#importar_cdc').click(function() { importarProyectoCDC(true); });
    $('#guardar_cdc').click(function() { exportarProyectoCDC(); });
    $('#exportar_cartas_png').click(function() { exportar_cartas_seleccionadas(); });
    
    $('#configurar_pagina').click(function() {
        abrirPopup();
        const html = `
            <h2>Configuración de Página</h2>
            <table style="width:100%">
                <tr><td>Márgen Global (Anverso):</td><td><input type="number" id="config_margen" value="${borde_cartas_mm}" step="0.5"> mm</td></tr>
                <tr><td>Habilitar Reversos:</td><td><input type="checkbox" id="config_reversos" ${habilitar_reversos ? 'checked' : ''}></td></tr>
                <tr><td>Reverso por Defecto:</td>
                    <td>
                        <input type="file" id="config_reverso_file" accept="image/*" style="display:none;">
                        <button onclick="document.getElementById('config_reverso_file').click()">Seleccionar Imagen</button>
                        <div id="config_reverso_preview" style="width:50px; height:70px; border:1px solid gray; margin-top:5px; background-image:url('${reverso_defecto}'); background-size:cover;"></div>
                    </td>
                </tr>
                <tr><td colspan="2" style="text-align:right; padding-top:20px;">
                    <button class="boton" id="config_guardar">Guardar Cambios</button>
                </td></tr>
            </table>
        `;
        $('#contenedor_popup').html(html);
        
        $('#config_reverso_file').on('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    reverso_defecto = ev.target.result;
                    $('#config_reverso_preview').css('background-image', `url("${reverso_defecto}")`);
                };
                reader.readAsDataURL(file);
            }
        });

        $('#config_guardar').click(function() {
            borde_cartas_mm = parseFloat($('#config_margen').val());
            habilitar_reversos = $('#config_reversos').is(':checked');
            
            // Aplicar cambios globales
            document.documentElement.style.setProperty('--borde_mm', borde_cartas_mm + "mm");
            
            // Si habilitamos reversos y no había, podríamos avisar o aplicarlo a cartas sin reverso
            if (habilitar_reversos) {
                $('.face-back').each(function() {
                    if (!$(this).css('background-image') || $(this).css('background-image') === 'none') {
                        $(this).css('background-image', `url("${reverso_defecto}")`);
                    }
                });
            }

            cerrarPopup();
            hayCambiosPendientes = true;
        });
    });

    // Otros menús (Zoom, Seleccionar...)
    $('#menu_edicion_zoom_100').click(function() { setZoom(1); });
    $('#menu_edicion_zoom_50').click(function() { setZoom(0.5); });
    $('#menu_edicion_zoom_150').click(function() { setZoom(1.5); });
    $('#menu_edicion_zoom_mas').click(function() { setZoom(zoom * 1.1); });
    $('#menu_edicion_zoom_menos').click(function() { setZoom(zoom * 0.9); });

    $('#menu_edicion_seleccionar_todo').click(function() { $('.carta').addClass('carta_seleccionada'); cargarBarraLateralCartaSeleccionada(); });
    $('#menu_edicion_seleccionar_nada').click(function() { desseleccionarCartas(); });
}

function toggleVistaReverso() {
    vista_reverso = !vista_reverso;
    
    if (vista_reverso) {
        $('#contenedor_paginas').addClass('modo-reverso');
        $('#toggle_vista_texto').text('Vista: REVERSO');
    } else {
        $('#contenedor_paginas').removeClass('modo-reverso');
        $('#toggle_vista_texto').text('Vista: ANVERSO');
    }
    
    // Forzar actualización de previsualizaciones si hay carta seleccionada
    if (ultima_carta_seleccionada != -1) {
        cargarBarraLateralCartaSeleccionada();
    }
    
    console.log("Cambiando vista a: " + (vista_reverso ? "Reverso" : "Anverso"));
}
