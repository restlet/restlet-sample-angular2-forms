import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {CompanyService, Company} from '../services/companies.service';

@Component({
  selector: 'company-list',
  template: `
    <h1>Companies</h1>
    <ul>
      <li *ngFor="let company of companies$ | async">
        <a [routerLink]="[ company.id ]">
          {{company.name}}
        </a>
      </li>
    </ul>
  `
})
export class ListComponent {
  companies$: Observable<Company[]>;

  constructor(private service: CompanyService, private router: Router) {
    this.companies$ = service.getCompanies();
  }
}
