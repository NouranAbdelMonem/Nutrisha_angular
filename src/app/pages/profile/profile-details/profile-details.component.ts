import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil, tap } from 'rxjs';
import {
  AdminUserData,
  UserActions,
  UserState,
} from '../../../core/store/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Media } from '../../../core/shared';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  userDetails: AdminUserData;
  currentSelectUserImage: string | undefined;
  currentSelectUserMedia: Media;
  changePasswordForm: FormGroup;

  userName = '';
  private unsubscribe = new Subject<void>();
  mainInfoForm: FormGroup;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        takeUntil(this.unsubscribe),
        tap((params) => {
          const profileId = params['id'];
          if (profileId) {
            return;
          }

          this.store
            .select(UserState.currentUser)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => {
              this.userDetails = data;
              this.userName = this.userDetails?.name;
              this.currentSelectUserImage = this.userDetails?.personalImage;
              this.setInfoForm();
            });
        })
      )
      .subscribe();

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });

    this.setInfoForm();
  }

  setInfoForm() {
    this.mainInfoForm = this.formBuilder.group({
      username: [this.userDetails?.name, [Validators.required]],
      email: [this.userDetails?.email],
      role: [this.userDetails?.roleName],
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  changePassword() {
    this.authService
      .changePassword({
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword,
      })
      .pipe(tap(() => this.changePasswordForm.setValue({})))
      .subscribe();
  }

  updateProfile() {
    this.store.dispatch(
      new UserActions.CurrentUserDataUpdated({
        name: this.mainInfoForm.value.username,
        email: this.mainInfoForm.value.email,
        image: this.currentSelectUserMedia,
      })
    );
  }

  userImageChanged(files: FileList) {
    if (!files || !files.length || files.length > 1) return;
    const image = files.item(0);
    this.currentSelectUserMedia = new Media({
      file: image,
    });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onload = (e) => {
      this.currentSelectUserImage = fileReader.result as string;
    };
  }
}
