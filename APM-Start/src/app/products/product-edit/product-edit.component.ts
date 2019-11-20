import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnChanges {
  pageTitle = 'Product Edit';
  errorMessage: string;

  product: Product;
  private dataIsValid: { [key: string]: boolean } = {};

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // const id = +this.route.snapshot.paramMap.get('id');

    // this.getProduct(id);

    console.log('ngOnInit called - Product-Edit-Component');


    this.route.data.subscribe(data => {
      const resolvedData : ProductResolved = data['resolvedData'];

      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.product);
    });

    // this.route.paramMap.subscribe(params => {
    //   this.getProduct(+params.get('id'));
    // })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called - Product-Edit-Component', changes);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
  }

  validate(): void {
    this.dataIsValid = {};

    if (this.product.productName && this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    if (this.product.category && this.product.category.length > 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
