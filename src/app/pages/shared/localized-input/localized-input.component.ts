import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
    selector: 'app-localized-input',
    templateUrl: './localized-input.component.html',
    styleUrls: ['./localized-input.component.scss']
})
export class LocalizedInputComponent implements OnInit, ControlValueAccessor {
    object: object;

    @Input() lang: string;
    @Input() label: string;

    constructor(private ngControl: NgControl) {
        ngControl.valueAccessor = this;
    }

    ngOnInit(): void {
    }

    writeValue(obj: any): void {
        this.object = obj || {};
    }


    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    setValue() {
        this.ngControl.control.setValue(this.object);
    }
}
