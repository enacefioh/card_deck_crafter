/* 
 * CDC MENUS - Control de los menús laterales de Card Deck Crafter
 */

function cargarBarraLateralGeneral() {
    var html_barra_lateral_general = `
        <tr><td colspan=2 class='etiqueta_submenu'>Zoom</td></tr>
        <tr><td colspan=2 style='padding-bottom:15px;'>
            <div class="zoom-controls">
                <button id='zoom_reducir' class='zoom-btn'>-</button>
                <div class="zoom-input-wrapper">
                    <input id='zoom_personalizado' type='number' value='${parseInt(zoom * 100)}' />
                    <span>%</span>
                </div>
                <button id='zoom_aumentar' class='zoom-btn'>+</button>
            </div>
        </td></tr>
        
        <tr><td colspan=2>
            <div id="add_carta_plantilla" class="dashed-box">
                + Añadir Carta
            </div>
        </td></tr>

        <tr><td colspan=2>
            <div class="dashed-box" style="position:relative; height:80px; padding:0;">
                <div style="width:100%; margin-top:25px; font-size:13px;">+ Importar imágenes</div>
                <input id="importar_imagenes" type="file" multiple="multiple" style="width:100%; height:100%; opacity:0; position:absolute; top:0; left:0; cursor:pointer;"> 
            </div>
        </td></tr>

        <tr><td colspan=2>
            <div class="dashed-box" style="position:relative; height:80px; padding:0;">
                <div style="width:100%; margin-top:25px; font-size:13px;">📂 Abrir (.CDC)</div>
                <input id="importar_cdc_menu" type="file" style="width:100%; height:100%; opacity:0; position:absolute; top:0; left:0; cursor:pointer;"> 
            </div>
        </td></tr>
    `;
    
    vaciarTablaAtributos();
    $('#tabla_atributos').append(html_barra_lateral_general);
    
    $('#importar_imagenes').on('change', function(event) {
        const files = event.target.files;
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                var carta = anyadirCarta(63, 88); 
                var img = carta.find('.face-front');
                img.css('background-image', 'url("' + URL.createObjectURL(file) + '")');
            }
        });
    });
    
    $('#importar_cdc_menu').on('change', function(event) {
         if (hayCambiosPendientes) {
              if (!confirm("Hay cambios pendientes. ¿Descartar los cambios?")) {return;}
         }
         const file = event.target.files[0];
         if (file && file.name.toLowerCase().endsWith(".cdc")) {
             abrirCDC(file);
         }
    });
    
    $('#zoom_personalizado').on('change', function() {
         var z = parseFloat($(this).val() / 100);
         setZoom(z);
    });
    
    $('#zoom_aumentar').click(function() { setZoom(zoom * 1.1); });
    $('#zoom_reducir').click(function() { setZoom(zoom * 0.9); });
    $('#add_carta_plantilla').click(function() { abrir_menu_plantillas(); });
}

