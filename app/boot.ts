import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router'; 
import {AppComponent} from './app.component';
import {CompanyService} from './services/companies.service';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, HTTP_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  CompanyService
]);