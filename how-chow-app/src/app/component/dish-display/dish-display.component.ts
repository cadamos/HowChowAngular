import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/model/dish';
import { Tag } from 'src/app/model/tag';
import {Router, ActivatedRoute } from '@angular/router';
import { DishService } from 'src/app/service/dish.service';

@Component({
  selector: 'app-dish-display',
  templateUrl: './dish-display.component.html',
  styleUrls: ['./dish-display.component.css']
})
export class DishDisplayComponent implements OnInit {
  
  @Input() dispdish : Dish;
  taglist : Tag[];
  
  constructor(private service : DishService) { }

  ngOnInit() {
    this.service.getDishById(window.sessionStorage.getItem('dishId')).subscribe(
      (dish) => {
        this.dispdish = dish;
      }
    );
    this.taglist = this.dispdish.tagsAssoc;
  }

}
