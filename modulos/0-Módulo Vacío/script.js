window.Plantillas = window.Plantillas || {};
window.Plugins = window.Plugins || {};

window.Plantillas["slug_modulo"] = {
  nombre: 'Nombre del módulo',
  desc: 'Descripción del Módulo',
  tags: 'tags', 
  plantillas: [
	  {
		  nombre: 'Nombre de la plantilla',
		  slug: 'slug_de_la_plantilla',
		  desc: 'Descripción de la plantilla',
		  tags: '',
		  tipo: 'standard',
		  width: 63,
		  height: 88,
		  html: `
				<div class='carta_plantilla' style="position:absolute; width:100%; height:100%; top:0px;">
					<div style='margin-top: 30mm; text-align:center'>Plantilla para carta</div>					
				</div>					
			`,
		  cargarOpcionesEnMenu: function (funcion) { /* funciones específicas de la plantilla */ }
	  }
	]
	
};


	
	
	

	



