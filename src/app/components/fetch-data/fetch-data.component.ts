import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

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
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FetchDataComponent {
  url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=5';
  loading = computed(
    () => this.pokemons().results.length === 0 && !this.pokemons().error
  );

  pokemons: Signal<HttpResponse<Pokemon[]>> = toSignal(
    this.getPokemonData().pipe(
      map((pokemons) => {
        return {
          results: pokemons,
          error: undefined,
        };
      }),
      catchError((error) => {
        return [{ results: [], error: '' + error.message }];
      })
    ),
    { initialValue: { results: [], error: undefined } }
  );

  selectedPokemon = signal<Pokemon | null>(null);
  error = signal<string | null>(null);

  fetchData<T>(url: string): Observable<T> {
    return ajax.getJSON<T>(url);
  }

  mapPokemons(pokemons: Pokemon[]): Pokemon[] {
    return pokemons.map((pokemon) => ({
      name: pokemon.name,
      image: pokemon.sprites?.front_default ?? '',
      id: pokemon.id,
    }));
  }

  getPokemonData(): Observable<Pokemon[]> {
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
      map((pokemons) => this.mapPokemons(pokemons)),
      delay(2000)
    );
  }

  selectPokemon(pokemon: Pokemon) {
    this.fetchData<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
    ).subscribe({
      next: (data) => {
        this.selectedPokemon.set({
          name: data.name,
          image: data.sprites?.front_default ?? '',
          id: data.id,
        });
        this.error.set(null); // Clear any previous error
      },
      error: (err) => {
        console.error('Error fetching Pokémon details:', err);
        this.error.set('Failed to fetch Pokémon details');
      },
    });
  }

  clearSelection() {
    this.selectedPokemon.set(null);
  }
}
