import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<any> = new Observable(); // Initialize with an empty observable

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems(); // Get the user's cart items
  }
}
