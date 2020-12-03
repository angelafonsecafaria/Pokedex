import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';

// Ngx-Bootstrap:
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokeAPI, PokemonDetails, Results, TYPE_COLOURS } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Output() exportPokemons = new EventEmitter();

  private unsubscribeAll: Subject<any>;

  public modalRef: BsModalRef;
  public pokemonsLoaded: boolean;
  public pokemons: any;
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
  public evolution
  constructor(private pokemonService: PokemonService, private modalService: BsModalService) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    console.log(this.pokemonService.getEvolution(1).subscribe(res => console.log(res.chain.evolves_to)))
    this.getPokemons(this.selectedGeneration);
  }

  public openModal(template: TemplateRef<any>, pokemon: PokeAPI, pokemonId: number): BsModalRef {
    this.currentPokemon = pokemon;
    // this.getEvolution(pokemonId)
    return this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered, modal-xl',
      keyboard: false,
      animated: true
    });
  }

  private getPokemons(id: number): void {
    this.isLoading = true;
    this.pokemonService.getPokemonGeneration(id)
      .pipe(takeUntil(this.unsubscribeAll), finalize(() => this.isLoading = false)).subscribe((data: any) => {
        this.pokemons = data.pokemon_species;
        console.log(this.pokemons)
        if (this.pokemons) {
          // get pokemon details for every pokemon
          this.pokemons.forEach(pokemon => {
            // set pokemon id
            pokemon.id = pokemon.url.split('/')[
              pokemon.url.split('/').length - 2
            ];
            this.getPokemonDetails(pokemon);
            this.getPokemonSpeciesDetails(pokemon);
          });
        }

        console.log(this.pokemons.length)
      });
  }

  // private getEvolution(id: number): void {
  //   this.isLoading = true;
  // }

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
        this.pokemonsLoaded = true;
        this.exportPokemons.emit(this.pokemons.results);
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

  public changeGeneration(event): void {
    this.getPokemons(event.id)
  }

  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}


