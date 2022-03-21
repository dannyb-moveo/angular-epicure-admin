import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import RestaurantInterface from '../interfaces/restaurant.interface';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurants = new BehaviorSubject<RestaurantInterface[]>([]);

  constructor(private http: HttpClient) {}

  private setRestaurants(restaurants: RestaurantInterface[]) {
    this.restaurants.next(restaurants);
  }

  getRestaurants() {
    return this.restaurants;
  }

  public async fetchRestaurants() {
    try {
      const restaurants = await firstValueFrom(
        this.http.get<{ restaurants: RestaurantInterface[] }>(
          `http://localhost:5000/api/v1/restaurants`
        )
      );

      this.setRestaurants(restaurants.restaurants);
    } catch (error) {
      console.log(error);
    }
  }
}
