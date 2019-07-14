import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname : string;
  pass : string;
  user : User;

  constructor( 
    private userService : UserService,
    private router : Router 
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.registerUser(this.uname, this.pass).subscribe( user => {
      this.user = user;
      console.log(JSON.stringify(user));
      if (user != null) {
        this.router.navigate(['/login']);
      } else {
        console.log("User already exists");
      }
    });
  }

}
