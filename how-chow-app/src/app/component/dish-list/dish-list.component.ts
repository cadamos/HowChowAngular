import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import {Dish} from '../../model/dish';
import { EventBrokerService, EventListener } from 'src/app/service/ebroker.service';
import { DishtagService } from 'src/app/service/dishtag.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  
  public dishes : Dish[] = [];
  private _myEventListener : EventListener;
  constructor( private _ebrokerService : EventBrokerService) { 
    this._myEventListener = _ebrokerService.listen<Dish[]>('userSearch',(dishlist : Dish[]) => {
      this.dishes = dishlist;
    })
  }

  ngOnInit() {
    }

  ngOnDestroy(): void {
    this._myEventListener.ignore();
  }

}
