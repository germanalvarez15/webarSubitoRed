export class ZoneModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public coinImage: string,
    public videoURL: string,
    public topValue?: number,
    public leftValue?: number,
    public yTranslateValue?: number,
    public xTranslateValue?: number
  ) {}
}
