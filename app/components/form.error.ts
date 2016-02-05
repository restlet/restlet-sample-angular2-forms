import {Component,Input} from 'angular2/core';

@Component({
  selector: 'error',
  template: `
    <div *ngIf="error" class="form-group form-group-sm">
      <div class="alert alert-warning alert-dismissible col-md-10 col-sm-10" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="close()"><span aria-hidden="true">&times;</span></button>
        {{error}}
      </div>
    </div>
  `
})
export class FormErrorComponent {
  @Input()
  error:string;

  close() {
    this.error = null;
  }
}