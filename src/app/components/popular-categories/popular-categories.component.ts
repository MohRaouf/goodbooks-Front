import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { Category } from '../../models/categories';

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.css']
})
export class PopularCategoriesComponent implements OnInit {
  loading: boolean = true;
  topCategories: Array<Category> = []
  subscriber: any;
  constructor(private myService: PublicService) { }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    this.loading = true;
    this.subscriber = this.myService.getTopCategories()
      .subscribe((res: any) => {
        this.topCategories = res.body
        console.log(this.topCategories);
        this.loading = false;
      }, (err) => { console.log(err) })
  }
}
