import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname : string;
  pass : string;

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.loginUser(this.uname, this.pass).subscribe( user => {
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
