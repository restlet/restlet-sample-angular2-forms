import {Component,Input,OnInit,Query,QueryList,ElementRef,ContentChild} from 'angular2/core';
import {NgClass,Control,NgFormControl} from 'angular2/common';

@Component({
  selector: 'field',
  template: `
    <div
         [ngClass]="{'has-error':state && !state.valid && !state.control.pending,'form-group':label,'form-group-sm':label,'has-feedback':feedback}">
      <label *ngIf="label" for="for"
         class="col-sm-2 col-md-2 control-label">{{label}}</label>

      <div class="col-sm-8 col-md-8"
           [ngClass]="{'col-sm-8': label, 'col-md-8': label}">
        <ng-content ></ng-content>
        <span *ngIf="isFeedbackValid()" 
              class="glyphicon glyphicon-ok form-control-feedback text-success"
              aria-hidden="true"></span>
        <span *ngIf="isFeedbackNotValid()"
              class="glyphicon glyphicon-remove form-control-feedback"
              aria-hidden="true"></span>
        <span *ngIf="isFeedbackPending()"
              class="glyphicon glyphicon-refresh glyphicon-refresh-animate text-muted form-control-feedback"
              aria-hidden="true"></span>
        <span *ngIf="isStateNotValid()" class="help-block text-danger">
          <div *ngIf="state?.errors?.required">The field is required</div>
          <div *ngIf="state?.errors?.remote">{{state?.errors?.remote}}</div>
          <div *ngIf="state?.errors?.notEmpty">The list can't be empty</div>
          <div *ngIf="state?.errors?.uniqueName">The name must be unique</div>
          <div *ngIf="state?.errors?.invalidZip">The zip code format isn't correct</div>
        </span>
      </div>
    </div>
  `,
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
export class FormFieldComponent {
  @Input()
  label: string;

  @Input()
  feedback: boolean;

  /*@Input()
  state: Control;*/

  @ContentChild(NgFormControl) state;

  constructor(private eltRef:ElementRef) {

  }

  isStateNotValid() {
    return this.label && this.state && !this.state.valid
       && !this.state.control.pending;
  }

  isFeedbackValid() {
    return this.state && this.feedback &&
       !this.state.control.pending && this.state.valid;
  }

  isFeedbackNotValid() {
    return this.state && this.feedback &&
       !this.state.control.pending && !this.state.valid;
  }

  isFeedbackPending() {
    return this.state && this.feedback && this.state.control.pending;
  }

}