import { Component, Input, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { loggedUserServices } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-rating-and-shelve',
  templateUrl: './rating-and-shelve.component.html',
  styleUrls: ['./rating-and-shelve.component.css'],
  providers: [NgbRatingConfig]
})
export class RatingAndShelveComponent implements OnInit {

  @Input() book:any//={_id:0,name:"",description:"",photo:"",reviews:[],authorId:0,categoryId:0,avgRating:0,ratingCount:0}
  @Input() userDetails = {rate: 0, status: "r"}

  constructor(config: NgbRatingConfig,
    private userService:loggedUserServices,
    private myActivatedRoute:ActivatedRoute
    ) {
    config.max = 5;
   }

   ctrl:any
   subscriber:any
   Shelve:String="Choose Shelve";


  ngOnInit(): void {
    const reqParams = {bookId: this.myActivatedRoute.snapshot.params.id}
    this.userService.getUserBook(reqParams)
    .subscribe((data:any)=>{
      this.userDetails = data.body.bookshelf[0]
      console.log("THIS THE BOOK FOR THE USER:", data);
      console.log("THIS userDetails:", this.userDetails);
      console.log("THIS rate:", this.userDetails.rate);
      this.ctrl = new FormControl(this.userDetails.rate, Validators.required);
      if(this.userDetails.status == "r")
        this.Shelve="Read";
      else if(this.userDetails.status == "w")
        this.Shelve="Want to read";
      else if(this.userDetails.status == "c")
        this.Shelve="Currently reading";
    },
    (err)=>{
      console.log("[ERRRRRRRROR]", err);
    }
  )
}

  editStatusFromBookView(e:any){
    const newStatus = e.target.id
    console.log("[Selected Status]: ",e.target.id, newStatus)
    const reqBody = { status: newStatus, ratings:{ avgRating:this.book.avgRating, oldRate:this.userDetails.rate, newRate: this.userDetails.rate, ratingCount:this.book.ratingCount}}
    const reqParams = {bookId: this.book._id}
    console.log("Edit status request: ",reqParams,reqBody)
    this.userService.assertBook(reqParams, reqBody)
      .subscribe((data: any) => {
        console.log(data.body)
      }, (err) => {
        console.log(err)
      })
    }  

  editRateFromBookView(e: any) {
    const reqBody = { status: this.userDetails.status, ratings:{ avgRating:this.book.avgRating, oldRate:this.userDetails.rate, newRate: this.ctrl.value, ratingCount:this.book.ratingCount}}
    const bookId = e.currentTarget.parentElement.parentElement.parentElement.parentElement.id
    const reqParams = {bookId: this.book._id}
    console.log("Edit rating request: ",reqParams,reqBody)
    this.userService.assertBook(reqParams, reqBody)
      .subscribe((data: any) => {
        console.log(data.body)
      }, (err) => {
        console.log(err)
      })
  }

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

}
