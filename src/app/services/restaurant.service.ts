import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import RestaurantInterface from '../interfaces/restaurant.interface';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import DishInterface from '../interfaces/dish.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurants = new BehaviorSubject<RestaurantInterface[]>([]);
  private _isloading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private setRestaurants(restaurants: RestaurantInterface[]) {
    this.restaurants.next(restaurants);
  }

  getRestaurants() {
    return this.restaurants.asObservable();
  }

  getIsLoading() {
    return this._isloading.asObservable();
  }

  public async fetchRestaurants() {
    this._isloading.next(true);
    try {
      const restaurants = await firstValueFrom(
        this.http.get<{ restaurants: RestaurantInterface[] }>(
          `${environment.baseURL}/restaurants`
        )
      );
      this._isloading.next(false);
      this.setRestaurants(restaurants.restaurants);
    } catch (error) {
      this._isloading.next(false);
      console.log(error);
    }
  }

  async createRestaurant(restaurant: RestaurantInterface) {
    try {
      const newRestaurant = await firstValueFrom(
        this.http.post(`${environment.baseURL}/restaurants`, restaurant)
      );
      if (newRestaurant) {
        alert('Restaurant has been successfully added');
        this.fetchRestaurants();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateRestaurant(restaurant: RestaurantInterface) {
    const { _id: id } = restaurant;
    try {
      const updatedRestaurant = await firstValueFrom(
        this.http.patch(`${environment.baseURL}/restaurants/${id}`, restaurant)
      );

      if (updatedRestaurant) {
        alert('Restaurant has been successfully updated');
        this.fetchRestaurants();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRestaurant(id: string) {
    try {
      await firstValueFrom(
        this.http.delete(`${environment.baseURL}/restaurants/${id}`)
      );
      alert('Restaurant has been successfully deleted');
      this.fetchRestaurants();
    } catch (error) {
      console.log(error);
    }
  }

  async getRestaurantDishes(id: string) {
    let restaurantDishes: DishInterface[] = [];
    try {
      const response = await firstValueFrom(
        this.http.get<{ dishes: DishInterface[] }>(
          `${environment.baseURL}/restaurants/${id}/dishes`
        )
      );
      restaurantDishes = response.dishes;
    } catch (error) {
      console.log(error);
    }

    return restaurantDishes;
  }
}
