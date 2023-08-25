import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
	MatNativeDateModule,
	DateAdapter,
	MAT_DATE_LOCALE,
	MAT_DATE_FORMATS,
	MatRippleModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

import { DragDropModule } from '@angular/cdk/drag-drop';

// import {
// 	MomentDateAdapter,
// 	MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// 	MAT_MOMENT_DATE_FORMATS,
// } from '@angular/material-moment-adapter';
// import { TranslationService } from '../../../core/_base/layout';
import { MatPaginatorIntlLocale } from './_config';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

@NgModule({
	exports: [
		MatDatepickerModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatChipsModule,
		MatToolbarModule,
		MatDividerModule,
		MatListModule,
		MatSlideToggleModule,
		DragDropModule,
		MatSidenavModule,
		MatBadgeModule,
		MatSliderModule,
		MatRippleModule,
	],
	providers: [
		{
			provide: MAT_TABS_CONFIG,
			useValue: { animationDuration: '0ms' },
		},
    {
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: {  appearance: "outline" },
		},
		// {
		// 	provide: MAT_DIALOG_DEFAULT_OPTIONS,
		// 	useClass: MatDialogConfigLocale,
		// 	deps: [TranslationService],
		// },
		{
			provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
			useValue: {
				showDelay: 500,
				hideDelay: 500,
			},
		},
		{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlLocale },
		// { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
		// Native MomentDateAdapter configuration
		// {
		// 	provide: DateAdapter,
		// 	useClass: MomentDateAdapter,
		// 	deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		// },
		// {
		// 	provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
		// 	useValue: { useUtc: true },
		// },
		// Extended MomentDataAdapter configuration to support Timezone
		// {
		// 	provide: DateAdapter,
		// 	useClass: ExtendedMomentDateAdapter,
		// 	deps: [MAT_DATE_LOCALE]
		// },
	],
})
export class MaterialModule {}
