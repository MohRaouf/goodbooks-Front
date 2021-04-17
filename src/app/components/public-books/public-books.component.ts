import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Book } from 'src/app/models/books';
import { FormControl, Validators } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-public-books',
  templateUrl: './public-books.component.html',
  styleUrls: ['./public-books.component.css']
})
export class PublicBooksComponent implements OnInit {
  subscriber:any;
   loading:boolean=true;
   booksArray:Array<Book>=[];
   totalBooks:number=0;
   page:number=1;
   booksPerPage:number=10;
   ctrl = new FormControl(null, Validators.required);
  constructor(config: NgbRatingConfig,private publicService: PublicService) { 
    config.max = 5;
     config.readonly=true;
  }

  ngOnInit(): void {
    this.loading=true
    this.subscriber = this.publicService.getAllBooks(1,this.booksPerPage).subscribe((response: any) => {
      console.log(response.body)
      this.booksArray=response.body.allBooks
      this.totalBooks=response.body.countBooks
      this.loading=false
  }) }
  showPageIndex(pageIndex:any){
    this.page = pageIndex;
    console.log(this.page);
    this.subscriber = this.publicService.getAllBooks(this.page,this.booksPerPage).subscribe((response: any) => {
      console.log(response.body)
      this.booksArray=response.body.allBooks
      this.loading=false
  }) 
  }
 
}
