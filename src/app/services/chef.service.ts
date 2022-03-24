import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import ChefInterface from '../interfaces/chef.interface';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private _chefs = new BehaviorSubject<ChefInterface[]>([]);
  private _isloading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  private setChefs(chefs: ChefInterface[]) {
    this._chefs.next(chefs);
  }

  getChefs() {
    return this._chefs.asObservable();
  }

  getIsLoading() {
    return this._isloading.asObservable();
  }

  public async fetchChefs() {
    this._isloading.next(true);
    try {
      const chefs = await firstValueFrom(
        this.http.get<{ chefs: ChefInterface[] }>(
          `http://localhost:5000/api/v1/chefs`
        )
      );

      this._isloading.next(false);
      this.setChefs(chefs.chefs);
    } catch (error) {
      this._isloading.next(false);
      console.log(error);
    }
  }

  async createChef(chef: ChefInterface) {
    try {
      const newChef = await firstValueFrom(
        this.http.post(`http://localhost:5000/api/v1/chefs`, chef)
      );
      if (newChef) {
        alert('Chef has been successfully added');
        this.fetchChefs();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateChef(chef: ChefInterface) {
    const { _id: id } = chef;
    try {
      const updatedChef = await firstValueFrom(
        this.http.patch(`http://localhost:5000/api/v1/chefs/${id}`, chef)
      );

      if (updatedChef) {
        alert('Chef has been successfully updated');
        this.fetchChefs();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChef(id: string) {
    try {
      await firstValueFrom(
        this.http.delete(`http://localhost:5000/api/v1/chefs/${id}`)
      );
      alert('Chef has been successfully deleted');
      this.fetchChefs();
    } catch (error) {
      console.log(error);
    }
  }
}
