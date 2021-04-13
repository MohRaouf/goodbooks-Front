import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config'


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }

  getAdminInfo() {
    return this.client.get(`${config.apiUrl}/admins/login`,{ observe: 'response' })
  }

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

  updateAuthor(authorId:any,newAuthor:any) {
    return this.client.patch(`${config.apiUrl}/authors/${authorId}`, newAuthor,{ observe: 'response' })
  }
  deleteAuthor(authorId:any) {
    return this.client.delete(`${config.apiUrl}/authors/${authorId}`,{ observe: 'response' })
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
