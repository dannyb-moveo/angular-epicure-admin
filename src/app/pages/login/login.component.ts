import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isMember = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleLogin() {
    const { name, email, password } = this.loginForm.value;
    console.log(name, 'name');
    console.log(email, 'email');
    console.log(password, 'password');
  }

  toggleIsMember() {
    this.isMember = !this.isMember;
  }
}
