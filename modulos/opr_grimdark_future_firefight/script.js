window.Plantillas = window.Plantillas || {};
window.Plugins = window.Plugins || {};

window.Plugins["opr_grimdark_future_firefight"] = {
  nombre: 'OPR Grimpdark Future Firefight',
  desc: 'Funciones útiles para OPR',
  tags: 'wargame,miniatures', 
  plugins: [
	{
	nombre: "Lista formato texto a cartas",
	slug: "ogfft2c",
	desc: 'Transforma la lista exportada en texto a una carta para añadir tu foto e imprimir',
	funcion: ogfft2c  
  }
  ]
};

window.Plantillas["opr_grimdark_future_firefight"] = {
  nombre: 'OPR Grimdark Future Firefight',
  desc: 'Plantillas útiles para OPR rimdark Future Firefight',
  tags: 'wargame,miniatures', 
  plantillas: [
	{
		  nombre: 'Unidad',
		  slug: 'unidad',
		  desc: 'Plantilla diseñada para unidades del juego de Grimdark Future de Open Rule Pages',
		  tags: '',
		  tipo: 'standard_vertical',   
		  html: `
			
				<style>
				
					@font-face {
					  font-family: 'MerriweatherBold';
					  src: url('./modulos/opr_grimdark_future_firefight/Merriweather_120pt-Bold.ttf') format('truetype');
					}
						
						
					#opr_grimdark_future_firefight_tabla_armas tr:nth-child(odd) {
					  background-color: #f2f2f2;
					}
					
				</style>
			
				<img data-id="carta_fondo" class="img carta_fondo">
				<div style='position:absolute; width:100%; height:100%; top:0px;  border: 5px solid black; box-sizing: border-box; font-family: MerriweatherBold;'>
					<div data-id="nombre_guerrero" class='texto_linea' style='width:90%; left:4%; top:5px; position:absolute; text-align:center; padding:2px;  border: 3px solid black; border-radius: 10px; font-weight:bold; background-color:#fff;'>Nombre</div>
					<div style='width:50%; left:24%; top:32px; position:absolute; text-align:center; padding:2px;  border-radius:0px 0px 10px 10px; background-color:#000000; color:white; font-size: 11px;'>Models: <span class='texto_numero' data-id='número_minis' >1</span></div>
					<div style='width:30px; height:20px; left:5px; top:17%; font-size:12px; position:absolute; text-align:center; text-align:left; padding:3px 0px 0px 4px; border-radius:30px 0px 0px 30px; background:#000; color:#fff;'>Q</div>
					<div style='width:30px; height:20px; left:5px; top:29%; font-size:12px; position:absolute; text-align:center; text-align:left; padding:3px 0px 0px 4px; border-radius:30px 0px 0px 30px; background:#000; color:#fff;'>D</div>
					<div style='width:24px; height:24px; left:8%; top:15%; font-size:19px; position:absolute; text-align:center; padding:3px; border: 3px solid black; border-radius:30px; background:#fff; font-weight:bold;'><span data-id="calidad" class='texto_numero'>3</span>+</div>
					<div style='width:24px; height:24px; left:8%; top:27%; font-size:19px; position:absolute; text-align:center; padding:3px; border: 3px solid black; border-radius:30px; background:#fff;  font-weight:bold;'><span data-id="defensa" class='texto_numero'>3</span>+</div>
					
					<div style='position:absolute; bottom: 5px; width:90%; left:4%;'>
						<div style='position:relative; text-align:center; padding:2px; border: 3px solid black; border-radius:10px; background-color: #fff; font-size:12px;'><b><u>Reglas especiales</u></b><div data-id="reglas_especiales" class='texto_editable'> </div> </div>
						<div class='menu_plantilla' data-id='add_arma' data-plantilla='opr_grimdark_future_firefight' style='display:none;'></div>
						<div style='position:relative; text-align:center; padding:2px; ; border: 3px solid black; border-radius:10px; background-color: #fff;'>
							<table class='opr_grimdark_future_firefight_tabla_armas' style='width:100%; font-size: 12px;'>
								<tr><td>Arma</td><td>🧿</td><td>💥</td><td>AP</td><td>Tags.</td></tr>
								<tr class='opr_grimdark_future_firefight_arma titulo_seccion' data-id='arma_1'><td data-id="nombre_arma1" class='texto_linea' ></td><td data-id="distancia_arma1" class='texto_numero'></td><td data-id="daño_arma1" class='texto_numero'></td><td data-id="penetracion_arma1" class='texto_numero'>0</td><td data-id="habilidades_arma1" class='texto_linea'>-</td></tr>					
							</table>
						</div>
					</div>
				</div>
			
			`,
		  cargarOpcionesEnMenu: function (container) {
			  var html_submenu_img = `
					<div class='seccion_editable'>
							<div id="anyadir_arma" class="submenu_botones_boton" title="+ Añadir arma" style='font-size:16px; margin: 5px auto; width:80%; display:block; '> + Añadir Arma ⚔️ </div>
					</div>
				`;
				$('#menu_lateral').append(html_submenu_img);
				
				$('#anyadir_arma').click(function(){
					var carta_seleccionada = $('.carta_seleccionada');
					opr_grimdark_future_firefight_add_arma(carta_seleccionada);
					cargarBarraLateralCartaSeleccionada();
				});
		  }
	  }
	]
};

