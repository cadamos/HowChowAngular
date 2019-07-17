import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8081/HowChow/";
  body : string;

  constructor(private http : HttpClient) { }

  registerUser(username: string, password: string): Observable<any> {
    this.body = "registerUser.do?username=" + username + "&password=" + password;
    return this.http.get(this.url + this.body);
  }

  loginUser(username: string, password: string): Observable<any> {
    this.body = "loginUser.do?username=" + username + "&password=" + password;
    return this.http.get(this.url + this.body);
  }

}