import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Directive({
  selector: '[appRequiredValidators]',
})
export class RequiredValidatorsDirective implements OnChanges {
  constructor(
    private elementRef: ElementRef,
    private ngContainer: ViewContainerRef,
    public control: NgControl,
    _componentResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}
}
