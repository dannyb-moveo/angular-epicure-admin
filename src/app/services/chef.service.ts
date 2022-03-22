import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import ChefInterface from '../interfaces/chef.interface';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private _chefs = new BehaviorSubject<ChefInterface[]>([]);

  constructor(private http: HttpClient) {}

  private setChefs(chefs: ChefInterface[]) {
    this._chefs.next(chefs);
  }

  getChefs() {
    return this._chefs;
  }

  public async fetchChefs() {
    try {
      const chefs = await firstValueFrom(
        this.http.get<{ chefs: ChefInterface[] }>(
          `http://localhost:5000/api/v1/chefs`
        )
      );

      this.setChefs(chefs.chefs);
    } catch (error) {
      console.log(error);
    }
  }

  async updateChefs(id: string, restaurant: {}) {
    try {
      const res = await firstValueFrom(
        this.http.patch(`http://localhost:5000/api/v1/chefs/${id}`, restaurant)
      );
      console.log(res);
      this.fetchChefs();
    } catch (error) {}
  }
}
