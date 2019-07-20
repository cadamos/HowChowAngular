import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag';
import { DishService } from 'src/app/service/dish.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Review } from 'src/app/model/review';
import { TagService } from 'src/app/service/tag.service';
import { takeLast } from 'rxjs/operators';
import { DishtagService } from 'src/app/service/dishtag.service';

@Component({
  selector: 'app-dish-display',
  templateUrl: './dish-display.component.html',
  styleUrls: ['./dish-display.component.css']
})
export class DishDisplayComponent implements OnInit {

  dispdish = JSON.parse(window.sessionStorage.getItem('dish'));
  dishName = this.dispdish.name;
  taglist : Tag[]; //tags associated with dish
  img : string;
  dishId: string;
  tagQuery: Tag[]; //tag they want to search
  _myEventListener : EventListener;
  review : Review[];
  tagOptions : Tag[] = [];
  selectedTags : Tag[];
  tagAdded : boolean;
  edit : boolean;
  
  constructor(
    private service : DishService,
    private titleService : Title,
    private router : Router,
    private tagService : TagService,
    private dishtagService : DishtagService
  ) { 
    this.titleService.setTitle("HowChow - " + this.dishName);
  }

  ngOnInit() {
    this.tagQuery = [];
    this.dishId = this.dispdish.d_id.toString();
    this.service.getDishById(this.dishId).subscribe(
      (dish) => {
        this.dispdish = dish;
        console.log(dish.tagsAssoc);
        if (!this.tagAdded) {
          this.taglist = dish.tagsAssoc;
        }
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

  editTags() {
    this.edit = true;
    this.tagService.getAllTags().subscribe(tags => {
      this.tagOptions = tags;
      for (let s_tag of this.taglist) {
        for (let t_tag of this.tagOptions) {
            if (s_tag.t_name == t_tag.t_name) {
              let i = this.tagOptions.indexOf(t_tag);
              this.tagOptions.splice(i, 1);
            }
        }
      }
    });
  }

  addTags() {
    for (let tag of this.selectedTags) {
      this.taglist.push(tag);
    }
    this.tagAdded = true;
    this.edit = false;
    this.dishtagService.updateDishTags(this.dishId, this.taglist).subscribe();
    this.ngOnInit();  
  }

}
