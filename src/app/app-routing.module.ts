import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyComponentComponent } from './my-component/my-component.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokedex', component: MyComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
