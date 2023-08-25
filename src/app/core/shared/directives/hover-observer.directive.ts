import {Directive, ElementRef} from "@angular/core";

@Directive({
    selector: '[hoverObserver]',
})
export class HoverObserverDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.classList.add('hover-observer');
    }
}
