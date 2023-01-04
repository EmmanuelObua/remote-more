import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
// import 'rxjs/add/operator/filter';

import {StoreService} from '../../services/stores/store.service'

@Component({
	selector: 'app-list-products',
	templateUrl: './list-products.component.html',
	styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {

	products:any = [];

	constructor(
		private storeService: StoreService,
		private httpClient: HttpClient,
		private route: ActivatedRoute,
		) {}

	ngOnInit() {

		this.route.params.subscribe(params => {
			this.getProducts(params['id']);
		})
		
	}

	getProducts(id:any) {
		
		this.storeService.GetStoreProducts(id)
		.subscribe((data:any) => {
			this.products = data
		}, (err) => {
			console.log(err);
		});

	}
}
