import {Host,Component,Input,Output,OnInit,EventEmitter,ElementRef} from 'angular2/core';
import {NgClass,Control,NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {Directive, ElementRef, Renderer, Self, forwardRef, Provider} from 'angular2/core';
import {LabelsComponent} from './labels.ngform';

const CUSTOM_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => LabelsValueAccessor), multi: true});

@Directive({
  selector: 'labels',
  host: {'(labelsChange)': 'onChange($event)'/*, '(blur)': 'onTouched()'*/},
  providers: [CUSTOM_VALUE_ACCESSOR]
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

