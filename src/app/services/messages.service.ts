import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/interface/User';
import { Conversation } from 'src/interface/convesation';
import { environment } from "../environment/environment";
import { Observable, Subject, every, of } from 'rxjs';
import { io } from "socket.io-client";
import { CookieService } from "ngx-cookie-service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // socket = io("http://192.168.27.190:5000")
  socket = io("http://localhost:5000")
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
    console.log(message);
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

  // Sockets
  joinRoomSocket(user: User) {
    this.socket.emit('join', user)
  }

  sendMessageSocket(message: Conversation) {
    console.log();
    this.socket.emit('message', message)
  }

  sendNotification() {
    this.socket.emit('sendNotification',)
  }

  receiveFileSocket() {
    this.socket.on('file', (data) => {
      console.log('Recibido archivo:', data);
    });
  }

  sendFile() {
    const inputFile = document.getElementById('file');
    inputFile?.addEventListener('change', (event) => {
      let file = (event.target as HTMLInputElement).files![0];
      this.sendFileSocket(file)
    })
  }

  sendFileSocket(file: any) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      this.socket.emit('file', data);
    };
    reader.readAsDataURL(file);
  }

  getAlarm() {
    this.socket.on('buzz', ($event) => {
      console.log($event);
    })
  }

  getMessagesSocket(): Observable<Conversation> {
    return new Observable<Conversation>(Observer => {
      this.socket.on('new message', (data) => {
        Observer.next(data)
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

}