function opr_grimdark_future_firefight_add_arma(carta){
	
			var opr_grimdark_future_firefight_num_armas = carta.find('* .opr_grimdark_future_firefight_tabla_armas').children().length+1;
			var html_opr_grimdark_future_firefight = `
			<tr class='opr_grimdark_future_firefight_arma titulo_seccion' data-id='arma_`+opr_grimdark_future_firefight_num_armas+`'><td data-id="nombre_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_linea' ></td><td data-id="distancia_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_numero'></td><td data-id="num_ataques_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_numero'></td><td data-id="penetracion_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_numero'>0</td><td data-id="habilidades_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_linea'>-</td></tr>	
			`;
			
			carta.find('* .opr_grimdark_future_firefight_tabla_armas').append(html_opr_grimdark_future_firefight);
					
}

function splitComasFueraParentesis(texto) {
	const partes = [];
	let actual = '';
	let nivelParentesis = 0;

	for (let i = 0; i < texto.length; i++) {
		const char = texto[i];

		if (char === '(') {
			nivelParentesis++;
			actual += char;
		} else if (char === ')') {
			nivelParentesis--;
			actual += char;
		} else if (char === ',' && nivelParentesis === 0) {
			partes.push(actual.trim());
			actual = '';
		} else {
			actual += char;
		}
	}

	if (actual) partes.push(actual.trim());

	return partes;
}

