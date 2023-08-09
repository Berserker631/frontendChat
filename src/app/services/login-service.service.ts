import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environment/environment";
import { User } from 'src/interface/User';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  API = environment.endPoint;
  currentSession: any = { userName: '', password: '' }
  constructor(private http: HttpClient) { }

  getAccess(user: any) {
    this.currentSession = user.userName;
    return this.http.post(`${this.API}/login`, user)
  }

  registerUser(){

  }


  currentUser() {
    return this.http.post(`${this.API}/currentSession`, this.currentSession)
  }
}
