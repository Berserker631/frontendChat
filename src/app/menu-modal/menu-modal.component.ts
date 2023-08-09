import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent {
  @Input() isOpen: boolean = false;

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() { }

  logOut(e: any) {
    this.cookieService.delete('sessionCookies');
    this.router.navigate(['login']);
  }

  closeModal() {
    this.isOpen = false
    this.router.navigate(['login']);
  }

}
