import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/models/books';
@Component({
  selector: 'app-public-books',
  templateUrl: './public-books.component.html',
  styleUrls: ['./public-books.component.css']
})
export class PublicBooksComponent implements OnInit {
  subscriber: any;
  loading: boolean = true;
  booksArray: Array<Book> = [];
  totalBooks: number = 0;
  page: number = 1;
  booksPerPage: number = 10;
  constructor(private publicService: PublicService,config: NgbRatingConfig) {
    config.max = 5;
    config.readonly=true;
   }
   ctrl = new FormControl(null, Validators.required);
  ngOnInit(): void {
    this.loading = true
    this.subscriber = this.publicService.getAllBooks(this.page, this.booksPerPage).subscribe((response: any) => {
      this.booksArray = response.body.allBooks
      console.log("IN BOOKS:",response.body)
      this.totalBooks = response.body.countBooks
      this.loading = false
    })
  }
  showPageIndex(pageIndex: any) {
    this.loading = true;
    this.page = pageIndex;
    this.subscriber = this.publicService.getAllBooks(this.page, this.booksPerPage).subscribe((response: any) => {
      this.booksArray = response.body.allBooks
      this.loading = false
    })
  }

}
