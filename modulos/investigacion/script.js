window.Plantillas = window.Plantillas || {};
window.Plugins = window.Plugins || {};

window.Plantillas["investigacion"] = {
  nombre: 'Investigación APV ',
  desc: 'Plantillas para los prototipos de investigación de Aitor, Pere y Vic',
  tags: 'boardgame,aventura', 
  plantillas: [
	  {
		  nombre: 'Pesonaje Inicial',
		  slug: 'apv_investigacion_pj_ini',
		  desc: 'Carta de personaje inicial APV Investigación',
		  tags: '',
		  tipo: 'standard',
		  width: 63,
		  height: 88,
		  html: `
				<div class='plantilla_apv_standard' style="position:absolute; width:100%; height:100%; top:0px;">
					<div data-id="nombre_pj" class="texto_linea" style="width:75%; left:4%; top:7px; position:absolute; text-align:center; padding:2px 2px 2px 35px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#ffffffCC;">Nombre</div>
					<div style="width:30px; height:25px; left:5px; top:1%; font-size:15px; position:absolute; text-align:center; text-align:left; padding:10px 0px 0px 5px; border-radius:30px 0px 0px 30px; background:#000; color:#ffffffCC; font-weight:bold;">P</div>
					<div style="width:24px; height:19px; left:8%; top:1%; font-size:19px; position:absolute; text-align:center; padding:8px 3px 3px 3px; border: 3px solid black; border-radius:30px; background:#ffffff; font-weight:bold;"><span data-id="indice_pj" class="texto_numero">1</span></div>
					<div class='menu_plantilla' data-id='add_pista' data-plantilla='apv_investigacion_pj_ini' data-modulo='investigacion' style='display:none;'></div>
					<div class="investigacion_contenedor_pistas" style="width:59mm; bottom:35mm; position:absolute; left:2mm; ">
						<div class='investigacion_pista' data-indice='1' style='border-top:1px solid gray; border-bottom:1px solid gray;'> 
							<div class="texto_linea" data-id="icono1" style="font-size:15px; width:3mm; float:left;">ℹ️</div>
							<div class="texto_linea" data-id="texto1" style="font-size:12px; width:50mm; padding-top:3px; float:right;">Información sobre la persona.</div>
							<div style='clear:both;'> </div>
						</div>
					</div>
					
					
					<div style="width:25mm; background-position: center center;background-size: cover;border-radius:15px; height: 30mm;margin-left: 11px;bottom: 10px;position: absolute; background-image: url('modulos/investigacion/user.png');" data-id="foto_pj" class="img plantilla_apv_bordes_difuminados"></div>
					<div data-id="texto" class="texto_editable" style="position:absolute; width:30mm; height:30mm; padding:5px; box-sizing:border-box; top:55mm; left:30mm; font-size:12px; color:#000000;"><b>Rol: </b>Víctima<br/><br/><b>Aspecto: </b>Mujer jóven<br/><br/><b>Edad: </b> 30-40 años</div>
					
				</div>					
			`,
		  cargarOpcionesEnMenu: function (container) { cargarNuevaPista() }
	  },
	  {
		  nombre: 'Pesonaje Continuación',
		  slug: 'apv_investigacion_pj_cont',
		  desc: 'Carta de info adicional del personaje APV Investigación',
		  tags: '',
		  tipo: 'standard',
		  width: 63,
		  height: 88,
		  html: `
				<div class='plantilla_apv_standard' style="position:absolute; width:100%; height:100%; top:0px;">
					<div data-id="nombre_pj" class="texto_linea" style="width:75%; left:4%; top:7px; position:absolute; text-align:center; padding:2px 2px 2px 35px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#ffffffCC;">Nombre</div>
					<div style="width:30px; height:25px; left:5px; top:1%; font-size:15px; position:absolute; text-align:center; text-align:left; padding:10px 0px 0px 5px; border-radius:30px 0px 0px 30px; background:#000; color:#ffffffCC; font-weight:bold;">P</div>
					<div style="width:24px; height:19px; left:8%; top:1%; font-size:19px; position:absolute; text-align:center; padding:8px 3px 3px 3px; border: 3px solid black; border-radius:30px; background:#ffffff; font-weight:bold;"><span data-id="indice_pj" class="texto_numero">1</span></div>
					<div class='menu_plantilla' data-id='add_pista' data-plantilla='apv_investigacion_pj_ini' data-modulo='investigacion' style='display:none;'></div>
					<div class="investigacion_contenedor_pistas" style="width:59mm; bottom:3mm; position:absolute; left:2mm; ">
						<div class='investigacion_pista' data-indice='1' style='border-top:1px solid gray; border-bottom:1px solid gray;'> 
							<div class="texto_linea" data-id="icono1" style="font-size:15px; width:3mm; float:left;">ℹ️</div>
							<div class="texto_linea" data-id="texto1" style="font-size:12px; width:50mm; padding-top:3px; float:right;">Información sobre la persona.</div>
							<div style='clear:both;'> </div>
						</div>
					</div>					
				</div>					
			`,
		  cargarOpcionesEnMenu: function (container) { cargarNuevaPista() }
	  }
	]
	
};

function cargarNuevaPista(){
	
			   var html_submenu_img = `
				<div class='seccion_editable'>
						<div id="anyadir_info" class="submenu_botones_boton" title="+ Añadir info" style='font-size:16px; margin: 5px auto; width:80%; display:block; '> + Añadir Info ℹ️ </div>
				</div>
			`;
			$('#menu_lateral').append(html_submenu_img);
			$('#anyadir_info').click(function(){
				//var num_armas = $('.carta_seleccionada * .wu_fighter_contenedor_armas').children().length+1;
				var num_pistas = parseInt($('.carta_seleccionada * .investigacion_contenedor_pistas').children().first().attr("data-indice"))+1;
				var html_nueva_pista = `<div class='investigacion_pista eliminable' data-id='eliminar_pista`+num_pistas+`' data-indice='`+num_pistas+`' style='border-top:1px solid gray; border-bottom:1px solid gray;'> 
							<div class="texto_linea" data-id="icono`+num_pistas+`" style="font-size:15px; width:3mm; float:left;">ℹ️</div>
							<div class="texto_linea" data-id="texto`+num_pistas+`" style="font-size:12px; width:50mm; padding-top:3px; float:right;">Nueva info</div>
							<div style='clear:both;'> </div>
						</div>`;
				
				$('.carta_seleccionada * .investigacion_contenedor_pistas').prepend(html_nueva_pista);
				cargarBarraLateralCartaSeleccionada();
				
			});
		  
}


	
	
	

	



