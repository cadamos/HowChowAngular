import { Component, OnInit } from '@angular/core';
import { DishtagService } from 'src/app/service/dishtag.service';
import { Dish } from 'src/app/model/dish'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dishes : Dish [];
  searchField : string;

  constructor(private dishtagservice : DishtagService) { }

  ngOnInit() {
  }

  search(): void {
    // Search for the list of dishes by tags.
    console.log(this.searchField);
    this.dishtagservice.getDishesByTags(this.searchField).subscribe(
      (dish) => {
        this.dishes = dish;
      }
    );
  }
}
