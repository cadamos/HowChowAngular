import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Tag } from 'src/app/model/tag';
import { Dish } from 'src/app/model/dish';
import { TagService } from 'src/app/service/tag.service';
import { DishtagService } from 'src/app/service/dishtag.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  user : User = JSON.parse(window.sessionStorage.getItem('currentUser'));
  tags : Tag[];
  searchField : Tag[] = [{t_name: 'testpizza1'}];
  dishes : Dish [];

  constructor(
    private dishtagService : DishtagService,
    private tagService : TagService,
    ) { }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  logout() {
    this.user = null;
    window.sessionStorage.setItem('currentUser', null);
  }

  search(): void {
    console.log(JSON.stringify(this.searchField));
    this.dishtagService.getDishesByTags(this.searchField).subscribe(
      (dishes) => {
        console.log(dishes);
        this.dishes = dishes;
      }
    );
    console.log(this.dishes);
    window.sessionStorage.setItem('dishes', JSON.stringify(this.dishes));
  }

}
