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
		  nombre: 'Apertura',
		  slug: 'apertura',
		  desc: 'Plantilla diseñada para unidades del juego de Grimdark Future de Open Rule Pages',
		  tags: '',
		  tipo: 'tarot_vertical',
		  width: 70,
		  height: 120,
		  html: `
			
				<style>
				.fondo_triangulos {
				  width: 100%;
				  height: 200px;
				  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><polygon points='0,0 0,30 15,30' fill='%23e9f2f2'/><polygon points='15,30 30,30 30,0' fill='%23e9f2f2'/><polygon points='0,0 15,30 30,0' fill='%23def3f3'/></svg>");
				  background-repeat: repeat;
				}
				</style>
			
				<img data-id="carta_fondo" class="img carta_fondo" style='object-fit: cover; object-position: center;' >
				<div class='fondo_triangulos' style="position:absolute; width:100%; height:100%; top:0px;">
					<div style='width: 80%; height: 88%; margin:4%; background: #ffffffaa; color: white; padding: 1em; clip-path: polygon( 10px 0%, calc(100% - 10px) 0%,  100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px );'> 
						<div class='texto_linea' data-id='localización' style="position: absolute; font-weight:bold; bottom: 0px; left: 15px; width: 105mm; transform: rotate(-90deg); transform-origin: left top; white-space: nowrap; font-size: 25px; color: #0c98b7;" >BASE</div>
					
					</div>
				</div>
			
			`,
		  cargarOpcionesEnMenu: function (container) { }
	  }
	]
};


	
	
	
	



