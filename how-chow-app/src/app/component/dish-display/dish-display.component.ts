import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/model/dish';
import { Tag } from 'src/app/model/tag';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dish-display',
  templateUrl: './dish-display.component.html',
  styleUrls: ['./dish-display.component.css']
})
export class DishDisplayComponent implements OnInit {
  @Input() dispdish : Dish;
  taglist : Tag[];
  
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.dispdish = JSON.parse(this.route.snapshot.paramMap.get('currDish'));
    this.taglist = this.dispdish.tagsAssoc;
  }

}
