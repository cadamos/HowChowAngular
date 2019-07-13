import { Component, OnInit } from '@angular/core';
import {Dish} from '../../model/dish';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

  allDishes:Dish[];


  constructor() { }

  ngOnInit() {
  }

}
