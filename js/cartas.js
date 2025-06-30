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
				<input id="importar_imagenes" type="file" multiple="multiple" id="imgs" style=" width: 100%; height: 100px; opacity: 0; position:absolute;"> 
			</div>
	`;
	
var html_barra_lateral_carta = `
		<div id='carta_seleccionada_controles_basicos' class='submenu_botones' >
			<div id='subir_carta_seleccionada' class='submenu_botones_boton' title='Subir carta seleccionada'> ⬆️ </div>
			<div id='bajar_carta_seleccionada' class='submenu_botones_boton' title='Bajar carta seleccionada'> ⬇️ </div>
		</div>
	`;

function inicializar(){
	
	cargarBarraLateralGeneral();
	
	$('#contenedor_paginas').click(function(){ desseleccionarCartas(); });
	
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
			img.attr('class','carta_fondo');
		  
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
	$('#menu_lateral').append("<span> "+cartas.length+ " cartas seleccionadas.</span>");
	
	$('#subir_carta_seleccionada').click(function(){ subir_cartas_seleccionadas() });
	$('#bajar_carta_seleccionada').click(function(){ bajar_cartas_seleccionadas() });
	
	if(cartas.length == 1){
		
		
		
	}else{
		//ver campos en común y añadir opciones
	}
	
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
    var carta_anterior = carta_actual.prev('.carta');

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
    var carta_siguiente = carta_actual.next('.carta');

    if (carta_siguiente.length === 0) return;

    // Intercambiar contenidos
    var temp = carta_actual.html();
    carta_actual.html(carta_siguiente.html());
    carta_siguiente.html(temp);
	carta_actual.removeClass('carta_seleccionada');
	carta_siguiente.addClass('carta_seleccionada');
}
