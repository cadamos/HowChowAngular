import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/model/review';

@Component({
  selector: 'app-review-list-item',
  templateUrl: './review-list-item.component.html',
  styleUrls: ['./review-list-item.component.css']
})
export class ReviewListItemComponent implements OnInit {
  @Input() review : Review;
  constructor() { }

  ngOnInit() {

  }

}