function cargarBarraLateralCartaSeleccionada() {
    var html_barra_lateral_carta = `
        <tr><td colspan=2 id='carta_seleccionada_controles_basicos' class='submenu_botones' style='text-align:center; padding:10px 0;'>
            <div id='subir_carta_seleccionada' class='submenu_botones_boton' title='Subir carta seleccionada'> ⬆️ </div>
            <div id='bajar_carta_seleccionada' class='submenu_botones_boton' title='Bajar carta seleccionada'> ⬇️ </div>
            <div id='eliminar_cartas_seleccionadas' class='submenu_botones_boton' title='Eliminar cartas seleccionadas'> ❌ </div>
            <div id='duplicar_carta_seleccionada' class='submenu_botones_boton' title='Duplicar carta seleccionada'> 📄‍↔️📄 </div>
            <div id='exportar_cartas_seleccionadas' class='submenu_botones_boton' title='Exportar cartas seleccionadas'> 💾 </div>
        </td></tr>	
        <tr><td class='etiqueta_submenu'>Borde (mm)</td>
            <td><input type='number' id='margen_individual_input' value='0' step='0.5' /></td>
        </tr>
        <tr><td class='etiqueta_submenu'>Reverso</td>
            <td>
                <div class="dashed-box" style="padding:5px; font-size:11px; margin:0; position:relative;">
                    🖼️ Cambiar
                    <input id="reverso_individual_input" accept="image/*" type="file" style="width:100%; height:100%; opacity:0; position:absolute; left:0; top:0; cursor:pointer;"> 
                </div>
            </td>
        </tr>
        <tr><td colspan=2 style='padding-top:15px;'>
            <div style='display:flex; justify-content:space-around; background: rgba(0,0,0,0.2); padding:10px; border-radius:8px;'>
                <div style='text-align:center;'>
                    <div style='font-size:10px; margin-bottom:4px; color:#94a3b8;'>Anverso</div>
                    <div id='preview_front' style='width:60px; height:84px; background-color:white; border:1px solid #374151; background-size:cover;'></div>
                </div>
                <div style='text-align:center;'>
                    <div style='font-size:10px; margin-bottom:4px; color:#94a3b8;'>Reverso</div>
                    <div id='preview_back' style='width:60px; height:84px; background-color:white; border:1px solid #374151; background-size:cover;'></div>
                </div>
            </div>
        </td></tr>
    `;
    
    vaciarTablaAtributos();
    $('#tabla_atributos').append(html_barra_lateral_carta);
    
    const carta_sel = $('.carta_seleccionada').first();
    $('#preview_front').css('background-image', carta_sel.find('.face-front').css('background-image'));
    $('#preview_back').css('background-image', carta_sel.find('.face-back').css('background-image'));
    
    const primer_margen = carta_sel.attr('data-margen') || borde_cartas_mm;
    $('#margen_individual_input').val(primer_margen);

    $('#margen_individual_input').on('change', function() {
        const val = $(this).val();
        $('.carta_seleccionada').attr('data-margen', val).css('--borde_mm', val + 'mm');
        hayCambiosPendientes = true;
    });

    $('#reverso_individual_input').on('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            $('.carta_seleccionada').find('.face-back').css('background-image', 'url("' + e.target.result + '")');
            $('#preview_back').css('background-image', 'url("' + e.target.result + '")');
        };
        reader.readAsDataURL(file);
        hayCambiosPendientes = true;
    });

    $('#subir_carta_seleccionada').click(function() { subir_cartas_seleccionadas(); });
    $('#bajar_carta_seleccionada').click(function() { bajar_cartas_seleccionadas(); });
    $('#eliminar_cartas_seleccionadas').click(function() { eliminar_cartas_seleccionadas(); });
    $('#duplicar_carta_seleccionada').click(function() { duplicar_cartas_seleccionadas(); });
    $('#exportar_cartas_seleccionadas').click(function() { exportar_cartas_seleccionadas(); });
    
    var ids_comunes = getDataIdsComunesEnSeleccionadas();
    ids_comunes.forEach(function(id) {
         var primer_objeto = $('.carta_seleccionada').find('[data-id="' + id + '"]').first();
         var modulo = primer_objeto.attr("data-modulo");
         var plantilla = primer_objeto.attr("data-plantilla");
         var clases = primer_objeto.attr('class')?.split(/\s+/) || [];
         clases.forEach(function(clase) {
             cargarSubmenusClase(clase, id, modulo, plantilla); 
         });
    });
}

function vaciarTablaAtributos() {
    $('#tabla_atributos').empty();
    $('#tabla_atributos').html('<colgroup> <col class="col1"> <col class="col2"> </colgroup>');
}

function abrir_menu_plantillas() {
    abrirPopup();
    $('#contenedor_popup').html("<div id='contenedor_popup_interior' style='display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; padding: 20px;'></div>");
    
    $('#contenedor_popup_interior').append("<h2 style='width:100%; text-align:center; color:white;'>Plantillas Vacías</h2>");
    
    const vacias = [
        {w: 63, h: 88, n: 'Standard Vertical'},
        {w: 88, h: 63, n: 'Standard Horizontal'},
        {w: 70, h: 120, n: 'Tarot Vertical'},
        {w: 120, h: 70, n: 'Tarot Horizontal'}
    ];

    vacias.forEach(v => {
        let box = $(`<div style='text-align:center; cursor:pointer;'>
            <div style='width:100px; height:120px; border:1px solid #4b5563; background:#374151; display:flex; align-items:center; justify-content:center; font-size:10px;'>${v.w}x${v.h}mm</div>
            <div style='font-size:11px; margin-top:5px;'>${v.n}</div>
        </div>`);
        box.click(() => { anyadirCarta(v.w, v.h); cerrarPopup(); });
        $('#contenedor_popup_interior').append(box);
    });
    
    for (const key in window.Plantillas) {
        const mod = window.Plantillas[key];
        $('#contenedor_popup_interior').append(`<h2 style='width:100%; text-align:center; color:white; margin-top:20px;'>${mod.nombre}</h2>`);
        mod.plantillas.forEach(p => {
             let box = $(`<div style='text-align:center; cursor:pointer;'>
                <img src='./modulos/${key}/mini_${p.slug}.png' style='max-width:100px; max-height:120px; border:1px solid #4b5563;' />
                <div style='font-size:11px; margin-top:5px;'>${p.nombre}</div>
             </div>`);
             box.click(() => { anyadirCartaDesdePlantilla(key, p.slug); cerrarPopup(); });
             $('#contenedor_popup_interior').append(box);
        });
    }
}
