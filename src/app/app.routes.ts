import { Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShowProductComponent } from './show-product/show-product.component';

export const routes: Routes = [
    { path: 'cart', component: CartComponent },
    { path: 'home', component: HomeComponent },
    { path: 'checkout', component: CheckOutComponent },
    { path: 'showproduct', component: ShowProductComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'adminuser', component: AdminUserComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'editproduct', component: AdminOrdersComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }

];

