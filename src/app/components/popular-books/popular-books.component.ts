import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Book } from '../models/books';

@Component({
  selector: 'app-popular-books',
  templateUrl: './popular-books.component.html',
  styles: [
  ]
})
export class PopularBooksComponent implements OnInit ,OnDestroy{
  topBooks:Array<Book>=[]
  subscriber:any;
  constructor(private myService:PublicService) { }
  ngOnDestroy(): void {
    console.log("destroy");
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriber=this.myService.getTopBooks()
    .subscribe((res:any)=>{
      this.topBooks=res.body
      console.log(this.topBooks);
    },
    (err)=>{
      console.log(err);
    }
    )
  }

}
