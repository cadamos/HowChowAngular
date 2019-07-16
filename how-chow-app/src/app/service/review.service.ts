import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  url : string ="http://localhost:8080/HowChow/";
  
  constructor(private http : HttpClient) { }

  getReviewsByDishId(d_id:number) : Observable<Review[]>{
    const req = "getReviewByDishId.do?d_id="+d_id;
    console.log(this.url+req);
    return this.http.get<Review[]>(this.url+req);
  }

  upReview(r_id:number) :Observable<any>{ 
    const req ="upReview.do?r_id="+r_id
    console.log(this.url+req)
    return this.http.get(this.url+req);
  }
  downReview(r_id:number) :Observable<any>{
    const req ="downReview.do?r_id="+r_id
    console.log(this.url+req)

    return this.http.get(this.url+req);
  }

  addReview(d_id:number, rating:number, comment:string) :Observable<any>{
    const req  = "addReview.do?d_id="+d_id+"&rating="+rating+ "&comment=" + comment;
    console.log(this.url+req);
    return this.http.get(this.url+req);
  }
}
