import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ZoneModel } from './zone.model';
import { MapService } from './map-container/map.service';
import { PlacesEnum } from 'src/app/places.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WaypointValuesPortrait } from './map-container/waypoint-values/waypoint-portrait-values.model';
import { WaypointValuesLandscape } from './map-container/waypoint-values/waypoint-landscapte-values.model';
import { tns } from 'node_modules/tiny-slider/src/tiny-slider';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  //States
  enableScanningMode: boolean = false;
  enableScanner: boolean = false;
  successScan: boolean = false;
  QPloaded: boolean = false;
  hasZoneActive: boolean = false;
  scannerTexts: string[] = [
    'PRESIONA EL BOTON PARA ABRIR LA CÁMARA DEL CELULAR Y EN FOCA A LOS MARCADORES QUE ENCONTRARÁS EN LOS LUGARES PARA VER LOS CONTENIDOS',
    'ESCANEA EL CODIGO PARA DESCUBRIR MAS CONTENIDO',
  ];

  //Sofia Icon Route Images
  sofiaImageRoutes: string[] = [
    '/assets/img/iconosSofia/1.png',
    '/assets/img/iconosSofia/2.png',
    '/assets/img/iconosSofia/3.png',
    '/assets/img/iconosSofia/4.png',
    '/assets/img/iconosSofia/5.png',
    '/assets/img/iconosSofia/6.png',
  ];
  textoCursiva: boolean;

  //Selected Sofia Icon
  selectedSofiaIconRoute: string;

  scannerActiveText: string = this.scannerTexts[0];
  zones: ZoneModel[] = [];
  videoURLs: any = {
    [PlacesEnum.BIENVENIDO]:
      '/assets/videos/' + PlacesEnum.BIENVENIDO + '/intro.mp4',
    [PlacesEnum.ESTACION_FLUVIAL]: {
      intro:
        '/assets/videos/' + PlacesEnum.ESTACION_FLUVIAL + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.ESTACION_FLUVIAL + '/' + '1.mp4',
      2: '/assets/videos/' + PlacesEnum.ESTACION_FLUVIAL + '/' + '2.mp4',
      3: '/assets/videos/' + PlacesEnum.ESTACION_FLUVIAL + '/' + '3.mp4',
    },
    [PlacesEnum.MUELLE]: {
      intro: '/assets/videos/' + PlacesEnum.MUELLE + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.MUELLE + '/' + '1.mp4',
      2: '/assets/videos/' + PlacesEnum.MUELLE + '/' + '2.mp4',
      3: '/assets/videos/' + PlacesEnum.MUELLE + '/' + '3.mp4',
    },
    [PlacesEnum.TIMBO]: {
      intro: '/assets/videos/' + PlacesEnum.TIMBO + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.TIMBO + '/' + '1.mp4',
      2: '/assets/videos/' + PlacesEnum.TIMBO + '/' + '2.mp4',
    },
    [PlacesEnum.MASCARAS]: {
      intro: '/assets/videos/' + PlacesEnum.MASCARAS + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.MASCARAS + '/' + '1.mp4',
    },
    [PlacesEnum.GALARZA]: {
      intro: '/assets/videos/' + PlacesEnum.GALARZA + '/' + 'intro.mp4',
    },
    [PlacesEnum.CAPILLA]: {
      intro: 'https://www.youtube.com/embed/-X0NhnqVBN4',
      1: 'https://www.youtube.com/embed/-X0NhnqVBN4',
      2: 'https://www.youtube.com/embed/-X0NhnqVBN4',
      3: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '3.mp4',
      4: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '4.mp4',
      5: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '5.mp4',
      6: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '6.mp4',
    },

    [PlacesEnum.MAESO]: {
      intro: '/assets/videos/' + PlacesEnum.MAESO + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.MAESO + '/' + '1.mp4',
    },
    [PlacesEnum.MARFETAN]: {
      intro: '/assets/videos/' + PlacesEnum.MARFETAN + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.MARFETAN + '/' + '1.mp4',
    },

    [PlacesEnum.SOLAR]: {
      intro: '/assets/videos/' + PlacesEnum.SOLAR + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.SOLAR + '/' + '1.mp4',
    },
  };

  activeVideoURL: any;
  description: string =
    'Bienvenido. Durante este recorrido auto guiado vas a pasear por la historia de Villa Soriano. Será un viaje sin tiempo, que te permitirá pasar de un siglo a otro con tan solo unas cuadras de diferencia. \n Podrás adentrarte en los recovecos de una de las primeras poblaciones del Uruguayy disfrutar de un atardecer colonial en un muelle renovado. \n Notarás que se mezclará la historia nacional con la de sus pobladores y que eso lo convertirá en un paseo único. Ejemplo de esto podrá ser la historia de Don Paco: descendiente de uno de los Treinta y Tres Orientales e hijo de un artista plástico cuya casa está repleta de máscaras expresivas y coloridas. \n Uno de los destinos estará contextualizado en el pasado revolucionario, será el predio donde vivían José Gervasio Artigas e Isabel Sánchez. Comenzarás la historia conociendo a aquel Artigas joven y padre de familia, y llegarás hasta el día de hoy, donde conocerás a la tátara nieta de ambos. \n Podrás rememorar una costumbre religiosa y conocer hasta el más mínimo detalle de una capilla singular. Escuchar la historia de la vida de los vecinos a través de un Timbó solemne, o conocer la personalidad de una artista anticipada para la época. Adentrarte en una cocina antigua, escuchar las leyendas del pueblo, sentir el sonido de las aves, reconstruir el pasado y volver al presente, caminar, investigar, charlar y disfrutar.';
  activeZone: ZoneModel;

  constructor(
    private mapService: MapService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {
    let randomNumber: number = Math.floor(
      Math.random() * this.sofiaImageRoutes.length
    );
    //Get random sofia image
    this.selectedSofiaIconRoute = this.sofiaImageRoutes[randomNumber];

    this.textoCursiva =
      randomNumber == 1 || randomNumber == 3 || randomNumber == 5;
  }

  ngOnInit() {
    this.zones = this.mapService.getZones();
    this.activeVideoURL = this.videoURLs[PlacesEnum.BIENVENIDO];
    this.addSpacesOnNewDescription(this.description);

    this.activedRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (Object.keys(params).length > 0 && params['place']) {
        this.QPloaded = true;
        this.hasZoneActive = true;
        let qpSplitted: string[] = params['place'].split('-');
        let zoneID: number = +qpSplitted[0];
        let subZoneID: number = +qpSplitted[1];
        this.activeZone = this.searchZoneModelById(zoneID);

        this.addSpacesOnNewDescription(this.activeZone.description);
        this.activeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl(
          this.videoURLs[zoneID][subZoneID]
        );
        setTimeout(() => {
          this.mapService.onZoneSelected.emit(this.activeZone);
        }, 300);
      } else {
        this.QPloaded = false;
      }
    });

    this.mapService.onZoneSelected.subscribe((zone: ZoneModel) => {
      if (!this.QPloaded) {
        window.scrollTo(0, 0);
        if (this.activeZone && zone.id == this.activeZone.id) {
          this.enableScanningMode = false;
          this.activeZone = this.zones[this.zones.length - 1]; //On re-click show BIENVENIDO
          this.addSpacesOnNewDescription(this.activeZone.description);
          this.activeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl(
            this.activeZone.videoURL
          );
        } else {
          this.enableScanningMode = true;
          this.hasZoneActive = true;
          this.activeZone = zone;
          this.addSpacesOnNewDescription(zone.description);
          this.activeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl(
            this.activeZone.videoURL
          );
        }
      }
    });

    console.log(window.location.hash);
    tns({
      container: '.my-slider',
      items: 4,
      loop: true,
      autoplay: true,
      speed: 50,
      controls: false,
      autoplayTimeout: 2500,
      autoplayButtonOutput: false,
      nav: false,
      responsive: {
        320: {
          edgePadding: 5,
          gutter: 20,
          items: 2,
        },
        375: {
          edgePadding: 5,
          gutter: 20,
          items: 2,
        },
        414: {
          edgePadding: 5,
          gutter: 20,
          items: 2,
        },
        736: {
          edgePadding: 10,
          items: 2,
        },

        900: {
          edgePadding: 9,
          items: 3,
        },
        1200: {
          edgePadding: 10,
          items: 4,
        },
      },
    });
  }

  addSpacesOnNewDescription(newDescription: string) {
    let descriptionSplitter: string[] = newDescription.split('\n');
    this.description = descriptionSplitter.join('<br></br>');
  }

  enableScan() {
    this.enableScanner = true;
    this.scannerActiveText = this.scannerTexts[1];
    history.pushState({ foo: 'Home' }, 'Home', this.router.url);
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
  }

  searchZoneModelById(id: number): ZoneModel {
    let zoneFound: ZoneModel = this.zones[this.zones.length - 1];
    this.zones.forEach((zone: ZoneModel) => {
      if (id == zone.id) {
        zoneFound = zone;
      }
    });
    return zoneFound;
  }
}
