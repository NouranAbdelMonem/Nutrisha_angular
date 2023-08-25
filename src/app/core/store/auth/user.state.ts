import { Action, Select, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserActions } from './user.actions';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { AdminUserService } from '../../admin-user/services/admin-user.service';

export interface AdminUserData {
  id: number;
  email: string;
  name: string;
  language: string;
  personalImage: string;
  roleName: string;
  permissions: string[];
}

export interface AdminUserState {
  user: AdminUserData;
  token: string;
}

@State<AdminUserState>({
  name: 'currentUser',
  defaults: null,
})
@Injectable()
export class UserState {
  constructor(
    private authService: AuthService,
    private userService: AdminUserService
  ) {}

  @Action(UserActions.UserLoginRequested)
  feedAnimals(
    ctx: StateContext<AdminUserState>,
    action: UserActions.UserLoginRequested
  ) {
    return this.authService.login(action.payload).pipe(
      tap((result) => {
        ctx.setState({
          ...ctx.getState(),
          user: result.data.user,
          token: result.data.token,
        });
      })
    );
  }

  @Action(UserActions.LoadCurrentUser)
  loadCurrentUser(ctx: StateContext<AdminUserState>) {
    return this.userService.loadCurrentUser().pipe(
      tap((result) => {
        if (!result || !result.data) {
          return;
        }
        ctx.setState({
          ...ctx.getState(),
          user: result.data,
        });
      }),
      catchError((e) => {
        this.authService.logOut();
        return throwError(() => e);
      })
    );
  }

  @Action(UserActions.CurrentUserDataUpdated)
  CurrentUserDataUpdated(
    ctx: StateContext<AdminUserState>,
    action: UserActions.CurrentUserDataUpdated
  ) {
    return this.userService.updateProfile(action.userInfo).pipe(
      tap((result) => {
        if (!result) {
          return;
        }

        const currentStatus = ctx.getState();
        ctx.setState({
          ...currentStatus,
          user: {
            ...currentStatus.user,
            email: result.data.email,
            name: result.data.name,
            personalImage: result.data.personalImage,
          },
        });
      })
    );
  }

  // Selectors
  @Select()
  static hasUser(state: any) {
    return !!state.currentUser?.user && !!state.currentUser?.user.id;
  }

  @Select()
  static currentUser(state: any) {
    return state.currentUser?.user;
  }
}
