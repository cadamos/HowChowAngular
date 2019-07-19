import { Component, OnInit, OnDestroy } from '@angular/core';
import {Dish} from '../../model/dish';
import { EventBrokerService, EventListener } from 'src/app/service/ebroker.service';
import { DishtagService } from 'src/app/service/dishtag.service';
import { Title } from '@angular/platform-browser';
import { Tag } from 'src/app/model/tag';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  
  dishes : Dish[];
  tags : Tag[];
  _myEventListener : EventListener;
  loading : boolean;
  emptySearch : boolean;
  sessionTags : Tag[];

  constructor( 
    private _ebrokerService : EventBrokerService,
    private dishtagService : DishtagService,
    private titleService : Title
  ) { 
    this.titleService.setTitle("HowChow - Dish List");
    this._myEventListener = this._ebrokerService.listen<Tag[]>('tagQuery',(tagQuery : Tag[]) => {
      this.tags = tagQuery;
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.sessionTags = JSON.parse(window.sessionStorage.getItem('tagQuery'));
    if (this.sessionTags != null) {
      this.tags = this.sessionTags;
    }
    console.log(this.tags);
    this.loading = true;
    if (this.tags == undefined || this.tags == null) {
      this.dishtagService.getAllDishes().subscribe( (dishes) => {
        this.loading = false;
        this.dishes = dishes;
      });
    } else {
      this.dishtagService.getDishesByTags(this.tags).subscribe( (dishes) => {
        this.loading = false;
        if (dishes.length == 0) {
          this.emptySearch = true;
        } else {
          this.emptySearch = false;
          this.dishes = dishes;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._myEventListener.ignore();
  }

}
