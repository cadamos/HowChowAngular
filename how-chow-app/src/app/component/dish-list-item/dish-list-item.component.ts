import { Component, OnInit, Input } from '@angular/core';
import {Dish} from '../../model/dish';
import {TagService} from '../../service/tag.service';
// import {DishService} from '../../service/dish.service';

@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit {

  allDishes: Dish[];

  constructor() { }

  ngOnInit() {
    this.allDishes = [
      {
        d_id: 0,
        d_img_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
        d_name: 'pasta',
        d_description: 'savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.'
      },
      {
        d_id: 1,
        d_img_url: 'https://i929.photobucket.com/albums/ad140/9klk/009.jpg',
        d_name: 'patty',
        d_description: 'savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.'
      },
      {
        d_id: 2,
        d_img_url: 'https://i909.photobucket.com/albums/ac294/felixbone_2010/meatlovers1.jpg',
        d_name: 'hamburger',
        d_description: 'savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.'
      },
      {
        d_id: 3,
        d_img_url: 'https://i909.photobucket.com/albums/ac294/felixbone_2010/meatlovers1.jpg',
        d_name: 'hamburger',
        d_description: 'savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.'
      },
      {
        d_id: 4,
        d_img_url: 'https://i909.photobucket.com/albums/ac294/felixbone_2010/meatlovers1.jpg',
        d_name: 'hamburger',
        d_description: 'savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven.'
      }
    ]
  }


}
