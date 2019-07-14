import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname : String;
  pass : String;

  constructor( private userService : UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.registerUser(this.uname, this.pass).subscribe( resp => console.log(JSON.stringify(resp)));
  }

}
