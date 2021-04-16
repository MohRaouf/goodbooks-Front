import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config'
import { Subject } from 'rxjs/Subject';
@Injectable({
  providedIn: 'root'
})
export class PublicService {
  searchCategory:string=""
  searchedName:string=""

  searchCatChange: Subject<string> = new Subject<string>();
  searchedNameChange: Subject<string> = new Subject<string>();
  categoryObservable=this.searchCatChange.asObservable()
  searchedNameObservable = this.searchedNameChange.asObservable()
  constructor(private client: HttpClient) { 
  /*  this.searchCatChange.subscribe((value)=>{
      this.searchCategory=value;
    })
    this.searchedNameChange.subscribe((value)=>{
      this.searchedName=value;
    })*/
  }
  updateSearch(NewCat:string,NewName:string){
    this.searchCatChange.next(NewCat)
    this.searchedNameChange.next(NewName)
    
  }
  getAllBooks() {
    //Login
    return this.client.get(`${config.apiUrl}/books`, { observe: 'response' })
  }
  getTopBooks(){
    return this.client.get(`${config.apiUrl}/books/top`,{observe:"response"});
  }
  getBookById(id:number){
    return this.client.get(`${config.apiUrl}/books/${id}`)
  }
  getAllAuthors(){
    return this.client.get(`${config.apiUrl}/authors`,{ observe: 'response' }) 
  }
  getTopAuthors(){
    return this.client.get(`${config.apiUrl}/authors/top`,{observe:"response"});
  }
  getAuthorById(id:number){
    return this.client.get(`${config.apiUrl}/authors/${id}`)
  }
  getAllCategories(){
    return this.client.get(`${config.apiUrl}/categories`,{observe:"response"})
  }
  getTopCategories(){
    return this.client.get(`${config.apiUrl}/categories/top`,{observe:"response"});
  }
  getCategoryById(id:number){
    return this.client.get(`${config.apiUrl}/categories/${id}`)
  }
}
/*getBooks(page:number,count:number) {
  //Login
  const params = {
    page: page,
    count: count
  }

  return this.client.get(`${config.apiUrl}/books?page=${page}&count=${count}`, { observe: 'response' })
}*/