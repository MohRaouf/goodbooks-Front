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

  getAllBooks(newBook:{name:string,author:string,category:string,description:string}) {
    //Login
    return this.client.post(`${config.apiUrl}/books`, newBook,{ observe: 'response' })
  }
}
