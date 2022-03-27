import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss'],
})
export class FormRowComponent implements OnInit {
  @Input() name = '';
  @Input() type = 'text';
  // @Input() id = '';
  @Input() formCtrlName = '';
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
