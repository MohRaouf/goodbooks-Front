import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Category } from '../../models/categories';

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.css']
})
export class PopularCategoriesComponent implements OnInit {

  topCategories:Array<Category>=[]
  subscriber:any;
  constructor(private myService:PublicService) { }
  ngOnDestroy(): void {
    console.log("destroy");
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriber=this.myService.getTopCategories()
    .subscribe((res:any)=>{
      this.topCategories=res.body
      console.log(this.topCategories);
    },
    (err)=>{
      console.log(err);
    }
    )
  }
}
