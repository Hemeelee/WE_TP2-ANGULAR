import {Component, Input} from '@angular/core';
import {PokeDetails} from '../pokemon';
import {PokeShareInfoService} from '../poke-share-info.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrl: './poke-detail.component.css',
})
export class PokeDetailComponent {

  @Input('details')
  detail: PokeDetails = new PokeDetails();

  constructor(private pokeShareInfoService: PokeShareInfoService) {
    this.pokeShareInfoService.getObservable().subscribe(e =>console.log('e' + e));
  }

  ngOnInit() {
    console.log(this.pokeShareInfoService.getValue());
  }
}
