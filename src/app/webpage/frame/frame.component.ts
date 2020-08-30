import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ZoneModel } from './zone.model';
import { MapService } from './map-container/map.service';
import { PlacesEnum } from 'src/app/places.enum';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WaypointValuesPortrait } from './map-container/waypoint-values/waypoint-portrait-values.model';
import { WaypointValuesLandscape } from './map-container/waypoint-values/waypoint-landscapte-values.model';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  enableScanningMode: boolean = false;
  enableScanner: boolean = false;
  successScan: boolean = false;
  scannerTexts: string[] = [
    'PRESIONA EL BOTON PARA ABRIR LA CÁMARA DEL CELULAR Y EN FOCA A LOS MARCADORES QUE ENCONTRARÁS EN LOS LUGARES PARA VER LOS CONTENIDOS',
    'ESCANEA EL CODIGO PARA DESCUBRIR MAS CONTENIDO',
  ];
  scannerActiveText: string = this.scannerTexts[0];

  videoURLs: any = {
    intro: '/assets/videos/test.mp4',
    9: '/assets/videos/timbo.mp4',
  };
  activeVideoURL: string = this.videoURLs.intro;
  description: string =
    'Bienvenido. Durante este recorrido auto guiado vas a pasear por la historia de Villa Soriano. Será un viaje sin tiempo, que te permitirá pasar de un siglo a otro con tan solo unas cuadras de diferencia. \n Podrás adentrarte en los recovecos de una de las primeras poblaciones del Uruguayy disfrutar de un atardecer colonial en un muelle renovado. \n Notarás que se mezclará la historia nacional con la de sus pobladores y que eso lo convertirá en un paseo único. Ejemplo de esto podrá ser la historia de Don Paco: descendiente de uno de los Treinta y Tres Orientales e hijo de un artista plástico cuya casa está repleta de máscaras expresivas y coloridas. \n Uno de los destinos estará contextualizado en el pasado revolucionario, será el predio donde vivían José Gervasio Artigas e Isabel Sánchez. Comenzarás la historia conociendo a aquel Artigas joven y padre de familia, y llegarás hasta el día de hoy, donde conocerás a la tátara nieta de ambos. \n Podrás rememorar una costumbre religiosa y conocer hasta el más mínimo detalle de una capilla singular. Escuchar la historia de la vida de los vecinos a través de un Timbó solemne, o conocer la personalidad de una artista anticipada para la época. Adentrarte en una cocina antigua, escuchar las leyendas del pueblo, sentir el sonido de las aves, reconstruir el pasado y volver al presente, caminar, investigar, charlar y disfrutar.';
  activeZone: ZoneModel;
  zones: ZoneModel[] = [
    new ZoneModel(
      1,
      'Estacion Fluvial',
      "Actualmente es la Estación Fluvial. En su interior funcionan las oficinas de Dirección Nacional de Aduanas, la Prefectura Nacional Naval y una cafetería con terraza hacia el río. Sin embargo, yendo hacia atrás en el tiempo, la fachada comienza a llamar la atención y las salas empiezan a hablar de su historia. En el pasado, ya no es la estación fluvial, es un Hotel: el 'Hotel Olivera'.\nDirección: Cabildo, Villa Soriano, Departamento de Soriano\nHorario de Información al Turista: 9 a 13 hs. y 14:30 a 18:30 hs.\nTeléfono: 4530 4815",
      'url(/assets/img/places/fluvial.png)',
      '',
      new WaypointValuesPortrait(9, 66, 30, 62),
      new WaypointValuesPortrait(7, 58, 37, 58),
      true
    ),
    new ZoneModel(
      2,
      'Muelle',
      'Todavía conserva aquel aire colonial de principios del Siglo XX, cuando fue construido. Aún se mantienen algunos parantes, aún se puede evocar aquel tiempo de crecimiento en Villa Soriano, siendo la capital del departamento y llegando a tener 3000 habitantes. El avistamiento de la flota y la fauna a su alrededor acompaña una caminata que evoca al pasado pero que, al mismo tiempo, contempla el paisaje del presente.',
      'url(/assets/img/places/muelle.png)',
      '',
      new WaypointValuesPortrait(6, 69, 30, 62),
      new WaypointValuesPortrait(3, 59, 37, 58),
      true
    ),
    new ZoneModel(
      3,
      'Capilla Santo Domingo',
      'La composición de las esculturas, el sonar de la campana y la teoría de un túnel que comunica dos partes de la ciudad, constituye solo una parte de esta visita. El recorrido por la Capilla Santo Domingo de Soriano, trae consigo su origen en el año 1772 y la sencillez con la que fue creada. Al caminar por su interiorse puede rememorar aquel combate de 1811, en el que la capilla tuvo un rol protagónico y se volvió un símbolo de resistencia.',
      'url(/assets/img/places/capilla.png)',
      '',
      new WaypointValuesPortrait(20.5, 19, 30, 62),
      new WaypointValuesPortrait(19, 15, 37, 58),
      false
    ),
    new ZoneModel(
      4,
      'Museo Maeso',
      'Durante los primeros años del SXX, un ciudadano de apellido Maeso comenzó a recolectar objetos arqueológicos. Hoy, el Museo Maeso, presenta una de las colecciones más importantes del país.  Con tus primeros pasos comenzará el recorrido, y al adentrarte hacia su interior, la historia podrá sentirse cada vez más cercana. Incluso, podría a llegar a ser fácil imaginarte allí, aprendiendo sus técnicas para manejar la arcilla y conociendo al detalle, la historia de los poblados indígenas del Uruguay.\nHorario de atención: martes a jueves de 8:00 a 18:00 Hs. y viernes a lunes de 11:00 a 17:00 Hs.',
      'url(/assets/img/places/maeso.png)',
      '',
      new WaypointValuesPortrait(19, 62, 30, 62),
      new WaypointValuesPortrait(18, 57, 37, 58),
      true
    ),
    new ZoneModel(
      5,
      'Museo Casa Marfetán',
      'La composición de las esculturas, el sonar de la campana y la teoría de un túnel que comunica dos partes de la ciudad, constituye solo una parte de esta visita. El recorrido por la Capilla Santo Domingo de Soriano, trae consigo su origen en el año 1772 y la sencillez con la que fue creada. Al caminar por su interiorse puede rememorar aquel combate de 1811, en el que la capilla tuvo un rol protagónico y se volvió un símbolo de resistencia.',
      'url(/assets/img/places/marfetan.png)',
      '',
      new WaypointValuesPortrait(25.5, 56, 30, 62),
      new WaypointValuesPortrait(24, 53, 37, 58),
      true
    ),
    new ZoneModel(
      6,
      'Casa de las Máscaras',
      'Detrás de una fachada colorida, expresiva y diferente, vive Don Paco. Se crió en esa casa y vio a su padre hacer cientos de máscaras. Aunque hace mucho tiempo de esto, todavía tiene grabada la técnica que aquel hombre, dedicado y pensativo, utilizaba en sus máscaras.\nAdentro, cada rincón tiene un cuento. Al pasar por un pasillo, también pintado,Paco recuerda a su familia y se dirige al patio para contarnos una historia.',
      'url(/assets/img/places/mascaras.png)',
      '',
      new WaypointValuesPortrait(23, 13, 37, 60),
      new WaypointValuesPortrait(22, 12, 37, 58),
      false
    ),
    new ZoneModel(
      7,
      'Casa del General Galarza',
      'Resulta fácil imaginar la presencia que, en su época, debió haber tenido la casa del General Galarza. Aunque hoy esté en ruinas y sostenida para evitar su derrumbe, uno puede dejarse llevar por los recovecos que la constituyen e imaginar el momento en el que cada una de sus salas se veían firmes, inquebrantables y elegantes. De pronto, los espacios vacíos de los huecos de las paredes parecen llenarse y hasta se puede escuchar la melodía que, desde su interior, suena con más fuerza.\nDirección: Cabildo y Hugo Renata.',
      'url(/assets/img/places/galarza.png)',
      '',
      new WaypointValuesPortrait(36.5, 0, 37, 60),
      new WaypointValuesPortrait(36, 6, 37, 58),
      false
    ),
    new ZoneModel(
      8,
      'Solar de Artigas',
      'Acercarse al predio en donde vivió José Gervasio Artigas es arrimarse a aquel hombre que formó una familia junto a Isabel Vázquez, es conocer más de cerca a sus cuatro hijos, y descubrir el lado más hogareño del prócer de la patria. Durante este paseo, un escritor muy cercano y una tatara nieta, relatarán parte de la historia de Artigas mientras vivió en Villa Soriano.',
      'url(/assets/img/places/solar.png)',
      '',
      new WaypointValuesPortrait(29, 61, 30, 62),
      new WaypointValuesPortrait(28, 56, 37, 58),
      true
    ),
    new ZoneModel(
      9,
      'Timbó',
      'El nombre científico con el que se reconoce a este árbol es Enterolobiumcontortisiliquum, pero para los vecinos es El timbó, el árbol que los ha acompañado generación tras generación. Aunque hace unos años, su follaje desapareció por completo, continúa  siendo uno de los íconos más representativos de Villa Soriano.',
      'url(/assets/img/places/timbo.png)',
      '',
      new WaypointValuesPortrait(60, 25, 60, 49),
      new WaypointValuesLandscape(60, 36.5, 60, 12),
      true
    ),
    new ZoneModel(
      10,
      'Bienvenido',
      "Actualmente es la Estación Fluvial. En su interior funcionan las oficinas de Dirección Nacional de Aduanas, la Prefectura Nacional Naval y una cafetería con terraza hacia el río. Sin embargo, yendo hacia atrás en el tiempo, la fachada comienza a llamar la atención y las salas empiezan a hablar de su historia. En el pasado, ya no es la estación fluvial, es un Hotel: el 'Hotel Olivera'.\nDirección: Cabildo, Villa Soriano, Departamento de Soriano\nHorario de Información al Turista: 9 a 13 hs. y 14:30 a 18:30 hs.\nTeléfono: 4530 4815",
      'url(/assets/img/places/fluvial.png)',
      '',
      new WaypointValuesPortrait(79, 29, 79, 50),
      new WaypointValuesLandscape(82, 39, 79, 63),
      true
    ),
  ];
  constructor(private mapService: MapService, private router: Router) {}

  ngOnInit() {
    this.addSpacesOnNewDescription(this.description);

    this.mapService.onZoneSelected.subscribe((zone: ZoneModel) => {
      window.scrollTo(0, 0);
      this.enableScanningMode = !this.enableScanningMode;
      this.activeZone = zone;
      this.addSpacesOnNewDescription(zone.description);
    });
  }

  addSpacesOnNewDescription(newDescription: string) {
    let descriptionSplitter: string[] = newDescription.split('\n');
    this.description = descriptionSplitter.join('<br></br>');
  }

  enableScan() {
    this.enableScanner = true;
    this.scannerActiveText = this.scannerTexts[1];
    this.router.navigate([environment.routes.scan]);
  }
  disableScan() {
    this.enableScanner = false;
    this.scannerActiveText = this.scannerTexts[0];
  }

  scanResult(placeScaned: PlacesEnum) {
    this.successScan = true;
    this.activeVideoURL = this.videoURLs[placeScaned];
    this.enableScanner = false;
    this.enableScanningMode = false;
    console.log(placeScaned);
  }
}
