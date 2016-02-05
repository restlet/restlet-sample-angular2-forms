import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {CompanyService, Company} from '../services/companies.service';

@Component({
  selector: 'company-list',
  template: `
    <h1>Companies</h1>
    <ul>
      <li *ngFor="#company of (companies | async)">
        <a href="#" (click)="selectCompany(company)">
          {{company.name}}
        </a>
      </li>
    </ul>
  `
})
export class ListComponent {
  constructor(private service:CompanyService, private router:Router) {
    this.companies = service.getCompanies();
  }

  selectCompany(company:Company) {
    this.router.navigate([ 'Details', { id: company.id }]);
    return false;
  }
}