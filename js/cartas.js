var num_cartas = 0;
var num_pags = 1;

 $(document).ready(function(){
 
	inicializar();
	
	
});

var html_barra_lateral_general = `
		<div id="add_carta_vacia" style="border: 1px solid gray; background-color:#eeeeee; width:88%; margin:auto; margin-top: 10px; margin-bottom:10px; text-align:center; color: #999999; font-size: 15px; padding: 1%; cursor:pointer;">
				+ Carta Vacía
			</div>
			<div style="border: 1px dashed gray; background-color:#eeeeee; width:90%; height:100px; margin:auto; margin-top: 10px; margin-bottom:10px;">
				<div style="width:90%; margin:auto; margin-top: 40px; color: #999999; font-size: 15px; position:absolute; text-align:center;">+ Importar imágenes</div>
				<input id="importar_imagenes" type="file" multiple="multiple" style=" width: 100%; height: 100px; opacity: 0; position:absolute;"> 
			</div>
	`;
	
var html_barra_lateral_carta = `
		<div id='carta_seleccionada_controles_basicos' class='submenu_botones' >
			<div id='subir_carta_seleccionada' class='submenu_botones_boton' title='Subir carta seleccionada'> ⬆️ </div>
			<div id='bajar_carta_seleccionada' class='submenu_botones_boton' title='Bajar carta seleccionada'> ⬇️ </div>
			<div id='eliminar_cartas_seleccionadas' class='submenu_botones_boton' title='Eliminar cartas seleccionadas'> ❌ </div>
			<div id='duplicar_carta_seleccionada' class='submenu_botones_boton' title='Duplicar carta seleccionada'> 📄‍↔️📄 </div>
		</div>
	`;

function inicializar(){
	
	cargarBarraLateralGeneral();
	cargarFuncionalidadMenuPrincipal();
	
	$('#contenedor_paginas').click(function(){ desseleccionarCartas(); });
	
}

function cargarFuncionalidadMenuPrincipal(){
	$('#menu_archivo_nuevo').click(function(){ location.reload(); });
	$('#menu_edicion_seleccionar_todo').click(function(){ $(".carta").addClass('carta_seleccionada'); });
	$('#menu_edicion_seleccionar_nada').click(function(){ $(".carta_seleccionada").removeClass('carta_seleccionada'); });
}

function cargarBarraLateralGeneral(){
	
	
	$('#menu_lateral').empty();
	$('#menu_lateral').html(html_barra_lateral_general);
	
	$('#importar_imagenes').on('change', function(event) {
	  const files = event.target.files;

	  Array.from(files).forEach(file => {
		if (file.type.startsWith('image/')) {
			var carta = anyadirCartaVacia();
			var img = $('<img>');
			img.attr('src', URL.createObjectURL(file));
			carta.append(img);
			img.attr('data-id', 'carta_fondo');
			img.attr('class','img carta_fondo');
		  
		  //carta.css('background', 'url('+ URL.createObjectURL(file)+'');
		  //carta.css('background-size', '100% 100%');
		}
	  });
	});
	
	$('#add_carta_vacia').click(function(){ anyadirCartaVacia(); });
	
	
}

function cargarBarraLateralCartaSeleccionada(){
	$('#menu_lateral').empty();
	$('#menu_lateral').html(html_barra_lateral_carta);
	var cartas = $('.carta_seleccionada');
	
	$('#subir_carta_seleccionada').click(function(){ subir_cartas_seleccionadas() });
	$('#bajar_carta_seleccionada').click(function(){ bajar_cartas_seleccionadas() });
	$('#eliminar_cartas_seleccionadas').click(function(){ eliminar_cartas_seleccionadas() });
	$('#duplicar_carta_seleccionada').click(function(){ duplicar_cartas_seleccionadas() });
	
	if(cartas.length == 1){
		
		
		
	}else{
		//ver campos en común y añadir opciones
	}
	
	//añadir menús de los elementos comunes
	var ids_comunes = getDataIdsComunesEnSeleccionadas();
	
	
	ids_comunes.forEach(function(id) {
		 var primer_objeto = $('.carta_seleccionada').find('[data-id="' + id + '"]').first();

		// Obtener las clases (como array)
		var clases = primer_objeto.attr('class')?.split(/\s+/) || [];

		clases.forEach(function(clase) {
			cargarSubmenusClase(clase); 
		});
	});
	
}

