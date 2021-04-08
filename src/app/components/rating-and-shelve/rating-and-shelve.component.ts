import { Component, OnInit } from '@angular/core';
 
import {FormControl, Validators} from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-rating-and-shelve',
  templateUrl: './rating-and-shelve.component.html',
  styleUrls: ['./rating-and-shelve.component.css'],
  providers: [NgbRatingConfig]
})
export class RatingAndShelveComponent implements OnInit {

  constructor(config: NgbRatingConfig) {
    config.max = 5;
      
   }
   ctrl = new FormControl(null, Validators.required);
   Shelve:string="Choose Shelve";
  ngOnInit(): void {
  }
  chooseShelve(e:any){
console.log(e.target.innerText)
this.Shelve= e.target.innerText
  }
  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

}
