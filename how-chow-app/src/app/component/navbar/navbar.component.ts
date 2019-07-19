import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Tag } from 'src/app/model/tag';
import { Dish } from 'src/app/model/dish';
import { TagService } from 'src/app/service/tag.service';
import { DishtagService } from 'src/app/service/dishtag.service';
import { EventBrokerService } from 'src/app/service/ebroker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user : User;
  options : Tag[];
  selectedOptions : Tag[];
  dishes : Dish [];
  loggedIn : boolean;

  constructor(
    private tagService : TagService,
    // private _ebrokerService : EventBrokerService,
    public router : Router
    ) { }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    if (this.user == undefined || this.user == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
    this.tagService.getAllTags().subscribe(tags => {
      this.options = tags;
    })
  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
    window.sessionStorage.setItem('tagQuery', null);
    this.ngOnInit();
  }

  search(): void {
    if (this.selectedOptions == undefined) {
      this.selectedOptions = [];
    }
    window.sessionStorage.setItem('tagQuery', JSON.stringify(this.selectedOptions));
    //this._ebrokerService.emit<Tag[]>('tagQuery',this.selectedOptions);
    window.location.replace('/dish-list');
  }

  showAllDishes() {
    window.sessionStorage.setItem('tagQuery', null);
    window.location.replace('/dish-list');
  }
}
