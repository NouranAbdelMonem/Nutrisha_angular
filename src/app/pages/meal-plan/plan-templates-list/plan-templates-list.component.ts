import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Subject,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PagedListQueryModel } from '../../../core/shared';
import { MealPlanService } from '../../../core/meal-plan/meal-plan.service';
import { LookupItemModel } from '../../../core/shared/models/lookup-item.model';
import { MealPlanListModel } from '../../../core/meal-plan/models/meal-plan-list.model';

@UntilDestroy()
@Component({
  selector: 'app-plan-templates-list',
  templateUrl: './plan-templates-list.component.html',
  styleUrls: ['./plan-templates-list.component.scss'],
})
export class PlanTemplatesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  search$ = new Subject<string>();
  searchWord: string;
  templates$: Subject<MealPlanListModel[]> = new Subject<MealPlanListModel[]>();
  totalRows$: Subject<number> = new Subject<number>();
  displayedColumns = ['icon', 'templateName', 'ownerName'];

  constructor(
    public router: Router,
    private mealPlanService: MealPlanService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  ngAfterViewInit(): void {
    this.search$
      .pipe(untilDestroyed(this), distinctUntilChanged(), debounceTime(150))
      .subscribe((searchTerm) => {
        this.searchWord = searchTerm;
        this.paginator.pageIndex = 0;

        this.loadTemplates();
      });
  }

  loadTemplates() {
    this.mealPlanService
      .getTemplates(this.prepareQueryParams())
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.templates$.next(result.data);
        this.totalRows$.next(result.totalRows);
      });
  }

  prepareQueryParams() {
    return new PagedListQueryModel({
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchWord: this.searchWord,
    });
  }

  async rowClicked(id: string) {
    const params = await firstValueFrom(this.activatedRoute.params);
    const userId = params['userId'];

    if (userId) {
      await this.router.navigateByUrl(
        'plans/templates/' + id + '/user/' + userId + '/edit'
      );
    } else {
      await this.router.navigateByUrl('plans/templates/edit/' + id);
    }
  }
}
