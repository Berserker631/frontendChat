import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { FilterPipe } from './filter.pipe';
import { OpennedChatsComponent } from './openned-chats/openned-chats.component';
import { ChatWebComponent } from './chat-web/chat-web.component';
import { ChatMovilComponent } from './chat-movil/chat-movil.component';
import { HistoryChatComponent } from './history-chat/history-chat.component';
import { MessagesService } from "./services/messages.service";
import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { EmojiMenuComponent } from './emoji-menu/emoji-menu.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { BackgroundComponent } from './background/background.component';
import { CookieService } from "ngx-cookie-service";
import * as moment from 'moment';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    OpennedChatsComponent,
    ChatWebComponent,
    ChatMovilComponent,
    HistoryChatComponent,
    MenuModalComponent,
    EmojiMenuComponent,
    LoginComponent,
    BackgroundComponent
    ],

  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [MessagesService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
