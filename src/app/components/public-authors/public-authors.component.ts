import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Author } from 'src/app/components/models/authors';
@Component({
  selector: 'app-public-authors',
  templateUrl: './public-authors.component.html',
  styleUrls: ['./public-authors.component.css']
})
export class PublicAuthorsComponent implements OnInit {

  subscriber:any;
  authorsArray:Array<Author>=[];
  totalAuthors:number=0;
  page:number=1
  authorsPerPage:number=10;
 constructor(private publicService: PublicService) { }


  ngOnInit(): void {
    this.subscriber = this.publicService.getAllAuthors().subscribe((response: any) => {
      console.log(response.body)
      this.authorsArray=response.body
      this.totalAuthors=this.authorsArray.length
  }) 
  }

}
