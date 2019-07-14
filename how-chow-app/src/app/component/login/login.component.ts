import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname : String;
  pass : String;

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.loginUser(this.uname, this.pass).subscribe( resp => console.log(JSON.stringify(resp)));
  }

}
