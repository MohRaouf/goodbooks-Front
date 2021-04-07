import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config'
@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private client: HttpClient) { }
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
