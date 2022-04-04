import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alert: Observable<{ type: string; msg: string } | null>;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alert = this.alertService.getAlert();
  }
}
