import { Component, Input, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';
import { TYPE_COLOURS } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-pokemons-general',
  templateUrl: './pokemons-general.component.html',
  styleUrls: ['./pokemons-general.component.css']
})
export class PokemonsGeneralComponent implements OnInit {

  @Input() public currentPokemon: any;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
  }
}
