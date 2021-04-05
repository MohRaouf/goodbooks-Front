import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  books:{name:string,photo:string,description:string,author:string,category:string}[]=[
    {
      name:"Hell in Grill",
      description:"this book is so amazing you should read it",
      photo: "Book Photo",
      author:"Raouf",
      category:"Action"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
