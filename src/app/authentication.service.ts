import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeStamp } from 'console';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
log:boolean=false;
  private baseUrl = 'http://localhost:8080';
  constructor(private httpclient: HttpClient) { }
  register(user: User) {
    return this.httpclient.post<boolean>(`${this.baseUrl}/addUser`, user);
  }
  login(email: string): Observable<User> {
    const url = `${this.baseUrl}/login/${email}`;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('email',email);
    }
   
    return this.httpclient.post<User>(url,null);
  }
  deleteUser(email: any) {
    return this.httpclient.delete<boolean>(`${this.baseUrl}/deleteUser/${email}`)
  }
  isLoggedIn(): boolean {
    return this.log;
    
  }
  email(){
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('email');
    }else{
      return null;
    }
  }
  logout(): boolean {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    return this.log=false;
  }
  getAllUser(){
    return this.httpclient.get<User[]>(`${this.baseUrl}/getAllUser`)
  }
}
export class User {
  name: string;
  email: string;
  password: string;
  usertype:string;
  constructor(name: string, email: string, password: string,usertype:string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.usertype=usertype;
  }
}