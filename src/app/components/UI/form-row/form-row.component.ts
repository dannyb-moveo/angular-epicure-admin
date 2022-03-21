import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss'],
})
export class FormRowComponent implements OnInit {
  name = 'Restaurant Status';
  type = 'text';

  constructor() {}

  ngOnInit(): void {}
}
