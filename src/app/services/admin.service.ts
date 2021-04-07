import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../config'


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }

  getAllBooks() {
    return this.client.get(`${config.apiUrl}/books`,{ observe: 'response' })
  }

  insertBook(newBook:any) {
    return this.client.post(`${config.apiUrl}/books`, newBook,{ observe: 'response' })
  }

  updateBook(bookId:any,newBook:any) {
    return this.client.patch(`${config.apiUrl}/books/${bookId}`, newBook,{ observe: 'response' })
  }
  deleteBook(bookId:any) {
    return this.client.delete(`${config.apiUrl}/books/${bookId}`,{ observe: 'response' })
  }

  getAllAuthors(){
    return this.client.get(`${config.apiUrl}/authors`,{observe:'response'})
  }

  insertAuthor(newAuthor:any) {
    return this.client.post(`${config.apiUrl}/authors`, newAuthor,{ observe: 'response' })
  }

  updateAuthor(bookId:any,newBook:any) {
    return this.client.patch(`${config.apiUrl}/authors/${bookId}`, newBook,{ observe: 'response' })
  }
  deleteAuthor(bookId:any) {
    return this.client.delete(`${config.apiUrl}/authors/${bookId}`,{ observe: 'response' })
  }

  getAllCategories(){
    return this.client.get(`${config.apiUrl}/categories`,{observe:'response'})
  }

  insertCategory(newCategory:any) {
    return this.client.post(`${config.apiUrl}/categories`, newCategory,{ observe: 'response' })
  }

  updateCategory(categoryId:any,newCategory:any) {
    return this.client.patch(`${config.apiUrl}/categories/${categoryId}`, newCategory,{ observe: 'response' })
  }
  deleteCategory(categoryId:any) {
    return this.client.delete(`${config.apiUrl}/categories/${categoryId}`,{ observe: 'response' })
  }
}
