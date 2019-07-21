import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../../model/dish';
import { Router } from '@angular/router';
import { EventBrokerService } from 'src/app/service/ebroker.service';
import { Tag } from 'src/app/model/tag';
import { User } from 'src/app/model/user';
import { DishService } from 'src/app/service/dish.service';
import { DishListComponent } from '../dish-list/dish-list.component';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

  @Input() dish: Dish;
  img : string;
  dishId : number;
  user : User;
  username : string;
  
  constructor(
    private router : Router,
    private _ebrokerService : EventBrokerService,
    private dishService : DishService,
    private dishList : DishListComponent
  ) { }

   ngOnInit() {
    if (JSON.parse(window.sessionStorage.getItem('currentUser')) != null) {
      this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
      this.username = this.user.username;
    }
    this.img = this.dish.img;
    this.dishId = this.dish.d_id;
    };

    goToDish() {
      this._ebrokerService.emit<Tag[]>('selectedOptions', null);
      this.router.navigate(['/dish-display']);
      window.sessionStorage.setItem('dish', JSON.stringify(this.dish));
    }

    deleteDish() {
      console.log(this.dishId);
      this.dishService.deleteDish(this.dishId).subscribe();
      setTimeout(() => {
        this.dishList.ngOnInit();
      }, 1000);
    }
    
}
