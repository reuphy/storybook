import { Injectable, Signal, signal } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

interface Pokemon {
  name: string;
  sprites?: {
    front_default: string;
  };
  image: string;
  id: number;
}

interface HttpResponse<T> {
  results: T;
  error: string | undefined;
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=5';

  pokemons = signal<HttpResponse<Pokemon[]>>({
    results: [],
    error: undefined,
    isLoading: true,
  });

  pokemonDetail = signal<HttpResponse<Pokemon | null>>({
    results: null,
    error: undefined,
    isLoading: false,
  });

  fetchData<T>(url: string): Observable<T> {
    return ajax.getJSON<T>(url).pipe(delay(2000));
  }

  mapPokemons(pokemons: Pokemon[]): Pokemon[] {
    return pokemons.map((pokemon) => ({
      name: pokemon.name,
      image: pokemon.sprites?.front_default ?? '',
      id: pokemon.id,
    }));
  }

  getPokemons(): Observable<HttpResponse<Pokemon[]>> {
    return this.fetchData<HttpResponse<Pokemon[]>>(this.url).pipe(
      mergeMap((data) =>
        forkJoin(
          data.results.map((_, index) =>
            this.fetchData<Pokemon>(
              `https://pokeapi.co/api/v2/pokemon/${index + 1}/`
            )
          )
        )
      ),
      map((pokemons) => ({
        results: this.mapPokemons(pokemons),
        error: undefined,
        isLoading: false,
      })),
      catchError((error) => {
        return [{ results: [], error: '' + error.message, isLoading: false }];
      })
    );
  }

  getPokemonDetails(
    pokemon: Pokemon
  ): Observable<HttpResponse<Pokemon | null>> {
    return this.fetchData<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
    ).pipe(
      map((data) => ({
        results: {
          name: data.name,
          image: data.sprites?.front_default ?? '',
          id: data.id,
        },
        error: undefined,
        isLoading: false,
      })),
      catchError((error) => {
        return [
          {
            results: null,
            error: 'Failed to fetch Pokémon details',
            isLoading: false,
          },
        ];
      })
    );
  }

  setPokemonsLoadingState() {
    this.pokemons.set({
      results: this.pokemons().results,
      error: undefined,
      isLoading: true,
    });
  }

  setPokemonsSuccessState(results: Pokemon[]) {
    this.pokemons.set({
      results,
      error: undefined,
      isLoading: false,
    });
  }

  setPokemonsErrorState(error: any) {
    this.pokemons.set({
      results: this.pokemons().results,
      error: '' + error.message,
      isLoading: false,
    });
  }

  setPokemonDetailLoadingState() {
    this.pokemonDetail.set({
      results: this.pokemonDetail().results,
      error: undefined,
      isLoading: true,
    });
  }

  setPokemonDetailSuccessState(results: Pokemon) {
    this.pokemonDetail.set({
      results,
      error: undefined,
      isLoading: false,
    });
  }

  setPokemonDetailErrorState(error: any) {
    this.pokemonDetail.set({
      results: this.pokemonDetail().results,
      error: '' + error.message,
      isLoading: false,
    });
  }
}
