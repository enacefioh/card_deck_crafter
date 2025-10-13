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
					<div data-id="nombre_pj" class="texto_linea" style="width:75%; left:4%; top:7px; position:absolute; text-align:center; padding:4px 2px 2px 35px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#ffffffCC;">Nombre</div>
					<div style="width:30px; height:25px; left:5px; top:1%; font-size:15px; position:absolute; text-align:center; text-align:left; padding:10px 0px 0px 5px; border-radius:30px 0px 0px 30px; background:#000; color:#ffffffCC; font-weight:bold;">P</div>
					<div style="width:24px; height:19px; left:8%; top:1%; font-size:19px; position:absolute; text-align:center; padding:8px 3px 3px 3px; border: 3px solid black; border-radius:30px; background:#ffffff; font-weight:bold;"><span data-id="indice_pj" class="texto_numero">1</span></div>
					<div class='menu_plantilla' data-id='add_pista' data-plantilla='apv_investigacion_pj_ini' data-modulo='investigacion' style='display:none;'></div>
					<div class="investigacion_contenedor_pistas" style="width:59mm; bottom:35mm; position:absolute; left:2mm; ">
						<div class='investigacion_pista' data-indice='1' style='border-top:1px solid gray; border-bottom:1px solid gray;'> 
							<div class="texto_linea" data-id="icono1" style="font-size:15px; width:3mm; float:left;">ℹ️</div>
							<div class="texto_editable" data-id="texto1" style="font-size:12px; width:85%; padding-top:3px; float:right;">Información sobre la persona.</div>
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
					<div data-id="nombre_pj" class="texto_linea" style="width:75%; left:4%; top:7px; position:absolute; text-align:center; padding:4px 2px 2px 35px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#ffffffCC;">Nombre</div>
					<div style="width:30px; height:25px; left:5px; top:1%; font-size:15px; position:absolute; text-align:center; text-align:left; padding:10px 0px 0px 5px; border-radius:30px 0px 0px 30px; background:#000; color:#ffffffCC; font-weight:bold;">P</div>
					<div style="width:24px; height:19px; left:8%; top:1%; font-size:19px; position:absolute; text-align:center; padding:8px 3px 3px 3px; border: 3px solid black; border-radius:30px; background:#ffffff; font-weight:bold;"><span data-id="indice_pj" class="texto_numero">1</span></div>
					<div class='menu_plantilla' data-id='add_pista' data-plantilla='apv_investigacion_pj_ini' data-modulo='investigacion' style='display:none;'></div>
					<div class="investigacion_contenedor_pistas" style="width:59mm; bottom:3mm; position:absolute; left:2mm; ">
						`+getHTMLNuevaPista(1)+`
					</div>					
				</div>					
			`,
		  cargarOpcionesEnMenu: function (container) { cargarNuevaPista() }
	  }
	  ,
	  {
		  nombre: 'Localización Inicial',
		  slug: 'apv_localizacion_ini',
		  desc: 'Carta de localización inicial',
		  tags: '',
		  tipo: 'standard',
		  width: 63,
		  height: 88,
		  html: `
				<div class='plantilla_apv_standard' style="position:absolute; width:100%; height:100%; top:0px;">
					<div data-id="nombre_localizacion" class="texto_linea" style="width:75%; left:4%; top:7px; position:absolute; text-align:center; padding:4px 2px 2px 35px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#ffffffCC;">Lugar</div>
					<div style="width:30px; height:25px; left:5px; top:1%; font-size:15px; position:absolute; text-align:center; text-align:left; padding:10px 0px 0px 5px; border-radius:30px 0px 0px 30px; background:#000; color:#ffffffCC; font-weight:bold;">L</div>
					<div style="width:24px; height:19px; left:8%; top:1%; font-size:19px; position:absolute; text-align:center; padding:8px 3px 3px 3px; border: 3px solid black; border-radius:30px; background:#ffffff; font-weight:bold;"><span data-id="indice_localizacion" class="texto_numero">1</span></div>
					<div class='menu_plantilla' data-id='add_pista' data-plantilla='apv_investigacion_pj_ini' data-modulo='investigacion' style='display:none;'></div>
					<div class="investigacion_contenedor_pistas" style="width:59mm; bottom:35mm; position:absolute; left:2mm; ">
						`+getHTMLNuevaPista(1)+`
					</div>
					
					
					<div data-id="texto" class="texto_editable" style="position:absolute; width:30mm; height:30mm; padding:5px; box-sizing:border-box; top:55mm; left:4mm; font-size:12px; color:#000000;"><b>Tipo: </b>Edificio público<br/><br/><b>Zona: </b>Norte<br/><br/><b>Rol: </b>Escena del crimen</div>
					<div style="width:25mm; background-position: center center;background-size: cover;border-radius:15px; height: 30mm;margin-left: 35mm;bottom: 10px;position: absolute; background-image: url('modulos/investigacion/localizacion.png');" data-id="foto_localizacion" class="img plantilla_apv_bordes_difuminados"></div>
					
					
				</div>		
			`,
		  cargarOpcionesEnMenu: function (container) { cargarNuevaPista() }
	  },
	  {
		  nombre: 'Localización Continuación',
		  slug: 'apv_investigacion_localizacion_cont',
		  desc: 'Carta de info adicional de localización APV Investigación',
		  tags: '',
		  tipo: 'standard',
		  width: 63,
		  height: 88,
		  html: `
				<div class='plantilla_apv_standard' style="position:absolute; width:100%; height:100%; top:0px;">
					<div data-id="nombre_localizacion" class="texto_linea" style="width:75%; left:4%; top:7px; position:absolute; text-align:center; padding:4px 2px 2px 35px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#ffffffCC;">Lugar</div>
					<div style="width:30px; height:25px; left:5px; top:1%; font-size:15px; position:absolute; text-align:center; text-align:left; padding:10px 0px 0px 5px; border-radius:30px 0px 0px 30px; background:#000; color:#ffffffCC; font-weight:bold;">L</div>
					<div style="width:24px; height:19px; left:8%; top:1%; font-size:19px; position:absolute; text-align:center; padding:8px 3px 3px 3px; border: 3px solid black; border-radius:30px; background:#ffffff; font-weight:bold;"><span data-id="indice_localizacion" class="texto_numero">1</span></div>
					<div class='menu_plantilla' data-id='add_pista' data-plantilla='apv_investigacion_pj_ini' data-modulo='investigacion' style='display:none;'></div>
					<div class="investigacion_contenedor_pistas" style="width:59mm; bottom:3mm; position:absolute; left:2mm; ">
						`+getHTMLNuevaPista(1)+`
					</div>					
				</div>					
			`,
		  cargarOpcionesEnMenu: function (container) { cargarNuevaPista() }
	  },
	  {
		  nombre: 'Indicios Texto',
		  slug: 'apv_investigacion_indicio_texto',
		  desc: 'Carta de indicio con solo texto APV Investigación',
		  tags: '',
		  tipo: 'standard',
		  width: 70,
		  height: 120,
		  html: `
				<div class='plantilla_apv_standard' style="position:absolute; width:100%; height:100%; top:0px;">
					<div data-id="titulo_indicio" class="texto_linea" style="width:75%; left:4%; top:7px; position:absolute; text-align:center; padding:4px 2px 2px 35px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#ffffffCC;">Indicio</div>
					<div style="width:30px; height:25px; left:5px; top:1%; font-size:15px; position:absolute; text-align:center; text-align:left; padding:10px 0px 0px 5px; border-radius:30px 0px 0px 30px; background:#000; color:#ffffffCC; font-weight:bold;">I</div>
					<div style="width:24px; height:19px; left:8%; top:1%; font-size:19px; position:absolute; text-align:center; padding:8px 3px 3px 3px; border: 3px solid black; border-radius:30px; background:#ffffff; font-weight:bold;"><span data-id="indice_indicio" class="texto_numero">1</span></div>
					<div class='menu_plantilla' data-id='add_pista' data-plantilla='apv_investigacion_pj_ini' data-modulo='investigacion' style='display:none;'></div>
					<div class="investigacion_contenedor_pistas" style="width:66mm; bottom:3mm; position:absolute; left:2mm; ">
						`+getHTMLNuevaPista(1)+`
					</div>					
				</div>					
			`,
		  cargarOpcionesEnMenu: function (container) { cargarNuevaPista() }
	  }
	  
	]
	
};

function cargarNuevaPista(){
	
			var html_submenu_info = `
				<div class='seccion_editable'>
						<div id="anyadir_pista" class="submenu_botones_boton"  style='font-size:16px; margin: 5px auto; width:80%; display:block; '> + Añadir Pista ℹ️ </div>
						<div id="anyadir_info" class="submenu_botones_boton" style='font-size:16px; margin: 5px auto; width:80%; display:block; '> + Añadir Texto Ambientación </div>
						&nbsp;&nbsp;Añadir Imágen:<br />
						<div id="anyadir_img_cuadrada" class="submenu_botones_boton" style='padding:5px; margin: 5px; display:block; float:left; aspect-ratio:1; '> <div style='border: 2px solid black; width: 20px; height:20px; '> </div> </div>
						<div id="anyadir_img_horizontal" class="submenu_botones_boton" style='padding:5px; margin: 5px ; display:block; float:left; aspect-ratio:1; '> <div style='border: 2px solid black; width: 20px; height:12px; margin-top:4px; '> </div> </div>
						<div id="anyadir_img_vertical" class="submenu_botones_boton" style='padding:5px; margin: 5px ; display:block; float:left; aspect-ratio:1; '> <div style='border: 2px solid black; width: 12px; height:20px; margin-left:4px;'> </div> </div>
						
						<div style='clear:both;'> </div>
				</div>
			`;
			$('#menu_lateral').append(html_submenu_info);
			$('#anyadir_pista').click(function(){
				//var num_armas = $('.carta_seleccionada * .wu_fighter_contenedor_armas').children().length+1;
				var num_pistas = parseInt($('.carta_seleccionada * .investigacion_contenedor_pistas').children().first().attr("data-indice"))+1;
				var html_nueva_pista = getHTMLNuevaPista(num_pistas);
				
				$('.carta_seleccionada * .investigacion_contenedor_pistas').prepend(html_nueva_pista);
				cargarBarraLateralCartaSeleccionada();
				
			});
			$('#anyadir_info').click(function(){
				//var num_armas = $('.carta_seleccionada * .wu_fighter_contenedor_armas').children().length+1;
				var num_pistas = parseInt($('.carta_seleccionada * .investigacion_contenedor_pistas').children().first().attr("data-indice"))+1;
				var html_nuevo_texto = getHTMLTextoAmbientacion(num_pistas);
				
				$('.carta_seleccionada * .investigacion_contenedor_pistas').prepend(html_nuevo_texto);
				cargarBarraLateralCartaSeleccionada();
				
			});
			
			$('#anyadir_img_cuadrada').click(function(){
				//var num_armas = $('.carta_seleccionada * .wu_fighter_contenedor_armas').children().length+1;
				var num_pistas = parseInt($('.carta_seleccionada * .investigacion_contenedor_pistas').children().first().attr("data-indice"))+1;
				var html_nuevo_texto = getHTMLImagenCuadrada(num_pistas);
				
				$('.carta_seleccionada * .investigacion_contenedor_pistas').prepend(html_nuevo_texto);
				cargarBarraLateralCartaSeleccionada();
				
			});
			
			$('#anyadir_img_horizontal').click(function(){
				//var num_armas = $('.carta_seleccionada * .wu_fighter_contenedor_armas').children().length+1;
				var num_pistas = parseInt($('.carta_seleccionada * .investigacion_contenedor_pistas').children().first().attr("data-indice"))+1;
				var html_nuevo_texto = getHTMLImagenHorizontal(num_pistas);
				
				$('.carta_seleccionada * .investigacion_contenedor_pistas').prepend(html_nuevo_texto);
				cargarBarraLateralCartaSeleccionada();
				
			});
			
			$('#anyadir_img_vertical').click(function(){
				//var num_armas = $('.carta_seleccionada * .wu_fighter_contenedor_armas').children().length+1;
				var num_pistas = parseInt($('.carta_seleccionada * .investigacion_contenedor_pistas').children().first().attr("data-indice"))+1;
				var html_nuevo_texto = getHTMLImagenVertical(num_pistas);
				
				$('.carta_seleccionada * .investigacion_contenedor_pistas').prepend(html_nuevo_texto);
				cargarBarraLateralCartaSeleccionada();
				
			});
		  
}

function getHTMLNuevaPista(num_pistas){ // Devuelve html elemento de línea de pista con índice indicado
	return `<div class='investigacion_pista eliminable' data-id='eliminar_pista`+num_pistas+`' data-indice='`+num_pistas+`' style='border-top:1px solid gray; border-bottom:1px solid gray;'> 
							<div class="img_swap" data-id="icono`+num_pistas+`" style="height:5mm; width:5mm; float:left; background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBISEhMTExYWFhkZGRwcHCAgICEhISIiIiMjIyQkJCUlJSYmJigoKCkpKSoqKjIyMj09PT8/P0JCQkNDQ0VFRUdHR1JSUlNTU1VVVVZWVldXV1hYWFlZWVpaWltbW11dXV5eXl9fX2FhYWNjY2hoaGpqanBwcHNzc3Z2dn5+foeHh5CQkJKSkpOTk5SUlJWVlZiYmJ2dnaCgoKysrK2tra6urrCwsLW1tba2tr6+vsHBwcLCwsTExMbGxsfHx8rKys7Ozs/Pz9HR0dLS0tPT09TU1NXV1dra2ufn5+np6erq6uvr6+zs7O3t7e/v7/Dw8PLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALRrwUwAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAGmSURBVEhL3ZPrNwJBGIffolBCtCkJ5bblFrnf2dxSsbtIiCgS8/9/trMzqzY7WV90eLZzZuZ93+fszu+cAP2Yf6nkxqzG2Ffu6AhFU4pB6AsY4QYI5OgQQVOSMFqmWz1n0Aq+a3pQ0ZRd2Ka7OmSYCcFA7XtMKLFiGAI39KhgRkHlMASrGZhS0HMIhh5owaSCSmGIvZFCvbLj7ec8Ho7jvD6/fwtXiIK/bRavCnXKuKWKdRBXZGix2ex2WxtAGp+/KCVJkmVRlCRJFOU8rmTdFlCxwhI+m7gLKuYJaZgjhe8VjYumKpu8EYu4xVLmSTp1dL0rLZZSuTfiEbeae/0GsJTjSSOWcYulRGlGehyNEnuhGen5m4md7xlxiFssZZhmpMfSKLHshhEJ3Gru9RvAUl5vdRTVHoGlxGlGlJDaI7CUtZ4uV6fD4VSeDqeze1XtEZp0/SOI0x2LdVggG00p9MLIBM+TfyFeeT4SUX4q0ejUNO+yZMiopqArH02JRbuWxaeCKgVMKikImdSBICSExMmpsiQuC7IgCPvpJzpXo5jmNxSEPgB2iVvIEMT2wwAAAABJRU5ErkJggg==')"
								data-cantidad="14" 
								data-nombre1='Info' data-src1='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBISEhMTExYWFhkZGRwcHCAgICEhISIiIiMjIyQkJCUlJSYmJigoKCkpKSoqKjIyMj09PT8/P0JCQkNDQ0VFRUdHR1JSUlNTU1VVVVZWVldXV1hYWFlZWVpaWltbW11dXV5eXl9fX2FhYWNjY2hoaGpqanBwcHNzc3Z2dn5+foeHh5CQkJKSkpOTk5SUlJWVlZiYmJ2dnaCgoKysrK2tra6urrCwsLW1tba2tr6+vsHBwcLCwsTExMbGxsfHx8rKys7Ozs/Pz9HR0dLS0tPT09TU1NXV1dra2ufn5+np6erq6uvr6+zs7O3t7e/v7/Dw8PLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALRrwUwAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAGmSURBVEhL3ZPrNwJBGIffolBCtCkJ5bblFrnf2dxSsbtIiCgS8/9/trMzqzY7WV90eLZzZuZ93+fszu+cAP2Yf6nkxqzG2Ffu6AhFU4pB6AsY4QYI5OgQQVOSMFqmWz1n0Aq+a3pQ0ZRd2Ka7OmSYCcFA7XtMKLFiGAI39KhgRkHlMASrGZhS0HMIhh5owaSCSmGIvZFCvbLj7ec8Ho7jvD6/fwtXiIK/bRavCnXKuKWKdRBXZGix2ex2WxtAGp+/KCVJkmVRlCRJFOU8rmTdFlCxwhI+m7gLKuYJaZgjhe8VjYumKpu8EYu4xVLmSTp1dL0rLZZSuTfiEbeae/0GsJTjSSOWcYulRGlGehyNEnuhGen5m4md7xlxiFssZZhmpMfSKLHshhEJ3Gru9RvAUl5vdRTVHoGlxGlGlJDaI7CUtZ4uV6fD4VSeDqeze1XtEZp0/SOI0x2LdVggG00p9MLIBM+TfyFeeT4SUX4q0ejUNO+yZMiopqArH02JRbuWxaeCKgVMKikImdSBICSExMmpsiQuC7IgCPvpJzpXo5jmNxSEPgB2iVvIEMT2wwAAAABJRU5ErkJggg=='
								data-nombre2='Lupa' data-src2='data:image/png;base64,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'
								data-nombre3='Pasos' data-src3='data:image/png;base64,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'
								data-nombre4='Huella' data-src4='data:image/png;base64,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'
								data-nombre5='Edificio' data-src5='data:image/png;base64,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'
								data-nombre6='Mapa' data-src6='data:image/png;base64,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'
								data-nombre7='Libro' data-src7='data:image/png;base64,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'
								data-nombre8='?' data-src8='data:image/png;base64,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'
								data-nombre9='Persona' data-src9='data:image/png;base64,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'
								data-nombre10='Cámara' data-src10='data:image/png;base64,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'
								data-nombre11='Mundo' data-src11='data:image/png;base64,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'
								data-nombre12='Candado' data-src12='data:image/png;base64,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'
								data-nombre13='Llave' data-src13='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAEBAQICAgMDAwQEBAYGBgcHBwgICAkJCQoKCgsLCw0NDQ4ODg8PDxAQEBMTExQUFBUVFRcXFxkZGRwcHB0dHR4eHh8fHyIiIiQkJCYmJicnJygoKCsrKzAwMDQ0NDU1NTY2Njc3Nzg4ODo6OkREREZGRkhISElJSUxMTE5OTlFRUVJSUlNTU1RUVFdXV1hYWF9fX2JiYmVlZWdnZ2pqamxsbG1tbW5ubm9vb3FxcXV1dXZ2dnp6ent7e319fX5+fn9/f4GBgYKCgoWFhYaGho2NjY6OjpCQkJGRkZKSkpOTk5SUlJWVlZiYmKSkpKampqenp6mpqaysrK2tra+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vMHBwcLCwsPDw8XFxcbGxsfHx8rKyszMzM3Nzc7Ozs/Pz9LS0tPT09TU1NbW1tfX19jY2Nzc3ODg4OLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O7u7vDw8PHx8fLy8vPz8/T09Pb29vj4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKygo7wAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAIsSURBVEhL3ZPrWxJBFId/CwSllFkZ5V3L0rKLmRUSlml3y8LCEKOku1lC97J7ZCrF+Zeb2T2brLPUTp96er/snHOe95nfMANIm/9f+Z47scPvi/RMLHKjHFdlthWobmyMAHVJbpXhplwNYHv2K1FxLrrKOMPNZVyUpLF+VHyKMtSbLThvNstQlay/Nk8/ru/fGmm/vCgcY4YHNoqyVA+xR68BSWeRbgVaeWKjKFNoJxpGbbZUmm5CF9E24xGPGEXpxSV6H6x6ItffGnCHxhA3B79QlG4U6Cz6rSKNPnqNFquwcVWGMWYVeaOHyGiyCpvfKzl4UfpE/DT2WsVxnKL76LAKG0VJ4CBRc3CqJNYzaze+pdMYsiY2ijJfU/2FpsO+rgvpfn/wGi1EQnM8YhSFRmSq2Q55k5smSfx6O3lgoyqFZsRFqseJxBXxeRAIveCBjarQszAOcJaFcwGRbQUuCj2sRyhWJPoYq0NVipvLuClUGAzjGNFhrD7yiltluCpEN7BHKve4dFBBmUS3UIw8lw4qKHfNXQzzPa+kgjJhKj49RQbzPeXSQQUlZSk6u4zrBxuXD03v+Mm/CaZ1/NsbwuE12KWhPA/4awRRDeUiYrzyrNzEukMC8ei9Hz8alH9i81483/7LXO6k3kv+kMlkjmK3hvKpQebCPg0lhbZ4PD7wTijIcc+BqoyiUySTtHhVPm82g0nauOXE5fjzgwMWIwXuOHFR/sQ/qhD9BC8Z3SZZ09aTAAAAAElFTkSuQmCC'
								data-nombre14='Objeto' data-src14='data:image/png;base64,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'
							
							></div>
							<div class="texto_linea" data-id="texto`+num_pistas+`" style="font-size:12px; width:85%; padding-top:3px; float:right;">Nueva info</div>
							<div style='clear:both;'> </div>
						</div>`;
}

function getHTMLTextoAmbientacion(num_pistas){ // Devuelve html elemento de línea de pista con índice indicado
	return `<div class='investigacion_texto_ambientacion eliminable' data-id='eliminar_pista`+num_pistas+`' data-indice='`+num_pistas+`' style='text-align:center; color: #999999;'> 
			   <i class="texto_editable" data-id="texto`+num_pistas+`" style="font-size:12px; width:100%; padding-top:3px;">Texto ambientación</i>
			</div>`;
}

function getHTMLImagenCuadrada(num_pistas){ // Devuelve html elemento de línea de pista con índice indicado
	return `<div class='investigacion_img eliminable' data-id='eliminar_pista`+num_pistas+`' data-indice='`+num_pistas+`' style=''> 
			   <div  data-id="imagen`+num_pistas+`" style="width:90%; aspect-ratio:1;  background-position: center center;background-size: cover;border-radius:15px; margin-left: 11px;bottom: 10px; background-image: url('modulos/investigacion/user.png');" class="img plantilla_apv_bordes_difuminados"></div>
			</div>`;
}

function getHTMLImagenHorizontal(num_pistas){ // Devuelve html elemento de línea de pista con índice indicado
	return `<div class='investigacion_img eliminable' data-id='eliminar_pista`+num_pistas+`' data-indice='`+num_pistas+`' style=''> 
			   <div  data-id="imagen`+num_pistas+`" style="width:90%; aspect-ratio:1.5;  background-position: center center;background-size: cover;border-radius:15px; margin-left: 11px;bottom: 10px; background-image: url('modulos/investigacion/user.png');" class="img plantilla_apv_bordes_difuminados"></div>
			</div>`;
}

function getHTMLImagenVertical(num_pistas){ // Devuelve html elemento de línea de pista con índice indicado
	return `<div class='investigacion_img eliminable' data-id='eliminar_pista`+num_pistas+`' data-indice='`+num_pistas+`' style=''> 
			   <div  data-id="imagen`+num_pistas+`" style="width:90%; aspect-ratio:0.6;  background-position: center center;background-size: cover;border-radius:15px; margin-left: 11px;bottom: 10px; background-image: url('modulos/investigacion/user.png');" class="img plantilla_apv_bordes_difuminados"></div>
			</div>`;
}



	
	
	

	



