import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isMember = true;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  handleLogin() {
    const { name, email, password } = this.loginForm.value;
    this.isSubmitted = true;

    //user is registering
    if (!this.isMember) {
      this.handleRegister();
      return;
    }

    if (
      this.loginForm.get('email')?.invalid ||
      this.loginForm.get('password')?.invalid
    ) {
      console.log('invalid');
      return;
    }
    this.authenticationService.login(email, password);
  }

  toggleIsMember() {
    this.isMember = !this.isMember;
    this.alertService.clear();
  }

  handleRegister() {
    const { name, email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    }
    this.authenticationService.register(email, password, name);
  }
}
