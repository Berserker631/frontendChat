import { Component,  Input } from '@angular/core';
import { User } from 'src/interface/User';
import { Conversation } from 'src/interface/convesation';
import { MessagesService } from "src/app/services/messages.service";
import { CookieService } from 'ngx-cookie-service';
import { SocketsService } from '../services/sockets.service';

@Component({
  selector: 'app-history-chat',
  templateUrl: './history-chat.component.html',
  styleUrls: ['./history-chat.component.scss']
})

export class HistoryChatComponent {
  @Input() selectedUser: any | User;
  newMessageText: string = '';
  flag: boolean = false;
  conversationAll: Conversation[] = [];
  @Input() chatActive: boolean = false;
  @Input() conversation: Conversation[] = [];
  replyingTo: boolean = false;
  currentUser: string = '';
  idUser: number;
  idMessage!: number;
  // Answer!: string;

  constructor(private messageService: MessagesService, private cookieService: CookieService, private socketsServices: SocketsService) {
    const notification = document.getElementById("sound") as HTMLAudioElement;
    this.currentUser = this.cookieService.get('sessionCookies');
    this.idUser = parseInt(this.cookieService.get('LoginIDCookie'));
    this.socketsServices.getMessagesSocket().subscribe
      ((data) => {
        if (this.selectedUser.idSession === data.idSession) {
          this.conversation.push(data)
          notification!.play()
        }
      })
  }

  ngOnInit() {
    // this.messageService.getMessages(this.idUser).subscribe((data: Conversation[] | any) => {
    //   this.conversationAll = data;
    // })
    // this.typingUser();
  }

  selectFile(e: any){ }

  ngOnChanges() {
    let replyAutor = document.getElementById('autor') as HTMLElement;
    let replyContent = document.getElementById('answer') as HTMLElement;
    const textArea = document.getElementById("messageBody") as HTMLTextAreaElement;
    textArea!.focus();
    if (this.selectedUser) {
      this.loadConversation();
      replyAutor.innerText = '';
      replyContent.innerText = '';
      this.replyingTo = false;
    }
  }

  loadConversation() {
    this.messageService.getConversation(this.selectedUser.idSession).subscribe((data: Conversation[] | any) => {
      this.conversation = data;
    })
    if (this.selectedUser && this.selectedUser != undefined && this.selectedUser != null) {
      this.socketsServices.joinRoomSocket(this.selectedUser);
    }
  }

  alarm() {
    this.messageService.sendClickEvent();
  }

  emojiPicker() {
    const container = document.getElementById('pickerContainer');
  }

  showTime(){
    console.log(this.flag);

    this.flag = !this.flag;
  }

  openFile() {
    document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    const preview = document.getElementById('preview') as HTMLDivElement;

    fileInput?.addEventListener('change', (event) => {
      let selectedFile: any = new FormData();
      selectedFile = (event.target as HTMLInputElement).files?.[0];

      if (fileInput) {
      const reader = new FileReader();

      reader.onload = (event) =>{
        const miniature = document.createElement('img');
        miniature.src = event.target?.result as string;
        miniature.style.maxWidth = '200px';
        preview.innerHTML = '';
        preview.appendChild(miniature);
      }
      reader.readAsDataURL(selectedFile)
      }
      });
    });
    }

  typingEvent() {  }

  addMessage($event: any) {
    $event.preventDefault();
    let replyAutor = document.getElementById('autor') as HTMLElement;
    let replyContent = document.getElementById('answer') as HTMLElement;
    let chatContainer = document.getElementById('chatContainer');
    if (this.newMessageText.trim() != "") {
      let newMessage: any = { idSession: this.selectedUser.idSession, description: this.newMessageText.trim(), idUser: this.idUser};
      this.messageService.sendMessage(newMessage).subscribe({
        next: (response: any) => {
          this.conversation.push(newMessage)
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.socketsServices.sendMessageSocket(newMessage)
      chatContainer?.scrollTo(0, document.body.scrollHeight)
      this.newMessageText = '';
      replyAutor.innerText = '';
      replyContent.innerText = '';
      this.replyingTo = false;
    }
  }

  replyTo(message: string, autor: string, MessageID: number){
    this.idMessage = MessageID;
    let replyAutor = document.getElementById('autor') as HTMLElement;
    let replyContent = document.getElementById('answer') as HTMLElement;
    replyAutor.innerText = '';
    replyContent.innerText = '';
    // this.Answer = message;
    replyAutor.innerText = autor
    replyContent.innerText = message
    this.replyingTo = true;
  }

  typingUser() { }
}
