import { WaypointValuesPortrait } from './map-container/waypoint-values/waypoint-portrait-values.model';
import { WaypointValuesLandscape } from './map-container/waypoint-values/waypoint-landscapte-values.model';

export class ZoneModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public coinImage: string,
    public videoURL: any,
    public videoURLLocal: any,
    public markersURL: any,
    public portraitValues: WaypointValuesPortrait,
    public landscapeValues: WaypointValuesLandscape,
    public textAlignRight: boolean,
    public hasScannMode: boolean
  ) {}
}
