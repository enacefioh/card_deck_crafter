var version = "1.0.250721";
var num_cartas = 0;
var num_pags = 1;
var num_cartas_por_pag = 9;
var ultima_carta_seleccionada = -1;
var orientacion_vertical = true;

//Página
var autoconfigurada = false;
var padding_pagina_top = 25;
var padding_pagina_left = 25;
var padding_pagina_right = 0;
var padding_pagina_bottom = 0;
let hayCambiosPendientes = false;

 $(document).ready(function(){ inicializar(); });


function inicializar(){
	
	cargarBarraLateralGeneral();
	cargarFuncionalidadMenuPrincipal();	
	
	
	$('#contenedor_paginas').click(function(){ desseleccionarCartas(); });
	$('#cerrar_popup').on('click', cerrarPopup);	
	
	funcionalidadBarraLateralRedimensionadora();
	
	

	
	// Avisar antes de salir:
	window.addEventListener('beforeunload', (event) => {
	  if (hayCambiosPendientes) {
		event.preventDefault();
		// Algunos navegadores requieren asignar returnValue:
		event.returnValue = '';
		// El texto personalizado ya no se muestra (seguridad), pero el diálogo sí aparece.
	  }
	});

	
	
}
function funcionalidadBarraLateralRedimensionadora(){
	
	  const resizer = document.getElementById('resizer');
	  const panel = document.getElementById('menu_lateral_padre');
	  const contenido = document.getElementById('contenedor_paginas');
	  let isResizing = false;

	
	
	  resizer.addEventListener('mousedown', function () {
		isResizing = true;
		document.body.style.cursor = 'col-resize';
	  });

	  document.addEventListener('mousemove', function (e) {
		if (!isResizing) return;

		let newWidth = e.clientX;
		const minWidth = 150;
		const maxWidth = 500;
		newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

		panel.style.width = newWidth + 'px';
		resizer.style.left = newWidth + 'px';
		contenido.style.marginLeft = (newWidth + 5) + 'px';
	  });

	  document.addEventListener('mouseup', function () {
		if (isResizing) {
		  isResizing = false;
		  document.body.style.cursor = 'default';
		 
		}
	  });
}
async function cargarPluginsYPlantillas(){
	$ul_lista_modulos = $('#submenu_plantillas');
	$ul_lista_plugins = $('#submenu_plugins');
	
	
	for (var i = 0; i < modulos.length; i++){
	  let slug_modulo = modulos[i];	
	  
	  let link = document.createElement('link');
	  link.rel = 'stylesheet';
	  link.href = 'modulos/'+slug_modulo+'/style.css';
	  document.head.appendChild(link);
	  
	  const script = document.createElement('script');
	  script.src = `modulos/${slug_modulo}/script.js`;
	  script.onload = () => {
		 const plantillas = window.Plantillas[slug_modulo];
		 $ul_lista_modulos.append("<li  data-plantilla='"+slug_modulo+"'>"+plantillas.nombre+"<ul class='submenu' id='menu_modulo_plantillas_"+slug_modulo+"' ></ul></li>");
		 $ul_lista_plantillas = $('#menu_modulo_plantillas_'+slug_modulo);
		 for(var i = 0; i<plantillas.plantillas.length;i++){
			 var plantilla = plantillas.plantillas[i];
			 var slug_plantilla = plantilla.slug;
			 $ul_lista_plantillas.append("<li id='menu_plantilla_"+slug_plantilla+"' data-modulo='"+slug_modulo+"' data-plantilla='"+slug_plantilla+"'>"+plantilla.nombre+"</li>");
			  $('#menu_plantilla_'+slug_plantilla).click(function(){
				  var slug_modulo = $(this).attr('data-modulo');
				  var slug_plantilla = $(this).attr('data-plantilla');
				  anyadirCartaDesdePlantilla(slug_modulo, slug_plantilla);  
			  });
		 }
		 if(window.Plugins){
			const plugins = window.Plugins[slug_modulo];
			if(plugins){
			 $ul_lista_plugins.append("<li data-plugin='"+slug_modulo+"'>"+plugins.nombre+"<ul class='submenu' id='menu_modulo_plugins_"+slug_modulo+"' ></ul></li>");
			 $ul_lista_plugins = $('#menu_modulo_plugins_'+slug_modulo);		 
				 for(var i = 0; i<plugins.plugins.length;i++){
					 var plugin_ = plugins.plugins[i];
					 var slug_plugin = plugin_.slug;
					 $ul_lista_plugins.append("<li id='menu_plugin_"+slug_plugin+"' data-plugin='"+slug_plugin+"'>"+plugin_.nombre+"</li>");
					  $('#menu_plugin_'+slug_plugin).click(function(){
						 // var slug_plugin = $(this).attr('data-plugin');
						  plugin_.funcion();  
					  });
				 }
			}
		 }
		 
		/*if (plantilla) {
		  $ul_lista_plantillas.append("<li id='menu_plantilla_"+slug_plantilla+"' data-plantilla='"+slug_plantilla+"'>"+plantilla.nombre+"</li>");
		  $('#menu_plantilla_'+slug_plantilla).click(function(){
			  var slug_plantilla = $(this).attr('data-plantilla');
			  anyadirCartaDesdePlantilla(slug_plantilla);
			  
		  });
		  
		} */
		//cargar plugins y plantillas
		
	  };
	  document.body.appendChild(script);
	  
	}						

}
function cargarFuncionalidadMenuPrincipal(){
	//Archivo
	$('#menu_archivo_nuevo').click(function(){ location.reload(); });
	$('#importar_cdc').click(function(){ importarProyectoCDC(); });
	$('#guardar_cdc').click(function(){ exportarProyectoCDC(); });
	$('#exportar_cartas_png').click(function(){ $(".carta").addClass('carta_seleccionada'); exportar_cartas_seleccionadas(); });
	$('#configurar_pagina').click(function(){ configurarPagina(); });
	
	//Edición
		//Seleccionar
		$('#menu_edicion_seleccionar_todo').click(function(){ $(".carta").addClass('carta_seleccionada'); });
		$('#menu_edicion_seleccionar_nada').click(function(){ $(".carta_seleccionada").removeClass('carta_seleccionada'); });
	
	//Anyadir
		//Vacía
		$('#menu_anyadir_carta_standard_vertical').click(function(){ anyadirCartaStandardVertical(); });
		$('#menu_anyadir_carta_standard_horizontal').click(function(){ anyadirCartaStandardHorizontal(); });
	
	//Plugins
	
	
	//Ayuda
	$('#app_version').html("Card Deck Editor v"+version);
	
	
	
	cargarPluginsYPlantillas();

	
}


