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
  getAllCategories(){
    return this.client.get(`${config.apiUrl}/categories`, { observe: 'response' })
  }
  getAllAuthors(){
    return this.client.get(`${config.apiUrl}/authors`, { observe: 'response' })
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