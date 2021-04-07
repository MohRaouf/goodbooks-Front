import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Author } from '../models/authors';

@Component({
  selector: 'app-popular-authors',
  templateUrl: './popular-authors.component.html',
  styles: [
  ]
})
export class PopularAuthorsComponent implements OnInit ,OnDestroy{
  topAuthors:Array<Author>=[];
  subscriber:any;
  constructor(private myService:PublicService) { }
  ngOnDestroy(): void {
    console.log("destroy");
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriber=this.myService.getTopAuthors()
    .subscribe((res:any)=>{
      this.topAuthors=res.body
      console.log(this.topAuthors);
    },
    (err)=>{
      console.log(err);
    }
    )
  }

}
