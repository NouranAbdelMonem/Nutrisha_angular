import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { Locale, TranslationService } from '../../core/shared';
import { Select, Store } from '@ngxs/store';
import { AdminUserData } from '../../core/store/auth';
import { Observable } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

export interface Language {
  title: string;
  logo: string;
  locale: Locale;
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  collapse = false;

  @Select((state) => state.currentUser?.user) user$: Observable<AdminUserData>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private translationService: TranslationService,
    private permissionService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.internalizeApp();
  }

  internalizeApp() {
    this.loadPermissions();
    const activeLang = this.translationService.getSelectedLanguage();
    this.activeLang = this.languages.filter(
      (lang) => lang.locale == activeLang
    )[0];
  }

  loadPermissions() {
    this.permissionService.flushPermissions();
    this.store
      .select((state) => state?.currentUser?.user?.permissions)
      .subscribe((result: string[]) => {
        if (result) this.permissionService.loadPermissions(result);
      });
  }

  logOut() {
    this.authService.logOut();
  }

  /*Lang*/
  activeLang: Language;
  languages: Language[] = [
    {
      locale: 'en',
      title: 'LANGUAGES.EN',
      logo: './assets/media/lang-selector-icons/usa-en.svg',
    },
    {
      locale: 'ar',
      title: 'LANGUAGES.AR',
      logo: './assets/media/lang-selector-icons/ar-eg.svg',
    },
  ];

  changeLang(lang: any) {
    this.translationService.setLanguage(lang.locale);
    this.activeLang = lang;
  }
}
