import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserActions, UserState } from '../../../core/store/auth';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  login() {
    this.store.dispatch(
      new UserActions.UserLoginRequested(this.loginForm.value)
    );

    this.store
      .select(UserState.hasUser)
      .pipe(untilDestroyed(this))
      .subscribe(async (hasUser) => {
        if (hasUser) {
          await this.router.navigateByUrl('/');
        }
      });
  }
}
