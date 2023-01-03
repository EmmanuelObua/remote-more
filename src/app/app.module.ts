import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreListComponent } from './components/store-list/store-list.component';
import { AddStoreComponent } from './components/add-store/add-store.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

@NgModule({
	declarations: [
			AppComponent,
			StoreListComponent,
			AddStoreComponent,
			AddProductComponent,
			ListProductsComponent
		],
	imports: [
			FormsModule,
			BrowserModule,
			AppRoutingModule,
			HttpClientModule,
			ReactiveFormsModule,
			BrowserAnimationsModule
		],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }
