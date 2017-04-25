import { Component } from '@angular/core';
import { 
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormFieldComponent } from './form.field';
import { LabelsComponent } from './labels.ngform';
import { LabelsValueAccessor } from './labels.ngform.accessor';
import { FormErrorComponent } from './form.error';
import {
  BootstrapInputDirective,
  BootstrapFormDirective,
  BootstrapButtonDirective
} from './form.bootstrap';
import { FormToolbarComponent } from './form.toolbar';
import { CompanyService, Company} from '../services/companies.service';
import {
  notEmptyValidator,
  zipCodeValidator,
  createUniqueNameValidator
} from '../validators/custom.validators';

@Component({
  selector: 'company-details',
  templateUrl: './company.details.html',
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
  companyId: string;

  company: Company;

  error: string;

  submitPending: boolean;

  companyForm: FormGroup;

  constructor(private service: CompanyService,
  	   private router: Router,
       private route: ActivatedRoute,
  	   builder: FormBuilder) {
  	// Initialize form structure
    this.companyForm = builder.group({
      name: ['', Validators.required, createUniqueNameValidator(service,this)],
      tags: ['', notEmptyValidator],
      address: builder.group({
        street: ['', Validators.required],
        zipcode: ['', [ Validators.required, zipCodeValidator ] ],
        city: ['', Validators.required]
      })
    });

    // Load company by identifier
	  this.companyId = this.route.snapshot.params['id'];
	  service.getCompany(this.companyId).subscribe(
      company => {
        this.company = company;
        const { name, address, tags } = company;
        this.companyForm.patchValue({
          name, tags, address
        });
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
    const companyToSave = this.companyForm.value
  	this.service.updateCompany(this.companyId, companyToSave).subscribe(
      company => {
        //toastr.info('Company successfully updated');
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
}
