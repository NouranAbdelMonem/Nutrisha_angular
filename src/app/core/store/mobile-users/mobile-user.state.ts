import { Action, Select, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MobileUserActions } from './mobile-user.actions';
import {
  MobileUserDetailsModel,
  MobileUserDetailsViewModel,
  MobileUserListModel,
  MobileUserService,
} from '../../mobile-users';
import { tap } from 'rxjs';

interface MobileUserStateModel {
  mobileUsersPage: MobileUserListModel[];
  totalRows: number;
  lastLoadedUser: MobileUserDetailsViewModel | null | undefined;
}

@State<MobileUserStateModel>({
  name: 'mobileUsers',
})
@Injectable()
export class MobileUserState {
  constructor(private mobileUserService: MobileUserService) {}

  @Action(MobileUserActions.LoadMobileUsers)
  getPagedList(
    ctx: StateContext<MobileUserStateModel>,
    action: MobileUserActions.LoadMobileUsers
  ) {
    return this.mobileUserService
      .getPagedList(action.pagedModelQueryModel)
      .pipe(
        tap((result) => {
          const data = result.data;
          const currentState = ctx.getState();
          ctx.setState({
            ...currentState,
            mobileUsersPage: data,
            totalRows: result.totalRows,
          });
        })
      );
  }

  @Action(MobileUserActions.LoadUserDetails)
  loadUserDetails(
    ctx: StateContext<MobileUserStateModel>,
    action: MobileUserActions.LoadUserDetails
  ) {
    return this.mobileUserService.getUserDetails(action.userId).pipe(
      tap((result) => {
        const data = result.data;
        const currentState = ctx.getState();
        const lastUser = result.data
          ? new MobileUserDetailsViewModel(data)
          : null;
        ctx.setState({
          ...currentState,
          lastLoadedUser: lastUser,
        });
      })
    );
  }

  @Select()
  static lastLoadedPage(state: MobileUserStateModel) {
    return state.mobileUsersPage;
  }
}