function seleccionarCarta(n){

	var carta = $("#carta_"+n);
	if(carta.hasClass('carta_seleccionada')){
		carta.removeClass("carta_seleccionada");
	}else{
		carta.addClass("carta_seleccionada");
	}
	
	cargarBarraLateralCartaSeleccionada();
	
	return carta;
}

function desseleccionarCartas(){
	$(".carta_seleccionada").removeClass('carta_seleccionada');
	cargarBarraLateralGeneral();
}

function anyadirCartaVacia(){
	if(num_cartas%9 == 0 && num_cartas>0){
		anyadirPagina();
	}
	pagina = getUltimaPagina();
	num_cartas++;
	
	pagina.append("<div id='carta_"+num_cartas+"' class='carta' data-id='"+num_cartas+"'> </div>");
	
	$("#carta_"+num_cartas).click(function(event){ 
		if (!event.ctrlKey) {
			desseleccionarCartas();
		}			
		var id = $(this).attr('data-id'); 
		seleccionarCarta(id) 
		event.stopPropagation();
	});
	
	return getUltimaCarta();
}

function anyadirPagina(){
	var p = $('#contenedor_paginas').append("<div class='pagina'> </div>");
	num_pags++;
	return p;
}

function getUltimaPagina(){
	return $('#contenedor_paginas').children().last();
}

function getUltimaCarta(){
	var ultima_pagina = getUltimaPagina();
	return ultima_pagina.children().last();
}

function subir_cartas_seleccionadas() {
    var cartas_seleccionadas = $('.carta_seleccionada');

    if (cartas_seleccionadas.length !== 1) return;

    var carta_actual = cartas_seleccionadas.first();
    var todas_las_cartas = $('.carta');
	var index = todas_las_cartas.index(carta_actual);
	if (index > 0) {
		var carta_anterior = todas_las_cartas.eq(index - 1);
	}

    if (carta_anterior.length === 0) return;

    // Intercambiar contenidos
    var temp = carta_actual.html();
    carta_actual.html(carta_anterior.html());
    carta_anterior.html(temp);
	carta_actual.removeClass('carta_seleccionada');
	carta_anterior.addClass('carta_seleccionada');
}

function bajar_cartas_seleccionadas() {
    var cartas_seleccionadas = $('.carta_seleccionada');

    if (cartas_seleccionadas.length !== 1) return;

    var carta_actual = cartas_seleccionadas.first();
    var todas_las_cartas = $('.carta');
	var index = todas_las_cartas.index(carta_actual);
	if (index < todas_las_cartas.length - 1) {
		var carta_siguiente = todas_las_cartas.eq(index + 1);
	}

    if (carta_siguiente.length === 0) return;

    // Intercambiar contenidos
    var temp = carta_actual.html();
    carta_actual.html(carta_siguiente.html());
    carta_siguiente.html(temp);
	carta_actual.removeClass('carta_seleccionada');
	carta_siguiente.addClass('carta_seleccionada');
}

function eliminar_cartas_seleccionadas() {
    // 1. Eliminar todas las seleccionadas
    $('.carta_seleccionada').remove();

	reordenarCartas();
	
	cargarBarraLateralGeneral();
} 