function ogfft2c(){
	
	abrirPopup();
	
	
	
	$('#contenedor_popup').append(`
		<h2>Pega aquí tu banda de OPR Exportada como texto</h2>
		<i style='display:block; text-align:center;'>Edita tu banda => Menú => Share as Text</i>
		<textarea id='oggfft2c_text' style='width:90%; margin: 5px 0px 5px 4%; height: 250px;'></textarea>
		<button id='oggfft2c_button' style='width:90%; margin: 5px 0px 5px 4%; height: 50px; font-size:22px;'>Generar Cartas</button>
	`);
	
	$("#oggfft2c_button").click(function(){
		const guerreros = [];	

		const texto =  $("#oggfft2c_text").val().trim();	
		cerrarPopup();
		
		const str_guerreros = texto.split(/\r?\n\r?\n/);			
		var num_guerreros = str_guerreros.length-1;
		
		for(i = 1; i<=num_guerreros; i++){
			let guerrero = {};
			guerreros.push(guerrero);
			
			const lineas = str_guerreros[i].split(/\r\n|\r|\n/);
			var num_armas = lineas.length-1;
			
			attrs_mini = lineas[0];
			var nombre_partes = attrs_mini.split('[');
			var nombre = nombre_partes[0].trim();
			
			const num_minis_match  = lineas[0].match(/\[(\d+)\]/);
			guerrero.num_minis = num_minis_match  ? parseInt(num_minis_match [1], 10) : null;
			
			var cantidad_unidades = 1;				
			if (/^\s*\d+x/.test(attrs_mini.trim())) {
				var partes_cantidad = attrs_mini.split('x');
				cantidad_unidades = partes_cantidad[0];
				nombre = nombre_partes[0].replace(cantidad_unidades+"x", "").trim();
			}
			
			guerrero.nombre = nombre.trim();
			guerrero.cantidad = cantidad_unidades;
			
			const match1 = attrs_mini.match(/Q([1-6])\+/);
			var calidad = match1 ? parseInt(match1[1], 10) : null;
			
			const match2 = attrs_mini.match(/D([1-6])\+/);
			var defensa = match2? parseInt(match2[1], 10) : null;
			
			guerrero.calidad = calidad;
			guerrero.defensa = defensa;
			
			var partes_atrs = attrs_mini.split('|');
			var habilidades = partes_atrs[partes_atrs.length-1];
			guerrero.habilidades = habilidades.trim();
			var carta = anyadirCartaDesdePlantilla("opr_grimdark_future_firefight", "unidad");		
			carta.find("[data-id='nombre_guerrero']").html(guerrero.nombre);
			
			carta.find("[data-id='calidad']").html(guerrero.calidad);
			carta.find("[data-id='defensa']").html(guerrero.defensa);
			carta.find("[data-id='reglas_especiales']").html(guerrero.habilidades);
			carta.find("[data-id='número_minis']").html(guerrero.num_minis);
			
			guerrero.armas = [];				
			var num_armas = 0;
			lineas[1] = lineas[1].replace("AP(1)", "AP[1]").replace("AP(2)", "AP[2]").replace("AP(3)", "AP[3]").replace("AP(4)", "AP[4]").replace("AP(5)", "AP[5]").replace("AP(6)", "AP[6]")
			var str_armas = splitComasFueraParentesis(lineas[1]);
			var armas_anyadidas = 0;
			for(var j = 0; j< str_armas.length ;j++){
				if(str_armas[j].length>5){
					let arma = {};
					guerrero.armas.push(arma);
					num_armas++;
					

					
					var partes = str_armas[j].split('(')
					
					
					
					
					var nombre_arma = partes[0];
					arma.nombre = nombre_arma.trim();
					
					let inicio = str_armas[j].indexOf('(');
					let fin = str_armas[j].lastIndexOf(')');

					let antes = str_armas[j].slice(0, inicio);           // Parte antes del primer paréntesis
					partes = str_armas[j].slice(inicio + 1, fin);    // Parte entre el primer y último paréntesis
					partes = partes.split(',');
					
					var hab_arma = "";
					for(var k = 0; k<partes.length; k++){
						if(partes[k].includes('"')){
							var distancia = parseInt(partes[k].replace('"', ''));
							arma.distancia = distancia;
						}else if(/A\d+/.test(partes[k])){
							var ataques = parseInt(partes[k].replace('A', ''));
							arma.ataques = ataques;
							
						}else if(partes[k].includes('AP[')){
							var partes_penetracion = partes[k].match(/AP\[(\d+)\]/);
							arma.penetracion = partes_penetracion[1];
							
						}else{
							hab_arma = hab_arma+" "+partes[k];							
						}
					}
					if(str_armas[j].includes('AP[')){
						
					}else{
						arma.penetracion = 0;
					}
					if(armas_anyadidas>0)
					   opr_grimdark_future_firefight_add_arma(carta);
					armas_anyadidas++;
					carta.find("[data-id='nombre_arma"+armas_anyadidas+"']").html(arma.nombre);
					if(arma.distancia > 0)
						carta.find("[data-id='distancia_arma"+armas_anyadidas+"']").html(arma.distancia);
					if(arma.ataques > 0)
						carta.find("[data-id='num_ataques_arma"+armas_anyadidas+"']").html(arma.ataques);
					carta.find("[data-id='penetracion_arma"+armas_anyadidas+"']").html(arma.penetracion);
					if(hab_arma.length>0){
						arma.habilidades = hab_arma.trim();
						carta.find("[data-id='habilidades_arma"+armas_anyadidas+"']").html(hab_arma);
					}
					
				}
			}
			for(var n = 1; n<cantidad_unidades; n++){
				var carta_copia = anyadirCartaDesdePlantilla("opr_grimdark_future_firefight");
				carta_copia.html(carta.html());
			}
			/* if(cantidad_unidades>1)
				carta.find("[data-id='nombre_guerrero']").append(" (x"+cantidad_unidades+")"); */
					
		}
	});

	
	
	
	
	
}


