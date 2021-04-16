import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Book } from '../../models/books';
import { Category } from '../../models/categories';
import { Author } from '../../models/authors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchCat: string = this.myService.searchCategory;
  searchedNa: string = this.myService.searchedName;
  bookSubscriber: any;
  categorySubscriber: any;
  authorSubscriber: any;
  booksArray: Array<Book> = [];
  categoryArray: Array<Category> = [];
  authorArray: Array<Author> = []
  constructor(private myService: PublicService) {
    console.log("cons")
    this.updateSearchResult(this.searchCat,this.searchedNa)
  }
  ngOnDestroy(): void {
    console.log("destroy");

  }
  ngOnInit(): void {
    console.log("Yaraaaaaaaaab")
    this.myService.categoryObservable.subscribe(cat => {if(this.searchCat!=cat){this.updateSearchResult(cat,this.searchedNa)}this.searchCat = cat;})
    this.myService.searchedNameObservable.subscribe(name =>{if(this.searchedNa!=name){this.updateSearchResult(this.searchCat,name)}this.searchedNa = name;})
  }
  updateSearchResult(categ: string, Name: string) {
    console.log(categ,Name)
    switch (categ) {
      case 'Books':
        this.BookResult(Name)
        this.categoryArray = []
        this.authorArray = []
        break;
      case 'Categories':
        this.categoryResult(Name)
        this.booksArray = []
        this.authorArray = []
        break;
      case 'Authors':
        this.authorResult(Name)
        this.categoryArray = []
        this.booksArray = []
        break;
      default:
        this.BookResult(Name)
        this.categoryResult(Name)
        this.authorResult(Name)
        break;
    }
  }
  BookResult(word: string) {
    this.bookSubscriber = this.myService.getBookSearchRes(word).subscribe((response: any) => {
      console.log(response.body)
      this.booksArray = response.body
      /*  this.totalBooks=this.booksArray.length
        this.loading=false*/
    })
  }
  categoryResult(word: string) {
    this.categorySubscriber = this.myService.getCatSearchRes(word).subscribe((response: any) => {
      console.log(response.body)
      this.categoryArray = response.body
      /*  this.totalBooks=this.booksArray.length
        this.loading=false*/
    })
  }
  authorResult(word: string) {
    this.authorSubscriber = this.myService.getAuthorSearchRes(word).subscribe((response: any) => {
      console.log(response.body)
      this.authorArray = response.body
      /*  this.totalBooks=this.booksArray.length
        this.loading=false*/
    })
  }
}
