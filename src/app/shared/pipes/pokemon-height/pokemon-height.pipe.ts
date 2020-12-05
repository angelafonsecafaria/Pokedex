import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonHeight'
})
export class PokemonHeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const meters = value / 10,
          feetRaw = meters * 3.2808,
          feet = Math.floor(feetRaw),
          inches = feet > 0 ? Math.floor((feetRaw % feet) * 12) : Math.floor(meters * 39.370);
    return `${meters} m / ${feet}' ${inches}"`;
  }

}