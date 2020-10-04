export class FruitModel {
  id?: number;
  name: string;
  size: FruitSizeEnum;
  colour: string;

  constructor() {
    this.name = '';
    this.size = FruitSizeEnum.SMALL;
    this.colour = '';
  }
}

export enum FruitSizeEnum {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}
