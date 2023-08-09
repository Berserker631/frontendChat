import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatWebComponent } from './chat-web/chat-web.component';
import { BackgroundComponent } from './background/background.component';
import { ChatMovilComponent } from './chat-movil/chat-movil.component';

const routes: Routes = [
  { path: '', component: BackgroundComponent },
  { path: 'login', component: BackgroundComponent },
  { path: 'chatWeb', component: ChatWebComponent },
  { path: 'chatMovil', component: ChatMovilComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
