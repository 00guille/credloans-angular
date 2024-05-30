import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // Use "url as path to db.json and complete the services"
  url: string = "localhost/";
  msg: any;

  constructor(private http: HttpClient) { }

  getLogin(): Observable<any> {
    // return the Login array
    return this.http.get(this.url + 'Login')
  }

  getCard(id: any): Observable<any> {
    // Using the id get the appropriate card data from Cards array
    return this.http.get(this.url + 'Cards/' + id)
  }
  addLoan(data: any): Observable<any> {
    // Add the data to Loans array
    return this.http.post(this.url + 'Loans', data);
  }
  getLoan(id: any): Observable<any> {
    // Using the id get the appropriate Loans data from Loans array
    return this.http.get(this.url + 'Loans/' + id);
  }
  updateCards(data: any): Observable<any> {
    // Update the data in Cards array
    const { id } = data;
    return this.http.put(this.url + 'Cards/' + id, data);
  }

  updateLoan(data: any): Observable<any> {
    // Update the data in Loans array
    const { id } = data;
    return this.http.put(this.url + 'Loans/' + id, data);
  }

  getMsg(): any {
    // return data msg variable
    return of(this.msg);
  }
  setMsg(data: any): any {
    // set the data to msg variable
    this.msg = data;
  }

}
