import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/_helpers/auth.guard';
import { ChefsComponent } from './pages/chefs/chefs.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { SharedLayoutComponent } from './pages/shared-layout/shared-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'all-chefs', pathMatch: 'full' },
      { path: 'all-restaurants', component: RestaurantsComponent },
      { path: 'all-chefs', component: ChefsComponent },
      { path: 'all-dishes', component: DishesComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
