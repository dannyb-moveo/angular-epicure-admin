import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import UserInterface from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _currentUserSubject: BehaviorSubject<UserInterface>;
  public currentUser$: Observable<UserInterface>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {
    this._currentUserSubject = new BehaviorSubject<UserInterface>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser$ = this._currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserInterface {
    return this._currentUserSubject.value;
  }

  async login(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.http.post<{ user: UserInterface; token: string }>(
          `${environment.baseURL}/auth/login`,
          { email, password }
        )
      );
      response.user.token = response.token;
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      this._currentUserSubject.next(response.user);
      this.alertService.clear();

      this.router.navigate(['/']);
    } catch (error) {
      const typedError = error as { error: { msg: string } };
      this.alertService.error(typedError.error.msg);
    }
  }
  async register(email: string, password: string, name: string) {
    try {
      const response = await firstValueFrom(
        this.http.post<{ user: UserInterface; token: string }>(
          `${environment.baseURL}/auth/register`,
          { email, password, name }
        )
      );
      response.user.token = response.token;
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      this._currentUserSubject.next(response.user);
      this.alertService.clear();

      this.router.navigate(['/']);
    } catch (error) {
      const typedError = error as { error: { msg: string } };
      this.alertService.error(typedError.error.msg);
    }
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next({} as UserInterface);
    this.router.navigate(['/login']);
  }
}
