import { Component, OnInit, OnDestroy } from '@angular/core';
import {Dish} from '../../model/dish';
import { EventBrokerService, EventListener } from 'src/app/service/ebroker.service';
import { DishtagService } from 'src/app/service/dishtag.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Tag } from 'src/app/model/tag';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  
  public dishes : Dish[];
  public tags : Tag[];
  public _myEventListener : EventListener;
  public loading : boolean;
  public emptySearch : boolean;

  constructor( 
    private _ebrokerService : EventBrokerService,
    private dishtagService : DishtagService,
    private titleService : Title
  ) { 
    this.titleService.setTitle("HowChow - Dish List");
  }

  ngOnInit() {
    // this._myEventListener = this._ebrokerService.listen<Tag[]>('tagQuery',(tagQuery : Tag[]) => {
    //   this.tags = tagQuery;
    //   console.log("event listener tags: " + this.tags);
    // });
    this.tags = JSON.parse(window.sessionStorage.getItem('tagQuery'));
    this.loading = true;
    if (this.tags == undefined || this.tags == null) {
      this.dishtagService.getAllDishes().subscribe( (dishes) => {
        this.loading = false;
        this.dishes = dishes;
      });
    } else {
      this.dishtagService.getDishesByTags(this.tags).subscribe( (dishes) => {
        console.log("init tags: " + this.tags);
        this.loading = false;
        this.dishes = dishes;
      });
    }
    
  }

  // ngOnDestroy(): void {
  //   this._myEventListener.ignore();
  // }

}
