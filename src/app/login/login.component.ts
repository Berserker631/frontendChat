import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LoginServiceService } from "../services/login-service.service";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private loginService: LoginServiceService, private router: Router, private cookieService: CookieService) { }
  @ViewChild('userName') userName!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('NameReg') NameReg!: ElementRef;
  @ViewChild('userNameReg') userNameReg!: ElementRef;
  @ViewChild('passwordReg') passwordReg!: ElementRef;
  currentSession: string = '';
  user: any = { userName: '', password: '' }
  auth: number = 0;
  showReg: boolean = false;
  isMobile = false;

  ngOnInit() {
    if (!this.validateCookies()) {
      this.router.navigate(['login']);
    }
    this.isMobile = window.innerWidth <= 769;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 769;
  }

  validateCookies() {
    if (this.cookieService.get('sessionCookies')) {
      return true;
    }
    else {
      return false;
    }
  }

  registerUser(){
    this.loginService.registerUser();
  }

  switchRegister() {
    this.showReg = !this.showReg;
  }

  getData() {
    if (this.userName.nativeElement.value !== "" && this.password.nativeElement.value !== "") {
      this.user.userName = this.userName.nativeElement.value;
      this.user.password = this.password.nativeElement.value;
      this.loginService.getAccess(this.user).subscribe((data: any) => {
        this.auth = data[0].existentUser;
        if (this.auth >= 0) {
          this.cookieService.set('sessionCookies', data[0].UserName.toString())
          this.cookieService.set('LoginIDCookie', data[0].LoginID.toString())
          if (this.isMobile) {
            this.router.navigate(['chatMovil']);
          }
          else {
            this.router.navigate(['chatWeb']);
          }
        }
      });
    }
    this.user.password = null;
    this.password.nativeElement.value = null;
  }
}
