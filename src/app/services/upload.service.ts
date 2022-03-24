import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  async fetchSecureURL(file: any) {
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
      imageUrl = url.split('?')[0];
    } catch (error) {
      console.log(error);
    }
    return imageUrl;
  }
}
