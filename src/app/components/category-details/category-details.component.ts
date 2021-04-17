import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/app/services/public.service';
import { Category } from '../../models/categories';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  category:Category={_id:0,name:"",photo:"",books:[]};
  subscriber:any;
  totalBooks:number=0;
  page:number=1;
  booksPerPage:number=10;
  loading: boolean = true;
  categoryBooks:Array<any>=[]
  constructor(private myService:PublicService,
    private myActivatedRoute:ActivatedRoute, private router:Router,config: NgbRatingConfig) {
      config.max = 5;
      config.readonly=true;
     }
     ctrl = new FormControl(null, Validators.required);
  ngOnInit(): void {
    this.subscriber=this.myService.getCategoryById(this.myActivatedRoute.snapshot.params.id)
    .subscribe((data:any)=>{
      console.log(data);
      this.category=data[0];
      this.categoryBooks=data[0].books
      this.totalBooks=this.categoryBooks.length
      this.loading = false
      },
      (err)=>{
        console.log(err);
      }
      )
  }
}
