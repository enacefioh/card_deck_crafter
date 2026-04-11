/* 
 * CDC EDITOR - Lógica de los submenús de edición de elementos de carta
 */

function cargarSubmenusClase(clase, id, slug_modulo, slug_plantilla) {
    switch (clase) {
        case "menu_plantilla":
            const plantillas = window.Plantillas[slug_modulo];
            for (var i = 0; i < plantillas.plantillas.length; i++) {
                if (plantillas.plantillas[i].slug == slug_plantilla) {
                    plantillas.plantillas[i].cargarOpcionesEnMenu(id);
                }
            }
            break;
        case "img": submenu_img(id); break;
        case "texto_editable": submenu_texto_editable(id); break;
        case "texto_linea": submenu_texto_linea(id); break;
        case "texto_numero": submenu_texto_numero(id); break;
        case "img_swap": submenu_img_swap(id); break;
        case "tintable": submenu_tintable(id); break;
        case "titulo_seccion": submenu_titulo_seccion(id); break;
    }
}

function slugToTexto(slug) {
    return slug.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

function submenu_texto_linea(id) {
    var texto = "";
    if ($('.carta_seleccionada').length == 1) {
        texto = $('.carta_seleccionada * [data-id=' + id + ']').html();
    }
    var html = `
        <tr class='seccion_editable'>
                <td class='etiqueta_submenu'>${slugToTexto(id)}: </td>
                <td><input type='text' id='texto_linea_${id}' data-id='${id}' style='width:98%;' value='${texto}' /></td>
        </tr>
    `;
    $('#tabla_atributos').append(html);
    $('#texto_linea_' + id).on('input', function() {
        hayCambiosPendientes = true;
        var id_objeto = $(this).attr('data-id');
        $('.carta_seleccionada * [data-id=' + id_objeto + ']').html($(this).val());
    });
}

function submenu_texto_editable(id) {
    var texto = "";
    if ($('.carta_seleccionada').length == 1) {
        texto = $('.carta_seleccionada * [data-id=' + id + ']').html().replace(/<br\s*\/?>/gi, '\n');
    }
    var html = `
        <tr class='seccion_editable'>
            <td><span id='texto_editable_abrir_menu_edicion_${id}' data-id='${id}' style='cursor:pointer;' title="Abrir controles">🔽</span>${slugToTexto(id)}:</td>
            <td><textarea id='texto_editable_${id}' data-id='${id}' style='width:98%; min-height:50px; resize:none;'>${texto}</textarea></td>
        </tr>
        <tr id='texto_editable_menu_edicion_${id}' style='text-align:center; display:none;'>
             <td></td>
             <td class='submenu_edicion'>
                <span id='texto_editable_aumentar_${id}' data-id='${id}' class="submenu_boton" title="+ size">+</span>
                <span id='texto_editable_reducir_${id}' data-id='${id}' class="submenu_boton" title="- size">-</span>
                <span id='texto_editable_negrita_${id}' data-id='${id}' class="submenu_boton" title="B"><b>B</b></span>
                <span id='texto_editable_cursiva_${id}' data-id='${id}' class="submenu_boton" title="I"><em>I</em></span>
             </td>	
        </tr>
    `;
    $('#tabla_atributos').append(html);
    
    $('#texto_editable_abrir_menu_edicion_' + id).click(function() {
        $('#texto_editable_menu_edicion_' + id).toggle();
        $(this).html($(this).html() == "🔽" ? "🔼" : "🔽");
    });
    
    $('#texto_editable_' + id).on('input', function() {
        hayCambiosPendientes = true;
        var texto_con_saltos = $(this).val().replace(/\n/g, '<br>');
        $(".carta_seleccionada [data-id='" + $(this).attr('data-id') + "']").html(texto_con_saltos);
    });

    // ... (rest of submenu logic simplified for now)
}

function submenu_img(id) {
    var html = `
        <tr>
            <td><span id='img_abrir_menu_edicion_${id}' data-id='${id}' style='cursor:pointer;'>🔽</span>${slugToTexto(id)}</td>
            <td>
                <div style="cursor:pointer; background-color:#eeeeee; width:98%; height:50px; border: 1px dashed gray; text-align:center; padding-top:14px; position:relative;">
                    🔄 Imágenes
                    <input id="img_cambiar_input_${id}" data-id='${id}' accept="image/*" type="file" style="width:100%; height:100%; opacity:0; position:absolute; left:0; top:0; cursor:pointer;"> 
                </div>
            </td>
        </tr>
    `;
    $('#tabla_atributos').append(html);
    
    $('#img_cambiar_input_' + id).on('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        var id_objeto = $(this).attr('data-id');
        reader.onload = function(e) {
            $('.carta_seleccionada [data-id=' + id_objeto + ']').css({
                'background-image': 'url("' + e.target.result + '")',
                'background-position': 'center',
                'background-size': 'cover'
            });
        };
        reader.readAsDataURL(file);
    });
}

function submenu_tintable(id) {
    var item = $('.carta_seleccionada * [data-id=' + id + ']');
    var color_val = item.attr('data-val-tintable') || "#ffffff";
    var html = `
        <tr class='seccion_editable'>
            <td class='etiqueta_submenu'>Color ${slugToTexto(id)}:</td>
            <td><input style='width:100%;' type="color" id="select_${id}" value="${color_val}"></td>
        </tr>
    `;
    $('#tabla_atributos').append(html);
    
    $('#select_' + id).on('change', function() {
        const colorHex = $(this).val();
        const $img = $('.carta_seleccionada [data-id=' + id + ']');
        $img.attr('data-val-tintable', colorHex);
        // ... (tinting logic simplified for now)
    });
}

// ... other submenus (simplified for modularization demo)
