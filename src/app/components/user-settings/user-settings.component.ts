import { Component, OnDestroy, OnInit } from '@angular/core';
import { loggedUserServices } from 'src/app/services/loggedUser.service';
import { convertToBase64 } from '../../helpers/image-helpers';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})

export class UserSettingsComponent implements OnInit, OnDestroy {

  user={photo:"", fname:"", lname:"", dob:"", gender:"", username:"", email:"", bookshelf:[]}
  constructor(    
    private userData: loggedUserServices,
    ) { }
    subscriber:any;

    ngOnDestroy(): void {
      // console.log("destroy");
      // this.subscriber.unsubscribe();
    }
  toggle(){
    console.log("EDIT CLICKED")
  }
  ngOnInit(): void {    
    console.log("############################ USER SETTINGS ####################################\n")
    this.subscriber=this.userData.getUser()
    .subscribe((data:any)=>{
        if(data.status == 200){
        this.user = data.result.doc[0]
        console.log("USER DATA:", this.user)
      }
  },(err)=>{
      console.log("ERR")
      console.log(err)
    })
  }
  photo: any;
  invalidPhoto: boolean = false;
  img: any = ""
  onImgChange($event: any) {
    this.photo = ""
    this.img = ""
    this.invalidPhoto = false;
    this.img = $event.target.files[0]
    if (this.img.size < 2048090) {
      convertToBase64(this.img).subscribe((data) => {
        this.photo = data;
        // this.invalidPhoto = this.img.size < 2048090 ? (this.bookPhoto = data) : true;
      })
    }
    else { this.invalidPhoto = true; }
  }
  loading:any
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
    this.failed = false;
    this.duplicatedUsername = false;
    console.log(newUser);
    this.subscriber = this.userData.updateUserSettings(newUser).subscribe(
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
}
