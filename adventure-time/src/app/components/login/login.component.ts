import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage!: string;
  showSpinner = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      nickname: ['', Validators.required]
    })
  }

  loginUser() {
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      console.log(data);
      // clean the screan after successful signup
      this.loginForm.reset();
      // route signed user to the streams route
      // wait for 1.75 seconds before routing the user
      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 1750);
    },(err) => {
      // stop showing spinner if signup failed
      this.showSpinner = false;
      // if user signup failed
      console.log(err);
      // to display Joi errors
      if (err.error.msg) {
        this.errorMessage = err.error.msg[0].message
      }
      // to display other kinds of errors
      if (err.error.message) {
        this.errorMessage = err.error.message;
      }
    });
  }

}
