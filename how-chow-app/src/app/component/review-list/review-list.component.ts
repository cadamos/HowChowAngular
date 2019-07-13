import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviewList: Review[];
  review: Review;
  constructor() { }

  ngOnInit() {
    this.review = {r_id:2,Dish:{},User:{id:1, username:"yesy", password:"test"},rating:2,userRating:3,date:"string",r_comment:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
    this.reviewList.push(this.review);
  }

}
