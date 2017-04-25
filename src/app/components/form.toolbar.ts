import { Component } from '@angular/core';

@Component({
  selector: 'toolbar',
  template: `
    <div class="col-md-11 col-sm-offset-2 col-md-offset-2">
      <div class="btn-toolbar">
        <ng-content ></ng-content>
      </div>
    </div>
  `
})
export class FormToolbarComponent {
}