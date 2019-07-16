import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../../model/dish';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

  @Input() dish: Dish;
  img : string;
  dishId : number;
  
  constructor(private router : Router) { }

   ngOnInit() {
     this.img = this.dish.img;
     this.dishId = this.dish.d_id;
    }

    goToDish() {
      this.router.navigate(['/dish-display', this.dishId]);
    }
}