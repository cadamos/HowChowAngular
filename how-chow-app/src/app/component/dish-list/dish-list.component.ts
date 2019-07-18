import { Component, OnInit, OnDestroy } from '@angular/core';
import {Dish} from '../../model/dish';
import { EventBrokerService, EventListener } from 'src/app/service/ebroker.service';
import { DishtagService } from 'src/app/service/dishtag.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  
  public dishes : Dish[];
  private _myEventListener : EventListener;
  private loading : boolean;
  private emptySearch : boolean;

  constructor( 
    private _ebrokerService : EventBrokerService,
    private dishtagService : DishtagService,
    private titleService : Title
  ) { 
    this.titleService.setTitle("HowChow - Dish List");
  }

  ngOnInit() {
    this._myEventListener = this._ebrokerService.listen<Dish[]>('userSearch',(dishlist : Dish[]) => {
      if (dishlist.length == 0) {
        this.emptySearch = true;
      } else {
        this.emptySearch = false;
      }
      this.dishes = dishlist;
    });
    this.loading = true;
    this.dishtagService.getAllDishes().subscribe( (dishes) => {
      this.loading = false;
      this.dishes = dishes;
    });
  }

  ngOnDestroy(): void {
    this._myEventListener.ignore();
  }

}
