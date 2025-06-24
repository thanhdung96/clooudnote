export class CreateTagDto {
  name: string = '';
  description: string = '';
  colour: string = '';

  constructor(name: string, description: string, colour: string) {
    this.name = name;
    this.description = description;
    this.colour = colour;
  }
}
