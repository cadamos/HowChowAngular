import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/model/dish';
import { Tag } from 'src/app/model/tag';
import { DishService } from 'src/app/service/dish.service';

@Component({
  selector: 'app-dish-display',
  templateUrl: './dish-display.component.html',
  styleUrls: ['./dish-display.component.css']
})
export class DishDisplayComponent implements OnInit {

  dispdish : Dish;
  taglist : Tag[];
  img : string;
  dishId: string;
  
  constructor(private service : DishService) { }

  ngOnInit() {
    this.dispdish = JSON.parse(window.sessionStorage.getItem('dish'));
    this.dishId = this.dispdish.d_id.toString();
    this.service.getDishById(this.dishId).subscribe(
      (dish) => {
        this.dispdish = dish;
        this.taglist = dish.tagsAssoc;
        this.img = dish.img;
      }
    );
  }

}
