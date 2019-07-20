import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Dish } from 'src/app/model/dish'
import { Tag } from '../model/tag';

@Injectable({
  providedIn: 'root'
})
export class DishService {


  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getDishById(dishid: string): Observable<Dish> {
    // note: the below will need to be replaced with the actual host when possible.
    return this.http.get('http://localhost:8080/HowChow/selectDishById.do?d_id='+dishid).pipe(
      map(resp => resp as Dish)
    );
  }

  addDish(dishname:string, dishrest:string, dishdesc:string, dishurl:string, dishTags:Tag[]): Observable<any> {
     const tags = btoa(JSON.stringify(dishTags));
     console.log(tags);
     console.log('http://localhost:8080/HowChow/insertDish.do?name='+dishname+'&restaurant='+dishrest+'&img='+dishurl+'&description='+dishdesc+'&tags='+tags);
      return this.http.get('http://localhost:8080/HowChow/insertDish.do?name='+dishname+'&restaurant='+dishrest+'&img='+dishurl+'&description='+dishdesc+'&tags='+tags);
    }
  
  }


  

