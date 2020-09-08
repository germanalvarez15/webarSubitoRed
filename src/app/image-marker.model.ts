export class ImageMarkerModel {
  constructor(
    public placeID: number,
    public subPlaceID: number,
    public url: string
  ) {
    if (url) {
      this.formatURL();
    }
  }

  formatURL() {
    this.url =
      'assets/trackingImages/' +
      this.placeID +
      '/' +
      this.subPlaceID +
      '/' +
      this.subPlaceID;
  }
}
