
window.Plugins = window.Plugins || {};

window.Plugins["opr"] = {
  nombre: 'One Page Rules (OPR)',
  desc: 'Funciones útiles para OPR',
  tags: 'wargame,miniatures', 
  funciones: {
	  opr_grimdark_future_firefight_text2unitcards: {
		  nombre: "OPR Grimdark Future Firefight Text to Cards",
		  funcion: function(){ oggfft2c(); }
	  }
	  
  }
};

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

function oggfft2c(){
	
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
			var cantidad_minis = 1;				
			if (/^\s*\d+x/.test(attrs_mini.trim())) {
				var partes_cantidad = attrs_mini.split('x');
				cantidad_minis = partes_cantidad[0];
				nombre = nombre_partes[0].replace(cantidad_minis+"x", "").trim();
			}
			
			guerrero.nombre = nombre.trim();
			guerrero.cantidad = cantidad_minis;
			
			const match1 = attrs_mini.match(/Q([1-6])\+/);
			var calidad = match1 ? parseInt(match1[1], 10) : null;
			
			const match2 = attrs_mini.match(/D([1-6])\+/);
			var defensa = match2? parseInt(match2[1], 10) : null;
			
			guerrero.calidad = calidad;
			guerrero.defensa = defensa;
			
			var partes_atrs = attrs_mini.split('|');
			var habilidades = partes_atrs[partes_atrs.length-1];
			guerrero.habilidades = habilidades.trim();
			var carta = anyadirCartaDesdePlantilla("opr_grimdark_future_firefight");		
			carta.find("[data-id='nombre_guerrero']").html(guerrero.nombre);
			if(cantidad_minis>1)
				carta.find("[data-id='nombre_guerrero']").append(" (x"+cantidad_minis+")");
			carta.find("[data-id='calidad']").html(guerrero.calidad);
			carta.find("[data-id='defensa']").html(guerrero.defensa);
			carta.find("[data-id='reglas_especiales']").html(guerrero.habilidades);
			
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
		}
	});

	
	
	
	
	
}

