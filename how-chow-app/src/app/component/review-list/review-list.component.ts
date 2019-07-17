import { Component, OnInit, Input} from '@angular/core';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { Dish } from 'src/app/model/dish';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviewList: Review[] = [];
  dish: Dish;
  rating: number;
  comment: string;
  user: User;
  dishId: number;

  constructor( private rs : ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    this.dish = JSON.parse(window.sessionStorage.getItem('dish'));
    this.dishId = this.dish.d_id;
    this.reviewList = [];
    this.getReviews();
  }

  addReview(){
    this.rs.addReview(this.user.username, this.dish.d_id, this.rating, this.comment).subscribe();
    this.getReviews();
  }

  getReviews(){
    if (this.dishId) {
      console.log(this.dishId);
      this.rs.getReviewsByDishId(this.dishId).subscribe(r =>{
        this.reviewList = r;
        }

      )}
  }
}
