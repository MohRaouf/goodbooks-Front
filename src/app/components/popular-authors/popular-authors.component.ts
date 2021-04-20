import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Author } from '../../models/authors';

@Component({
  selector: 'app-popular-authors',
  templateUrl: './popular-authors.component.html',
  styleUrls: ['./popular-authors.component.css']
})
export class PopularAuthorsComponent implements OnInit ,OnDestroy{
  loading: boolean = true;
  topAuthors:Array<Author>=[];
  subscriber:any;
  constructor(private myService:PublicService) { }
  ngOnDestroy(): void {
    console.log("destroy");
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    this.loading = true;
    this.subscriber=this.myService.getTopAuthors()
    .subscribe((res:any)=>{
      this.topAuthors=res.body
      console.log(this.topAuthors);
      this.loading = false;
    },
    (err)=>{
      console.log(err);
    }
    )
  }


}
