import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-elements',
  templateUrl: './footer-elements.component.html',
  styleUrls: ['./footer-elements.component.css']
})
export class FooterElementsComponent implements OnInit {
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
