import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  @Input() public currentPokemon: any;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    console.log(this.currentPokemon)
  }
}
