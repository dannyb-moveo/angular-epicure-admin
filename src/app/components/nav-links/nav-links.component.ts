import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent implements OnInit {
  @Input() closeMenu: boolean;
  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {}
}
