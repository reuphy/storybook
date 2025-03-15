import { Component, OnInit, Signal, signal } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FetchDataComponent implements OnInit {
  url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=5';

  pokemons = signal<HttpResponse<Pokemon[]>>({
    results: [],
    error: undefined,
    isLoading: true,
  });

  selectedPokemon = signal<HttpResponse<Pokemon | null>>({
    results: null,
    error: undefined,
    isLoading: false,
  });

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.pokemons.set({
      results: [],
      error: undefined,
      isLoading: true,
    });

    this.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons.set({
          results: pokemons,
          error: undefined,
          isLoading: false,
        });
      },
      error: (error) => {
        this.pokemons.set({
          results: [],
          error: '' + error.message,
          isLoading: false,
        });
      },
    });
  }

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

  getPokemons(): Observable<Pokemon[]> {
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
      map((pokemons) => this.mapPokemons(pokemons))
    );
  }

  getPokemonDetails(pokemon: Pokemon) {
    this.pokemons.set({
      results: [],
      error: undefined,
      isLoading: false,
    });

    this.selectedPokemon.set({
      results: null,
      error: undefined,
      isLoading: true,
    });

    this.fetchData<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
    ).subscribe({
      next: (data) => {
        this.selectedPokemon.set({
          results: {
            name: data.name,
            image: data.sprites?.front_default ?? '',
            id: data.id,
          },
          error: undefined,
          isLoading: false,
        });
      },
      error: (err) => {
        console.error('Error fetching Pokémon details:', err);
        this.selectedPokemon.set({
          results: null,
          error: 'Failed to fetch Pokémon details',
          isLoading: false,
        });
      },
    });
  }

  goBackToPokemonsList() {
    this.selectedPokemon.set({
      results: null,
      error: undefined,
      isLoading: false,
    });
    this.fetchPokemons();
  }
}
