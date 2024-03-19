/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
export default class Pokemon {
  constructor(id, name, weight, mainPhoto, secondaryPhoto, abilities = [], types = [], moves = [], stats = []) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.mainPhoto = mainPhoto;
    this.secondaryPhoto = secondaryPhoto;
    this.abilities = abilities;
    this.types = types;
    this.moves = moves;
    this.stats = stats;
  }
}
