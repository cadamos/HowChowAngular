import { Component, OnInit, HostBinding, Input } from '@angular/core';
import {Dish} from 'src/app/model/dish';
import { DishtagService } from 'src/app/service/dishtag.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})

export class DishListComponent implements OnInit {

  dishes: Dish[];

  constructor(private dishtagService : DishtagService) { }

  ngOnInit() {
    this.dishtagService.getAllDishes().subscribe(dishes => {
      this.dishes = dishes;
      console.log(this.dishes);
    });
  }

  hasSearched() {
    console.log(this.dishes);
  }

        // if(window.sessionStorage.getItem('dishes') !=null){
      //   console.log(window.sessionStorage.getItem('dishes'))
      // }else{
      //    console.log("emplty data");
      // }

}
