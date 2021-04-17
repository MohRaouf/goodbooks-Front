import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Category } from 'src/app/models/categories';
@Component({
  selector: 'app-public-categories',
  templateUrl: './public-categories.component.html',
  styleUrls: ['./public-categories.component.css']
})
export class PublicCategoriesComponent implements OnInit {
  loading:boolean=true;
  subscriber:any;
   CategoryArray:Array<Category>=[];
   totalCategories:number=0;
   page:number=1
   CategoriesPerPage:number=10;
   
  constructor(private publicService: PublicService) { }
  ngOnInit(): void {
    this.loading=true;
    this.subscriber = this.publicService.getAllCategories(this.page,this.CategoriesPerPage).subscribe((response: any) => {
      console.log(response.body)
      this.CategoryArray=response.body.allCategories
      this.totalCategories=response.body.countCategories
      this.loading=false
  }) }
  showPageIndex(pageIndex:any){
    this.page = pageIndex;
    console.log(this.page);
    this.subscriber = this.publicService.getAllCategories(this.page,this.CategoriesPerPage).subscribe((response: any) => {
      console.log(response.body)
      this.CategoryArray=response.body.allCategories
      this.totalCategories=response.body.countCategories
      this.loading=false
  })
  }
}
