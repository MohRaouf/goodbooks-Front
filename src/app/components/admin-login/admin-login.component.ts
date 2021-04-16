import { OnDestroy, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Directive, ElementRef, } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  subscriber: any

  constructor(private authService: AuthService, private router: Router) { }
  ngOnDestroy(): void {
    console.log('Login Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }

  loginLoading: Boolean = false;
  loginFailed: Boolean = false;
  submitForm(adminLogin: NgForm) {
    this.loginLoading = true;
    const loginInfo = {
      username: adminLogin.value.username,
      password: adminLogin.value.password,
    };
    this.subscriber = this.authService.login(loginInfo).subscribe((success: boolean) => {
      this.loginLoading = false;
      (success) ? this.router.navigate(['/admin']) :  this.loginFailed = true;
    })
  }


  // handleKeyUp(e: any) {
  //   if (e.key === 'Enter') {
  //     // if (this.usernameStatus && this.passwordStatus)
  //       this.submitForm();
  //   }
  // }


  ngOnInit(): void { }

}
