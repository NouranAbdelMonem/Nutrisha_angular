import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoleService } from '../../../core/roles/role.service';
import { PagedListQueryModel } from '../../../core/shared';
import { firstValueFrom, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUserService } from '../../../core/admin-user/services/admin-user.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss'],
})
export class AdminUserDetailsComponent implements OnInit {
  user: any = {};
  userFormGroup: FormGroup;

  roles = [];

  private _unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private activateRoute: ActivatedRoute,
    private adminUserService: AdminUserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.initializeForm();

    this.roleService
      .getPagedList(new PagedListQueryModel({ pageSize: 10, pageNumber: 0 }))
      .pipe(
        takeUntil(this._unsubscribe),
        tap((result) => {
          this.roles = result.data;
        })
      )
      .subscribe();

    const params = await firstValueFrom(this.activateRoute.params);
    const userId = params['id'];

    if (userId) {
      this.adminUserService
        .getById(userId)
        .pipe(
          takeUntil(this._unsubscribe),
          tap((m) => {
            this.user = m.data;
            this.initializeForm();
          })
        )
        .subscribe();
    }
  }

  initializeForm() {
    this.userFormGroup = this.formBuilder.group({
      userName: this.formBuilder.control(this.user?.name, []),
      email: this.formBuilder.control(this.user?.email, [Validators.email]),
      password: this.formBuilder.control(null),
      roleId: this.formBuilder.control(this.user?.roleId, [
        Validators.required,
        (control: AbstractControl) => {
          if (this.user?.roleId == control.value) return [];
          return null;
        },
      ]),
    });
  }

  submit() {
    if (this.user?.id) {
      this.adminUserService
        .put(this.user.id, this.userFormGroup.value.roleId)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe();
      return;
    }

    this.adminUserService
      .post(this.userFormGroup.value)
      .pipe(
        takeUntil(this._unsubscribe),
        tap(async (m) => {
          await this.router.navigateByUrl('admin-users/edit/' + m.data);
        })
      )
      .subscribe();
  }

  deleteUser(id) {
    this.adminUserService
      .delete(id)
      .pipe(
        tap(async () => {
          await this.router.navigateByUrl('admin-users');
        })
      )
      .subscribe();
  }
}