//MENU SUPERIOR
	// Archivo
	function importarProyectoCDC() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.cdc'; 

    input.onchange = (event) => {
        const archivo = event.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();

        lector.onload = (e) => {
            try {
                const datos = JSON.parse(e.target.result);

                // Asignar variables globales
                window.num_cartas = datos.num_cartas;
                window.num_pags = datos.num_pags;
                window.num_cartas_por_pag = datos.num_cartas_por_pag;
                window.padding_pagina_top = datos.padding_pagina_top;
                window.padding_pagina_left = datos.padding_pagina_left;
                window.padding_pagina_right = datos.padding_pagina_right;
                window.padding_pagina_bottom = datos.padding_pagina_bottom;

                // Insertar HTML en el contenedor
                document.getElementById('contenedor_paginas').innerHTML = datos.contenido_html;
				$(".carta").each( function(){
					$(this).click(function(event){ 
						if (!event.ctrlKey) {
							desseleccionarCartas();
						}			
						var id = $(this).attr('data-id'); 
						seleccionarCarta(id) 
						event.stopPropagation();
					});
				});

                console.log('Proyecto cargado:', datos);
            } catch (error) {
                alert('Error al leer el archivo. ¿Es un archivo válido .cdc?');
                console.error(error);
            }
        };

        lector.readAsText(archivo);
    };

    input.click(); // simula el click del usuario
}
	function exportarProyectoCDC() {
    // Datos base
    

    const contenido_html = document.getElementById('contenedor_paginas').innerHTML;

    // Crear objeto JSON
    const data = {
        version: version,
        num_cartas: num_cartas,
        num_pags: num_pags,
		num_cartas_por_pags: num_cartas_por_pag,
		padding_pagina_top: padding_pagina_top,
		padding_pagina_left: padding_pagina_left,
		padding_pagina_right: padding_pagina_right,
		padding_pagina_bottom: padding_pagina_bottom,
        contenido_html: contenido_html
    };

    // Convertir a JSON y exportar como .cdc
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'cartas.cdc';
    enlace.click();
	hayCambiosPendientes = false;
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
	function configurarPagina(){
		abrirPopup();
		
		$('#contenedor_popup').append("<h2 style='text-align:center;'>Configuración de la página</h2>");
		$('#contenedor_popup').append(`
			<div style="display: flex; gap: 20px; justify-content: center; align-items: center; margin: 20px 0;">
  
		  <!-- Opción Vertical -->
		  <label id='radio_orientacion_vertical' class='radio_orientacion_seleccionado' style="cursor: pointer; text-align: center;">
			<input type="radio"  name="orientacion_folio" value="vertical" checked
				   style="display: none;" onchange="this.parentElement.classList.add('radio_orientacion_seleccionado'); this.parentElement.nextElementSibling.classList.remove('radio_orientacion_seleccionado');">
			<div style="width: 40px; height: 60px; border: 2px solid gray; margin-bottom: 5px; box-sizing: border-box;"></div>
			<span style="display: block; font-size: 12px;">Vertical</span>
		  </label>

		  <!-- Opción Horizontal -->
		  <label id='radio_orientacion_horizontal' style="cursor: pointer; text-align: center;">
			<input  type="radio" name="orientacion_folio" value="horizontal"
				   style="display: none;" onchange="this.parentElement.classList.add('radio_orientacion_seleccionado'); this.parentElement.previousElementSibling.classList.remove('radio_orientacion_seleccionado');">
			<div class='' style="width: 60px; height: 40px; border: 2px solid gray; margin-bottom: 5px; box-sizing: border-box;"></div>
			<span style="display: block; font-size: 12px;">Apaisada</span>
		  </label>

		</div>

		`);
		
	
		$('#contenedor_popup').append(`<table style='margin:auto; margin-bottom:20px;'>
			<tr><td style='text-align:right;'>Cartas por página:<td><td style='text-align:left;'><input id='config_num_cartas_por_pag' style='width:30px;' type='number' value='`+num_cartas_por_pag+`'></td></tr>
			<tr><td style='text-align:right;'>Márgen página superior:<td><td style='text-align:left;'><input id='config_margen_pag_superior' style='width:50px;' type='number' value='`+padding_pagina_top+`'>px.</td></tr>
			<tr><td style='text-align:right;'>Márgen página derecho:<td><td style='text-align:left;'><input id='config_margen_pag_derecho' style='width:50px;' type='number' value='`+padding_pagina_right+`'>px.</td></tr>
			<tr><td style='text-align:right;'>Márgen página inferior:<td><td style='text-align:left;'><input id='config_margen_pag_inferior' style='width:50px;' type='number' value='`+padding_pagina_bottom+`'>px.</td></tr>
			<tr><td style='text-align:right;'>Márgen página izquierdo:<td><td style='text-align:left;'><input id='config_margen_pag_izquierdo' style='width:50px;' type='number' value='`+padding_pagina_left+`'>px.</td></tr>
		</table>`);
		$('#contenedor_popup').append("<div id='config_pag_aceptar' class='boton' style='background-color: #12a629;'>Aceptar</div><div id='config_pag_cancelar' class='boton' style='background-color: #c83902;'>Cancelar</div>");
	
		if(!orientacion_vertical){
			$("#radio_orientacion_vertical input").prop("checked", false);
			$("#radio_orientacion_horizontal input").prop("checked", true);
			$("#radio_orientacion_vertical").removeClass("radio_orientacion_seleccionado");
			$("#radio_orientacion_horizontal").addClass("radio_orientacion_seleccionado");
		}
		
		$('#config_pag_cancelar').click(function(){ cerrarPopup() });
		$('#config_pag_aceptar').click(function(){ 
			//Orientación
			if($("#radio_orientacion_vertical input").prop("checked")){
				orientacion_vertical = true;
				//$('.pagina').css('height', '290mm');
				//$('.pagina').css('width', '210mm');
				const style = document.createElement('style');
				style.textContent = `.pagina {
				  width: 210mm;
				  height: 290mm;
				}`;
				document.head.appendChild(style);
			}else{
				orientacion_vertical = false;				
				//$('.pagina').css('width', '290mm');
				//$('.pagina').css('height', '210mm');
				const style = document.createElement('style');
				style.textContent = `.pagina {
				  width: 290mm;
				  height: 210mm;
				}`;
				document.head.appendChild(style);
				
				
			}
			
			padding_pagina_top = $('#config_margen_pag_superior').val();
			padding_pagina_left = $('#config_margen_pag_izquierdo').val();
			padding_pagina_right = $('#config_margen_pag_derecho').val();
			padding_pagina_bottom = $('#config_margen_pag_inferior').val();
			
			$('.pagina').css('margin-top', ""+padding_pagina_top+"px");
			$('.pagina').css('margin-left', ""+padding_pagina_left+"px");
			$('.pagina').css('margin-right', ""+padding_pagina_right+"px");
			$('.pagina').css('margin-bottom', ""+padding_pagina_bottom+"px");
			
			//Núm cartas
			num_cartas_por_pag = $('#config_num_cartas_por_pag').val();
			reordenarCartas();
			cerrarPopup(); 
		});
		
		
		
	}

	//Edicion
	
	//Anyadir
	
	
//MENÚ LATERAL
function cargarBarraLateralGeneral(){
	
	var html_barra_lateral_general = `
		 <div id="add_carta_plantilla" style="border: 1px solid gray; background-color:#eeeeee; width:88%; margin:auto; margin-top: 10px; margin-bottom:10px; text-align:center; color: #999999; font-size: 15px; padding: 1%; cursor:pointer;"> + Añadir Carta</div>
			<div style="border: 1px dashed gray; background-color:#eeeeee; width:90%; height:100px; margin:auto; margin-top: 10px; margin-bottom:10px;">
				<div style="width:90%; margin:auto; margin-top: 40px; color: #999999; font-size: 15px; position:absolute; text-align:center;">+ Importar imágenes</div>
				<input id="importar_imagenes" type="file" multiple="multiple" style=" width: 100%; height: 100px; opacity: 0; position:absolute;"> 
			</div>
	`;
	
	$('#menu_lateral').empty();
	$('#menu_lateral').html(html_barra_lateral_general);
	
	$('#importar_imagenes').on('change', function(event) {
	  const files = event.target.files;

	  Array.from(files).forEach(file => {
		if (file.type.startsWith('image/')) {
			var carta = anyadirCarta(63,88);
			
			
			var img = carta.find('.carta_fondo');
			img.css('background-image', 'url("'+URL.createObjectURL(file)+'")');
			img.css('background-position', 'center');
			img.css('background-size', 'cover');	
		  
		  
		  //carta.css('background', 'url('+ URL.createObjectURL(file)+'');
		  //carta.css('background-size', '100% 100%');
		}
	  });
	});
	
	$('#add_carta_vacia').click(function(){ anyadirCartaStandardVertical(); });
	$('#add_carta_plantilla').click(function(){ abrir_menu_plantillas(); });
	
}
function cargarBarraLateralCartaSeleccionada(){
	
	var html_barra_lateral_carta = `
		<div id='carta_seleccionada_controles_basicos' class='submenu_botones' >
			<div id='subir_carta_seleccionada' class='submenu_botones_boton' title='Subir carta seleccionada'> ⬆️ </div>
			<div id='bajar_carta_seleccionada' class='submenu_botones_boton' title='Bajar carta seleccionada'> ⬇️ </div>
			<div id='eliminar_cartas_seleccionadas' class='submenu_botones_boton' title='Eliminar cartas seleccionadas'> ❌ </div>
			<div id='duplicar_carta_seleccionada' class='submenu_botones_boton' title='Duplicar carta seleccionada'> 📄‍↔️📄 </div>
			<div id='exportar_cartas_seleccionadas' class='submenu_botones_boton' title='Exportar cartas seleccionadas'> 💾 </div>
		</div>
	`;
	
	$('#menu_lateral').empty();
	$('#menu_lateral').html(html_barra_lateral_carta);
	var cartas = $('.carta_seleccionada');
	
	$('#subir_carta_seleccionada').click(function(){ subir_cartas_seleccionadas() });
	$('#bajar_carta_seleccionada').click(function(){ bajar_cartas_seleccionadas() });
	$('#eliminar_cartas_seleccionadas').click(function(){ eliminar_cartas_seleccionadas() });
	$('#duplicar_carta_seleccionada').click(function(){ duplicar_cartas_seleccionadas() });
	$('#exportar_cartas_seleccionadas').click(function(){ exportar_cartas_seleccionadas() });
	
	if(cartas.length == 1){
		
		
		
	}else{
		//ver campos en común y añadir opciones
	}
	
	//añadir menús de los elementos comunes
	var ids_comunes = getDataIdsComunesEnSeleccionadas();
	
	
	ids_comunes.forEach(function(id) {
		 var primer_objeto = $('.carta_seleccionada').find('[data-id="' + id + '"]').first();

	
		var plantilla = primer_objeto.attr("data-plantilla");
		var modulo = primer_objeto.attr("data-modulo");

	// Obtener las clases (como array)
		var clases = primer_objeto.attr('class')?.split(/\s+/) || [];

		clases.forEach(function(clase) {
			cargarSubmenusClase(clase, id, modulo, plantilla); 
		});
		
		
		
	});
	
}

//+Carta vacía: MENÚ SUPERIOR > anyadirCartaStandardVertical()
function abrir_menu_plantillas(){
	abrirPopup();
	$('#contenedor_popup').append("<div id='contenedor_popup_interior' style=\"display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;\"></div>");
	
	$('#contenedor_popup_interior').append("<h2 title='Plantillas Vacías' style='width:100%; text-align:center;' >Plantillas Vacías</h2>");
	
	$('#contenedor_popup_interior').append("<div style='text-align:center; cursor:pointer;' title='Standard Vertical' onclick='anyadirCarta(63,88); cerrarPopup();' > <div style='width:107px; height:150px; border:2px solid #ccc; border-radius:1mm; box-sizing: border-box; padding-top:50px; font-size:12px; text-align:center'> 63mm x 88mm </div> <br /> <div style='font-size: 12px; max-width: 170px; height: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>Standard Vertical</div></div>");
	$('#contenedor_popup_interior').append("<div style='text-align:center; cursor:pointer;' title='Standard Horizontal' onclick='anyadirCarta(88,63); cerrarPopup();' > <div style='width:150px; height:107px; border:2px solid #ccc; border-radius:1mm; box-sizing: border-box; padding-top:50px; font-size:12px; text-align:center'> 88mm x 63mm </div> <br /> <div style='font-size: 12px; max-width: 170px; height: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>Standard Horizontal</div></div>");
	$('#contenedor_popup_interior').append("<div style='text-align:center; cursor:pointer;' title='Tarot Vertical' onclick='anyadirCarta(70,120); cerrarPopup();' > <div style='width:88px; height:150px; border:2px solid #ccc; border-radius:1mm; box-sizing: border-box; padding-top:50px; font-size:12px; text-align:center'> 70mm x 120mm </div> <br /> <div style='font-size: 12px; max-width: 170px; height: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>Tarot Vertical</div></div>");
	$('#contenedor_popup_interior').append("<div style='text-align:center; cursor:pointer;' title='Tarot Horizontal' onclick='anyadirCarta(120,70); cerrarPopup();' > <div style='width:150px; height:88px; border:2px solid #ccc; border-radius:1mm; box-sizing: border-box; padding-top:50px; font-size:12px; text-align:center'> 120mm x 70mm </div> <br /> <div style='font-size: 12px; max-width: 170px; height: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>Tarot Horizontal</div></div>");
	
	for (const key in window.Plantillas) {
		const plantillas = window.Plantillas[key];
	    $('#contenedor_popup_interior').append("<h2 title='"+plantillas.desc+"' style='width:100%; text-align:center;' >"+plantillas.nombre+"</h2>");
		for (const clave in window.Plantillas[key].plantillas){
			const plantilla = window.Plantillas[key].plantillas[clave];
			$('#contenedor_popup_interior').append("<div class='anyadir_desde_plantilla' data-modulo="+key+" data-plantilla='"+plantilla.slug+"' style='text-align:center; cursor:pointer;' title='"+plantilla.desc+"' ><img style='max-height:150px; max-width:150px;' src='./modulos/"+key+"/mini_"+plantilla.slug+".png' /> <br /> <div style='font-size: 12px; max-width: 170px; height: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>"+plantilla.nombre+"</div></div>");
		}
		$('#contenedor_popup_interior').append("<div style='clear:both;'> </div>");
	};
	$('.anyadir_desde_plantilla').click(function(){
		var slug_plantilla = $(this).attr('data-plantilla');
		var slug_modulo = $(this).attr('data-modulo');
		anyadirCartaDesdePlantilla(slug_modulo, slug_plantilla);
		cerrarPopup();
	});	
}


//FUNCIONES
	//CARTAS	
	function anyadirCarta(width_mm, height_mm){
		hayCambiosPendientes = true;
		if(num_cartas%num_cartas_por_pag == 0 && num_cartas>0){
			anyadirPagina();
		}
		pagina = getUltimaPagina();
		num_cartas++;
		
		pagina.append("<div id='carta_"+num_cartas+"' style='width:"+width_mm+"mm; height:"+height_mm+"mm' class='carta' data-id='"+num_cartas+"'> </div>");
		
		$("#carta_"+num_cartas).click(function(event){ 
			var id = $(this).attr('data-id'); 
			 if(event.shiftKey && ultima_carta_seleccionada > 0){
				desseleccionarCartas();
				var inicio = ultima_carta_seleccionada;
				var fin = id;
				if(id<ultima_carta_seleccionada){
					inicio = id;
					fin = ultima_carta_seleccionada;
				}
				for(var i = inicio; i<=fin;i++){
					seleccionarCarta(i)
				}
				
			}else{
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
		img.attr('class','img carta_fondo');
		if(num_cartas <= 1 && !autoconfigurada){
			autoConfigurarPagina(pagina, carta);
		}
		return carta;
	}
	function seleccionarCarta(n){

		var carta = $("#carta_"+n);
		if(carta.hasClass('carta_seleccionada')){
			carta.removeClass("carta_seleccionada");
		}else{
			carta.addClass("carta_seleccionada");
		}
		
		cargarBarraLateralCartaSeleccionada();
		ultima_carta_seleccionada = n;
		return carta;
	}
	function desseleccionarCartas(){
		$(".carta_seleccionada").removeClass('carta_seleccionada');
		cargarBarraLateralGeneral();
	}
	function getUltimaCarta(){
		var ultima_pagina = getUltimaPagina();
		return ultima_pagina.children().last();
	}
	function subir_cartas_seleccionadas() {
		hayCambiosPendientes = true;
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
		w_anterior = carta_anterior.css('width');
		h_anterior = carta_anterior.css('height');
		carta_anterior.css('width', carta_actual.css('width'));
		carta_anterior.css('height', carta_actual.css('height'));
		carta_actual.css('width', w_anterior);
		carta_actual.css('height', h_anterior);
	}
	function bajar_cartas_seleccionadas() {
		hayCambiosPendientes = true;
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
		w_siguiente = carta_siguiente.css('width');
		h_siguiente = carta_siguiente.css('height');
		carta_siguiente.css('width', carta_actual.css('width'));
		carta_siguiente.css('height', carta_actual.css('height'));
		carta_actual.css('width', w_siguiente);
		carta_actual.css('height', h_siguiente);
	}
	function eliminar_cartas_seleccionadas() {
		// 1. Eliminar todas las seleccionadas
		$('.carta_seleccionada').remove();
		reordenarCartas();
		cargarBarraLateralGeneral();
	} 
	function reordenarCartas(){ // Quita todas las cartas y páginas y las vuelve añadir, útil cuando se elimina alguna o quedan huecos o cartas de más en alguna página
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
			var nueva_carta = anyadirCarta(1,1); // esta función debe devolver el nuevo div.carta insertado
			nueva_carta.css('width', cartas_guardadas[i].css('width'));
			nueva_carta.css('height', cartas_guardadas[i].css('height'));
			nueva_carta.html(cartas_guardadas[i].html());
			$(nueva_carta).attr("class", $(cartas_guardadas[i]).attr('class'));
			w_guardada = cartas_guardadas[i].css('width');
			h_guardada = cartas_guardadas[i].css('height');
			nueva_carta.css('width', w_guardada);
			nueva_carta.css('height', h_guardada);
		}
	} 
	function duplicar_cartas_seleccionadas(){
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

		let data_ids_comunes = new Set();
		coleccion.first().find('[data-id]').each(function () {
			const id = $(this).data('id');
			if (id) data_ids_comunes.add(id);
		});

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
	function anyadirCartaDesdePlantilla(slug_modulo, slug_plantilla) {
		hayCambiosPendientes = true;
		const plantillas = window.Plantillas[slug_modulo];
		for(var i = 0; i< plantillas.plantillas.length; i++){
			if(plantillas.plantillas[i].slug == slug_plantilla){
				var w = 63;
				var h = 88;
				if(plantillas.plantillas[i].width)
					w = plantillas.plantillas[i].width;
				if(plantillas.plantillas[i].height)
					h = plantillas.plantillas[i].height;
				const carta = anyadirCarta(w,h);
				carta.html(plantillas.plantillas[i].html);
				return carta;
			}	  
		}
		return anyadirCarta(63,88);	
	}

	//PARTES CARTA EDITABLES
	function cargarSubmenusClase(clase, id, slug_modulo ,slug_plantilla){
		switch (clase) {
			case "menu_plantilla":			
				const plantillas = window.Plantillas[slug_modulo];	
				for(var i = 0; i< plantillas.plantillas.length; i++){
					if(plantillas.plantillas[i].slug == slug_plantilla){
					
						plantillas.plantillas[i].cargarOpcionesEnMenu(id);
					}	  
				}			
				break;
			case "img":
				submenu_img(id);
				break;
			case "texto_editable":
				submenu_texto_editable(id);
				break;	
			case "texto_linea":
				submenu_texto_linea(id);
				break;	
			case "texto_numero":
				submenu_texto_numero(id);
				break;
			case "img_swap":
				submenu_img_swap(id);
				break;	
			case "tintable":
				submenu_tintable(id);
				break;	
			case "titulo_seccion":
				submenu_titulo_seccion(id);
				break;	
			case "eliminable":
				submenu_eliminable(id);
				break;
			default:
				console.log("Clase no reconocida");
		}
	}
	function submenu_titulo_seccion(id){
		var texto = "";
		if($('.carta_seleccionada').length == 1){
			texto = $('.carta_seleccionada * [data-id='+id+']').html();
		}
		var html_submenu_texto_linea = `
			<u class='seccion_editable' style='idth: 100%; display: block; text-align: center; padding-top: 8px;'>
				`+slugToTexto(id)+`</u>
		`;	
		
		$('#menu_lateral').append(html_submenu_texto_linea);
	
			
	}
	function submenu_texto_linea(id){
		var texto = "";
		if($('.carta_seleccionada').length == 1){
			texto = $('.carta_seleccionada * [data-id='+id+']').html();
		}
		var html_submenu_texto_linea = `
			<div class='seccion_editable'>
				<div class='seccion_texto'>
					<div class='etiqueta_submenu'>`+slugToTexto(id)+`: </div>
					<input type='text' id='texto_linea_`+id+`' data-id='`+id+`' style='max-width:45%; margin-right: 5%; float:right;' value='`+texto+`' />
				</div>
			</div>
		`;	
		
		$('#menu_lateral').append(html_submenu_texto_linea);
		
		
		$('#texto_linea_'+id).on('input', function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			$('.carta_seleccionada * [data-id='+id_objeto+']').html($(this).val());
			
		});
			
	}
	function submenu_eliminable(id){
		var texto = "";
		if($('.carta_seleccionada').length == 1){
			texto = $('.carta_seleccionada * [data-id='+id+']').html();
		}
		var html_submenu_texto_eliminar_elemento = `
			<div class='seccion_editable'>
				<div class='seccion_texto'>
					<div class='etiqueta_submenu'>Eliminar `+slugToTexto(id)+`: </div>
					<span id='eliminar_elemento_`+id+`' data-id='`+id+`' style='cursor:pointer; color:red;' >❌</span>
				</div>
			</div>
		`;	
		
		$('#menu_lateral').append(html_submenu_texto_eliminar_elemento);
		
		
		$('#eliminar_elemento_'+id).click( function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			$('.carta_seleccionada * [data-id='+id_objeto+']').remove();
			cargarBarraLateralCartaSeleccionada();
			
		});
			
	}
	function submenu_texto_numero(id){
		var texto = "";
		if($('.carta_seleccionada').length == 1){
			texto = $('.carta_seleccionada * [data-id='+id+']').html();
		}
		var html_submenu_texto_linea = `
			<div class='seccion_editable'>
				<div class='seccion_num'>
					<div class='etiqueta_submenu'>`+slugToTexto(id)+`: </div>
					<input type='number' step='1' id='texto_num_`+id+`' data-id='`+id+`' style='max-width:45%; margin-right: 5%; float:right;' value='`+texto+`' />
				</div>
			</div>
		`;	
		
		$('#menu_lateral').append(html_submenu_texto_linea);
		
		
		$('#texto_num_'+id).on('input', function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			$('.carta_seleccionada * [data-id='+id_objeto+']').html($(this).val());
			
		});
			
	}
	function submenu_texto_editable(id){
		var texto = "";
		if($('.carta_seleccionada').length == 1){
			texto = $('.carta_seleccionada * [data-id='+id+']').html().replace(/<br\s*\/?>/gi, '\n');
		}
		var html_submenu_texto_editable = `
			<div class='seccion_editable'>
				<div style='width:90%; margin-left: 5%; text-align:center;'>
					<div style='display:inline-block; float:left;'>`+slugToTexto(id)+`: </div>
					<div id='texto_editable_abrir_menu_edicion_`+id+`' data-id='`+id+`' class="submenu_botones_boton_texto_editable" title="Abrir controles">🔽</div>
				</div>
				<div id='texto_editable_menu_edicion_`+id+`' style='width:90%; margin-left: 5%; text-align:center; display:none; clear:both;'>
					<div id='texto_editable_aumentar_`+id+`' data-id='`+id+`' class="submenu_botones_boton_texto_editable" title="Negrita"><b>+</b></div>
					<div id='texto_editable_reducir_`+id+`' data-id='`+id+`' class="submenu_botones_boton_texto_editable" title="Negrita"><b>-</b></div>
					<div id='texto_editable_negrita_`+id+`' data-id='`+id+`' class="submenu_botones_boton_texto_editable" title="Negrita"><b>B</b></div>
					<div id='texto_editable_cursiva_`+id+`' data-id='`+id+`' class="submenu_botones_boton_texto_editable" title="Cursiva"><i>I</i></div>
					<div id='texto_editable_subrayado_`+id+`' data-id='`+id+`' class="submenu_botones_boton_texto_editable" title="Subrayado"><u>U</u></div>
				</div>
				<textarea id='texto_editable_`+id+`' data-id='`+id+`' style='width:90%; height:50px; margin-left: 5%;'>`+texto+`</textarea>
			</div>
		`;	
		
		$('#menu_lateral').append(html_submenu_texto_editable);
		
		$('#texto_editable_abrir_menu_edicion_'+id).click(function(){
			if($('#texto_editable_menu_edicion_'+id).css('display') == 'none'){
				$('#texto_editable_menu_edicion_'+id).css('display', 'block');
				$(this).html("🔼");
			}else{
				$('#texto_editable_menu_edicion_'+id).css('display', 'none');
				$(this).html("🔽");
			}
		});	
		
		$('#texto_editable_aumentar_'+id).click(function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			var $texto = $('.carta_seleccionada * [data-id='+id_objeto+']');
			var tam = parseInt($texto.css('font-size'), 10)+1;
			$texto.css('font-size', tam );
			
		});	
		
		$('#texto_editable_reducir_'+id).click(function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			var $texto = $('.carta_seleccionada * [data-id='+id_objeto+']');
			var tam = parseInt($texto.css('font-size'), 10)-1;
			$texto.css('font-size', tam );
		});	
		
		$('#texto_editable_negrita_'+id).click(function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			var textarea = $('#texto_editable_'+id_objeto);
			
				let start = textarea[0].selectionStart;
				let end = textarea[0].selectionEnd;

				if (start === end) return; // nada seleccionado

				const texto = textarea.val();
				const antes = texto.slice(0, start);
				const seleccionado = texto.slice(start, end);
				const despues = texto.slice(end);

				const conEtiquetas = `<b>${seleccionado}</b>`;
				textarea.val(antes + conEtiquetas + despues);

				// restaurar selección tras insertar
				textarea.focus();
				textarea[0].selectionStart = start;
				textarea[0].selectionEnd = start + conEtiquetas.length;
				
				$('.carta_seleccionada * [data-id='+id_objeto+']').html(textarea.val());
		});	
		
		$('#texto_editable_cursiva_'+id).click(function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			var textarea = $('#texto_editable_'+id_objeto);
			
				let start = textarea[0].selectionStart;
				let end = textarea[0].selectionEnd;

				if (start === end) return; // nada seleccionado

				const texto = textarea.val();
				const antes = texto.slice(0, start);
				const seleccionado = texto.slice(start, end);
				const despues = texto.slice(end);

				const conEtiquetas = `<i>${seleccionado}</i>`;
				textarea.val(antes + conEtiquetas + despues);

				// restaurar selección tras insertar
				textarea.focus();
				textarea[0].selectionStart = start;
				textarea[0].selectionEnd = start + conEtiquetas.length;
				
				$('.carta_seleccionada * [data-id='+id_objeto+']').html(textarea.val());
		});	
		
		$('#texto_editable_subrayado_'+id).click(function(){
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			var textarea = $('#texto_editable_'+id_objeto);
			
				let start = textarea[0].selectionStart;
				let end = textarea[0].selectionEnd;

				if (start === end) return; // nada seleccionado

				const texto = textarea.val();
				const antes = texto.slice(0, start);
				const seleccionado = texto.slice(start, end);
				const despues = texto.slice(end);

				const conEtiquetas = `<u>${seleccionado}</u>`;
				textarea.val(antes + conEtiquetas + despues);

				// restaurar selección tras insertar
				textarea.focus();
				textarea[0].selectionStart = start;
				textarea[0].selectionEnd = start + conEtiquetas.length;
				
				$('.carta_seleccionada * [data-id='+id_objeto+']').html(textarea.val());
		});	
		
		$('#texto_editable_' + id).on('input', function () {
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			var texto_con_saltos = $(this).val().replace(/\n/g, '<br>');
			$(".carta_seleccionada [data-id='" + id_objeto + "']").html(texto_con_saltos);
		});
			
	}
	function submenu_img(id){
		var html_submenu_img = `
			<div style=" background-color:#eeeeee; width:90%; height:50px; margin:auto; margin-top: 10px; margin-bottom:10px;">
					<div style="width: calc(75% - 40px); height:50px; left:10px; padding:15px; color: #999999; font-size: 15px; position:absolute; text-align:center; border: 1px dashed gray; box-sizing:border-box; overflow:hidden; text-overflow: ellipsis; white-space: nowrap;">🔄Cambiar imagen `+slugToTexto(id)+`</div>
					<input id="img_cambiar_input_`+id+`" data-id='`+id+`' accept="image/*" type="file"  style=" width: calc(90% - 40px); height: 50px; opacity: 0; position:absolute;"> 
					<div style="width:12%; right:15px;  font-size: 25px; position:absolute; text-align:center;">
						<div id='img_cambiar_eliminar_`+id+`' data-id='`+id+`' style='cursor:pointer;'>❌</div>
					</div>
					<div style="width:12%; right:20%;  font-size: 25px; position:absolute; text-align:center;">
						<div id='img_pegar_`+id+`' data-id='`+id+`' style='cursor:pointer;'>📋</div>
					</div>
				</div>
		`;
		$('#menu_lateral').append(html_submenu_img);
		
		$('#img_cambiar_eliminar_'+id).click( function() {
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			$('.carta_seleccionada [data-id='+id_objeto+']').each(function() {
				$(this).css('background-image', '');
			});
		});
		
		$('#img_cambiar_input_'+id).on('change', function(event) {
			hayCambiosPendientes = true;
		   const file = event.target.files[0];
			if (!file) return;

			const reader = new FileReader();
			var id_objeto = $(this).attr('data-id');
			reader.onload = function(e) {
				const imageDataUrl = e.target.result;

				// Cambiar el fondo en todas las cartas seleccionadas
				
				$('.carta_seleccionada [data-id='+id_objeto+']').each(function() {					
					$(this).css('background-image', 'url("'+imageDataUrl+'")');
					$(this).css('background-position', 'center');
					$(this).css('background-size', 'cover');					
				});
			};

			reader.readAsDataURL(file); // Lee la imagen como DataURL para mostrarla directamente
		});
		
		$('#img_pegar_'+id).click( function() {
			hayCambiosPendientes = true;
			var id_objeto = $(this).attr('data-id');
			getImagenPortapapelesABase64().then(base64 => {
			  if (base64) {
				$('.carta_seleccionada [data-id='+id_objeto+']').each(function() {
					$(this).css('background-image', 'url("'+base64+'")');
					$(this).css('background-position', 'center');
					$(this).css('background-size', 'cover');	
				});
			  } else {
				alert("No hay imagen en el portapapeles.");
			  }
			});
			
		});
	}
	function submenu_img_swap(id){
		
		var item = $('.carta_seleccionada * [data-id='+id+']');
		
		var num_opcs = item.attr('data-cantidad');
		
		var html_submenu_img = `
			<div class='seccion_editable' style='padding-bottom:3px;'>
			<div class='etiqueta_submenu'>`+slugToTexto(id)+`: </div>
			<select style='width:49%; margin-bottom:3px; display:inline-block; float:right; margin-right:5%;' name="select_`+id+`" id="select_`+id+`">
			`;
		for(i=1; i<=num_opcs;i++){
			var num_titulo = item.attr('data-nombre'+i);
			html_submenu_img += '<option value="'+i+'">'+num_titulo+'</option>';
		}		
			
			
			html_submenu_img += '</select> </div>';
			
		
		 $('#menu_lateral').append(html_submenu_img);
		 
		 if (item.attr("data-seleccionado") !== undefined) {
			  $('#select_'+id).val(item.attr("data-seleccionado"));
		 }

		
		$('#select_'+id).on('change', function(event) {
			hayCambiosPendientes = true;
			var indice = $(this).val();
			var img_base64 = item.attr('data-src'+indice);
			item.attr('data-seleccionado', indice);
			item.css('background-image', 'url("'+img_base64+'")');
			item.css('background-position', 'center');
			item.css('background-size', 'cover');
		}); 
	}
	function submenu_tintable(id){
		
		var item = $('.carta_seleccionada * [data-id='+id+']');
		
		var html_submenu_tintado = `
			<div class='seccion_editable' style='padding-bottom:3px;'>
			<div class='etiqueta_submenu'>Color `+slugToTexto(id)+`: </div>
			

			<input style='width:49%; margin-bottom:3px; display:inline-block; float:right; margin-right:5%;' type="color" name="select_`+id+`" id="select_`+id+`" value="#ffffff">
			`;
		
		 $('#menu_lateral').append(html_submenu_tintado);
		
		 if( $('.carta_seleccionada [data-id=' + id + ']').attr('data-val-tintable')!== undefined){
			 const color_sugerido = $('.carta_seleccionada [data-id=' + id + ']').attr('data-val-tintable');
			 $('#select_' + id).attr("value",color_sugerido);
		 }
		
		 
		
		$('#select_' + id).on('change', function (event) {
			hayCambiosPendientes = true;
		  const colorHex = $(this).val();
		  const $img = $('.carta_seleccionada [data-id=' + id + ']');
		  $img.attr('data-val-tintable', colorHex);
		  var src = $img.css('background-image');
		  if($img.attr('data-original')!== undefined){
			src = $img.attr('data-original');
		  }else{
			  $img.attr('data-original', src);
		  }
		  if (!src) return;

		  const img = new Image();
		  $(img).css('background-image',src);

		  img.onload = function () {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;

			const ctx = canvas.getContext('2d');

			// Paso 1: Dibuja la imagen original
			ctx.drawImage(img, 0, 0);

			// Paso 2: Multiplica el color encima
			ctx.globalCompositeOperation = 'multiply';
			ctx.fillStyle = colorHex;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Paso 3: Aplicar canal alfa original
			ctx.globalCompositeOperation = 'destination-in';
			ctx.drawImage(img, 0, 0);

			// Convertir a base64 y aplicar
			const result = canvas.toDataURL('image/png');
			$img.attr('src', result);
		  };

		  img.onerror = function () {
			console.error('Error cargando la imagen base64 para tintar');
		  };
		});
	} 

	//PÁGINAS
	function anyadirPagina(){
		var p = $('#contenedor_paginas').append("<div class='pagina' style='padding-left:"+padding_pagina_left+"px; padding-top:"+padding_pagina_top+"px; '> </div>");
		num_pags++;
		return p;
	}
	function getUltimaPagina(){
		return $('#contenedor_paginas').children().last();
	}
	function autoConfigurarPagina(pagina, carta){
		if(autoconfigurada) return;
		autoconfigurada = true;
		const w_pag = parseInt(pagina.css("width"))- parseInt(pagina.css("paddingLeft")) - parseInt(pagina.css("paddingRight"));
		const h_pag = parseInt(pagina.css("height"))- parseInt(pagina.css("paddingTop")) - parseInt(pagina.css("paddingBottom"));
		const w_carta = parseInt(carta.css("width"))- parseInt(carta.css("marginLeft")) - parseInt(carta.css("marginRight"));
		const h_carta = parseInt(carta.css("height"))- parseInt(carta.css("marginTop")) - parseInt(carta.css("marginBottom"));
		var columnas = parseInt(w_pag/w_carta);
		var filas = parseInt(h_pag/h_carta);		
		padding_pagina_left = (w_pag - w_carta*columnas)/2;
		padding_pagina_top = (h_pag - h_carta*filas)/2;
		if(padding_pagina_left<25){  columnas--; padding_pagina_left = (w_pag - w_carta*columnas)/2;}
		if(padding_pagina_top<25){  filas--; padding_pagina_top = (h_pag - h_carta*filas)/2;}
		num_cartas_por_pag = filas*columnas;
		
		pagina.css('paddingLeft', ''+padding_pagina_left+"px");
		pagina.css('paddingTop', ''+padding_pagina_top+"px");
	}

	//FUNCIONALIDAD POPUP
	function abrirPopup() {
	  $('#fondo_popup').fadeIn(200);
	  $('#contenedor_popup').empty();
	}
	function cerrarPopup() {
	  $('#fondo_popup').fadeOut(200);
	  $('#contenedor_popup').empty(); // Limpia el contenido al cerrar
	}
	$(document).on('keydown', function (e) {
	  if (e.key === 'Escape') {
		cerrarPopup();
	  }
	});


//UTILIDADES
function slugToTexto(slug){
	return slug.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}
async function getImagenPortapapelesABase64() {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      for (const type of item.types) {
        if (type.startsWith("image/")) {
          const blob = await item.getType(type);
          return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        }
      }
    }
  } catch (err) {
    console.warn("No se pudo leer el portapapeles:", err);
  }
  return "";
}

