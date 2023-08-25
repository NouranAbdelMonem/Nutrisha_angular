import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class NavHeaderTitleService {
    title;
    
    title$ = new BehaviorSubject<string>(undefined);
    constructor(
        @Inject(DOCUMENT) private document: Document) {
        
    }

    setTitle(title: string) {
        this.title$.next(title);
    }
}