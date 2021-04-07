import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Author } from '../models/authors';

@Component({
  selector: 'app-public-authors',
  templateUrl: './public-authors.component.html',
  styles: [
  ]
})
export class PublicAuthorsComponent implements OnInit {
   subscriber:any;
   authorsArray:Array<Author>=[];
   totalAuthors:number=0;
   page:number=1
   authorsPerPage:number=12;
  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.subscriber = this.publicService.getAllAuthors()
    .subscribe((response: any) => {
      console.log(response.body)
      this.authorsArray=response.body
      this.totalAuthors=this.authorsArray.length
  },(err)=>{
    console.log(err);
  })
  }

}
