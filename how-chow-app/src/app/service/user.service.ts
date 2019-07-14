import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/HowChow/";
  body : String;

  constructor(private http : HttpClient) { }

  registerUser(username: String, password: String): Observable<any> {
    this.body = "registerUser.do?username=" + username + "&password=" + password;
    return this.http.get(this.url + this.body);
  }

  loginUser(username: String, password: String): Observable<any> {
    this.body = "loginUser.do?username=" + username + "&password=" + password;
    return this.http.get(this.url + this.body);
  }

}