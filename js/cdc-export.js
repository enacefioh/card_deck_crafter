/* 
 * CDC EXPORT - Funciones de exportación (PNG, ZIP, CDC)
 */

function exportarProyectoCDC() {
    const contenido_html = document.getElementById('contenedor_paginas').innerHTML;

    const data = {
        version: version,
        num_cartas: num_cartas,
        num_pags: num_pags,
        num_cartas_por_pags: num_cartas_por_pag,
        padding_pagina_top: padding_pagina_top,
        padding_pagina_left: padding_pagina_left,
        padding_pagina_right: padding_pagina_right,
        padding_pagina_bottom: padding_pagina_bottom,
        borde_cartas_mm: borde_cartas_mm,
        borde_cartas_color: borde_cartas_color,
        contenido_html: contenido_html
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'cartas.cdc';
    enlace.click();
    hayCambiosPendientes = false;
}

function importarProyectoCDC(activar = false) {
    if (hayCambiosPendientes) {
        if (!confirm("Hay cambios pendientes. ¿Descartar los cambios?")) { return; }
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.cdc';

    input.onchange = (event) => {
        const archivo = event.target.files[0];
        abrirCDC(archivo);
    };

    if (activar)
        input.click();
}

function abrirCDC(archivo) {
    const lector = new FileReader();
    lector.onload = (event) => {
        const data = JSON.parse(event.target.result);
        
        // Cargar metadatos
        version = data.version;
        num_cartas = data.num_cartas;
        num_pags = data.num_pags;
        num_cartas_por_pag = data.num_cartas_por_pags || 9;
        
        padding_pagina_top = data.padding_pagina_top;
        padding_pagina_left = data.padding_pagina_left;
        padding_pagina_right = data.padding_pagina_right;
        padding_pagina_bottom = data.padding_pagina_bottom;
        
        borde_cartas_mm = data.borde_cartas_mm;
        borde_cartas_color = data.borde_cartas_color;

        // Aplicar estilos de página
        document.documentElement.style.setProperty('--pag_padding_top', padding_pagina_top + "px");
        document.documentElement.style.setProperty('--pag_padding_bottom', padding_pagina_bottom + "px");
        document.documentElement.style.setProperty('--pag_padding_left', padding_pagina_left + "px");
        document.documentElement.style.setProperty('--pag_padding_right', padding_pagina_right + "px");
        document.documentElement.style.setProperty('--width_pag', width_pag + "mm");
        document.documentElement.style.setProperty('--height_pag', height_pag + "mm");
        document.documentElement.style.setProperty('--borde_mm', borde_cartas_mm + "mm");
        document.documentElement.style.setProperty('--borde_color', borde_cartas_color);

        // Cargar HTML
        document.getElementById('contenedor_paginas').innerHTML = data.contenido_html;
        
        // Re-asignar eventos a las cartas cargadas
        $('.carta').each(function() {
            const id = $(this).attr('data-id');
            $(this).click(function(event) {
                // ... lógica de selección simplificada para el import (se puede refinar)
                seleccionarCarta(id);
                event.stopPropagation();
            });
        });
        
        hayCambiosPendientes = false;
    };
    lector.readAsText(archivo);
}

function exportar_cartas_seleccionadas() {
    const cartas = $('.carta_seleccionada');
    if (cartas.length === 0) return;

    cartas.addClass('carta_seleccionada_exportar');

    if (cartas.length === 1) {
        const cartaElem = cartas[0];
        html2canvas(cartaElem, { scale: 2 }).then(canvas => {
            canvas.toBlob(function(blob) {
                const enlace = document.createElement('a');
                enlace.href = URL.createObjectURL(blob);
                enlace.download = 'carta.png';
                enlace.click();
                cartas.removeClass('carta_seleccionada_exportar');
            }, 'image/png');
        });
    } else {
        const zip = new JSZip();
        let procesadas = 0;

        cartas.each(function(index) {
            const carta = this;
            html2canvas(carta, { scale: 2 }).then(canvas => {
                canvas.toBlob(function(blob) {
                    zip.file(`carta_${index + 1}.png`, blob);
                    procesadas++;

                    if (procesadas === cartas.length) {
                        zip.generateAsync({ type: 'blob' }).then(content => {
                            const enlace = document.createElement('a');
                            enlace.href = URL.createObjectURL(content);
                            enlace.download = 'cartas.zip';
                            enlace.click();
                            cartas.removeClass('carta_seleccionada_exportar');
                        });
                    }
                }, 'image/png');
            });
        });
    }
}
