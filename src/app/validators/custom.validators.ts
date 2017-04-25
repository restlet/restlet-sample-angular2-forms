import { Observable } from 'rxjs/Observable';
import { CompanyService } from '../services/companies.service';


export function notEmptyValidator(control) {
  if(control.value == null || control.value.length===0) {
    return {
      notEmpty: true
    }
  }

  return null
}

export function zipCodeValidator(control) {
  var valid = /^\d{5}$/.test(control.value);
  return !valid ? { invalidZip: true }: null;
}

export function createUniqueNameValidator(service: CompanyService, component) {
  return function(control) {
    return new Promise((resolve, reject) => {
      service.findCompanyByName(control.value).subscribe(
    	  data => {
          if (data.length === 0 || (data.length === 1 &&
                component.company.id === data[0].id)) {
            resolve(null);
          } else {
            resolve({uniqueName: true});
          }
        },
        err => {
          resolve({uniqueName: true});
        }
      );
    });
  };
}
