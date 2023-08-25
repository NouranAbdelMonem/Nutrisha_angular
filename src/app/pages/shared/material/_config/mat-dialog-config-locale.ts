// import { Injectable, OnDestroy } from '@angular/core';
// import { MatDialogConfig } from '@angular/material/dialog';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { TranslationService } from 'src/app/core/_base/layout';
//
// @Injectable()
// export class MatDialogConfigLocale extends MatDialogConfig implements OnDestroy {
// 	private unsubscribe = new Subject<void>();
// 	constructor(private trans: TranslationService) {
// 		super();
//
// 		this.hasBackdrop = true;
// 		this.panelClass = 'kt-mat-dialog-container__wrapper';
// 		this.height = 'auto';
// 		this.width = '600px';
// 		this.direction = trans.dir;
//
// 		trans.directionChanged$
// 			.pipe(takeUntil(this.unsubscribe))
// 			.subscribe((dir) => (this.direction = dir));
// 	}
//
// 	ngOnDestroy() {
// 		this.unsubscribe.next();
// 		this.unsubscribe.complete();
// 	}
// }
