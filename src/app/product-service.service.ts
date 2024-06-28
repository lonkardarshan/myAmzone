import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
 
  private baseUrl = 'http://localhost:8080';
 private item: any[]=[];
  id:number=0;
  constructor(private httpclient: HttpClient) { }
  addproduct(product: product) {
    return this.httpclient.post<boolean>(`${this.baseUrl}/addProduct`, product);
  }
  getproduct() {
    return this.httpclient.get<product[]>(`${this.baseUrl}/getAll`);
  }
  setproducts(product:any[]){
  this.item=product;
  }
  getproductlist(){
    return this.item;
  }
  deleteProduct(id:number){
    return this.httpclient.delete<boolean>(`${this.baseUrl}/deleteProduct/${id}`)
  }
  editProduct(id: number) {
   this.id=id;
  }
  getProductById(){
    console.log("product id is"+this.id)
   return this.httpclient.get<product>(`${this.baseUrl}/getProductById/${this.id}`);
   
  }
  saveProductChanges(product:product){
    return this.httpclient.put<boolean>(`${this.baseUrl}/saveProductChanges`,product)
  }
}

export class product {
  id:number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category:string;
  constructor(id:number,name: string, description: string, price: number, imageUrl: string,category:string) {
   this.id=id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category=category;
  }
}