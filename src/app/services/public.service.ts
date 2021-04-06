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
}
