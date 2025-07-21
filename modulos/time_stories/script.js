window.Plantillas = window.Plantillas || {};
window.Plugins = window.Plugins || {};

/* window.Plugins["time_stories"] = {
  nombre: 'T.I.M.E. Stories',
  desc: 'Funciones útiles para TIME STORIES',
  tags: 'boardgame,modulo', 
  plugins: [
	{
	nombre: "nombre_plugin",
	slug: "slug_plugin",
	desc: 'desc_plugin',
	funcion: func  
  }
  ]
}; */

window.Plantillas["time_stories"] = {
  nombre: 'T.I.M.E. Stories',
  desc: 'Plantillas útiles para crear módulos y aventuras del juego T.I.M.E. Stories',
  tags: 'boardgame,aventura', 
  plantillas: [
	  {
		  nombre: 'Localización base',
		  slug: 'time_stories_localizacion_base',
		  desc: 'Carta inicial de localización',
		  tags: '',
		  tipo: 'tarot_vertical',
		  width: 70,
		  height: 120,
		  html: `
				<div class='plantilla_time_stories time_stories_fondo_triangulos' style="position:absolute; width:100%; height:100%; top:0px;">
					<div class='time_stories_biselado' style='position:absolute; background:#ffffffdd; margin:10px; width:calc(100% - 20px); height: calc(100% - 20px); text-align:center;' > 
					</div>
					<img class='img carta_fondo' data-id='logo' style='position:absolute;' />
					<div  style=' position:absolute; margin:10px; width:calc(100% - 20px); height: calc(100% - 20px);' > 
						<div class='texto_linea' data-id='localización' style="position: absolute; text-align:right; font-weight:bold; bottom: 0px; left: 5px; width: 102mm; transform: rotate(-90deg); transform-origin: left top; white-space: nowrap; font-size: 28px; color: #0c98b7;" >BASE</div>
						<div class='texto_linea' data-id='letras' style="position: absolute; text-align:center; font-weight:bold; bottom: 20px; left: 0px; width: 100%;  font-size: 22px; color: #0c98b7;" >A - B - C - D - E</div>
					</div>
				</div>			
			`,
		  cargarOpcionesEnMenu: function (container) { }
	  },
	  {
		  nombre: 'Personaje',
		  slug: 'time_stories_pj_back',
		  desc: 'Carta de personaje',
		  tags: '',
		  tipo: 'tarot_vertical',
		  width: 70,
		  height: 120,
		  html: `
				<div class='plantilla_time_stories time_stories_fondo_triangulos' style="position:absolute; width:100%; height:100%; top:0px;">
					<div class='time_stories_biselado' style='position:absolute; background:#ffffffdd; margin:10px; width:calc(100% - 20px); height: calc(100% - 20px); text-align:center;' > 
					</div>
					<img class='img carta_fondo' data-id='fondo' style='position:absolute;' />
					<div  style=' position:absolute; margin:10px; width:calc(100% - 20px); height: calc(100% - 20px);' > 
												
						<img data-id='foto' class='img' style='position:absolute; width:110px; height:205px; top:8px; left:8px; border: 2px solid #ffffff; border-radius:10px;' />
						<div style='position:absolute; width:65px; height:75px; top:30px; right:5px; '>
							<div style='position:absolute; width:65px; height: 65px; top:0px; left:0px; text-align:center; background-color:#ffffffaa; border-radius: 40px; font-size: 40px; border: 2px solid #1a81d8;'>🛡️</div>
							<div class='texto_numero' data-id='defensa' style='position:absolute; width:26px; height: 25px; top:55px; left:22px; font-weight:bold; font-size: 20px; text-align:center; background-color:#1a81d8; border-radius: 25px; color:white;'>2</div>
						</div>
						
						<div style='position:absolute; width:65px; height:75px; top:115px; right:5px; '>
							<div style='position:absolute; width:65px; height: 65px; top:0px; left:0px; text-align:center; background-color:#ffffffaa; border-radius: 40px; font-size: 40px; border: 2px solid #1a81d8;'>❤️</div>
							<div class='texto_numero' data-id='vida' style='position:absolute; width:26px; height: 25px; top:55px; left:22px; font-weight:bold; font-size: 20px; text-align:center; background-color:#1a81d8; border-radius: 25px; color:white;'>2</div>
						</div>
						
						<div style='position:absolute; width:50px; height:60px; top:5px; right:70px; '>
							<div class='texto_linea' data-id='icono_atributo_1' style='position:absolute; width:50px; height: 50px; top:0px; left:0px; text-align:center; background-color:#ffffffaa; border-radius: 25px; font-size: 30px; border: 2px solid #1a81d8;'>💪</div>
							<div class='texto_numero' data-id='atributo_1' style='position:absolute; width:20px; height: 20px; top:42px; left:16px; font-weight:bold; font-size: 16px; text-align:center; background-color:#1a81d8; border-radius: 25px; color:white;'>2</div>
						</div>	
						
						<div style='position:absolute; width:50px; height:60px; top:80px; right:70px; '>
							<div class='texto_linea' data-id='icono_atributo_2' style='position:absolute; width:50px; height: 50px; top:0px; left:0px; text-align:center; background-color:#ffffffaa; border-radius: 25px; font-size: 30px; border: 2px solid #1a81d8;'>🧠</div>
							<div class='texto_numero' data-id='atributo_2' style='position:absolute; width:20px; height: 20px; top:42px; left:16px; font-weight:bold; font-size: 16px; text-align:center; background-color:#1a81d8; border-radius: 25px; color:white;'>2</div>
						</div>	
						
						<div style='position:absolute; width:50px; height:60px; top:160px; right:70px; '>
							<div class='texto_linea' data-id='icono_atributo_3' style='position:absolute; width:50px; height: 50px; top:0px; left:0px; text-align:center; background-color:#ffffffaa; border-radius: 25px; font-size: 30px; border: 2px solid #1a81d8;'>🖥️</div>
							<div class='texto_numero' data-id='atributo_3' style='position:absolute; width:20px; height: 20px; top:42px; left:16px; font-weight:bold; font-size: 16px; text-align:center; background-color:#1a81d8; border-radius: 25px; color:white;'>2</div>
						</div>	
						
						<div data-id='nombre' class='texto_linea time_stories_biselado' style='position:absolute; width:100%;  top:225px; left:0px; font-size:28px; text-align:center; font-weight:bold; color:#1a81d8; padding:2px; box-sizing:border-box; background-color:#ffffffaa;'>Nombre</div>
						<div data-id='texto' class='texto_editable time_stories_biselado' style='position:absolute; width:100%; height:170px; padding:5px; box-sizing:border-box; top:265px; left:0px; font-size:16px; color:#000000; background-color:#ffffffaa;'><i>Historia del personaje.</i><br /><b>Nombre habilidad:</b> Explicación de la habilidad</div>
						
					</div>
				</div>			
			`,
		  cargarOpcionesEnMenu: function (container) { }
	  }
	]
};


	
	
	

	



