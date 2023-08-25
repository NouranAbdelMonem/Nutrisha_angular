import {Validators} from "@angular/forms";

export const colorValidator = Validators.pattern('#[0-9a-f]{6}$');