import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Dish } from 'src/app/model/dish'

@Injectable({
  providedIn: 'root'
})
export class DishService {


  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getDishById(dishid: string): Observable<Dish> {
    // note: the below will need to be replaced with the actual host when possible.
    return this.http.get('http://localhost:8081/HowChow/selectDishById.do?d_id='+dishid).pipe(
      map(resp => resp as Dish)
    );
  }

  addDish(dish : Dish): Observable<Dish> {
      return this.http.post('http://localhost:8081/HowChow/insertDish.do', JSON.stringify(dish), {headers: this.headers, withCredentials: false})
        .pipe( map( (c) => c as Dish ));
    }
  
  }


  

