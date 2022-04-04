import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userName = '';
  constructor(
    public sidebarService: SidebarService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.userName = this.authenticationService.currentUserValue.name;
  }

  logout() {
    this.authenticationService.logout();
  }
}
