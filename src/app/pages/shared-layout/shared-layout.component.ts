import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-shared-layout',
  templateUrl: './shared-layout.component.html',
  styleUrls: ['./shared-layout.component.scss'],
})
export class SharedLayoutComponent implements OnInit {
  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants();
  }
}
