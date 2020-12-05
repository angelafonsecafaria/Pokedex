import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PokeAPI, PokemonDetails } from '../../shared/model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokeAPI: String;
  private pokeSpeciesAPI: String;
  private pokeGenerationApi: String;

  constructor(private http: HttpClient) {
    this.pokeAPI = environment.pokemonURL;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
    this.pokeGenerationApi = environment.pokemonGenerationURL;
  }

  /**
  * Returns original 151 pokemon
  */
  public fetchPokemons(): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeAPI}?limit=151`)
      .pipe(catchError(this.handleError));
  }

  /**
  * Uses pokemon name to retrieve individual pokemon details
  */
  public fetchPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.pokeAPI}/${name}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Uses pokemon name to retrieve individual pokemon species details
   */
  public fetchPokemonSpecies(name: string): Observable<PokeAPI> {
    return this.http
      .get<any>(`${this.pokeSpeciesAPI}/${name}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Uses pokemon id to retrieve generation pokemon
   */
  public fetchPokemonGeneration(id: number): Observable<any> {
    return this.http.get<any>(`${this.pokeGenerationApi}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles any request error
  */
  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
