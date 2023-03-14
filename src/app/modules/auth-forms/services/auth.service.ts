import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login = () => {
    console.log('login')
  }

  register = () =>{
    console.log('proceso de registro')
  }

  logout = () =>{
    console.log('logout')
  }
}
