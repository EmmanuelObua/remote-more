import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpResponse } from '@angular/common/http';

import {StoreService} from '../../services/stores/store.service'

@Component({
	selector: 'app-store-list',
	templateUrl: './store-list.component.html',
	styleUrls: ['./store-list.component.css']
})
export class StoreListComponent {

	public lat:any;
	public lng:any;

	stores:any = [];

	constructor(
		private router: Router,
		private ngZone: NgZone,
		private storeService: StoreService,
		private httpClient: HttpClient
		) { 

		
		
	}

	ngOnInit() {
		this.getLocation();
	}

	getLocation() {
		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition((position: any) => {

				if (position) {
					this.lat = position.coords.latitude;
					this.lng = position.coords.longitude;
				}

				this.storeService.GetStores({lat:this.lat,lng:this.lng})
				.subscribe((data:any) => {

					this.stores = data

					console.log(this.stores)

				}, (err) => {
					console.log(err);
				});

			},
			(error: any) => console.log(error));
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

}
