import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

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
		private storeService: StoreService
	) { 

		this.storeForm = this.formBuilder.group({
			name: [''],
			address: [''],
			description: ['']
		})
		
	}
 
	ngOnInit() { }
 
	onSubmit(): any {

		this.storeService.AddStore(this.storeForm.value)
				.subscribe(() => {
						console.log('Data added successfully!')
						this.ngZone.run(() => this.router.navigateByUrl('/'))
					}, (err) => {
						console.log(err);
				});
	}

}
