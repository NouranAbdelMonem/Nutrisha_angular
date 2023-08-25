import {ElementRef, Injectable} from "@angular/core";
import {animate, AnimationBuilder, style} from "@angular/animations";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SplashScreenService {
    isLoading$: Observable<boolean>;
    isLoadingSubject = new BehaviorSubject(false);
    
    constructor() {
        this.isLoading$ = this.isLoadingSubject;
    }

    show() {
        this.isLoadingSubject.next(true);
    }

    hide() {
        this.isLoadingSubject.next(false)
    }

    // hide() {
    //     if (this.stopped) {
    //         return;
    //     }
    //
    //     const player = this.animationBuilder
    //         .build([style({opacity: '1'}), animate(800, style({opacity: '0'}))])
    //         .create(this.el.nativeElement);
    //
    //     player.onDone(() => {
    //         this.el.nativeElement.style.display = 'none';
    //         this.stopped = true;
    //     });
    //
    //     setTimeout(() => player.play(), 300);
    // }
    //
    // show() {
    //     if (!this.stopped) {
    //         return;
    //     }
    //
    //     const player = this.animationBuilder
    //         .build([style({display: '', opacity: '0'}), animate(800, style({opacity: '1'}))])
    //         .create(this.el.nativeElement);
    //
    //     player.onDone(() => {
    //         this.stopped = false;
    //     });
    //
    //     player.play();
    // }
}