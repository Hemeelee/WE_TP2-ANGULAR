import { Component, OnInit } from '@angular/core';
import { PokeDetails, Pokemon } from '../pokemon';
import { PokeAPIServiceService } from '../poke-apiservice.service';
import { PokeShareInfoService } from '../poke-share-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  providers: [PokeAPIServiceService]
})
export class MyComponentComponent implements OnInit {
  id: string = '';

  pokes: Pokemon[] = [];
  filteredPokes: Pokemon[] = [];
  selectedPokeid: string = '';
  selectedPokename: string | undefined = '';
  searchPokeId: string = '';
  searchPokeName: string = '';
  pokeDetails: PokeDetails = new PokeDetails();

  constructor(
    private pokeApiService: PokeAPIServiceService,
    private pokeShareInfoService: PokeShareInfoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokeApiService.getAllPokemon().subscribe((pokemonBatch: Pokemon[]) => {
      this.pokes = [...this.pokes, ...pokemonBatch];
      this.filteredPokes = this.pokes;
    });
  }


  updatePokemonInfo() {
    this.filteredPokes = this.pokes.filter(poke =>
      poke.name.toLowerCase().includes(this.searchPokeName.toLowerCase())
    );

    const foundPokemonById = this.pokes.find(poke => poke.id.toString() === this.searchPokeId);
    const foundPokemonByName = this.pokes.find(poke => poke.name.toLowerCase() === this.searchPokeName.toLowerCase());

    if (foundPokemonById) {
      this.selectedPokeid = foundPokemonById.id;
      this.selectedPokename = foundPokemonById.name;
      this.getPokemonDetails(this.selectedPokeid);
    } else if (foundPokemonByName) {
      this.selectedPokeid = foundPokemonByName.id;
      this.selectedPokename = foundPokemonByName.name;
      this.getPokemonDetails(this.selectedPokeid);
    } else {
      this.selectedPokeid = '';
      this.selectedPokename = undefined;
      this.pokeDetails = new PokeDetails();
    }
  }


  onPokemonSelect() {
    const selectedPokemon = this.pokes.find(poke => poke.id === this.selectedPokeid);
    if (selectedPokemon) {
      this.selectedPokename = selectedPokemon.name;
      this.getPokemonDetails(this.selectedPokeid);
    }
  }

  private getPokemonDetails(pokeId: string) {
    this.pokeApiService.getPokemonInfo(pokeId).subscribe((data: PokeDetails) => {
      this.pokeDetails = data;
      this.pokeShareInfoService.setValue(pokeId);
    });
  }

  goHome() {
    // @ts-ignore
    this.router.navigate(['/']);
  }


}
