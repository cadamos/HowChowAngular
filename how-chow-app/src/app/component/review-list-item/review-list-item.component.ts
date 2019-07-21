import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/service/review.service';
import { ReviewListComponent } from 'src/app/component/review-list/review-list.component';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-review-list-item',
  templateUrl: './review-list-item.component.html',
  styleUrls: ['./review-list-item.component.css']
})
export class ReviewListItemComponent implements OnInit {

  @Input() review : Review;
  username : string;
  user : User;
  upVoted : boolean;
  downVoted : boolean;

  constructor(private reviewService: ReviewService, private reviewList : ReviewListComponent) { }

  ngOnInit() {
    if (JSON.parse(window.sessionStorage.getItem('currentUser')) != null) {
      this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
      this.username = this.user.username;
    }
    this.upVoted = false;
    this.downVoted = false;
   }
  
  upVoteReview(r_id){
    this.upVoted = true;
    this.downVoted = false;
    this.reviewService.upReview(r_id).subscribe();
    this.reviewList.ngOnInit();
  }

  downVoteReview(r_id){
    this.downVoted = true;
    this.upVoted = false;
    this.reviewService.downReview(r_id).subscribe();
    this.reviewList.ngOnInit();
  }

  deleteReview(r_id) {
    this.reviewService.deleteReview(r_id).subscribe();
    setTimeout(() => {
      this.reviewList.ngOnInit();
    }, 1000);
  }
    
}
