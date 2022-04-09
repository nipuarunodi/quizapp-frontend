import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL = 'http://localhost:5000';
  private message = new BehaviorSubject(false);
  isLoggedIn = this.message.asObservable();

  constructor(private http: HttpClient) { }

  userLogin(params){
    return this.http.post(this.SERVER_URL + '/user/login', params);
  }

  userRegister(params){
    return this.http.post(this.SERVER_URL + '/user/signup', params);
  }

  getUser(userId){
    return this.http.get(this.SERVER_URL + '/user/'+userId);
  }

  getAuthStatus(){
    const helper = new JwtHelperService();
    var token = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(token);
    if(!isExpired){
      this.message.next(true);
    }else{
      this.message.next(false);
    }
    return isExpired;
  }

  nextMessage(message: boolean) {
    this.message.next(message)
  }


}
