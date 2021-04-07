import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/app/services/public.service';
import { Author } from '../models/authors';
import { Book } from '../models/books';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  author:Author={
    _id:0,fname:"",lname:"",photo:"",dob:new Date("1990-01-01"),gender:"",books:[]
  }
  authorBooks:Array<Book>=[];
  subscriber:any;
  totalBooks:number=0;
  page:number=1
  booksPerPage:number=12;
  constructor(private myService:PublicService,
   private myActivatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.subscriber=this.myService.getAuthorById(this.myActivatedRoute.snapshot.params.id)
    .subscribe((data:any)=>{
      console.log(data);
      this.author=data;
      this.authorBooks=data.books
      this.totalBooks=this.authorBooks.length
      },
      (err)=>{
        console.log(err);
      }
      )
  }

}
