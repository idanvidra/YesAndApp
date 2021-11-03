import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // set as undefined
  // set as undefined
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.signupForm = this.fb.group({
      nickname: ['', Validators.required]
    })
  }

  signupUser() {
    this.authService.registerUser(this.signupForm.value).subscribe(data => {
      console.log(data);
      this.signupForm.reset();
    }, err => console.log(err));
  }
}
