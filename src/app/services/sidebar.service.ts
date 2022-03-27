import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isSidebarOpen = new BehaviorSubject<boolean>(false);

  constructor() {}

  getIsSidebarOpen() {
    return this._isSidebarOpen;
  }

  toggleSidebar() {
    this._isSidebarOpen.next(!this._isSidebarOpen.value);
  }
}
