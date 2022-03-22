import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefsComponent } from './pages/chefs/chefs.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { SharedLayoutComponent } from './pages/shared-layout/shared-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
      { path: 'all-restaurants', component: RestaurantsComponent },
      { path: 'all-chefs', component: ChefsComponent },
      { path: 'all-dishes', component: DishesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
