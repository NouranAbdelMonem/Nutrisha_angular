import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {firstValueFrom, map, Observable, tap} from 'rxjs';
import { RoleService } from '../../../core/roles/role.service';
import {Tag} from "@angular/compiler/src/i18n/serializers/xml_helper";

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss'],
})
export class RoleDetailsComponent implements OnInit {
  roleDetails: {
    roleName: string;
    permissions: Set<string>;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private roleService: RoleService
  ) {}

  async ngOnInit(): Promise<void> {
    const params = await firstValueFrom(this.activatedRoute.params);
    const roleId = params['id'];
    if (!roleId) {
      await this.router.navigateByUrl('/roles/all');
    }

    this.roleService
      .getById(roleId)
      .pipe(
        tap((res) => {
          const data = res.data;
          this.roleDetails = {
            roleName: data.roleName,
            permissions: new Set<string>(data.permissions)
          }
        })
      )
      .subscribe();
  }
}
