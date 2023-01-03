import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class ProductService {

	// Node/Express API
	REST_API: string = 'http://localhost:8000/api/products';
	httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private httpClient: HttpClient) { }

	AddProduct(data: any): Observable<any> {
		let API_URL = `${this.REST_API}`;

		return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
	}

	GetProduct(id: any): Observable<any> {

		let API_URL = `${this.REST_API}/${id}`;

		return this.httpClient.get(API_URL, { headers: this.httpHeaders })
					.pipe(map((res: any) => {
						return res || {}
					}),catchError(this.handleError))

	}

	handleError(error: HttpErrorResponse) {

		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Handle client error
			errorMessage = error.error.message;
		} else {
			// Handle server error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}

		console.log(errorMessage);
		return throwError(errorMessage);

	}
}
