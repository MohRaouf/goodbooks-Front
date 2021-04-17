import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Author } from 'src/app/models/authors';
@Component({
  selector: 'app-public-authors',
  templateUrl: './public-authors.component.html',
  styleUrls: ['./public-authors.component.css']
})
export class PublicAuthorsComponent implements OnInit {
  loading: boolean = true;
  subscriber: any;
  authorsArray: Array<Author> = [];
  totalAuthors: number = 0;
  page: number = 1
  authorsPerPage: number = 10;
  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscriber = this.publicService.getAllAuthors(this.page, this.authorsPerPage).subscribe((response: any) => {
      this.authorsArray = response.body.allAuthors
      this.totalAuthors = response.body.countAuthors
      this.loading = false;
    })
  }
  showPageIndex(pageIndex: any) {
    this.loading = true;
    this.page = pageIndex;
    this.subscriber = this.publicService.getAllAuthors(this.page, this.authorsPerPage).subscribe((response: any) => {
      this.authorsArray = response.body.allAuthors
      this.totalAuthors = response.body.countAuthors
      this.loading = false;
    })
  }
}
