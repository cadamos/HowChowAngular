import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;
  username : string;
  password : string;
  formSubmitAttempt : boolean;
  success : boolean;
  userExists : boolean;
  loading : boolean;

  constructor( 
    private userService : UserService,
    private formBuilder : FormBuilder,
    private titleService : Title,
    private router : Router
  ) { 
    this.titleService.setTitle("HowChow - Registration");
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(){
    this.username = this.form.get('username').value;
    this.password = this.form.get('password').value;
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.loading = true;
      this.userService.registerUser(this.username, this.password).subscribe( user => {
        this.loading = false;
        if (user === null) {
          this.userExists = true;
          this.success = false;
          console.log("User already exists");
        } else {
          this.success = true;
          this.userExists = false;
          console.log(JSON.stringify(user));
          setTimeout(() => {
            this.router.navigate(['/login']);
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
