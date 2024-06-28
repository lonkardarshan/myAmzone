import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Orders, OrdersService } from '../orders.service';
import { product, ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: Orders[] = [];
  email: any = '';
  products: product[] = this.loadProducts();

  constructor(private ordersService: OrdersService, private productService: ProductServiceService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'])
    }

    if (typeof localStorage !== 'undefined') {
      this.email = localStorage.getItem('email');
    }

    this.getOrders(this.email);
  }

  getOrders(email: string) {
    this.ordersService.getOrdersByEmail(email).subscribe(data => {
      this.orders = data;
    });
  }
  loadProducts() {
    return this.productService.getproductlist();
  }
  getProductName(pid: number): string {
    const product = this.products.find(product => product.id === pid);
    return product ? product.name : 'Unknown Product';
  }

}
