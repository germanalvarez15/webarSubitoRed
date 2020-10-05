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
import { HttpClient } from '@angular/common/http';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  //States
  enableScanningMode: boolean = false;
  enableScann: boolean = false;
  successScan: boolean = false;
  QPloaded: boolean = false;
  zoneClicked: boolean = false;
  hasZoneActive: boolean = false;
  scannerTexts: string[] = [
    'PRESIONA EL BOTON PARA ABRIR LA CÁMARA DEL CELULAR Y ENFOCA A LOS MARCADORES QUE ENCONTRARÁS EN LOS LUGARES PARA VER LOS CONTENIDOS',
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
    [PlacesEnum.BIENVENIDO]: 'https://www.youtube.com/embed/ux9aiyTeuU8',
    [PlacesEnum.ESTACION_FLUVIAL]: {
      intro: 'https://www.youtube.com/embed/_DUTzemGSx8',
      1: 'https://www.youtube.com/embed/9dqdTBasE0o',
      2: 'https://www.youtube.com/embed/-1sneMKsYjw',
      3: 'https://www.youtube.com/embed/umx0PpFc06M',
    },
    [PlacesEnum.MUELLE]: {
      intro: 'https://www.youtube.com/embed/YMJZaSzDWEk',
      1: 'https://www.youtube.com/embed/OiCxLoqcpbg',
      2: 'https://www.youtube.com/embed/EajxvoBfv60',
      3: 'https://www.youtube.com/embed/lb8S_x0sCas',
    },
    [PlacesEnum.TIMBO]: {
      intro: 'https://www.youtube.com/embed/dje_4ZXNBj0',
      1: 'https://www.youtube.com/embed/NIjrRLqGxWA',
      2: 'https://www.youtube.com/embed/C8__2mEmMJ8',
    },
    [PlacesEnum.MASCARAS]: {
      intro: 'https://www.youtube.com/embed/jTQnOGdFIuM',
      1: 'https://www.youtube.com/embed/d7P4rSk17Qo',
    },
    [PlacesEnum.GALARZA]: {
      intro: 'https://www.youtube.com/embed/99MWuxXqmPI',
    },
    [PlacesEnum.CAPILLA]: {
      intro: 'https://www.youtube.com/embed/LsRfnjHEoAM',
      1: 'https://www.youtube.com/embed/QxS2qYpiXX8',
      2: 'https://www.youtube.com/embed/-X0NhnqVBN4',
      3: 'https://www.youtube.com/embed/ZKEzAzscAwU',
      4: 'https://www.youtube.com/embed/uB5StxCsdFQ',
      5: 'https://www.youtube.com/embed/2ae3zMIWtf0',
      6: 'https://www.youtube.com/embed/vl8OopBfleo',
    },
    [PlacesEnum.MAESO]: {
      intro: 'https://www.youtube.com/embed/FCrQiDvSQVQ',
      1: 'https://www.youtube.com/embed/8sWjxTWz1FY',
      2: 'https://www.youtube.com/embed/gg9xTC5ln9U',
      3: 'https://www.youtube.com/embed/H_kmsjE6RR0',
    },
    [PlacesEnum.MARFETAN]: {
      intro: 'https://www.youtube.com/embed/_Me9SYtyxeE',
      1: 'https://www.youtube.com/embed/s4jOpjbyL8k',
      2: 'https://www.youtube.com/embed/cNChpvSfLok',
      3: 'https://www.youtube.com/embed/mYlIK6VtXzE',
      4: 'https://www.youtube.com/embed/dTF1t8tUBMw',
    },

    [PlacesEnum.SOLAR]: {
      intro: 'https://www.youtube.com/embed/FRg7WXXmmpU',
      1: 'https://www.youtube.com/embed/ZC1whZIJov0',
      2: 'https://www.youtube.com/embed/DW84K3L0vG8',
    },
  };
  videoURLsLocal: any = {
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
      intro: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '1.mp4',
      2: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '2.mp4',
      3: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '3.mp4',
      4: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '4.mp4',
      5: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '5.mp4',
      6: '/assets/videos/' + PlacesEnum.CAPILLA + '/' + '6.mp4',
    },

    [PlacesEnum.MAESO]: {
      intro: '/assets/videos/' + PlacesEnum.MAESO + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.MAESO + '/' + '1.mp4',
      2: '/assets/videos/' + PlacesEnum.MAESO + '/' + '2.mp4',
      3: '/assets/videos/' + PlacesEnum.MAESO + '/' + '3.mp4',
    },
    [PlacesEnum.MARFETAN]: {
      intro: '/assets/videos/' + PlacesEnum.MARFETAN + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.MARFETAN + '/' + '1.mp4',
      2: '/assets/videos/' + PlacesEnum.MARFETAN + '/' + '2.mp4',
      3: '/assets/videos/' + PlacesEnum.MARFETAN + '/' + '3.mp4',
      4: '/assets/videos/' + PlacesEnum.MARFETAN + '/' + '4.mp4',
    },
    [PlacesEnum.SOLAR]: {
      intro: '/assets/videos/' + PlacesEnum.SOLAR + '/' + 'intro.mp4',
      1: '/assets/videos/' + PlacesEnum.SOLAR + '/' + '1.mp4',
      2: '/assets/videos/' + PlacesEnum.SOLAR + '/' + '2.mp4',
    },
  };
  activeVideoURL: any;
  description: string =
    '¡Bienvenido! Durante este recorrido auto-guiado vas a pasear por la historia de Villa Soriano. Será un viaje sin tiempo, que te permitirá pasar de un siglo a otro con tan solo unas cuadras de diferencia. \n Podrás adentrarte en los recovecos de una de las primeras poblaciones del Uruguay y disfrutar de un atardecer colonial en un muelle renovado. \n Notarás que se mezclará la historia nacional con la de sus pobladores y que eso lo convertirá en un paseo único. Ejemplo de esto podrá ser la historia de Don Paco: descendiente de uno de los Treinta y Tres Orientales e hijo de un artista plástico cuya casa está repleta de máscaras expresivas y coloridas. \n Uno de los destinos estará contextualizado en el pasado revolucionario, será el predio donde vivían José Gervasio Artigas e Isabel Sánchez. Comenzarás la historia conociendo a aquel Artigas joven y padre de familia, y llegarás hasta el día de hoy, donde conocerás a la tátara nieta de ambos. \n Podrás rememorar una costumbre religiosa y conocer hasta el más mínimo detalle de una capilla singular. Escuchar la historia de la vida de los vecinos a través de un Timbó solemne, o conocer la personalidad de una artista anticipada para la época. Adentrarte en una cocina antigua, escuchar las leyendas del pueblo, sentir el sonido de las aves, reconstruir el pasado y volver al presente, caminar, investigar, charlar y disfrutar.';
  activeZone: ZoneModel;

  isLoadedLocally: boolean = true;
  constructor(
    private mapService: MapService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private http: HttpClient
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
    //Set video bienvenida
    this.setVideo(PlacesEnum.BIENVENIDO);

    this.activedRoute.queryParams.subscribe((params) => {
      if (!this.zoneClicked) {
        if (Object.keys(params).length > 0 && params['place']) {
          this.QPloaded = true;
          this.hasZoneActive = true;
          this.enableScanningMode = true;
          let qpSplitted: string[] = params['place'].split('-');
          let zoneID: number = +qpSplitted[0];
          let subZoneID: number = +qpSplitted[1];
          this.activeZone = this.searchZoneModelById(zoneID);

          this.addSpacesOnNewDescription(this.activeZone.description);
          this.setVideo(zoneID, subZoneID);
        } else {
          this.QPloaded = false;
        }
      }
    });

    this.mapService.onZoneSelected.subscribe((zone: ZoneModel) => {
      this.zoneClicked = true;

      if (!this.QPloaded) {
        window.scrollTo(0, 0);
        if (this.activeZone && zone.id == this.activeZone.id) {
          this.enableScanningMode = false;
          this.enableScann = false;

          this.activeZone = this.zones[this.zones.length - 1]; //On re-click show BIENVENIDO
          this.addSpacesOnNewDescription(this.activeZone.description);
          if (this.isLoadedLocally)
            this.activeVideoURL = this.activeZone.videoURLLocal;
          else
            this.activeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl(
              this.activeZone.videoURL
            );
        } else {
          this.enableScanningMode = true;
          this.enableScann = false;

          this.hasZoneActive = true;
          this.activeZone = zone;
          this.addSpacesOnNewDescription(zone.description);
          if (this.isLoadedLocally)
            this.activeVideoURL = this.videoURLsLocal[zone.id]['intro'];
          else
            this.activeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl(
              this.videoURLs[zone.id]['intro']
            );
        }
      } else {
        if (this.zoneClicked) {
          if (this.activeZone && zone.id == this.activeZone.id) {
            this.enableScanningMode = false;
            this.enableScann = false;

            this.activeZone = this.zones[this.zones.length - 1]; //On re-click show BIENVENIDO
            this.addSpacesOnNewDescription(this.activeZone.description);
            if (this.isLoadedLocally)
              this.activeVideoURL = this.videoURLsLocal[zone.id]['intro'];
            else
              this.activeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl(
                this.videoURLs[zone.id]['intro']
              );
          } else {
            this.enableScanningMode = true;
            this.enableScann = false;

            this.hasZoneActive = true;
            this.activeZone = zone;
            this.addSpacesOnNewDescription(zone.description);
            if (this.isLoadedLocally)
              this.activeVideoURL = this.videoURLsLocal[zone.id]['intro'];
            else
              this.activeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl(
                this.videoURLs[zone.id]['intro']
              );
          }
        }
      }
    });

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
          items: 4,
        },
        375: {
          edgePadding: 5,
          gutter: 20,
          items: 4,
        },
        414: {
          edgePadding: 5,
          gutter: 20,
          items: 4,
        },
        736: {
          edgePadding: 10,
          items: 4,
        },

        900: {
          edgePadding: 9,
          items: 4,
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
    this.scannerActiveText = this.scannerTexts[1];
    this.mapService.setZoneTypeToScan(this.activeZone.id);
    this.enableScann = true;
    window.scrollTo(0, 0);
    // this.router.navigate([environment.routes.scan]);
    //history.pushState({ foo: 'Home' }, 'Home', this.router.url);
  }
  disableScan() {
    this.scannerActiveText = this.scannerTexts[0];
    this.enableScanningMode = false;
    this.enableScann = false;
  }

  scanResult(placeScaned: string) {
    this.successScan = true;
    this.enableScann = false;
    let splitQP: string[] = placeScaned.split('=');
    this.router.navigate([environment.routes.home], {
      queryParams: { place: splitQP[1] },
    });

    //this.activeVideoURL = this.videoURLs[placeScaned];
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

  scrollTo(x: number, y: number) {
    window.scrollTo(x, y);
  }

  onVideoError(event) {
    this.isLoadedLocally = false;
    //Set video bienvenida
    this.setVideo(PlacesEnum.BIENVENIDO);

    console.log('No se pudo cargar video localmente');
  }

  setVideo(place: PlacesEnum, subPlace?: PlacesEnum) {
    console.log(this.isLoadedLocally);

    if (this.isLoadedLocally) {
      this.activeVideoURL =
        place && subPlace
          ? this.videoURLsLocal[place][subPlace]
          : this.videoURLsLocal[place];
    } else {
      this.activeVideoURL =
        place && subPlace
          ? this._sanitizer.bypassSecurityTrustResourceUrl(
              this.videoURLs[place][subPlace]
            )
          : this._sanitizer.bypassSecurityTrustResourceUrl(
              this.videoURLs[place]
            );
    }
  }
  /*
  setVideo(place: PlacesEnum, subPlace?: PlacesEnum) {
    //Si el video de bienvenida no existe, se asume que se esta viendo desde internet

    this.fileExists(this.videoURLsLocal[PlacesEnum.BIENVENIDO]).subscribe(
      (fileExist) => {
        console.log(fileExist);
      }
    );
  }

  fileExists(url: string): Observable<boolean> {
    return this.http.get(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  */
}
