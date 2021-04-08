import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/app/services/public.service';
import { Category } from '../models/categories';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  category:Category={_id:0,name:"",books:[]};
  subscriber:any;
  totalBooks:number=0;
  page:number=1;
  booksPerPage:number=12;
  categoryBooks:Array<any>=[]
  constructor(private myService:PublicService,
    private myActivatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.subscriber=this.myService.getCategoryById(this.myActivatedRoute.snapshot.params.id)
    .subscribe((data:any)=>{
      console.log(data);
      this.category=data[0];
      this.categoryBooks=data[0].books
      this.totalBooks=this.categoryBooks.length
      },
      (err)=>{
        console.log(err);
      }
      )
  }
}
