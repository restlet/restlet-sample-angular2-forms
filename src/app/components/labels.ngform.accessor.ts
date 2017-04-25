import {
  Host, Component,
  Input, Output,
  OnInit, EventEmitter,
  ElementRef, Directive,
  Renderer, Self,
  forwardRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

import { LabelsComponent } from './labels.ngform';

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LabelsValueAccessor),
  multi: true
};

@Directive({
  selector: 'labels',
  host: {'(labelsChange)': 'onChange($event)'/*, '(blur)': 'onTouched()'*/},
  providers: [
    CUSTOM_VALUE_ACCESSOR
  ]
})
export class LabelsValueAccessor implements ControlValueAccessor {
  onChange = (_) => {};
  onTouched = () => {};

  constructor(private host: LabelsComponent) {

  }

  writeValue(value: any): void {
    this.host.writeLabelsValue(value);
  }
 
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
