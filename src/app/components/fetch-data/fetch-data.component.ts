import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from './pokemon.service';

interface Pokemon {
  name: string;
  sprites?: {
    front_default: string;
  };
  image: string;
  id: number;
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FetchDataComponent implements OnInit {
  pokemonService = inject(PokemonService);

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.pokemonService.setPokemonsLoadingState();

    this.pokemonService.getPokemons().subscribe({
      next: (response) => {
        this.pokemonService.setPokemonsSuccessState(response.results);
      },
      error: (error) => {
        this.pokemonService.setPokemonsErrorState(error);
      },
    });
  }

  getPokemonDetails(pokemon: Pokemon) {
    this.pokemonService.setPokemonsSuccessState([]);
    this.pokemonService.setPokemonDetailLoadingState();

    this.pokemonService.getPokemonDetails(pokemon).subscribe({
      next: (response) => {
        if (response.results) {
          this.pokemonService.setPokemonDetailSuccessState(response.results);
        } else {
          this.pokemonService.setPokemonDetailErrorState(
            new Error('Pokemon details not found')
          );
        }
      },
      error: (err) => {
        this.pokemonService.setPokemonDetailErrorState(err);
      },
    });
  }

  goBackToPokemonsList() {
    this.pokemonService.pokemonDetail.set({
      results: null,
      error: undefined,
      isLoading: false,
    });
    this.fetchPokemons();
  }
}
