import { Component, OnInit, Input} from '@angular/core';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviewList: Review[] = [];
  dishId: number;
  rating: number;
  comment: string;

  constructor( private rs : ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dishId = +this.route.snapshot.paramMap.get('d_id');
    this.getReviews();
  }

  addReview(){
    this.rs.addReview(this.dishId, this.rating, this.comment).subscribe();
    this.getReviews();
  }

  getReviews(){
    if (this.dishId) {
      this.rs.getReviewsByDishId(this.dishId).subscribe(r =>{
        this.reviewList = r;
        }

      )}
  }
}
