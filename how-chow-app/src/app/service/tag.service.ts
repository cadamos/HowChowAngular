import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from '../model/tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  private url = 'http://localhost:8080/HowChow/tag.do/';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  selectAllTag(): Observable<Tag[]>{
    return this.http.get(this.url).pipe( map( (c) => c as Tag[]));

  }
}
