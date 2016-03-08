import {Directive, ElementRef, Renderer, Input} from 'angular2/core';

@Directive({
  selector: 'input:not([noBootstrap]),textarea:not([noBootstrap]), select:not([noBootstrap])'
})
export class BootstrapInputDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, 'form-control', true);
  }
}

@Directive({
  selector: 'form:not([noBootstrap])'
})
export class BootstrapFormDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, 'form-horizontal', true);
  }
}

@Directive({
  selector: 'button:not([noBootstrap])'
})
export class BootstrapButtonDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, 'btn', true);
    renderer.setElementClass(el.nativeElement, 'btn-primary', true);
  }
}
