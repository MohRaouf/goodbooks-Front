import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  alert:boolean=false;
  inputName:string=''
  inputEmail:string=''
  inputTextField:string=''
  constructor() { }

  ngOnInit(): void {
  }
   submitSuccessfully(){
     this.inputName=''
     this.inputEmail=''
     this.inputTextField=''
     this.alert=true
   }
}
