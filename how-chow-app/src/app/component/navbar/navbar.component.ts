import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { parse } from 'querystring';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user : User;
  isLoggedIn : boolean;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    if (this.user != null) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.isLoggedIn = false;
  }



}
