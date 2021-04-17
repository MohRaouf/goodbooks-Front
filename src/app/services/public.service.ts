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
 
  }
  updateSearch(NewCat:string,NewName:string){
    this.searchCatChange.next(NewCat)
    this.searchedNameChange.next(NewName)
  }
  getAllBooks(page:number,perPage:number) {
    return this.client.get(`${config.apiUrl}/books?page=${page}&perPage=${perPage}`, { observe: 'response' })
  }
  getTopBooks(){
    return this.client.get(`${config.apiUrl}/books/top`,{observe:"response"});
  }
  getBookById(id:number){
    return this.client.get(`${config.apiUrl}/books/${id}`)
  }
  getBookSearchRes(search:string){
    return this.client.get(`${config.apiUrl}/books/search/${search}`,{observe:"response"})
  }
  getAllAuthors(page:any=undefined,perPage:any=undefined){
    return this.client.get(`${config.apiUrl}/authors?page=${page}&perPage=${perPage}`,{ observe: 'response' }) 
  }
  getTopAuthors(){
    return this.client.get(`${config.apiUrl}/authors/top`,{observe:"response"});
  }
  getAuthorById(id:number){
    return this.client.get(`${config.apiUrl}/authors/${id}`)
  }
  getAuthorSearchRes(search:string){
    return this.client.get(`${config.apiUrl}/authors/search/${search}`,{observe:"response"})
  }
  getAllCategories(page:any=undefined,perPage:any=undefined){
    return this.client.get(`${config.apiUrl}/categories?page=${page}&perPage=${perPage}`,{observe:"response"})
  }
  getTopCategories(){
    return this.client.get(`${config.apiUrl}/categories/top`,{observe:"response"});
  }
  getCategoryById(id:number){
    return this.client.get(`${config.apiUrl}/categories/${id}`)
  }
  getCatSearchRes(search:string){
    return this.client.get(`${config.apiUrl}/categories/search/${search}`,{observe:"response"})
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