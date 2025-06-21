export class CreateTagDto {
  name: string = '';
  description: string = '';
  colour: string = '';
  userId: number = 0;

  constructor(
    name: string,
    description: string,
    colour: string,
    userId: number,
  ) {
    this.name = name;
    this.description = description;
    this.colour = colour;
    this.userId = userId;
  }
}
