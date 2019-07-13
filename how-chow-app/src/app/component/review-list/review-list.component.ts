import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviewList: Review[];
  constructor() { }

  ngOnInit() {
  }

}
