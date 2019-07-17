import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Tag } from 'src/app/model/tag';
import { Dish } from 'src/app/model/dish';
import { TagService } from 'src/app/service/tag.service';
import { DishtagService } from 'src/app/service/dishtag.service';
import { EventBrokerService } from 'src/app/service/ebroker.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user : User = JSON.parse(window.sessionStorage.getItem('currentUser'));
  options : Tag[];
  selectedOptions : Tag[];
  dishes : Dish [];

  constructor(
    private dishtagService : DishtagService,
    private tagService : TagService,
    private _ebrokerService : EventBrokerService
    ) { }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(tags => {
      this.options = tags;
    });

  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
  }

  search(): void {
    this.dishtagService.getDishesByTags(this.selectedOptions).subscribe(
      (dishes) => {
        this.dishes = dishes;
      }
    );
    console.log(this.dishes);
    this._ebrokerService.emit<Dish[]>('userSearch',this.dishes);
  }

}
