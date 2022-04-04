import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private _isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getIsLoading() {
    return this._isLoading.asObservable();
  }

  async fetchSecureURL(file: any) {
    this._isLoading.next(true);
    let imageUrl = '';
    try {
      const { url } = await firstValueFrom(
        this.http.get<{ url: string }>(`http://localhost:5000/s3Url`)
      );
      await firstValueFrom(
        this.http.put(`${url}`, file, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
      this._isLoading.next(false);
      imageUrl = url.split('?')[0];
    } catch (error) {
      this._isLoading.next(false);

      console.log(error);
    }
    this._isLoading.next(false);

    return imageUrl;
  }
}
