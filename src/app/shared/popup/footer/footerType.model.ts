import { FooterParagraphModel } from './footerParagraph.model';
import { FooterTypes } from './footerTypes.enum';

export class FooterModel{
  constructor(
    public type?: FooterTypes,
    public mainTitle?: string,
    public paragraphs?: FooterParagraphModel[]
  ){

  }
}
