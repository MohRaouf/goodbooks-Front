import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { config } from '../config'

@Injectable({
  providedIn: 'root'
})

export class loggedUserServices {
  constructor(private client:HttpClient) { 
    console.log("[UserBookShelfConstructor] called")
    let sub = this.getBookSehlf("a")
    .subscribe((data:any)=>{
      this.userShelf = data.body
      console.log(this.userShelf)
    },(err)=>{
      console.log(err)
    })
  }

  getBookSehlf(status:String){
    // let res = this.client.get(this.URL)
    console.log(`HITTING:${config.userAPI}/${status}`)
    return this.client.get(`${config.userAPI}/${status}`, {observe: 'response'})
  }

  editStatus(reqParams:any, reqBody:any){
    // let res = this.client.get(this.URL)
    console.log(`HITTING: ${config.userAPI}/edit_book_status/${reqParams.bookId}`)
    return this.client.patch(`${config.userAPI}/edit_book_status/${reqParams.bookId}`, reqBody, {observe: 'response'})
  }

  addRating(reqParams:any, reqBody:any){
    console.log(`HITTING: ${config.userAPI}/add_rate/${reqParams.bookId}`)
    return this.client.post(`${config.userAPI}/add_rate/${reqParams.bookId}`, reqBody, {observe: 'response'})
  }

  editRating(reqParams:any, reqBody:any){
    console.log(`HITTING: ${config.userAPI}/edit_rate/${reqParams.bookId}`)
    return this.client.patch(`${config.userAPI}/edit_rate/${reqParams.bookId}`, reqBody, {observe: 'response'})
  }

  getUserBook(reqParams:any){
    console.log(`HITTING: ${config.userAPI}/getbook/${reqParams.bookId}`)
    return this.client.get(`${config.userAPI}/getbook/${reqParams.bookId}`, {observe: 'response'})
  }

  assertBook(reqParams:any, reqBody:any){
    console.log(`HITTING: ${config.userAPI}/assert_book/${reqParams.bookId}`)
    return this.client.patch(`${config.userAPI}/assert_book/${reqParams.bookId}`, reqBody, {observe: 'response'})
  }

  removeBook(reqParams:any){
    console.log(`HITTING: ${config.userAPI}/remove_book/${reqParams.bookId}/${reqParams.userRate}/${reqParams.avgRate}\n`, reqParams)
    return this.client.delete(`${config.userAPI}/remove_book/${reqParams.bookId}/${reqParams.userRate}/${reqParams.avgRate}`,  {observe: 'response'})
  }

  addReview(reqParams:any,reqBody:any){
    console.log(`HITTING: ${config.userAPI}/add_review/${reqParams.bookId}\n`, reqBody)
    return this.client.post(`${config.userAPI}/add_review/${reqParams.bookId}`, reqBody, {observe: 'response'})
  }
  userShelf=[]
}
