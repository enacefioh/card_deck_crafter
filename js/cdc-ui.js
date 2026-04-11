/* 
 * CDC UI - Control de la interfaz de Card Deck Crafter
 */

function inicializarUI() {
    cargarBarraLateralGeneral();
    cargarFuncionalidadMenuPrincipal();
    
    $('#contenedor_paginas').click(function() { desseleccionarCartas(); });
    $('#cerrar_popup').on('click', cerrarPopup);
    
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
