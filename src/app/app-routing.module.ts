import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRestaurantsComponent } from './pages/all-restaurants/all-restaurants.component';
import { SharedLayoutComponent } from './pages/shared-layout/shared-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SharedLayoutComponent,
    children: [{ path: 'all-restaurants', component: AllRestaurantsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
