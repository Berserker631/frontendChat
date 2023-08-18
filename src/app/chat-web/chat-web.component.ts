import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/interface/User';
import { Conversation } from 'src/interface/convesation';
import { MessagesService } from "../services/messages.service";
import { UsersService } from '../services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { SocketsService } from '../services/sockets.service';

@Component({
  selector: 'app-chat-web',
  templateUrl: './chat-web.component.html',
  styleUrls: ['./chat-web.component.scss']
})
export class ChatWebComponent {
  status: boolean = true;
  selectedUser: User | null = null;
  currentSession: string = '';
  searchTerm!: string;
  chatActive: boolean = false;
  showChat: boolean = false;
  conversationAll: Conversation[] = [];
  listUser: User[] = [];
  conversation: Conversation[] = []
  modalMenu: boolean = false;
  opennedChats: User[] = [];
  alarm: boolean = false;
  currentID!: number;

  constructor(private messagesService: MessagesService, private usersService: UsersService, private cookieService: CookieService, private socketService: SocketsService) {
    this.messagesService.clickEvent$.subscribe(() => {
      this.alarm = true
      setTimeout(() => {
        this.alarm = false;
      }, 3000);
    })
  }

  @ViewChild('messageList', { static: false }) messageList!: ElementRef;

  ngOnInit() {
    this.currentID = parseInt(this.cookieService.get('LoginIDCookie'), 10);
    this.usersService.getUsers(this.currentID).subscribe((data: User[] | any) => {
      const index = data.findIndex((data: User) => data.idUser === this.currentID);
      this.listUser = data;
      this.currentSession = this.listUser[index].userName;
      this.listUser[index].userName = 'Me'
    })
    //get online users
    this.socketService.onlineUser().subscribe((data: any) => {
      this.listUser.forEach(user => {
        if ( data.filter((x: any)=>  x.idUser == user.idUser).length > 0) {
          user.status = true;
        }else{
          user.status = false;
        }
      })
    });
  }

  openModal() {
    this.modalMenu = !this.modalMenu;
  }

  wordBreaker(text: string, limit: number) {
    if (text.length <= limit) {
      return text;
    } else {
      return text.slice(0, limit) + '...';
    }
  }

  toggleMenu() {
    this.showChat = !this.showChat;
  }

  validateUser(currentUser: User) {
    const textArea = document.getElementById("messageBody") as HTMLTextAreaElement;
    if (!this.opennedChats.includes(currentUser)) {
      this.opennedChats.push(currentUser)
    }
    textArea!.value = "";
    textArea!.focus();
  }

  selectUser(user: User) {
    if (user) {
      this.selectedUser = user;
      this.chatActive = true;
      this.showChat = true;
      this.validateUser(user);
    }
  }
}
