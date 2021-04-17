import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
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
  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.loading = true
    this.subscriber = this.publicService.getAllBooks(this.page, this.booksPerPage).subscribe((response: any) => {
      this.booksArray = response.body.allBooks
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
