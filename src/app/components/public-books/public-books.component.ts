import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Book } from 'src/app/models/books';
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
  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.loading=true
    this.subscriber = this.publicService.getAllBooks().subscribe((response: any) => {
      console.log(response.body)
      this.booksArray=response.body
      this.totalBooks=this.booksArray.length
      this.loading=false
  }) }
 /*set page(value:number){
    this.subscriber = this.publicService.getBooks(value,this.booksPerPage).subscribe((response: any) => {
      console.log(response.body)
      this.booksArray=response.body
      this.totalBooks=this.booksArray.length
  })
  }*/
 
}
