import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddStoreComponent} from './components/add-store/add-store.component'
import {AddProductComponent} from './components/add-product/add-product.component'
import {ListProductsComponent} from './components/list-products/list-products.component'
import {StoreListComponent} from './components/store-list/store-list.component'

const routes: Routes = [
	{ path: 'add-store', component: AddStoreComponent },
	{ path: 'add-product', component: AddProductComponent },
	{ path: 'stores/:id/products', component: ListProductsComponent },
	{ path: 'stores', component: StoreListComponent },
	{ path: '', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
