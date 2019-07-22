import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag';
import { DishService } from 'src/app/service/dish.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Review } from 'src/app/model/review';
import { TagService } from 'src/app/service/tag.service';
import { DishtagService } from 'src/app/service/dishtag.service';
import { User } from 'src/app/model/user';

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
  images : string[];

  dishId: string;
  tagQuery: Tag[]; //tag they want to search
  _myEventListener : EventListener;
  review : Review[];
  tagOptions : Tag[] = [];
  selectedTags : Tag[];
  tagAdded : boolean;
  editAdd : boolean;
  tagDeleted : boolean;
  editDelete : boolean;
  user : User;
  username : string;
  baseUrl: string = 'https://howchow-angular-bucket.s3.us-east-2.amazonaws.com/';

  
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
    if (JSON.parse(window.sessionStorage.getItem('currentUser')) != null) {
      this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
      this.username = this.user.username;
    } else {
      this.username = null;
    }
    this.tagQuery = [];
    this.dishId = this.dispdish.d_id.toString();
    this.service.getDishById(this.dishId).subscribe(
      (dish) => {
        this.dispdish = dish;
        console.log(dish.tagsAssoc);
        if (!this.tagAdded && !this.tagDeleted) {
          this.taglist = dish.tagsAssoc;
        }
        this.img = dish.img;
        this.imgsArray();
      }
    );

    this.selectedTags = [];
  }
  imgsArray(){
    this.img=this.img.substring(0,this.img.length-1);


    this.images = this.img.split(",");
    console.log(this.images[0])

  }
  searchTag(tag: Tag) {
    this.tagQuery.push(tag);
    window.sessionStorage.setItem('tagQuery', JSON.stringify(this.tagQuery));
    this.router.navigate(['/dish-list']);
  }

  backToSearch() {
    this.router.navigate(['/dish-list']);
  }

  editTagsAdd() {
    this.editAdd = true;
    this.editDelete = false;
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
    this.editAdd = false;
    this.dishtagService.updateDishTags(this.dishId, this.taglist).subscribe();
    this.ngOnInit();  
  }

  editTagsDelete() {
    this.editDelete = true;
    this.editAdd = false;
    this.tagOptions = this.taglist;
  }

  deleteTags() {
    for (let s_tag of this.selectedTags) {
      for (let t_tag of this.tagOptions) {
        if (s_tag.t_name == t_tag.t_name) {
          let i = this.tagOptions.indexOf(t_tag);
          this.tagOptions.splice(i, 1);
        }
      }
    }
    this.tagDeleted = true;
    this.editDelete = false;
    this.dishtagService.updateDishTags(this.dishId, this.tagOptions).subscribe();
    this.ngOnInit();  
  }

}
