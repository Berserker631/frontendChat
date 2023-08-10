import { Component, HostListener, Input } from '@angular/core';
import { User } from 'src/interface/User';
import { Conversation } from 'src/interface/convesation';
import { MessagesService } from "src/app/services/messages.service";
import { CookieService } from 'ngx-cookie-service';

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
  UserID: number;
  MessageID!: number;
  Answer!: string;


  constructor(private messageService: MessagesService, private cookieService: CookieService) {
    this.currentUser = this.cookieService.get('sessionCookies');
    this.UserID = parseInt(this.cookieService.get('LoginIDCookie'));
  }

  ngOnInit() {
    this.messageService.joinRoomSocket();
    this.messageService.getMessages(this.UserID).subscribe((data: Conversation[] | any) => {
      this.conversationAll = data;
    })
    this.typingUser();
    const notification = document.getElementById("notification") as HTMLAudioElement;
    this.messageService.getMessagesSocket().subscribe
      ((data) => {
        if (this.selectedUser.Session === data.SessionID) {
          this.conversation.push(data)
          notification!.play();
        }
      })
  }

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
    this.messageService.getConversation(this.selectedUser.Session).subscribe((data: Conversation[] | any) => {
      this.conversation = data;
    })
    // if (this.selectedUser && this.selectedUser != undefined && this.selectedUser != null) {
    //   this.messageService.joinRoomSocket(this.selectedUser);
    // }
  }

  alarm() {
    this.messageService.sendClickEvent();
  }

  emojiPicker() {
    const container = document.getElementById('pickerContainer');
  }

  openFile() {
    const file = document.getElementById('file');
    file!.onchange = () => {
      const selectedFile = (file as HTMLInputElement).files![0];
      this.messageService.sendFileSocket(selectedFile)
    }
    // this.messageService.receiveFileSocket().subscribe((data)=>{
    // })
  }

  fileChange($event: Event) { }

  setEmoji() { }

  typingEvent() {  }

  addMessage($event: any) {
    $event.preventDefault();
    let replyAutor = document.getElementById('autor') as HTMLElement;
    let replyContent = document.getElementById('answer') as HTMLElement;
    let chatContainer = document.getElementById('chatContainer');
    let date = new Date();
    let time = date.getHours() + ':' + date.getMinutes();
    if (this.newMessageText.trim() != "") {

      let newMessage: Conversation = { SessionID: this.selectedUser.Session, Message: this.newMessageText.trim(), TimeReceived: time, MessageID: 1,
         UserName: this.currentUser, ReadMsg: false, UserID: this.UserID, TargetID: this.selectedUser.UserID, IsAns: this.replyingTo ? this.MessageID : 0, AnswerTo: this.Answer};
      this.messageService.sendMessage(newMessage).subscribe({
        next: (response: any) => {
          this.conversation.push(newMessage)
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.messageService.sendMessageSocket(newMessage)
      chatContainer?.scrollTo(0, document.body.scrollHeight)
      this.newMessageText = '';
      replyAutor.innerText = '';
      replyContent.innerText = '';
      this.replyingTo = false;
    }
  }

  replyTo(message: string, autor: string, MessageID: number){
    this.MessageID = MessageID;
    let replyAutor = document.getElementById('autor') as HTMLElement;
    let replyContent = document.getElementById('answer') as HTMLElement;
    replyAutor.innerText = '';
    replyContent.innerText = '';
    this.Answer = message;
    replyAutor.innerText = autor
    replyContent.innerText = message
    this.replyingTo = true;
  }

  typingUser() { }
}
