import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { loggedUserServices } from 'src/app/services/loggedUser.service';


@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})

export class MybooksComponent implements OnInit {
  shelf = [];
  menu:any

  constructor(
    private userShelfSerivce: loggedUserServices,
    private menuSerivce: MenuService){
      
    }

  ngOnInit(): void {
    this.shelf = this.userShelfSerivce.userShelf;
    this.menu = this.menuSerivce.options;

    this.userShelfSerivce.getBookSehlf("c")
    .subscribe((data:any)=>{
      console.log(data)
      if(data.status == 200){
        this.shelf = data.body.result
        this.userShelfSerivce.userShelf = data.body.result
      // console.log(this.shelf)
    }
    },(err)=>{
      console.log(err)
    })
  }

  loadShelf(e:any){
    console.log(e)
    this.userShelfSerivce.getBookSehlf(e.target.id)
    .subscribe((data:any)=>{
      if(data.status == 200){
        this.shelf = data.body.result
        this.userShelfSerivce.userShelf = data.body.result
    }
      console.log(this.shelf)
    },(err)=>{
      console.log(err)
    })
  }


}
