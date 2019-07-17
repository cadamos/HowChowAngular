import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../../model/dish';
import {TagService} from '../../service/tag.service';
// import {DishService} from '../../service/dish.service';
import {DishtagService} from '../../service/dishtag.service'
import { Tag } from '../../model/tag'

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

 @Input() dish: Dish;
  
  constructor(private data: DishtagService) { }

  

   ngOnInit() {
      };


    
}
