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

  constructor(
    private dishtagService : DishtagService,
    private tagService : TagService,
    private _ebrokerService : EventBrokerService,
    public router : Router
    ) { }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    this.tagService.getAllTags().subscribe(tags => {
      this.options = tags;
    })
  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
  }

  search(): void {
    window.sessionStorage.setItem('tagQuery', JSON.stringify(this.selectedOptions));
    //this._ebrokerService.emit<Tag[]>('tagQuery',this.selectedOptions);
    window.location.replace('#/dish-list');
  }

  showAllDishes() {
    window.sessionStorage.setItem('tagQuery', null);
    this.router.navigate(['/dish-list']);
  }
}
