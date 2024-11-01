import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>(`https://makeup-api.herokuapp.com/api/v1/products.json`).subscribe(
      data => {
        this.product = data.find(p => p.id.toString() === productId);
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }
}
