import {Directive, ElementRef, Renderer, Input} from 'angular2/core';

@Directive({
  selector: 'input:not([noBootstrap]),textarea:not([noBootstrap]), select:not([noBootstrap])'
})
export class BootstrapInputDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el, 'form-control', true);
  }
}

@Directive({
  selector: 'form:not([noBootstrap])'
})
export class BootstrapFormDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el, 'form-horizontal', true);
  }
}

@Directive({
  selector: 'button:not([noBootstrap])'
})
export class BootstrapButtonDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el, 'btn', true);
    renderer.setElementClass(el, 'btn-primary', true);
  }
}