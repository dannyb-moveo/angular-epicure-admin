import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alert = new BehaviorSubject<{ type: string; msg: string } | null>(
    null
  );

  constructor() {}

  public getAlert() {
    return this._alert.asObservable();
  }

  success(msg: string) {
    this._alert.next({ type: 'success', msg });
  }
  error(msg: string) {
    this._alert.next({ type: 'error', msg });
  }
  clear() {
    this._alert.next(null);
  }
}
