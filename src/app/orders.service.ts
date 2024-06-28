import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl="http://localhost:8080"
  constructor(private httpclient: HttpClient) { }

  addOrder(Order:Orders){
    return this.httpclient.post<boolean>(`${this.baseUrl}/addOrder`,Order) 
  }
  getAllOrders(): Observable<Orders[]> {
    return this.httpclient.get<Orders[]>(`${this.baseUrl}/getAllOrder`);
  }
  getOrdersByEmail(email: string): Observable<Orders[]> {
    return this.httpclient.get<Orders[]>(`${this.baseUrl}/getAllOrder/${email}`);
  }
  updateorder(order:Orders){
    return this.httpclient.put<boolean>(`${this.baseUrl}/updateorder`,order)
  }
}
export class Orders {
  orderid: number;
  email: string;
  orderDate: string;
  address: string;
  orderStatus: string;
  paymentStatus: string;
  phoneNo: number;
  totalPrice: number;
  products: { pid: number; quantity: number }[];

  constructor(
    orderid: number, email: string, orderDate: string, address: string, orderStatus: string, paymentStatus: string, phoneNo: number, totalPrice: number, products: { pid: number; quantity: number }[]
  ) {
    this.orderid = orderid;
    this.email = email;
    this.orderDate = orderDate;
    this.address = address;
    this.orderStatus = orderStatus;
    this.paymentStatus = paymentStatus;
    this.phoneNo = phoneNo;
    this.totalPrice = totalPrice;
    this.products = products;
  }
}

