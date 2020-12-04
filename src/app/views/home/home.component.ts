import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';

// Ngx-Bootstrap:
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Generation, PokeAPI, PokemonDetails, Results, TYPE_COLOURS } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribeAll: Subject<any>;

  public modalRef: BsModalRef;
  public pokemonsLoaded: boolean;
  public pokemons: Array<Results>;
  public types: Array<any> = [];
  public currentPokemon: PokeAPI;
  public selectedGeneration: number = 1;
  public isLoading: boolean;
  public generations = [
    { id: 1, name: 'Generation i' },
    { id: 2, name: 'Generation ii' },
    { id: 3, name: 'Generation iii' },
    { id: 4, name: 'Generation iv' },
    { id: 5, name: 'Generation v' },
    { id: 6, name: 'Generation vi' },
    { id: 7, name: 'Generation vii' },
    { id: 8, name: 'Generation viii' }
  ];
  constructor(private pokemonService: PokemonService, private modalService: BsModalService) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.fetchPokemons(this.selectedGeneration);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public openModal(template: TemplateRef<any>, pokemon: PokeAPI): BsModalRef {
    this.currentPokemon = pokemon;
    // this.getEvolution(pokemonId)
    return this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered, modal-xl',
      keyboard: false,
      animated: true
    });
  }

  public getTypeColour(type: string): string {
    if (type) {
      return '#' + TYPE_COLOURS[type];
    }
  }

  public changeGeneration(generation: Generation): void {
    this.selectedGeneration = generation.id;
    this.fetchPokemons(this.selectedGeneration);
  }

  private fetchPokemons(generationId: number): void {
    this.isLoading = true;
    if (this.selectedGeneration === 1) {
      this.pokemonService.fetchPokemons()
        .pipe(takeUntil(this.unsubscribeAll),
          finalize(() => this.isLoading = false))
        .subscribe((data: PokeAPI) => {
          this.pokemons = data.results;
          if (this.pokemons) {
            // get pokemon details for every pokemon
            this.updatePokemons();
          }
        });
    }
    if (this.selectedGeneration !== 1) {
      this.pokemonService.fetchPokemonGeneration(generationId)
        .pipe(takeUntil(this.unsubscribeAll),
          finalize(() => this.isLoading = false))
        .subscribe((data: Generation) => {
          this.pokemons = data.pokemon_species;
          if (this.pokemons) {
            // get pokemon details for every pokemon
            this.updatePokemons();
          }
        });
    }

  }

  private fetchPokemonDetails(pokemon: Results): void {
    this.pokemonService
      .fetchPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
      });
  }

  private fetchPokemonSpeciesDetails(pokemon: Results): void {
    this.pokemonService
      .fetchPokemonSpecies(pokemon.name)
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

  private updatePokemons() {
    this.pokemons.forEach((pokemon: Results) => {
      // set pokemon id
      pokemon.id = this.extractPokemonId(pokemon)
      this.fetchPokemonDetails(pokemon);
      this.fetchPokemonSpeciesDetails(pokemon);
    });
    this.pokemons.sort(((nextId, prevId) => (prevId.id < nextId.id) ? 1 : ((prevId.id > nextId.id) ? -1 : 0)));
  }

  private extractPokemonId(pokemon: Results): number {
    return parseInt(pokemon.url.split('/')[pokemon.url.split('/').length - 2]);
  }
}


