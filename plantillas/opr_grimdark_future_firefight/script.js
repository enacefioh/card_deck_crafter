
window.Plantillas = window.Plantillas || {};

window.Plantillas["opr_grimdark_future_firefight"] = {
  nombre: 'OPR Grimdark Future Firefight',
  desc: 'Plantilla diseñada para unidades del juego de Grimdark Future de Open Rule Pages',
  tags: '',
  tipo: 'standard_vertical',   
  html: `
	
	
		<style>
		
			@font-face {
			  font-family: 'MerriweatherBold';
			  src: url('./plantillas/opr_grimdark_future_firefight/Merriweather_120pt-Bold.ttf') format('truetype');
			}
				
				
			#opr_grimdark_future_firefight_tabla_armas tr:nth-child(odd) {
			  background-color: #f2f2f2;
			}
			
		</style>
	
		<img data-id="carta_fondo" class="img carta_fondo">
		<div style='position:absolute; width:100%; height:100%; top:0px;  border: 5px solid black; box-sizing: border-box; font-family: MerriweatherBold;'>
			<div data-id="nombre_guerrero" class='texto_linea' style='width:90%; left:4%; top:5px; position:absolute; text-align:center; padding:2px;  border: 3px solid black; border-radius:10px; font-weight:bold; background-color:#fff;'>Nombre</div>
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
};

function opr_grimdark_future_firefight_add_arma(carta){
	
			var opr_grimdark_future_firefight_num_armas = carta.find('* .opr_grimdark_future_firefight_tabla_armas').children().length+1;
			var html_opr_grimdark_future_firefight = `
			<tr class='opr_grimdark_future_firefight_arma titulo_seccion' data-id='arma_`+opr_grimdark_future_firefight_num_armas+`'><td data-id="nombre_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_linea' ></td><td data-id="distancia_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_numero'></td><td data-id="num_ataques_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_numero'></td><td data-id="penetracion_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_numero'>0</td><td data-id="habilidades_arma`+opr_grimdark_future_firefight_num_armas+`" class='texto_linea'>-</td></tr>	
			`;
			
			carta.find('* .opr_grimdark_future_firefight_tabla_armas').append(html_opr_grimdark_future_firefight);
			
			
		
}


