import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable} from 'rxjs';
import { io } from "socket.io-client";
import { User } from 'src/interface/User';
import { Conversation } from 'src/interface/convesation';

@Injectable({
  providedIn: 'root'
})

export class SocketsService {
  // socket = io("http://192.168.27.190:5000")
  socket = io("http://localhost:5000")
  currentID!: number;
  constructor( private cookieService: CookieService) {
    this.currentID = parseInt(this.cookieService.get('LoginIDCookie'), 10);
  }

  onlineUser(): Observable<any>{
    this.socket.emit("new user", this.currentID);
    return new Observable<any>(observer => {
      this.socket.on("get users", (users) => {
        observer.next(users)
     });
     return () => {
      this.socket.disconnect();
     }
    });
  }

  sendMessageSocket(message: Conversation) {
    this.socket.emit('new message', message)
  }

  getMessagesSocket(): Observable<Conversation> {
    return new Observable<Conversation>(Observer => {
      this.socket.on('get message', (data) => {
        Observer.next(data)
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  joinRoomSocket(user: User) {
    this.socket.emit('join', user)
    this.socket.on('get users', (users)=>{
  })
  }

  leaveRoom(userId: number){
    this.socket.emit('offline', userId)
  }

}
