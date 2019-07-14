import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;
  user : User;
  form : FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private userService : UserService,
    private router : Router,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    this.username = this.form.get('username').value;
    this.password = this.form.get('password').value;
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.userService.loginUser(this.username, this.password).subscribe( user => {
        console.log(JSON.stringify(user));
        if (user != null) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['']);
        } else {
          console.log("Incorrect username and/or password");
        }
      });
    }
  }

  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
