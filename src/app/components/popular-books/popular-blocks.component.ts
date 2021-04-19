import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { PublicService } from 'src/app/services/public.service';
import { Book } from '../../models/books';
@Component({
  selector: 'app-popular-blocks',
  templateUrl: './popular-blocks.component.html',
  styleUrls: ['./popular-blocks.component.css']
})
export class PopularBlocksComponent implements OnInit,OnDestroy {
  topBooks:Array<Book>=[]
  subscriber:any;
  constructor(private myService:PublicService,config: NgbRatingConfig) {
    config.max = 5;
    config.readonly=true;
   }
   ctrl = new FormControl(null, Validators.required);
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriber=this.myService.getTopBooks()
    .subscribe((res:any)=>{
      this.topBooks=res.body
    },
    (err)=>{console.log(err)})
  }


}
