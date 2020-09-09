import { Injectable, EventEmitter } from '@angular/core';
import { ZoneModel } from '../zone.model';
import { PlacesEnum } from 'src/app/places.enum';
import { WaypointValuesPortrait } from './waypoint-values/waypoint-portrait-values.model';
import { WaypointValuesLandscape } from './waypoint-values/waypoint-landscapte-values.model';
import { ImageMarkerModel } from 'src/app/image-marker.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  onZoneSelected: EventEmitter<ZoneModel> = new EventEmitter();
  zones: ZoneModel[] = [
    new ZoneModel(
      PlacesEnum.ESTACION_FLUVIAL,
      'Estacion Fluvial',
      "Actualmente es la Estación Fluvial. En su interior funcionan las oficinas de Dirección Nacional de Aduanas, la Prefectura Nacional Naval y una cafetería con terraza hacia el río. Sin embargo, yendo hacia atrás en el tiempo, la fachada comienza a llamar la atención y las salas empiezan a hablar de su historia. En el pasado, ya no es la estación fluvial, es un Hotel: el 'Hotel Olivera'.\nDirección: Cabildo, Villa Soriano, Departamento de Soriano\nHorario de Información al Turista: 9 a 13 hs. y 14:30 a 18:30 hs.\nTeléfono: 4530 4815",
      'url(/assets/img/places/fluvial.png)',
      {
        intro: 'https://www.youtube.com/embed/_DUTzemGSx8',
        1: 'https://www.youtube.com/embed/9dqdTBasE0o',
        2: 'https://www.youtube.com/embed/-1sneMKsYjw',
        3: 'https://www.youtube.com/embed/umx0PpFc06M',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.ESTACION_FLUVIAL + '/' + '1',
        2: '/assets/trackingImages/' + PlacesEnum.ESTACION_FLUVIAL + '/' + '2',
        3: '/assets/trackingImages/' + PlacesEnum.ESTACION_FLUVIAL + '/' + '3',
      },
      new WaypointValuesPortrait(9, 66, 30, 62),
      new WaypointValuesPortrait(7, 58, 37, 58),
      true,
      true
    ),
    new ZoneModel(
      PlacesEnum.MUELLE,
      'Muelle',
      'Todavía conserva aquel aire colonial de principios del Siglo XX, cuando fue construido. Aún se mantienen algunos parantes, aún se puede evocar aquel tiempo de crecimiento en Villa Soriano, siendo la capital del departamento y llegando a tener 3000 habitantes. El avistamiento de la flora y la fauna a su alrededor acompaña una caminata que evoca al pasado pero que, al mismo tiempo, contempla el paisaje del presente.',
      'url(/assets/img/places/muelle.png)',
      {
        intro: 'https://www.youtube.com/embed/YMJZaSzDWEk',
        1: 'https://www.youtube.com/embed/OiCxLoqcpbg',
        2: 'https://www.youtube.com/embed/EajxvoBfv60',
        3: 'https://www.youtube.com/embed/lb8S_x0sCas',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.MUELLE + '/' + '1',
        2: '/assets/trackingImages/' + PlacesEnum.MUELLE + '/' + '2',
        3: '/assets/trackingImages/' + PlacesEnum.MUELLE + '/' + '3',
      },
      new WaypointValuesPortrait(6, 69, 30, 62),
      new WaypointValuesPortrait(3, 59, 37, 58),
      true,
      true
    ),
    new ZoneModel(
      PlacesEnum.TIMBO,
      'Timbó',
      'El nombre científico con el que se reconoce a este árbol es Enterolobiumcontortisiliquum, pero para los vecinos es El timbó, el árbol que los ha acompañado generación tras generación. Aunque hace unos años, su follaje desapareció por completo, continúa  siendo uno de los íconos más representativos de Villa Soriano.',
      'url(/assets/img/places/timbo.png)',
      {
        intro: 'https://www.youtube.com/embed/WhvZVbzDpdE',
        1: 'https://www.youtube.com/embed/4eBhzgbENL4',
        2: 'https://www.youtube.com/embed/DKvLnCfVu90',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.TIMBO + '/' + '1',
        2: '/assets/trackingImages/' + PlacesEnum.TIMBO + '/' + '2',
      },
      new WaypointValuesPortrait(20.5, 19, 30, 62),
      new WaypointValuesPortrait(19, 15, 37, 58),
      false,
      true
    ),
    new ZoneModel(
      PlacesEnum.MAESO,
      'Museo Maeso',
      'Durante los primeros años del Siglo XX, un ciudadano de apellido Maeso comenzó a recolectar objetos arqueológicos. Hoy, el Museo Maeso, presenta una de las colecciones más importantes del país.\nCon tus primeros pasos comenzará el recorrido, y al adentrarte hacia su interior, la historia podrá sentirse cada vez más cercana. Incluso, podría a llegar a ser fácil imaginarte allí, aprendiendo sus técnicas para manejar la arcilla y conociendo al detalle, la historia de los poblados indígenas del Uruguay.\nHorario de atención: martes a jueves de 8:00 a 18:00 Hs. y viernes a lunes de 11:00 a 17:00 Hs.',
      'url(/assets/img/places/maeso.png)',
      {
        intro: 'https://www.youtube.com/embed/FCrQiDvSQVQ',
        1: 'https://www.youtube.com/embed/8sWjxTWz1FY',
        2: 'https://www.youtube.com/embed/gg9xTC5ln9U',
        3: 'https://www.youtube.com/embed/H_kmsjE6RR0',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.MAESO + '/' + '1',
        2: '/assets/trackingImages/' + PlacesEnum.MAESO + '/' + '2',
        3: '/assets/trackingImages/' + PlacesEnum.MAESO + '/' + '3',
      },
      new WaypointValuesPortrait(19, 62, 30, 62),
      new WaypointValuesPortrait(18, 57, 37, 58),
      true,
      true
    ),
    new ZoneModel(
      PlacesEnum.MARFETAN,
      'Museo Casa Marfetán',
      'La puerta principal de la casa Marfetán le da la bienvenida al Siglo XVIII, período al que se remonta la construcción del edificio y la de su arquitectura tan característica. La historia que rodea a la casa se recorre sala tras sala y se entrelaza con la voluntad de los vecinos que, uno a uno, fueron armando el Museo Regional de Villa Soriano.\nHorario de atención: lunes a viernes de 7.30 a 18.00 hs.',
      'url(/assets/img/places/marfetan.png)',
      {
        intro: 'https://www.youtube.com/embed/_Me9SYtyxeE',
        1: 'https://www.youtube.com/embed/s4jOpjbyL8k',
        2: 'https://www.youtube.com/embed/cNChpvSfLok',
        3: 'https://www.youtube.com/embed/mYlIK6VtXzE',
        4: 'https://www.youtube.com/embed/dTF1t8tUBMw',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.MARFETAN + '/' + '1',
        2: '/assets/trackingImages/' + PlacesEnum.MARFETAN + '/' + '2',
        3: '/assets/trackingImages/' + PlacesEnum.MARFETAN + '/' + '3',
        4: '/assets/trackingImages/' + PlacesEnum.MARFETAN + '/' + '4',
        5: '/assets/trackingImages/' + PlacesEnum.MARFETAN + '/' + '5',
        6: '/assets/trackingImages/' + PlacesEnum.MARFETAN + '/' + '6',
      },
      new WaypointValuesPortrait(25.5, 56, 30, 62),
      new WaypointValuesPortrait(24, 53, 37, 58),
      true,
      true
    ),
    new ZoneModel(
      PlacesEnum.MASCARAS,
      'Casa de las Máscaras',
      'Detrás de una fachada colorida, expresiva y diferente, vive Don Paco. Se crió en esa casa y vió a su padre hacer cientos de máscaras. Aunque hace mucho tiempo de esto, todavía tiene grabada la técnica que aquel hombre, dedicado y pensativo, utilizaba en sus máscaras.\nAdentro, cada rincón tiene un cuento. Al pasar por un pasillo, también pintado, Paco recuerda a su familia y se dirige al patio para contarnos una historia.',
      'url(/assets/img/places/mascaras.png)',
      {
        intro: 'https://www.youtube.com/embed/jTQnOGdFIuM',
        1: 'https://www.youtube.com/embed/d7P4rSk17Qo',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.MASCARAS + '/' + '1',
      },
      new WaypointValuesPortrait(23, 13, 37, 60),
      new WaypointValuesPortrait(22, 12, 37, 58),
      false,
      true
    ),
    new ZoneModel(
      PlacesEnum.GALARZA,
      'Casa del General Galarza',
      'Resulta fácil imaginar la presencia que, en su época, debió haber tenido la casa del General Galarza. Aunque hoy esté en ruinas y sostenida para evitar su derrumbe, uno puede dejarse llevar por los recovecos que la constituyen e imaginar el momento en el que cada una de sus salas se veían firmes, inquebrantables y elegantes. De pronto, los espacios vacíos de los huecos de las paredes parecen llenarse y hasta se puede escuchar la melodía que, desde su interior, suena con más fuerza.\nDirección: Cabildo y Hugo Renata.',
      'url(/assets/img/places/galarza.png)',
      {
        intro: 'https://www.youtube.com/embed/99MWuxXqmPI',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.GALARZA + '/' + '1',
      },
      new WaypointValuesPortrait(36.5, 0, 37, 60),
      new WaypointValuesPortrait(36, 6, 37, 58),
      false,
      false
    ),
    new ZoneModel(
      PlacesEnum.SOLAR,
      'Solar de Artigas',
      'Acercarse al predio en donde vivió José Gervasio Artigas es arrimarse a aquel hombre que formó una familia junto a Isabel Vázquez, es conocer más de cerca a sus cuatro hijos, y descubrir el lado más hogareño del prócer de la patria. Durante este paseo, un escritor muy cercano y una tatara nieta, relatarán parte de la historia de Artigas mientras vivió en Villa Soriano.',
      'url(/assets/img/places/solar.png)',
      {
        intro: 'https://www.youtube.com/embed/FRg7WXXmmpU',
        1: 'https://www.youtube.com/embed/ZC1whZIJov0',
        2: 'https://www.youtube.com/embed/DW84K3L0vG8',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.SOLAR + '/' + '1',
        2: '/assets/trackingImages/' + PlacesEnum.SOLAR + '/' + '2',
      },
      new WaypointValuesPortrait(29, 61, 30, 62),
      new WaypointValuesPortrait(28, 56, 37, 58),
      true,
      true
    ),
    new ZoneModel(
      PlacesEnum.CAPILLA,
      'Capilla Santo Domingo',
      'La composición de las esculturas, el sonar de la campana y la teoría de un túnel que comunica dos partes de la ciudad, constituye solo una parte de esta visita. El recorrido por la Capilla Santo Domingo de Soriano, trae consigo su origen en el año 1772 y la sencillez con la que fue creada. Al caminar por su interior se puede rememorar aquel combate de 1811, en el que la capilla tuvo un rol protagónico y se volvió un símbolo de resistencia.',
      'url(/assets/img/places/capilla.png)',
      {
        intro: 'https://www.youtube.com/embed/-X0NhnqVBN4',
        1: 'https://www.youtube.com/embed/-X0NhnqVBN4',
        2: 'https://www.youtube.com/embed/-X0NhnqVBN4',
        3: 'https://www.youtube.com/embed/ZKEzAzscAwU',
        4: 'https://www.youtube.com/embed/uB5StxCsdFQ',
        5: 'https://www.youtube.com/embed/2ae3zMIWtf0',
        6: 'https://www.youtube.com/embed/vl8OopBfleo',
      },
      {
        1: '/assets/trackingImages/' + PlacesEnum.CAPILLA + '/' + '1',
        2: '/assets/trackingImages/' + PlacesEnum.CAPILLA + '/' + '2',
        3: '/assets/trackingImages/' + PlacesEnum.CAPILLA + '/' + '3',
        4: '/assets/trackingImages/' + PlacesEnum.CAPILLA + '/' + '4',
        5: '/assets/trackingImages/' + PlacesEnum.CAPILLA + '/' + '5',
        6: '/assets/trackingImages/' + PlacesEnum.CAPILLA + '/' + '6',
      },
      new WaypointValuesPortrait(60, 25, 60, 49),
      new WaypointValuesLandscape(60, 36.5, 60, 12),
      true,
      true
    ),
    new ZoneModel(
      PlacesEnum.BIENVENIDO,
      'Bienvenido',
      '¡Bienvenido! Durante este recorrido auto-guiado vas a pasear por la historia de Villa Soriano. Será un viaje sin tiempo, que te permitirá pasar de un siglo a otro con tan solo unas cuadras de diferencia.\nPodrás adentrarte en los recovecos de una de las primeras poblaciones del Uruguay y disfrutar de un atardecer colonial en un muelle renovado.\nNotarás que se mezclará la historia nacional con la de sus pobladores y que eso lo convertirá en un paseo único. Ejemplo de esto podrá ser la historia de Don Paco: descendiente de uno de los Treinta y Tres Orientales e hijo de un artista plástico cuya casa está repleta de máscaras expresivas y coloridas.\nUno de los destinos estará contextualizado en el pasado revolucionario, será el predio donde vivían José Gervasio Artigas e Isabel Sánchez. Comenzarás la historia conociendo a aquel Artigas joven y padre de familia, y llegarás hasta el día de hoy, donde conocerás a la tátara nieta de ambos.\nPodrás rememorar una costumbre religiosa y conocer hasta el más mínimo detalle de una capilla singular. Escuchar la historia de la vida de los vecinos a través de un Timbó solemne, o conocer la personalidad de una artista anticipada para la época. Adentrarte en una cocina antigua, escuchar las leyendas del pueblo, sentir el sonido de las aves, reconstruir el pasado y volver al presente, caminar, investigar, charlar y disfrutar.',
      'url(/assets/img/places/fluvial.png)',
      'https://www.youtube.com/embed/eyMITx0vAxU',
      [],
      new WaypointValuesPortrait(79, 29, 79, 50),
      new WaypointValuesLandscape(82, 39, 79, 63),
      true,
      false
    ),
  ];

  zoneTypeSelected: PlacesEnum;
  constructor() {}

  onNewZoneSelected(zone: ZoneModel) {
    this.onZoneSelected.emit(zone);
  }

  getZones(): ZoneModel[] {
    return this.zones;
  }

  getZoneByPlaceID(placeID: PlacesEnum) {
    this.zones.forEach((zone: ZoneModel) => {
      if (zone.id == placeID) {
        return placeID;
      }
    });
  }

  getMarkerBySubPlaceID(placeID: PlacesEnum, subPlaceID: number) {
    this.zones.forEach((zone: ZoneModel) => {
      if (zone.id == placeID) {
        if (zone.markersURL[subPlaceID]) {
          return zone.markersURL[subPlaceID];
        }
      }
    });
  }

  getAllMarkers(): ImageMarkerModel[] {
    let markers: ImageMarkerModel[] = [];

    this.zones.forEach((zone: ZoneModel) => {
      if (Object.keys(zone.markersURL).length > 0) {
        let marker: ImageMarkerModel;
        Object.keys(zone.markersURL).forEach((keySubZone) => {
          if (zone.id == 9) {
            marker = new ImageMarkerModel(
              zone.id,
              +keySubZone,
              zone.markersURL[keySubZone]
            );
            markers.push(marker);
          }
        });
      }
    });

    return markers;
  }

  setZoneTypeToScan(typeZone: PlacesEnum) {
    this.zoneTypeSelected = typeZone;
  }
  getZoneTypeToScan(): number {
    return this.zoneTypeSelected;
  }
}
