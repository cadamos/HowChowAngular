import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { parse } from 'querystring';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user : User = JSON.parse(window.sessionStorage.getItem('currentUser'));

  constructor() { }

  ngOnInit() {

    console.log(this.user);
  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
  }

}
