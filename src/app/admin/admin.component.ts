import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminnavbarComponent } from '../adminnavbar/adminnavbar.component';
import { AuthenticationService } from '../authentication.service';
import { Orders, OrdersService } from '../orders.service';
import { product, ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,AdminnavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  orders:Orders[]=[];
  products:product[]=this.loadProducts();
constructor(private ordersservice:OrdersService,private auth:AuthenticationService,private router:Router,private productService:ProductServiceService){}
ngOnInit(){
  this.getAllOrders();
  if(!this.auth.isLoggedIn()){
    this.router.navigate(['/login'])
}
}
getAllOrders(){
  this.ordersservice.getAllOrders().subscribe((allorder)=>this.orders=allorder);
}
updateOrderStatus(order: Orders): void {
 this.ordersservice.updateorder(order).subscribe((isupdate)=>{
if(isupdate){
  alert("updated successfylly")
}
else{
  alert("something went wrong")
}
 });
  console.log(`Order ID ${order.orderid} status updated to ${order.orderStatus}`);
}
loadProducts(){
  return this.productService.getproductlist();
 }

updatePaymentStatus(order: Orders): void {
  console.log(`Order ID ${order.orderid} payment status updated to ${order.paymentStatus}`);
}
getProductName(pid: number): string {
  const product = this.products.find(product => product.id === pid);
  return product ? product.name : 'Unknown Product';
}

}
