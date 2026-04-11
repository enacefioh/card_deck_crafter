/* 
 * CARTAS.JS - Punto de entrada principal para Card Deck Crafter
 * Este archivo coordina la inicialización de los diferentes módulos.
 */

$(document).ready(function() {
    // Inicializar la interfaz de usuario
    inicializarUI();
    
    // Cargar plugins y plantillas dinámicamente
    cargarPluginsYPlantillas();
    
    console.log("Card Deck Crafter inicializado con éxito.");
});

async function cargarPluginsYPlantillas() {
    $ul_lista_modulos = $('#submenu_plantillas');
    $ul_lista_plugins = $('#submenu_plugins');
    
    for (var i = 0; i < modulos.length; i++) {
        let slug_modulo = modulos[i];
        
        // Cargar CSS del módulo
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'modulos/' + slug_modulo + '/style.css';
        document.head.appendChild(link);
        
        // Cargar JS del módulo
        const script = document.createElement('script');
        script.src = `modulos/${slug_modulo}/script.js`;
        script.onload = () => {
            const plantillas = window.Plantillas[slug_modulo];
            if (plantillas) {
                $ul_lista_modulos.append("<li data-plantilla='" + slug_modulo + "'>" + plantillas.nombre + "<ul class='submenu' id='menu_modulo_plantillas_" + slug_modulo + "' ></ul></li>");
                $ul_lista_plantillas = $('#menu_modulo_plantillas_' + slug_modulo);
                for (var j = 0; j < plantillas.plantillas.length; j++) {
                    var plantilla = plantillas.plantillas[j];
                    var slug_plantilla = plantilla.slug;
                    $ul_lista_plantillas.append("<li id='menu_plantilla_" + slug_plantilla + "' data-modulo='" + slug_modulo + "' data-plantilla='" + slug_plantilla + "'>" + plantilla.nombre + "</li>");
                    $('#menu_plantilla_' + slug_plantilla).click(function() {
                        var slug_m = $(this).attr('data-modulo');
                        var slug_p = $(this).attr('data-plantilla');
                        anyadirCartaDesdePlantilla(slug_m, slug_p);  
                    });
                }
            }
            
            if (window.Plugins) {
                const plugins = window.Plugins[slug_modulo];
                if (plugins) {
                    $ul_lista_plugins.append("<li data-plugin='" + slug_modulo + "'>" + plugins.nombre + "<ul class='submenu' id='menu_modulo_plugins_" + slug_modulo + "' ></ul></li>");
                    $ul_lista_plugins_sub = $('#menu_modulo_plugins_' + slug_modulo);
                    for (var k = 0; k < plugins.plugins.length; k++) {
                        var plugin_ = plugins.plugins[k];
                        var slug_plugin = plugin_.slug;
                        $ul_lista_plugins_sub.append("<li id='menu_plugin_" + slug_plugin + "' data-plugin='" + slug_plugin + "'>" + plugin_.nombre + "</li>");
                        $('#menu_plugin_' + slug_plugin).click(function() {
                            plugin_.funcion();  
                        });
                    }
                }
            }
        };
        document.body.appendChild(script);
    }
}

function getDataIdsComunesEnSeleccionadas() {
    var coleccion = $('.carta_seleccionada');
    if (coleccion.length === 0) return [];

    let data_ids_comunes = new Set();
    coleccion.first().find('[data-id]').each(function() {
        const id = $(this).data('id');
        if (id) data_ids_comunes.add(id);
    });

    coleccion.slice(1).each(function() {
        let ids_en_este = new Set();
        $(this).find('[data-id]').each(function() {
            const id = $(this).data('id');
            if (id) ids_en_este.add(id);
        });

        data_ids_comunes.forEach(id => {
            if (!ids_en_este.has(id)) {
                data_ids_comunes.delete(id);
            }
        });
    });

    return Array.from(data_ids_comunes);
}
