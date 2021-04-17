import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { PublicService } from 'src/app/services/public.service';
import { Book } from '../../models/books';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loggedUserServices } from 'src/app/services/loggedUser.service';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
  book:Book={_id:0,name:"",description:"",photo:"",reviews:[],authorId:0,categoryId:0,avgRating:0,ratingCount:0}
  reviews:any={}
  author:any={_id:0,lname:"",fname:""};
  category:any={_id:0,name:""}
  userInfo:any={}
  comment:String=""

  subscriber:any;
  constructor(config: NgbRatingConfig,
    private myService:PublicService,
    private myActivatedRoute:ActivatedRoute, 
    private userService:loggedUserServices,
    private router:Router) { 
    config.max = 5;
     config.readonly=true;
  }

  ctrl = new FormControl(null, Validators.required);
  ngOnInit(): void {
    this.myService.getBookById(this.myActivatedRoute.snapshot.params.id)
    .subscribe((res:any)=>{
      this.subscriber = res
        console.log("THIS In review page",res.body);
        this.book=res.body;
        this.author=res.body.authorId
        this.category=res.body.categoryId
        this.reviews = res.body.reviews  
      },
      (err)=>{
        console.log(err);
      }
      )
    }

  setComment(e:any){
      this.comment = e.target.value
    }
  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }


  postReview(e:any){
    if(!this.comment)
      return

    console.log(this.comment)
    const reqParams = {bookId: this.book._id}
    const reqBody={
      reviewBody: this.comment
    }
    console.log(reqBody)
    this.userService.addReview(reqParams, reqBody)
    .subscribe((data:any)=>{
      // this.reviews.push({body: this.comment, userId:{fname:"asd"}})
      this.comment=""
      console.log(data);
    }, (err)=>{
        console.log(err);
      }
    )
  }
}
