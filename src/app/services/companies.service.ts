import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Company {
  id: number;
  name: string;
}

@Injectable()
export class CompanyService {
  constructor(private http: Http) {
  }

  addAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be7-9655-7ef7d7bf9d20')); 
  }

  getCompanies() {
    const headers = new Headers();
    this.addAuthorizationHeader(headers);

    return this.http.get('https://angular2.apispark.net/v1/companies/', {
      headers
    }).map(res => res.json());
  }

  getCompany(companyId:string) {
    var headers = new Headers();
    this.addAuthorizationHeader(headers);

    return this.http.get(`https://angular2.apispark.net/v1/companies/${companyId}`, {
      headers: headers
    }).map(res => res.json());
  }

  findCompanyByName(companyName:string) {
    var headers = new Headers();
    this.addAuthorizationHeader(headers);

    return this.http.get(`https://angular2.apispark.net/v1/companies/?name=${companyName}`, {
      headers: headers
    }).map(res => res.json());
  }

  updateCompany(companyId:string,company:Company) {
    var headers = new Headers();
    this.addAuthorizationHeader(headers);
    headers.append('Content-Type', 'application/json');

    return this.http.put(
      `https://angular2.apispark.net/v1/companies/${companyId}`,
      JSON.stringify(company), {
        headers: headers
      }).map(res => res.json()).catch(res => {
        return Observable.throw(res.json());
      });
  }
}
