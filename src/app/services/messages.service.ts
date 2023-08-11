import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/interface/User';
import { Conversation } from 'src/interface/convesation';
import { environment } from "../environment/environment";
import { Subject } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public conversation: Conversation[] = []
  public conversationAll: Conversation[] = []
  API = environment.endPoint;
  private clickEventSubject = new Subject<void>();
  clickEvent$ = this.clickEventSubject.asObservable();
  showChat: boolean = false;
  currentID!: number;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentID = parseInt(this.cookieService.get('LoginIDCookie'), 10);
  }

  getMessages(UserID: number) {
    if (UserID === undefined) {
      UserID = this.currentID;
    }
    return this.http.post(`${this.API}/getMessages`, { UserID: UserID }, httpOptions);
  }

  sendMessage(message: Conversation) {
    return this.http.post(`${this.API}/sendMessage`, message)
  }

  sendClickEvent() {
    this.clickEventSubject.next();
  }

  getConversation(Session: number) {
    return this.http.post(`${this.API}/getConversation`, { Session: Session }, httpOptions)
  }

  updateConversationPerUser(selectedUser: User) {
    for (let i = 0; i < this.conversationAll.length; i++) {
      if (selectedUser.SessionID === this.conversationAll[i].SessionID) {
        this.conversationAll[i].ReadMsg = true;
      }
    }
  }
}
