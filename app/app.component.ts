import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES,RouteConfig } from 'angular2/router';
import {ListComponent} from './components/companies.list';
import {DetailsComponent} from './components/company.details';

@Component({
  selector: 'apispark',
  templateUrl: '/app/templates/main.html',
  directives: [ ROUTER_DIRECTIVES ]
})
@RouteConfig([
  { path: '/companies', component: ListComponent, name: 'List', useAsDefault: true },
  { path: '/companies/:id', component: DetailsComponent, name: 'Details'}
])
export class AppComponent {
}