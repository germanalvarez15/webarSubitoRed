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
import { FooterTypes } from 'src/app/shared/popup/footer/footerTypes.enum';
import { FooterModel } from 'src/app/shared/popup/footer/footerType.model';
import { FooterParagraphModel } from 'src/app/shared/popup/footer/footerParagraph.model';
import { PopupService } from 'src/app/shared/popup/popup.service';

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
  activeVideoURL: any = this.videoURLsLocal[PlacesEnum.BIENVENIDO]; //Default
  description: string =
    '¡Bienvenido! Durante este recorrido auto-guiado vas a pasear por la historia de Villa Soriano. Será un viaje sin tiempo, que te permitirá pasar de un siglo a otro con tan solo unas cuadras de diferencia. \n Podrás adentrarte en los recovecos de una de las primeras poblaciones del Uruguay y disfrutar de un atardecer colonial en un muelle renovado. \n Notarás que se mezclará la historia nacional con la de sus pobladores y que eso lo convertirá en un paseo único. Ejemplo de esto podrá ser la historia de Don Paco: descendiente de uno de los Treinta y Tres Orientales e hijo de un artista plástico cuya casa está repleta de máscaras expresivas y coloridas. \n Uno de los destinos estará contextualizado en el pasado revolucionario, será el predio donde vivían José Gervasio Artigas e Isabel Sánchez. Comenzarás la historia conociendo a aquel Artigas joven y padre de familia, y llegarás hasta el día de hoy, donde conocerás a la tátara nieta de ambos. \n Podrás rememorar una costumbre religiosa y conocer hasta el más mínimo detalle de una capilla singular. Escuchar la historia de la vida de los vecinos a través de un Timbó solemne, o conocer la personalidad de una artista anticipada para la época. Adentrarte en una cocina antigua, escuchar las leyendas del pueblo, sentir el sonido de las aves, reconstruir el pasado y volver al presente, caminar, investigar, charlar y disfrutar.';
  activeZone: ZoneModel;
  //Load locally by default
  isLoadedLocally: boolean = true;
  activeZoneID: PlacesEnum;
  activeSubZoneID: PlacesEnum;
  footerPopupTypes: any = FooterTypes;
  isPopupOpened: boolean = false;
  footerPopupTexts: any = {
    [FooterTypes.LEGALES]: new FooterModel(
      FooterTypes.LEGALES,
      'Información Legal',
      [
        new FooterParagraphModel(
          'Identificación de la Empresa',
          ['Súbito Red Desarrollos Srl , con RUT número 217076220017 y domicilio fiscal en la ciudad de Montevideo, en la calle Porongos 2877. Puede contactarnos a través del correo electrónico jgarin.subito@gmail.com<br>']
        ),
        new FooterParagraphModel(
          'Propiedad Intelectual',
          [
            'La propiedad intelectual e industrial, desarrollo de tecnología, software de autor, gráficos, imágenes, videos, logotipos, e iconos visibles en el Sitio Web, como en la instalación física son de propiedad exclusiva de Súbito Red. Desarrollos Srl y queda prohibida su utilización con fines comerciales y/o su posterior distribución sin que se haya obtenido previamente la autorización necesaria para tales usos. Queda asimismo prohibido su empleo para ilustrar actividades, productos o eventos de otras compañías sin la previa autorización expresa y por escrito de Súbito Red. Desarrollos Srl.<br>',
            'El software licenciado y/o desarrollado por y para Súbito Red. Desarrollos Srl, incluyendo el código fuente y los contenidos elaborados por su titular y/o sus colaboradores, están protegidos por las normativas nacionales e internacionales vigentes en materia de derechos de propiedad intelectual e industrial, de forma que el Usuario se encuentra facultado únicamente para la navegación a través de las páginas del sitio Web para su visualización como uso privado.<br>'
          ]
        ),
        new FooterParagraphModel(
          'Uso',
          [
            'Los Usuarios se comprometen a utilizar los servicios ofrecidos por Súbito Red. Desarrollos Srl y contenidos del Sitio Web de conformidad con lo establecido en la Ley y en el presente Aviso Legal, respondiendo frente a Súbito Red. Desarrollos Srl o frente a terceros, de los daños y perjuicios que pudieran causar como consecuencia del incumplimiento de dichas obligaciones, y de las actuaciones llevadas a cabo que sean de carácter ilícito, negligente, fraudulento, o que contravengan el principio de buena fe, los usos generalmente aceptados o el orden público.<br>',
            'Queda expresamente prohibido el uso del Sitio Web con fines ilícitos, lesivos de los bienes, los intereses o la reputación de Súbito Red. Desarrollos Srl o de terceros, o que de cualquier otra forma dañen, sobrecarguen o inutilicen las redes, servidores y demás equipos informáticos (hardware) o productos y aplicaciones informáticas (software) de Súbito Red. Desarrollos Srl o de terceros.<br>',
          ]
        ),
        new FooterParagraphModel(
          'Política de confidencialidad',
          [
            'No recopilamos ninguna información u otros datos personales que lo identifiquen a usted personalmente.<br>',
          ]
        ),
      ]
    ),
    [FooterTypes.CREDITOS]: new FooterModel(
      FooterTypes.CREDITOS,
      'Proyecto desarrollado en el marco del Corredor Turístico Pájaros Pintados. Financiado por la Intendencia de Soriano y el Banco Interamericano de Desarrollo.',
      [
        new FooterParagraphModel(
          'INTENDENCIA DE SORIANO',
          ['Intendente: <b>Agustín Bascou</b><br> Dirección de turismo: <b>José Luis Perazza</b><br> Coordinación de contenidos: <b>Elena Guzzi</b><br>']
        ),
        new FooterParagraphModel(
          'MINTUR',
          ['Coordinación de contenido: <b>Nadia Coiana</b><br> Dirección de turismo: <b>José Luis Perazza</b><br> Coordinación de contenidos: <b>Elena Guzzi</b><br>']

        ),
        new FooterParagraphModel(
          'PRODUCCIÓN',
          ['Director de proyecto: <b>jGarin</b><br> Guión y documentación: <b>Camila Rodríguez Caram</b><br> Realización multimedia: <b>Sebastián Pérez</b><br> Desarrollo técnico: <b>Alberto Eberhardt y Diego Strasser</b><br> Programación Web/AR: <b>Germán Álvarez</b><br> Actriz: <b>María Eugenia Machado</b><br> Cámaras adicionales: <b>Soledad Sienra y David Nogal</b><br>  Asesoría actoral: <b>Yamandú Fumero</b><br> Asistencia producción: <b>Gabriela Muzio</b><br> Instalación técnica: <b>Alberto Eberhardt y Enrique Araújo</b><br> Producción general: <b>Súbito Red.Desarrollos SRL</b><br>']
        )
      ]
    ),
  }


  constructor(
    private mapService: MapService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private http: HttpClient,
    private popupService: PopupService
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
    //this.setVideo(PlacesEnum.BIENVENIDO);
    this.popupService.onIsPopupOpened.subscribe((status: boolean) => {
      this.isPopupOpened = status;
    })
    this.activedRoute.queryParams.subscribe((params) => {
      if (!this.zoneClicked) {
        if (Object.keys(params).length > 0 && params['place']) {
          console.log("BY URL");

          this.QPloaded = true;
          this.hasZoneActive = true;
          this.enableScanningMode = true;
          let qpSplitted: string[] = params['place'].split('-');
          let zoneID: number = +qpSplitted[0];
          let subZoneID: number = +qpSplitted[1];
          this.activeZone = this.searchZoneModelById(zoneID);
          this.activeZoneID = zoneID;
          this.activeSubZoneID = subZoneID;

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
    if (this.activeZoneID && this.activeSubZoneID) {
      this.setVideo(this.activeZoneID, this.activeSubZoneID);
    } else {
      this.setVideo(PlacesEnum.BIENVENIDO);
    }

    console.log('No se pudo cargar video localmente');
  }

  setVideo(place: PlacesEnum, subPlace?: PlacesEnum) {
    console.log(place);
    console.log(subPlace);
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

  onGoBackInit() {
    this.setVideo(PlacesEnum.BIENVENIDO);
    this.disableScan();
    this.hasZoneActive = false;
    this.description = this.searchZoneModelById(1).description;
  }

  onOpenPopup(footerType: FooterTypes) {
    this.isPopupOpened = true;
    this.popupService.onOpenFooterPopup.emit(this.footerPopupTexts[footerType]);
  }
}
