import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpResponse } from '@angular/common/http';

import {StoreService} from '../../services/stores/store.service'
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
	selector: 'app-add-store',
	templateUrl: './add-store.component.html',
	styleUrls: ['./add-store.component.css']
})

export class AddStoreComponent {

	storeForm: FormGroup;

	constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		private ngZone: NgZone,
		private storeService: StoreService,
		private httpClient: HttpClient
		) { 

		this.storeForm = this.formBuilder.group({
			name: [''],
			address: [''],
			description: ['']
		})
		
	}

	ngOnInit() {}

	onSubmit(): any {


		this.storeService.AddStore(this.storeForm.value)
		.subscribe(() => {
			console.log('Data added successfully!')
			this.storeForm.reset();
			this.ngZone.run(() => this.router.navigateByUrl('/add-store'))
		}, (err) => {
			console.log(err);
		});
	}

}
