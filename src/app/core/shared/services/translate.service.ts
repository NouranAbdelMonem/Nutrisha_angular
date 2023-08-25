import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Direction } from '@angular/cdk/bidi';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { SplashScreenService } from './splash-screen.service';

export type Locale = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  // Public properties
  langChangeStart$: Observable<any>;
  langChanged$: Observable<string>;
  directionChanged$: Observable<Direction>;
  dir: Direction = 'ltr';

  // Private properties
  private langChangeStartSubject = new Subject<void>();
  private langChangedSubject = new Subject<string>();
  private directionChangedSubject = new BehaviorSubject<Direction>(this.dir);
  private htmlTag: HTMLHtmlElement;

  constructor(
    private loadingService: SplashScreenService,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.langChangeStart$ = this.langChangeStartSubject.asObservable();
    this.langChanged$ = this.langChangedSubject.asObservable();
    this.directionChanged$ = this.directionChangedSubject.asObservable();

    this.htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
  }

  /**
   * Adds list of languages to TransalteService
   *
   * @param locales: Locale[]
   */
  loadTranslations(locales: Locale[]): void {
    // add new languages to the list
    this.translateService.addLangs([...locales]);
  }

  getTranslation(key: string) {
    return this.translateService.instant(key);
  }

  /**
   * Set current Laguage
   *
   * @param lang: Locale
   */
  setLanguage(lang: Locale) {
    const currentLang = this.getSelectedLanguage();
    if (currentLang == lang) return;

    this.loadingService.show();
    this.useLanguage(lang);
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
    //
    // let styleLink = this.document.getElementById('langCss') as HTMLLinkElement;
    // let bundleName = lang === 'ar' ? 'rtl-styles.css' : 'ltr-styles.css';
    //
    // // Style href shouldn't be chnaged if lang not changed.
    // if (styleLink && !styleLink.href.includes(bundleName)) {
    //     // wait 1000ms until splash screen cover the screen completely.
    //     setTimeout(() => {
    //         this.langChangeStartSubject.next();
    //         this.useLanguage(lang);
    //         styleLink.href = bundleName;
    //
    //         // Change moment default locale
    //         // Note: Used 'en' local with proper translation, to keep numbers always in English format.
    //         // moment.updateLocale('en', {relativeTime: this.translateService.instant('RELATIVE_TIME')});
    //         this.langChangedSubject.next(lang);
    //         // wait 1000ms until switching styles complete.
    //     }, 1000);
    // } else {
    //     this.useLanguage(lang);
    // }
  }

  /**
   * Returns selected language from localStorage if found, or it returns default language
   */
  getSelectedLanguage(): any {
    return (
      localStorage.getItem('language') ||
      this.translateService.getDefaultLang() ||
      'en'
    );
  }

  private useLanguage(lang: Locale) {
    if (lang) {
      this.translateService.use(lang);
      this.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.htmlTag.dir = this.dir;

      if (this.dir != this.directionChangedSubject.value) {
        // emit direction change value
        this.directionChangedSubject.next(this.dir);
      }

      localStorage.setItem('language', lang);
    }
  }

  initializeLanguage(locale: Locale) {
    this.useLanguage(locale);
  }
}
