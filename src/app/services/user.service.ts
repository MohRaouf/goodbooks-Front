import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) { }
  getUserInfo() {
    return this.client.get(`${config.apiUrl}/users/login`,{ observe: 'response' })
  }
}
