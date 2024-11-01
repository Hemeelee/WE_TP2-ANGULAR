import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PokeDetails, PokemonServiceRes } from './pokemon';
import { Pokemon } from './pokemon';

const url: string = 'https://pokeapi.co/api/v2/pokemon/';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIServiceService {
  private allPokemonSubject = new Subject<Pokemon[]>();

  constructor(private http: HttpClient) {}

  getPokemon(): Observable<PokemonServiceRes> {
    return this.http.get<PokemonServiceRes>(url);
  }

  getPokemonInfo(id: string): Observable<PokeDetails> {
    return this.http.get<PokeDetails>(url + id + '/');
  }

  getAllPokemon(url: string = 'https://pokeapi.co/api/v2/pokemon/'): Observable<Pokemon[]> {
    this.fetchAllPokemon(url);
    return this.allPokemonSubject.asObservable();
  }

  private fetchAllPokemon(url: string): void {
    this.http.get<PokemonServiceRes>(url).subscribe((data: PokemonServiceRes) => {
      const pokes = data.results.map((element: { name: string; url: string }) => {
        const id = element.url.split('/')[6];
        return new Pokemon(id, element.name);
      });

      this.allPokemonSubject.next(pokes);

      if (data.next) {
        this.fetchAllPokemon(data.next);
      } else {
        this.allPokemonSubject.complete();
      }
    });
  }
}

