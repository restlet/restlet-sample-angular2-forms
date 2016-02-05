import {Injectable} from 'angular2/core';
import {Http,Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

export class Company {
  constructor(public id: number, public name: string) { }
}

@Injectable()
export class CompanyService {
  constructor(private http:Http) {
  }

  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be7-9655-7ef7d7bf9d20')); 
  }

  getCompanies() {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.get('https://angular2.apispark.net/v1/companies/', {
      headers: headers
    }).map(res => res.json());
  }

  getCompany(companyId:string) {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.get(`https://angular2.apispark.net/v1/companies/${companyId}`, {
      headers: headers
    }).map(res => res.json());
  }

  findCompanyByName(companyName:string) {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.get(`https://angular2.apispark.net/v1/companies/?name=${companyName}`, {
      headers: headers
    }).map(res => res.json());
  }

  updateCompany(companyId:string,company:Company) {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);
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