import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/user';
import { Tag } from 'src/app/model/tag';
import { Dish } from 'src/app/model/dish';
import { TagService } from 'src/app/service/tag.service';
import { EventBrokerService, EventListener } from 'src/app/service/ebroker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  user : User;
  options : Tag[];
  selectedOptions : Tag[];
  dishes : Dish [];
  loggedIn : boolean;
  _myEventListener : EventListener;
  img : string;
  username : string;

  constructor(
    private tagService : TagService,
    private _ebrokerService : EventBrokerService,
    public router : Router
  ) {
      this._myEventListener = this._ebrokerService.listen<User>('currentUser',(currentUser : User) => {
        // this.user = currentUser;
        this.ngOnInit();
      });
      this._myEventListener = this._ebrokerService.listen<Tag[]>('selectedOptions',(selectedOptions : Tag[]) => {
        this.selectedOptions = selectedOptions;
        this.ngOnInit();
      });
      this._myEventListener = this._ebrokerService.listen<Tag[]>('tagEdited',(tagEdited : Tag[]) => {
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      });
    }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    if (this.user == undefined || this.user == null) {
      this.loggedIn = false;
      this.username = null;
    } else {
      this.loggedIn = true;
      this.username = this.user.username;
    }
    this.tagService.getAllTags().subscribe(tags => {
      this.options = tags;
    })
    this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    this.img = "assets/images/logo.png";
  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
    window.sessionStorage.setItem('tagQuery', null);
    this._ebrokerService.emit<User>('currentUser', null);
    this.router.navigate(['/dish-list']);
    this.ngOnInit();
  }

  search(): void {
    window.sessionStorage.setItem('tagQuery', JSON.stringify(this.selectedOptions));
    if (this.selectedOptions == undefined) {
      this._ebrokerService.emit<Tag[]>('tagQuery', null);
    } else {
      this._ebrokerService.emit<Tag[]>('tagQuery',this.selectedOptions);
    }
    this.router.navigate(['/dish-list']);
  }

  showAllDishes() {
    window.sessionStorage.setItem('tagQuery', null);
    this._ebrokerService.emit<Tag[]>('tagQuery', null);
    this.router.navigate(['/dish-list']);
  }

  ngOnDestroy(): void {
    this._myEventListener.ignore();
  }
}
