import { Component, Input } from '@angular/core';
import { User } from 'src/interface/User';
import { Conversation } from 'src/interface/convesation';
import { UsersService } from '../services/users.service';
import { LoginServiceService } from '../services/login-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-movil',
  templateUrl: './chat-movil.component.html',
  styleUrls: ['./chat-movil.component.scss']
})
export class ChatMovilComponent {
  searchBar = false;
  searchTerm: string = '';
  showChat: boolean = false;
  showModal: boolean = false;
  chatActive: boolean = false;
  selectedUser: User | null = null;
  showConversation: boolean = false;
  conversation: Conversation[] = []
  conversationAll: Conversation[] = [];
  currentSession: string = '';
  @Input() Users: User[] = [];
  currentID!: number;
  constructor(private usersService: UsersService, private loginService: LoginServiceService, private cookieService: CookieService) { }
  openModal() {
    this.showModal = true;
  }

  ngOnInit() {
    this.loginService.currentUser().subscribe((data) => {
    })
    this.currentID = parseInt(this.cookieService.get('sessionCookies'), 10)
    this.usersService.getUsers(this.currentID).subscribe((data: User[] | any) => {
      this.Users = data;
    })
  }

  toggleChat() {
    this.showConversation = !this.showConversation;
  }

  toggleSearch() {
    this.searchBar = !this.searchBar;
  }

  changeMenu() { }

  selectConversation(user: User): void {
    if (user.idUser != 0) {
      this.selectedUser = user;
      this.chatActive = true;
      const newArray = this.conversation.map((obj: any) => {
        if (obj.read === false) {
          return { ...obj, read: true };
        }
        return obj;
      });
      this.conversation = newArray;
      this.conversation = [...this.conversationAll].filter((x: Conversation | any) => {
        if (x.idSession === this.selectedUser?.idSession) {
          for (let i = 0; i < this.conversationAll.length; i++) {
            if (this.conversationAll[i].idSession === this.selectedUser?.idSession) {
              // this.conversationAll[i].ReadMsg = true;
            }
          }
          return x;
        }
        this.showChat = true;
      });
      this.toggleChat();
    }
    else {
      this.conversation.splice(0, this.conversation.length);
      this.showChat = false;
    }
  }
}
