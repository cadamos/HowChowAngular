import { Component, OnInit, Input} from '@angular/core';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { User } from 'src/app/model/user';
import { Dish } from 'src/app/model/dish';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  
  reviewList: Review[];
  dish: Dish;
  rating: number;
  comment: string;
  user: User;
  noRating : boolean;
  noUser : boolean;
  noComment : boolean;
  username : string;
  reviewSubmitted : boolean;
  @Input() dishId: number;

  constructor( private rs : ReviewService ) { }

  ngOnInit() {
    if (JSON.parse(window.sessionStorage.getItem('currentUser')) != null) {
      this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
      this.dish = JSON.parse(window.sessionStorage.getItem('dish'));
      this.dishId = this.dish.d_id;
      this.username = this.user.username;
    }
    this.getReviews();
  }

  addReview(){
    if (this.username == null) {
      this.noUser = true;
    } else if (this.rating == undefined) {
      this.noRating = true;
      this.noUser = false;
    } else if (this.comment == undefined || this.comment == "") {
      this.noComment = true;
      this.noRating = false;
    } else {
      this.reviewSubmitted = true;
      this.noComment = false;
      this.rs.addReview(this.user.username, this.dishId, this.rating, this.comment).subscribe();
      window.location.replace('/dish-display');
    }
  }

  getReviews(){
    this.rs.getReviewsByDishId(this.dishId).subscribe(r =>{
      this.reviewList = r;
      }
    )
  }
}
