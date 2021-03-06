import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/model/user';
import { EventBrokerService } from 'src/app/service/ebroker.service';
import { Tag } from 'aws-sdk/clients/directconnect';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  username : string;
  password : string;
  formSubmitAttempt: boolean;
  loginFail : boolean;
  success : boolean;
  loading : boolean;
  currentUrl : string;

  constructor(
    private userService : UserService,
    private formBuilder : FormBuilder,
    private router : Router,
    private titleService : Title,
    private _ebrokerService : EventBrokerService
  ) { 
    this.titleService.setTitle("HowChow - Login");
   }

  ngOnInit() {

    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.currentUrl = this.router.url;
  }

  onLogin() {
    this.username = this.form.get('username').value;
    this.password = this.form.get('password').value;
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.loading = true;
      this.userService.loginUser(this.username, this.password).subscribe( user => {
        this.loading = false;
        if (user === null) {
          this.loginFail = true;
          this.success = false;
          console.log("Incorrect username and/or password");
        } else {
          this.success = true;
          this.loginFail = false;
          console.log(JSON.stringify(user));
          window.sessionStorage.setItem('currentUser', JSON.stringify(user));
          this._ebrokerService.emit<User>('currentUser',user);
          setTimeout(() => {
            this.router.navigate(['/dish-list']);
          }, 1000);
        }
      });
    }
  }

  validation(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.validation(field),
      'has-feedback': this.validation(field)
    };
  }

}
