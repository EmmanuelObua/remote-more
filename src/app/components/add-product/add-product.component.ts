import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpResponse } from '@angular/common/http';

import {StoreService} from '../../services/stores/store.service'
import {ProductService} from '../../services/products/product.service'

import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

	productForm: FormGroup;
	stores:any = [];

	constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		private ngZone: NgZone,
		private storeService: StoreService,
		private productService: ProductService,
		private httpClient: HttpClient
		) { 

		this.productForm = this.formBuilder.group({
			name: [''],
			storeId: [''],
			price: [''],
			description: ['']
		})
		
	}

	ngOnInit() {

		this.storeService.GetStores()
		.subscribe((data:any) => {
			this.stores = data
		}, (err) => {
			console.log(err);
		});

	}

	onSubmit(): any {
		this.productService.AddProduct(this.productForm.value)
		.subscribe(() => {
			console.log('Data added successfully!')
			this.productForm.reset();
			this.ngZone.run(() => this.router.navigateByUrl('/add-product'))
		}, (err) => {
			console.log(err);
		});
	}


}
