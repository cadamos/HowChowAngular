import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
          this. loginFail = false;
          console.log(JSON.stringify(user));
          window.sessionStorage.setItem('currentUser', JSON.stringify(user));
          //this.router.navigate(['/dish-list']);
          setTimeout(function(){
            window.location.replace('/dish-list');
          }, 1500);
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
