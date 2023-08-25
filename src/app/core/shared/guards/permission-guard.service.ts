import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserActions } from '../../store/auth';
import LoadCurrentUser = UserActions.LoadCurrentUser;

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const permission = route.data['permission'] as string;

    const currentUser = this.store.snapshot().currentUser;

    if (!currentUser) {
      return this.store.dispatch(new LoadCurrentUser()).pipe(map((m) => true));
    }

    const userPermissions = currentUser.user.permissions;
    if (!userPermissions)
      return of(false).pipe(
        tap(async () => await this.router.navigateByUrl('/no-access'))
      );

    return of(!!userPermissions.find((p) => p == permission)).pipe(
      tap(async (hasPer) => {
        if (!hasPer) {
          await this.router.navigateByUrl('/no-access');
        }
      })
    );
  }
}
