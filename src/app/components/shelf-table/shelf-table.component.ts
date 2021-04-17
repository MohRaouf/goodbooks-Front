import { Component, Input, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, Validators} from '@angular/forms';
import { loggedUserServices } from 'src/app/services/loggedUser.service';

@Component({
  selector: '[app-shelf-table]',
  templateUrl: './shelf-table.component.html',
  styleUrls: ['./shelf-table.component.css']
})
export class ShelfTableComponent implements OnInit {

  selectedStatus: String=""
  constructor(private userShelfSerivce: loggedUserServices, config: NgbRatingConfig) {
    config.max = 5;
  }

  response: any
  @Input() filteredShelf:any ={}; //this will be populated from the mybooks

  book = {name: "", avgRating: "", _id:"", photo:"", ratingCount:""}
  author =  {fname: "", lname: "", _id:""}
  category =  {name: "", _id: ""}
  user =  {rate: "", status: ""}
  onScreenStatus:String=""
  ctrl:any
  ctrl_readonly:any
  ngOnInit(): void {
    this.ctrl = new FormControl(this.filteredShelf.rate, Validators.required);
    this.ctrl_readonly = this.filteredShelf.bookId.avgRating
    this.book = {name: this.filteredShelf.bookId.name, avgRating: this.filteredShelf.bookId.avgRating, _id:this.filteredShelf.bookId._id, photo: this.filteredShelf.bookId.photo, ratingCount: this.filteredShelf.bookId.ratingCount}
    this.author =  {fname: this.filteredShelf.bookId.authorId.fname, lname: this.filteredShelf.bookId.authorId.lname, _id:this.filteredShelf.bookId.authorId._id}
    this.category =  {name: this.filteredShelf.bookId.categoryId.name, _id: this.filteredShelf.bookId.categoryId._id}
    this.user =  {rate: this.filteredShelf.rate, status: this.filteredShelf.status}
    if(this.user.status =="w")
      this.onScreenStatus = "Want to Read"
      else if(this.user.status =="r")
      this.onScreenStatus = "Read"
      else if(this.user.status =="c")
      this.onScreenStatus = "Currently Reading"

    console.log("[INIT]: ", this.book, this.author, this.category, this.user )
  }

  editRate(e: any) {
    const reqBody = {rateInfo:{ avgRating: this.book.avgRating, 
      oldRate: this.user.rate, newRate: this.ctrl.value, ratingCount: this.book.ratingCount} }
    const bookId = e.currentTarget.parentElement.parentElement.parentElement.parentElement.id
    console.log("IN REVIEW:", reqBody)

    const reqParams = {bookId: this.book._id}
    this.userShelfSerivce.editRating(reqParams, reqBody)
      .subscribe((data: any) => {
        this.response = data.body
        console.log(this.response)
      }, (err) => {
        console.log(err)
      })
  }

  editStatus(e: any) {
    const status = ["r", "c", "w"]
    const bookId = e.currentTarget.parentElement.parentElement.id
    const reqBody = {status: status[e.target.selectedIndex-1]}
    const reqParams = {bookId: this.book._id}
    console.log(reqBody, reqParams)
    this.userShelfSerivce.editStatus(reqParams, reqBody)
      .subscribe((data: any) => {
        this.response = data.body
        console.log(this.response)
      }, (err) => {
        console.log(err)
      })
  }

  deleteBook(e: any) {
    console.log(e.target.id)
    const reqParams = {bookId: this.book._id, userRate: this.user.rate, avgRate: this.book.avgRating };
    console.log(reqParams)
    this.userShelfSerivce.removeBook(reqParams)
      .subscribe((data: any) => {
        this.response = data.body
        console.log(this.response)
      }, (err) => {
        console.log(err)
      })
  }
}

