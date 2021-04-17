import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { console.log("Meny called")}
  options = [
    {
      status:"a",
      name:"All"
    },
    {
      status:"r",
      name:"Read"
    },
    {
      status:"c",
      name:"Currently Reading"
    },
    {
      status:"w",
      name:"Wish To Read"
    },
  ]
}
