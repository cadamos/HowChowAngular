import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Dish } from 'src/app/model/dish'
import { Tag } from '../model/tag'

@Injectable({
  providedIn: 'root'
})
export class DishtagService {
  tags : string;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

getDishesByTags(taglist: Tag[]): Observable<Dish[]> {
  this.tags = btoa(JSON.stringify(taglist));
  console.log(this.tags);
  return this.http.get('http://localhost:8080/HowChow/selectDishesByTags.do?tagsAssoc='+this.tags, {headers: this.headers}).pipe(
    map(resp => resp as Dish[])
    );
  }

  getAllDishes(): Observable<Dish[]> {
  // note: the below will need to be replaced with the actual host when possible.
  return this.http.get('http://localhost:8080/HowChow/selectAllDishes.do').pipe(
    map(resp => resp as Dish[])
    );
  }
}
