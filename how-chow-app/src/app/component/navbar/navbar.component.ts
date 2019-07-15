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
  // dishes : Dish [];
  // searchField : string;

  // constructor(private dishtagservice : DishtagService) { }
  constructor() { }

  ngOnInit() {

    console.log(this.user);
  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
  }


  // search(): void {
  //   // Search for the list of dishes by tags.
  //   console.log(this.searchField);
  //   this.dishtagservice.getDishesByTags(this.searchField).subscribe(
  //     (dish) => {
  //       this.dishes = dish;
  //     }
  //   );
  // }

}
