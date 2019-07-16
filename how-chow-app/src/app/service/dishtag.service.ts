import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Dish } from 'src/app/model/dish'
import { Tag } from '../model/tag'

@Injectable({
  providedIn: 'root'
})
export class DishtagService {

  constructor(private http: HttpClient) { }

getDishesByTags(tags: Tag[]): Observable<Dish[]> {
  // note: the below will need to be replaced with the actual host when possible.
  return this.http.get('http://localhost:8082/HowChow/selectDishesByTags.do?tags='+tags).pipe(
    map(resp => resp as Dish[])
    );
  }
}
