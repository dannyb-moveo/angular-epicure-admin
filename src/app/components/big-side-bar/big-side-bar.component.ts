import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-big-side-bar',
  templateUrl: './big-side-bar.component.html',
  styleUrls: ['./big-side-bar.component.scss'],
})
export class BigSideBarComponent implements OnInit {
  isSidebarOpen: BehaviorSubject<boolean>;
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.isSidebarOpen = this.sidebarService.getIsSidebarOpen();
  }
}
