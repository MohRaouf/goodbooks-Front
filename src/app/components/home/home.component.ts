import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  FormsModule,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { password, requiredTrue } from '@rxweb/reactive-form-validators';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { convertToBase64 } from '../../helpers/image-helpers';
import * as e from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  subscriber: any;
  invalidCred: boolean = false;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userSevice: UserService,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    console.log('onInit Triggered');
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;

      /** get user info to populate the profile photo and username */
      this.userSevice.getUserInfo().subscribe((response: any) => {
        console.log(response.body);
      });
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnDestroy(): void {
    console.log('Login Component Destroy');
    this.subscriber && this.subscriber.unsubscribe();
  }

  closeResult: any;
  isLoggedIn: boolean = false;

  open(content: any, e: any) {
    // this.register = e.target.id == "SignIn" ? true : false;
    // console.log(this.register)

    this.loading = false;
    this.success = false;
    this.duplicatedUsername = false;
    this.failed = false;
    this.loginFailed = false;
    this.loginLoading = false;
    this.loginSuccess = false;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  photo: any;
  invalidPhoto: boolean = false;
  img: any = ""
  onImgChange($event: any) {
    this.img = $event.target.files[0];
    if (this.img) {
      convertToBase64(this.img).subscribe((data) => {
        this.photo = data;
        console.log(this.img);
        this.invalidPhoto = this.img.size < 2048090 ? false : true;
        console.log(this.invalidPhoto);
      });
    }
  }

  loading: boolean = false;
  success: boolean = false;
  duplicatedUsername: boolean = false;
  failed: boolean = false;
  submitSignup(signUpForm: NgForm) {
    this.loading = true;
    const newUser = {
      fname: signUpForm.value.firstname,
      lname: signUpForm.value.lastname,
      email: signUpForm.value.email,
      photo: this.photo,
      gender: signUpForm.value.gender,
      dob: signUpForm.value.dob,
      username: signUpForm.value.username,
      password: signUpForm.value.password,
    };
    console.log(newUser);
    this.subscriber = this.userSevice.registerUser(newUser).subscribe(
      (res) => {
        this.loading = false
        res.status === 201 ? (this.success = true) : (this.failed = true);
        signUpForm.reset()
      },
      (err) => {
        console.log(err);
        this.loading = false
        err.status === 409 ? (this.duplicatedUsername = true) : this.failed = true
        signUpForm.reset()
      });
  }

  loginFailed: boolean = false;
  loginLoading: boolean = false;
  loginSuccess: boolean = false;
  submitLogin(signInForm: NgForm) {
    this.loginSuccess = false;
    this.loginLoading = true;
    const loginInfo = {
      username: signInForm.value.username,
      password: signInForm.value.password,
    };
    console.log(loginInfo)
    this.subscriber = this.authService.login(loginInfo).subscribe(
      (success: boolean) => {
        this.loginSuccess = false;
        if (success) {
          this.loginLoading = false;
          this.loginSuccess = true
          this.loginFailed = false;
          this.modalService.dismissAll();
          this.ngOnInit()
        } else { this.loginFailed = true }
        signInForm.reset()
      },
      (err) => {
        console.log(err)
        this.loginLoading = false;
        this.loginFailed = true;
        signInForm.reset()
      });
    console.log(loginInfo);
  }
  /** Sign out Button Action */
  signOut() {
    this.authService.logout().subscribe((loggedOut) => {
      loggedOut && this.ngOnInit();
    });
  }
}
