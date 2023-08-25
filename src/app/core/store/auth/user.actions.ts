import { Media } from '../../shared';

export namespace UserActions {
  export class UserLoginRequested {
    static readonly type = '[Users] User Login Requested';

    constructor(public payload: { email: string; password: string }) {}
  }

  export class LoadCurrentUser {
    static readonly type = '[Users] Load Current User';
  }

  export class CurrentUserDataUpdated {
    static readonly type = '[Users] Current User Updated';

    constructor(
      public userInfo: { name: string; email: string; image: Media }
    ) {}
  }
}
