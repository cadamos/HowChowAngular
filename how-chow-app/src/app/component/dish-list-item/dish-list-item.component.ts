import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../../model/dish';
import { Router } from '@angular/router';
import { EventBrokerService } from 'src/app/service/ebroker.service';
import { Tag } from 'src/app/model/tag';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

  @Input() dish: Dish;
  img : string;
  dishId : number;
  
  constructor(
    private router : Router,
    private _ebrokerService : EventBrokerService
  ) { }

   ngOnInit() {
     this.img = this.dish.img;
     this.dishId = this.dish.d_id;
      };

    goToDish() {
      this._ebrokerService.emit<Tag[]>('selectedOptions', null);
      this.router.navigate(['/dish-display']);
      window.sessionStorage.setItem('dish', JSON.stringify(this.dish));
    }
    
}
