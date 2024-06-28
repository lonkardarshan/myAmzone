import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Orders, OrdersService } from '../orders.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  cartitemdetail: any[] = [];
  totalPrice: number = 0;
  order: Orders;
  paymentStatusOptions: string[] = ['Unpaid', 'Cash On Delivery'];

  constructor(private cartService: CartService, private router: Router, private orderservice: OrdersService, private auth: AuthenticationService) {
    this.order = new Orders(0, '', new Date().toISOString(), '', 'Pending', '', +91, 0, []);
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
    this.cartService.getItems().subscribe(items => {
      this.cartitemdetail = items;
      this.calculateTotalPrice();
      this.order.totalPrice = this.totalPrice;
      this.order.products = this.cartitemdetail.map(item => ({
        pid: item.pid,
        quantity: item.quantity
      }));
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartitemdetail.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  onSubmit() {
    this.orderservice.addOrder(this.order).subscribe(response => {
      if (response) {
        this.cartService.deletebyemail(this.order.email).subscribe((isdelete) => {
          if (isdelete) {
            alert('Order placed successfully!');
            this.router.navigate(['home']);
          }
        })
      } else {
        alert('Failed to place order.');
      }
    });

  }

}
