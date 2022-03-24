import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import DishInterface from '../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private _dishes = new BehaviorSubject<DishInterface[]>([]);
  private _isloading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private setDishes(dishes: DishInterface[]) {
    this._dishes.next(dishes);
  }

  getDishes() {
    return this._dishes.asObservable();
  }

  getIsLoading() {
    return this._isloading.asObservable();
  }

  public async fetchDishes() {
    this._isloading.next(true);
    try {
      const dishes = await firstValueFrom(
        this.http.get<{ dishes: DishInterface[] }>(
          `http://localhost:5000/api/v1/dishes`
        )
      );
      this._isloading.next(false);
      this.setDishes(dishes.dishes);
    } catch (error) {
      this._isloading.next(false);
      console.log(error);
    }
  }

  async createDish(dish: {}) {
    try {
      const newDish = await firstValueFrom(
        this.http.post(`http://localhost:5000/api/v1/dishes`, dish)
      );
      if (newDish) {
        alert('Dish has been successfully added');
        this.fetchDishes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDish(dish: {
    _id: any;
    name: any;
    price: any;
    image: any;
    ingredients: any;
    tags: any;
    restaurant: any;
  }) {
    const { _id: id } = dish;
    try {
      const updateDish = await firstValueFrom(
        this.http.patch(`http://localhost:5000/api/v1/dishes/${id}`, dish)
      );

      if (updateDish) {
        alert('Dish has been successfully updated');
        this.fetchDishes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDish(id: string) {
    try {
      await firstValueFrom(
        this.http.delete(`http://localhost:5000/api/v1/dishes/${id}`)
      );
      alert('Dish has been successfully deleted');
      this.fetchDishes();
    } catch (error) {
      console.log(error);
    }
  }
}
