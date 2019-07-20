import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag';
import { DishService } from 'src/app/service/dish.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Review } from 'src/app/model/review';

@Component({
  selector: 'app-dish-display',
  templateUrl: './dish-display.component.html',
  styleUrls: ['./dish-display.component.css']
})
export class DishDisplayComponent implements OnInit {

  dispdish = JSON.parse(window.sessionStorage.getItem('dish'));
  dishName = this.dispdish.name;
  taglist : Tag[];
  img : string;
  dishId: string;
  tagQuery: Tag[];
  _myEventListener : EventListener;
  review : Review[];
  
  constructor(
    private service : DishService,
    private titleService : Title,
    private router : Router,
  ) { 
    this.titleService.setTitle("HowChow - " + this.dishName);
  }

  ngOnInit() {
    this.tagQuery = [];
    this.dishId = this.dispdish.d_id.toString();
    this.service.getDishById(this.dishId).subscribe(
      (dish) => {
        this.dispdish = dish;
        this.taglist = dish.tagsAssoc;
        this.img = dish.img;
      }
    );
  }

  searchTag(tag: Tag) {
    this.tagQuery.push(tag);
    window.sessionStorage.setItem('tagQuery', JSON.stringify(this.tagQuery));
    this.router.navigate(['/dish-list']);
  }

  backToSearch() {
    this.router.navigate(['/dish-list']);
  }

}
