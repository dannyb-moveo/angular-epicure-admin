import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-small-side-bar',
  templateUrl: './small-side-bar.component.html',
  styleUrls: ['./small-side-bar.component.scss'],
})
export class SmallSideBarComponent implements OnInit {
  isSidebarOpen: BehaviorSubject<boolean>;
  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.isSidebarOpen = this.sidebarService.getIsSidebarOpen();
  }
}
