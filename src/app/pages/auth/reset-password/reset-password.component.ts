import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { firstValueFrom, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  showSuccessResetRequestMessage = false;
  resetPasswordToken: string | undefined;
  resetPasswordForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const queryParams = await firstValueFrom(this.activatedRoute.queryParams);
    this.resetPasswordToken = queryParams['token'];
    this.setEmailForm();
    this.resetPasswordForm = this.emailForm;
    this.setPasswordForm();
    this.setResetForm();
  }

  setResetForm() {
    this.resetPasswordForm = this.resetPasswordToken
      ? this.passwordForm
      : this.emailForm;
  }

  setEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.required,
        Validators.email,
      ]),
    });
  }
  setPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      password: this.formBuilder.control(null),
      confirmPassword: this.formBuilder.control(null, [
        this.hasTheSameValue.bind(this),
      ]),
    });
  }

  submit() {
    if (!this.resetPasswordToken) {
      this.authService
        .requestResetPassword(this.resetPasswordForm.value.email)
        .pipe(tap(() => (this.showSuccessResetRequestMessage = true)))
        .subscribe();
      return;
    }

    this.authService
      .resetPassword({
        token: this.resetPasswordToken,
        password: this.resetPasswordForm.value.password,
      })
      .pipe(tap(async () => await this.router.navigateByUrl('auth/login')))
      .subscribe();
  }

  hasTheSameValue(control: AbstractControl): ValidationErrors[] | null {
    if (this.resetPasswordForm?.value.password !== control.value)
      return [
        { invalidConfirm: 'Password And Confirm Password should be the same' },
      ];

    return null;
  }
}
