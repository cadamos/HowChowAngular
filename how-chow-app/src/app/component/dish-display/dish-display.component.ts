import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/model/dish';
import { Tag } from 'src/app/model/tag';
import { DishService } from 'src/app/service/dish.service';

@Component({
  selector: 'app-dish-display',
  templateUrl: './dish-display.component.html',
  styleUrls: ['./dish-display.component.css']
})
export class DishDisplayComponent implements OnInit {

  dispdish : Dish = JSON.parse(window.sessionStorage.getItem('dish'));
  taglist : Tag[];
  img : string;
  dishId: string = this.dispdish.d_id.toString();
  
  constructor(private service : DishService) { }

  ngOnInit() {
    this.service.getDishById(this.dishId).subscribe(
      (dish) => {
        this.dispdish = dish;
        this.taglist = dish.tagsAssoc;
        this.img = dish.img;
      }
    );
  }

}
