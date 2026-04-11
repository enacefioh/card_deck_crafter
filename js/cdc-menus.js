/* 
 * CDC MENUS - Control de los menús laterales de Card Deck Crafter
 */

function cargarBarraLateralGeneral() {
    var html_barra_lateral_general = `
        <tr><td colspan=2 style='padding-bottom:10px;'>Zoom:  <button id='zoom_reducir'>-</button> <input id='zoom_personalizado' type='number' style='width:40px; text-align:center;' value='100'  /> <button id='zoom_aumentar'>+</button>  </td></tr>
        <tr><td colspan=2 id="add_carta_plantilla" style="border: 1px solid gray; background-color:#eeeeee; text-align:center; color: #999999; font-size: 15px; padding: 1%; cursor:pointer;"> + Añadir Carta</td></tr>
        <tr><td colspan=2>	<div style="border: 1px dashed gray; background-color:#eeeeee; width:98%; height:100px; margin:auto; margin-top: 10px; margin-bottom:10px;">
                <div style="width:100%; margin:auto; margin-top: 40px; color: #999999; font-size: 15px; position:absolute; text-align:center;">+ Importar imágenes</div>
                <input id="importar_imagenes" type="file" multiple="multiple" style=" width: 100%; height: 100px; opacity: 0; position:absolute;"> 
            </div>
        </td></tr>	
        <tr><td colspan=2>	<div style="border: 1px dashed gray; background-color:#eeeeee; width:98%; height:100px; margin:auto; margin-top: 10px; margin-bottom:10px;">
                <div style="width:100%; margin:auto; margin-top: 40px; color: #999999; font-size: 15px; position:absolute; text-align:center;">Abrir CDC</div>
                <input id="importar_cdc_menu" type="file" multiple="multiple" style=" width: 100%; height: 100px; opacity: 0; position:absolute;"> 
            </div>
        </td></tr>	
    `;
    
    vaciarTablaAtributos();
    $('#tabla_atributos').append(html_barra_lateral_general);
    
    $('#importar_imagenes').on('change', function(event) {
        const files = event.target.files;
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                var carta = anyadirCarta(63, 88); // Tamaño standard
                var img = carta.find('.carta_fondo');
                img.css('background-image', 'url("' + URL.createObjectURL(file) + '")');
                img.css('background-position', 'center');
                img.css('background-size', 'cover');	
            }
        });
    });
    
    $('#importar_cdc_menu').on('change', function(event) {
         if (hayCambiosPendientes) {
              if (!confirm("Hay cambios pendientes. ¿Descartar los cambios?")) {return;}
         }
         const files = event.target.files;
         Array.from(files).forEach(file => {
             if (file.name.toLowerCase().endsWith(".cdc")) {
                 abrirCDC(file);
             } else {
                 alert("Por favor, arrastra un archivo .cdc válido.");
             }
         });
    });
    
    $('#zoom_personalizado').on('change', function(event) {
         var z = parseFloat($(this).val() / 100);
         setZoom(z);
    });
    
    $('#zoom_aumentar').click(function() { setZoom(zoom * 1.1); });
    $('#zoom_reducir').click(function() { setZoom(zoom * 0.9); });
    $('#add_carta_plantilla').click(function() { abrir_menu_plantillas(); });
}

function cargarBarraLateralCartaSeleccionada() {
    var html_barra_lateral_carta = `
        <tr><td colspan=2 id='carta_seleccionada_controles_basicos' class='submenu_botones' >
            <div id='subir_carta_seleccionada' class='submenu_botones_boton' title='Subir carta seleccionada'> ⬆️ </div>
            <div id='bajar_carta_seleccionada' class='submenu_botones_boton' title='Bajar carta seleccionada'> ⬇️ </div>
            <div id='eliminar_cartas_seleccionadas' class='submenu_botones_boton' title='Eliminar cartas seleccionadas'> ❌ </div>
            <div id='duplicar_carta_seleccionada' class='submenu_botones_boton' title='Duplicar carta seleccionada'> 📄‍↔️📄 </div>
            <div id='exportar_cartas_seleccionadas' class='submenu_botones_boton' title='Exportar cartas seleccionadas'> 💾 </div>
        </td></tr>	
    `;
    
    vaciarTablaAtributos();
    $('#tabla_atributos').append(html_barra_lateral_carta);
    
    $('#subir_carta_seleccionada').click(function() { subir_cartas_seleccionadas(); });
    $('#bajar_carta_seleccionada').click(function() { bajar_cartas_seleccionadas(); });
    $('#eliminar_cartas_seleccionadas').click(function() { eliminar_cartas_seleccionadas(); });
    $('#duplicar_carta_seleccionada').click(function() { duplicar_cartas_seleccionadas(); });
    $('#exportar_cartas_seleccionadas').click(function() { exportar_cartas_seleccionadas(); });
    
    var ids_comunes = getDataIdsComunesEnSeleccionadas();
    ids_comunes.forEach(function(id) {
         var primer_objeto = $('.carta_seleccionada').find('[data-id="' + id + '"]').first();
         var plantilla = primer_objeto.attr("data-plantilla");
         var modulo = primer_objeto.attr("data-modulo");
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