function reordenarCartas(){
	 // 2. Guardar el contenido de todas las cartas restantes
    var cartas_guardadas = [];
    $('.carta').each(function() {
        cartas_guardadas.push($(this));
    });

    // 3. Eliminar todas las cartas del DOM
    $('.carta').remove();
    $('.pagina').remove();
	num_pags = 0;
	num_cartas = 0;
	anyadirPagina();

    // 4. Añadir cartas vacías y rellenarlas con el contenido guardado
    for (var i = 0; i < cartas_guardadas.length; i++) {
        var nueva_carta = anyadirCartaVacia(); // esta función debe devolver el nuevo div.carta insertado
        nueva_carta.html(cartas_guardadas[i].html());
		$(nueva_carta).attr("class", $(cartas_guardadas[i]).attr('class'));
    }
} // Quita todas las cartas y páginas y las vuelve añadir, útil cuando se elimina alguna o quedan huecos o cartas de más en alguna página

function duplicar_cartas_seleccionadas(){
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

function getClasesHijasComunesEnSeleccionadas() {
	coleccion = $(".carta_seleccionada");
    if (coleccion.length === 0) return [];

    // Inicializa con el conjunto de clases del primer elemento
    var clases_comunes = new Set();

    // Obtiene las clases de todos los descendientes del primer elemento
    coleccion.first().find('*').each(function () {
        $(this).attr('class')?.split(/\s+/).forEach(clase => {
            if (clase) clases_comunes.add(clase);
        });
    });

    // Para cada elemento restante, filtra las clases que no están en todos
    coleccion.slice(1).each(function () {
        var clases_en_este = new Set();
        $(this).find('*').each(function () {
            $(this).attr('class')?.split(/\s+/).forEach(clase => {
                if (clase) clases_en_este.add(clase);
            });
        });

        // Filtrar las que ya no están en este elemento
        clases_comunes.forEach(clase => {
            if (!clases_en_este.has(clase)) {
                clases_comunes.delete(clase);
            }
        });
    });

    return Array.from(clases_comunes);
}

function getDataIdsComunesEnSeleccionadas() {
	var coleccion = $('.carta_seleccionada');
    if (coleccion.length === 0) return [];

    // 1. Obtener los data-id del primer elemento
    let data_ids_comunes = new Set();
    coleccion.first().find('[data-id]').each(function () {
        const id = $(this).data('id');
        if (id) data_ids_comunes.add(id);
    });

    // 2. Filtrar los data-id que no están presentes en los demás elementos
    coleccion.slice(1).each(function () {
        let ids_en_este = new Set();
        $(this).find('[data-id]').each(function () {
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

function cargarSubmenusClase(clase){
	switch (clase) {
		case "img":
			submenu_img();
			break;
		default:
			console.log("Clase no reconocida");
	}
}

// FUNCIONALIDAD SUBMENÚS PARTES DE LA CARTA

function submenu_img(){
	var html_submenu_img = `
		<div style="border: 1px dashed gray; background-color:#eeeeee; width:90%; height:80px; margin:auto; margin-top: 10px; margin-bottom:10px;">
				<div style="width:90%; margin:auto; margin-top: 30px; color: #999999; font-size: 15px; position:absolute; text-align:center;">🔄Cambiar imagen fondo</div>
				<input id="img_cambiar_input" accept="image/*" type="file"  style=" width: 100%; height: 100px; opacity: 0; position:absolute;"> 
			</div>
	`;
	$('#menu_lateral').append(html_submenu_img);
	
	$('#img_cambiar_input').on('change', function(event) {
	   const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();

		reader.onload = function(e) {
			const imageDataUrl = e.target.result;

			// Cambiar el fondo en todas las cartas seleccionadas
			$('.carta_seleccionada .img').each(function() {
				// Si es una etiqueta <img>
				if ($(this).is('img')) {
					$(this).attr('src', imageDataUrl);
				} else {
					// Si es un div u otro elemento con fondo CSS
					$(this).css('background-image', `url(${imageDataUrl})`);
				}
			});
		};

		reader.readAsDataURL(file); // Lee la imagen como DataURL para mostrarla directamente
	  
	});
}