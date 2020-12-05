import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonWeight'
})
export class PokemonWeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const kg = value / 10,
          lbs = Math.floor(kg * 2.20462262185 * 10) / 10;
    return `${kg} kg / ${lbs} lbs.`;
  }
}
