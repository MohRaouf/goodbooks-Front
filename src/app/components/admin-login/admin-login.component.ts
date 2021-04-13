import { OnDestroy, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Directive, ElementRef, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
  })

  usernameFocused: boolean = false
  passwordFocused: boolean = false

  usernameFocus() {
    this.usernameFocused = !this.usernameFocused
  }
  passwordFocus() {
    this.passwordFocused = !this.passwordFocused
  }

  get usernameStatus() {
    return this.loginForm.controls.username.valid
  }
  get passwordStatus() {
    return this.loginForm.controls.password.valid
  }
  invalidCred: boolean = false;
  serverError: boolean = false;
  submitForm() {
    const loginInfo = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    }

    // if( this.authService.login(loginInfo)){
    //   console.log('logged in')
    //   // this.router.navigate(['/admin']);
    // } 

      this.subscriber = this.authService.login(loginInfo).subscribe((success:boolean) => {
      console.log(success)
      if(success){
        this.router.navigate(['/admin'])
        console.log("invalid username or password")
      }else{
        this.invalidCred = true;
        console.log("invalid username or password")
      } 
    },
      (err) => {
        console.log("invalid username or password")
        console.log(err)
      }, () => {
        // this.router.navigate(['/']);
      })


    // this.subscriber = this.adminService.login(loginInfo).subscribe((response: any) => {
    //   console.log(response)

    //   if (response.status == 200) {
    //     // this.router.navigate(['/']);
    //   }
    //   else {
    //     this.invalidCred = true;
    //   }
    // },
    //   (err) => {
    //     console.log(err)
    //   }, () => {
    //     // this.router.navigate(['/']);
    //   })
  }


  handleKeyUp(e: any) {
    if (e.key === 'Enter') {
      if (this.usernameStatus && this.passwordStatus)
        this.submitForm();
    }
  }


  ngOnInit(): void { }

}
