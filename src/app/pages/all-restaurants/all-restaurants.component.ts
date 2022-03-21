import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import RestaurantInterface from 'src/app/interfaces/restaurant.interface';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.scss']
})
export class AllRestaurantsComponent implements OnInit {

  restaurants: Observable<RestaurantInterface[]>;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants()
    this.restaurants = this.restaurantService.getRestaurants().asObservable()
  }

}
