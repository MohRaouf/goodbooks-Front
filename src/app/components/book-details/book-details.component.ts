import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { PublicService } from 'src/app/services/public.service';
import { Book } from '../../models/books';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book:Book={_id:0,name:"",description:"",photo:"",reviews:[],authorId:0,categoryId:0,avgRating:0,ratingCount:0}
  author:any={_id:0,lname:"",fname:""};
  category:any={_id:0,name:""}
  
  subscriber:any;
  constructor(config: NgbRatingConfig,private myService:PublicService,
    private myActivatedRoute:ActivatedRoute, private router:Router) { 
    config.max = 5;
     config.readonly=true;
  }
  ctrl = new FormControl(null, Validators.required);
  ngOnInit(): void {
    this.subscriber=this.myService.getBookById(this.myActivatedRoute.snapshot.params.id)
    .subscribe((data:any)=>{
      console.log(data);
      this.book=data;
      this.author=data.authorId
      this.category=data.categoryId
      },
      (err)=>{
        console.log(err);
      }
      )
  }
  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }
}