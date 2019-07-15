import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Dish } from 'src/app/model/dish';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user : User = JSON.parse(window.sessionStorage.getItem('currentUser'));
  // dishes : Dish [];
  searchField : string = "";


  // constructor(private dishtagservice : DishtagService) { }
  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
  }

  search(value) {
    // Search for the list of dishes by tags.
    this.searchField += value + ",";
    console.log(this.searchField);
    // this.dishtagservice.getDishesByTags(this.searchField).subscribe(
    //   (dish) => {
    //     this.dishes = dish;
    //   }
    // );
  }
}
