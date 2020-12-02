import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-pokemon-general',
  templateUrl: './pokemon-general.component.html',
  styleUrls: ['./pokemon-general.component.css']
})
export class PokemonGeneralComponent implements OnInit {

  @Input() public currentPokemon: any;

  constructor() { }

  ngOnInit(): void {
  }
}
