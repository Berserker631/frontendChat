import { Component, Output, Input, EventEmitter } from '@angular/core';
import { User } from 'src/interface/User';
import { MessagesService } from '../services/messages.service'
import { Conversation } from "../../interface/convesation";

@Component({
  selector: 'app-openned-chats',
  templateUrl: './openned-chats.component.html',
  styleUrls: ['./openned-chats.component.scss']
})

export class OpennedChatsComponent {
  @Input() Users!: User[];
  @Input() conversationAll: Conversation[] = []
  @Output() selectedUser = new EventEmitter<User>();
  showBubbles: boolean = false;
  unreadMessage = [{ idSession: 0, messageCounter: 0 }];

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
  }

  openBubble(user: User) {
    this.selectedUser.emit(user);
    this.messagesService.updateConversationPerUser(user);
  }


  closeBubble(user: User) {
    if (user) {
      const index = this.Users.indexOf(user);
      this.Users.splice(index, 1);
      if (this.Users.length > 0) {
        user = this.Users[this.Users.length - 1]
      }
      else {
      }
    }
    this.selectedUser.emit(user);
  }

  unreadCounter() {
    const newConversation = new Map();
    for (const conversation of this.conversationAll) {
      if (!conversation.ReadMsg) {
        const idSession = conversation.SessionID;
        if (!newConversation.has(idSession)) {
          newConversation.set(idSession, 0);
        }
        newConversation.set(idSession, newConversation.get(idSession) + 1);
      }
    }
    this.unreadMessage = Array.from(newConversation, ([idSession, messageCounter]) => ({
      idSession,
      messageCounter
    }));
    return this.unreadMessage;
  }
}
