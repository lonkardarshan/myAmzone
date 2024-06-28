import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService, User } from './authentication.service';
import { product } from './product-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpclient: HttpClient, private auth: AuthenticationService) {
    if (typeof localStorage !== 'undefined') {
      this.email = localStorage.getItem('email');
    }
    
    if (this.isBrowser()&&typeof localStorage !== 'undefined') {
      this.items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    }
  }
  email: any
  private items: any[] = [];
  cart: CartItem | undefined;

  baseuer = "http://localhost:8080";



  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  addToCart(product: any): Observable<boolean> {
   
    this.cart = new CartItem(0, this.email, product.id, 1,product.price);

    return this.httpclient.post<boolean>(this.baseuer + "/addToCart", this.cart);
  
  }
  setemail(email:any){
    this.email=email;
  }

  getItems() {
    if (this.isBrowser()) {
      this.email=localStorage.getItem('email')
    }
    
    return this.httpclient.get<CartItem[]>(this.baseuer + "/getCatItem/" + this.email)

  }

  delete(id: number) {
    return this.httpclient.delete<boolean>(this.baseuer + "/deleteCartItem/" + id);
  }
  deletebyemail(email:string){
    return this.httpclient.delete<boolean>(`${this.baseuer}/deleteCartItemByEmail/${email}`)
  }

  incrementQuantity(id: number) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.quantity++;
    }
    this.saveItems();
  }

  decrementQuantity(id: number) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.quantity--;
    }
    this.saveItems();
  }


  private saveItems() {
    if (this.isBrowser()) {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
  }
}
export class CartItem {
  id: number;
  email: string;
  pid: number;
  quantity: number;
  price:number;
  constructor(id: number, email: string, pid: number, quantity: number,price:number) {
    this.id = id;
    this.email = email;
    this.pid = pid;
    this.quantity = quantity;
    this.price=price;
  }
}