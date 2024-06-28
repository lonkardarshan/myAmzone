import { CommonModule } from '@angular/common';

import { createInjectableType } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem, CartService } from '../cart.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { product, ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {  
  totalPrice = 0;
  cartitem: CartItem[] = [];
  product: product[] = [];
  cartitemdetail: any[] = [];

  constructor(private cartservice: CartService, private productservice: ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.cartservice.getItems().subscribe(items => {
      this.cartitem = items;
      this.product = this.productservice.getproductlist();
      this.generateCartItemDetail();
      this.calculateTotalPrice();
    });
  }

  generateCartItemDetail(): void {
    this.cartitemdetail = [];
    this.cartitem.forEach(cartItem => {
      const product = this.product.find(p => p.id === cartItem.pid);
      if (product) {
        this.cartitemdetail.push({
          cartid: cartItem.id,
          pid: cartItem.pid,
          name: product.name,
          imgurl: product.imageUrl,
          desc: product.description,
          quantity: cartItem.quantity,
          price: product.price
        });
      }
    });
  }

  increaseQuantity(pid: number): void {
    const cartItem = this.cartitem.find(item => item.pid == pid);
    console.log(cartItem)
    console.log(pid)
    if (cartItem) {
      cartItem.quantity++;
      this.generateCartItemDetail();
      this.calculateTotalPrice();
    } else {
      console.error(`Cart item with pid ${pid} not found.`);
    }
  }

  decreaseQuantity(pid: number): void {
    const cartItem = this.cartitem.find(item => item.pid == pid);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        this.generateCartItemDetail();
        this.calculateTotalPrice();
      } else {
        console.warn(`Cannot decrease quantity further for cart item with pid ${pid}.`);
      }
    } else {
      console.error(`Cart item with pid ${pid} not found.`);
    }
  }

  delete(id: number): void {
    this.cartservice.delete(id).subscribe(isdelete => {
      if (isdelete) {
        alert("Item deleted");
        this.router.navigate(['/home']);
      } else {
        alert("Something went wrong on the server");
      }
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.cartitemdetail.forEach(item => {
      this.totalPrice += item.price * item.quantity;
    });
  }

  checkout(){
      this.router.navigate(['/checkout'])
  }
}


