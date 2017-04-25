import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './components/companies.list';
import { DetailsComponent } from './components/company.details';
import { BootstrapInputDirective } from './components/form.bootstrap';
import { BootstrapFormDirective } from './components/form.bootstrap';
import { BootstrapButtonDirective } from './components/form.bootstrap';
import { FormErrorComponent } from './components/form.error';
import { FormFieldComponent } from './components/form.field';
import { FormToolbarComponent } from './components/form.toolbar';
import { LabelsValueAccessor } from './components/labels.ngform.accessor';
import { LabelsComponent } from './components/labels.ngform';
//import { LabelsComponent } from './components/labels';
import { CompanyService } from './services/companies.service';

import { routesConfig } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    BootstrapInputDirective,
    BootstrapFormDirective,
    BootstrapButtonDirective,
    FormErrorComponent,
    FormFieldComponent,
    FormToolbarComponent,
    LabelsValueAccessor,
    LabelsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(routesConfig),
  ],
  providers: [
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
