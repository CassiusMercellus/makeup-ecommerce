import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})

export class StorePageComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://makeup-api.herokuapp.com/api/v1/products.json').subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
