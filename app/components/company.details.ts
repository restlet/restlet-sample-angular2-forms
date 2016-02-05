import {Component} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {RouteParams, Router} from 'angular2/router';
import {FormFieldComponent} from './form.field';
import {LabelsComponent} from './labels.ngform';
import {LabelsValueAccessor} from './labels.ngform.accessor';
import {FormErrorComponent} from './form.error';
import {BootstrapInputDirective, BootstrapFormDirective, BootstrapButtonDirective} from './form.bootstrap';
import {FormToolbarComponent} from './form.toolbar';
import {CompanyService, Company} from '../services/companies.service';
import {notEmptyValidator, zipCodeValidator, createUniqueNameValidator} from '../validators/custom.validators';

@Component({
  selector: 'company-details',
  directives: [ FormFieldComponent, LabelsComponent, LabelsValueAccessor,
                FormErrorComponent, BootstrapInputDirective,
                BootstrapFormDirective, BootstrapButtonDirective,
                FormToolbarComponent ],
  templateUrl: '/app/templates/company.details.html',
  styles: [
    `.glyphicon-refresh-animate {
      -animation: spin .7s infinite linear;
      -webkit-animation: spin2 .7s infinite linear;
    }`,
    `@-webkit-keyframes spin2 {
      from { -webkit-transform: rotate(0deg);}
      to { -webkit-transform: rotate(360deg);}
    }`
  ]
})
export class DetailsComponent {
  constructor(private service:CompanyService,
  	   private routeParams: RouteParams,
  	   private router:Router,
  	   builder:FormBuilder) {
  	// Initialize form structure
    this.companyForm = builder.group({
      name: ['', Validators.required, createUniqueNameValidator(service,this)],
      tags: ['', notEmptyValidator],
      addressStreet: ['', Validators.required],
      addressZipCode: ['', Validators.compose([ Validators.required, zipCodeValidator ])],
      addressCity: ['', Validators.required]
    });

    // Load company by identifier
	  this.companyId = this.routeParams.get('id');
	  service.getCompany(this.companyId).subscribe(
      company => {
        this.company = company;
        //this.comp
      }
    );
  }

  displayErrors(error) {
    if (error.messages) { 
      var messages = error.messages;
      messages.forEach((message) => {
        this.companyForm.controls[message.property].setErrors({ remote: message.message });
      });
    } else {
      this.error = `${error.reasonPhrase} (${error.code})`;
    }
  }

  clearErrors() {
    this.error = '';
  }

  shouldDisableSubmitButton() {
    return (!this.companyForm.valid || this.companyForm.pending || this.submitPending);
  }

  shouldDisplaySubmitProgress() {
    return this.submitPending;
  }

  onSubmit() {
    this.submitPending = true;
    this.clearErrors();
  	this.service.updateCompany(this.companyId, this.company).subscribe(
      company => {
        toastr.info('Company successfully updated');
        this.submitPending = false;
      }, error => {
        this.displayErrors(error);
        this.submitPending = false;
      }, () => {
        console.log('complete');
      }
	  );
  	return false;
  }

  goToList() {
    this.router.navigate([ 'List' ]);
    return false;
  }
}