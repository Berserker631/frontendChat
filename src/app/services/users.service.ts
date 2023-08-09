import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  API = environment.endPoint;
  public getJsonValue: any;
  public postJsonValue: any;

  constructor(private http: HttpClient) { }

  // getUsers() {
  //   return this.http.get(`${this.API}/getUsers`)
  // }

  getUsers(id: number) {
    return this.http.post(`${this.API}/getUsers`, { id: id }, httpOptions)
  }

}
