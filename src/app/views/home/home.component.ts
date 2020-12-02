import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';

// Ngx-Bootstrap:
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokeAPI, PokemonDetails, Results, TYPE_COLOURS } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() exportPokemons = new EventEmitter();
  public modalRef: BsModalRef;
  public pokemonsLoaded: boolean;
  public pokemons: PokeAPI;
  public types: Array<any> = [];
  public selectedGeneration: number;
  public modalReference: NgbModalRef;
  public currentPokemon: PokeAPI;

  constructor(private pokemonService: PokemonService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  public openModal(template: TemplateRef<any>, pokemon: PokeAPI): BsModalRef {
    this.currentPokemon = pokemon;
    return this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered, modal-xl',
      keyboard: false,
      animated: true
    });
  }

  private getPokemons(): void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;
      if (this.pokemons.results && this.pokemons.results.length) {
        // get pokemon details for every pokemon
        this.pokemons.results.forEach(pokemon => {
          // set pokemon id
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];
          this.getPokemonDetails(pokemon);
          this.getPokemonSpeciesDetails(pokemon);
        });
      }
    });
  }

  /**
   * Gets and sets a pokemons details
   */
  private getPokemonDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
        // when last pokemon details have been loaded
        // send pokemons to header component
        if (pokemon.id === '151') {
          this.pokemonsLoaded = true;
          this.exportPokemons.emit(this.pokemons.results);
        }
      });
  }

  /**
   * Gets and sets a species details
   * (currently only sets the description -
   * would be used when card is clicked and either
   * a new page/dialog with further information on
   * a pokemon is shown)
   */
  private getPokemonSpeciesDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonSpecies(pokemon.name)
      .subscribe((species: any) => {
        const entries = species.flavor_text_entries;
        if (entries) {
          entries.some(flavor => {
            if (flavor.language.name === 'en') {
              pokemon.description = flavor.flavor_text;
            }
          });
        }
      });
  }

  /**
 * returns colour based on type mapped
 * in TYPE_COLOURS interface
 */
  public getTypeColour(type: string): string {
    if (type) {
      return '#' + TYPE_COLOURS[type];
    }
  }
}


