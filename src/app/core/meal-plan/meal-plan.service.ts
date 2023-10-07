import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  BaseV1ObjectResponseModel,
  BaseV1ResponseModel,
  HttpUtilsService,
  PagedListQueryModel,
} from '../shared';
import { Injectable } from '@angular/core';
import { ArticleListModel } from '../articles/models/article-list.model';
import { LookupItemModel } from '../shared/models/lookup-item.model';
import { PlanDetailsModel } from './models/plan-details.model';
import { MealPlanListModel } from './models/meal-plan-list.model';

const mealPlan = environment.baseAdminV1Url + 'MealPlan';

@Injectable()
export class MealPlanService {
  constructor(private httpClient: HttpClient) {}

  getTemplates(
    queryParams: PagedListQueryModel
  ): Observable<BaseV1ResponseModel<MealPlanListModel[]>> {
    return this.httpClient.get<BaseV1ResponseModel<MealPlanListModel[]>>(
      mealPlan + '/GetTemplatePagedList',
      {
        params: HttpUtilsService.prepareGetPagedListQueryParams(queryParams),
      }
    );
  }

  GetTemplateById(
    id: string
  ): Observable<BaseV1ObjectResponseModel<PlanDetailsModel>> {
    return this.httpClient.get<BaseV1ObjectResponseModel<PlanDetailsModel>>(
      mealPlan + '/GetTemplateById',
      {
        params: new HttpParams().append('id', id),
      }
    );
  }

  post(plan: any): Observable<BaseV1ObjectResponseModel<any>> {
    return this.httpClient.post<BaseV1ObjectResponseModel<any>>(
      mealPlan + '/PostMealPlan',
      plan
    );
  }

  put(plan: any): Observable<BaseV1ObjectResponseModel<any>> {
    return this.httpClient.put<BaseV1ObjectResponseModel<any>>(
      mealPlan + '/UpdateMealPlan',
      plan
    );
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(mealPlan + '/Delete', {
      params: { id },
    });
  }

}
