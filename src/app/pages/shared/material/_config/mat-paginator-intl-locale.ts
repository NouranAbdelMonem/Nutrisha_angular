import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class MatPaginatorIntlLocale extends MatPaginatorIntl {
  override itemsPerPageLabel: string = "";

  constructor(private translationService: TranslateService) {
    super();
  }

  override getRangeLabel = function (page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.translationService.instant('BASE.OF_LABEL')} ` + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return (
      startIndex +
      1 +
      ' - ' +
      endIndex +
      ` ${this.translationService.instant('BASE.OF_LABEL')} ` +
      length
    );
  }
}
