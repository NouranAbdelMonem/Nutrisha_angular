import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestLoaderService {
  requestLoading$ = new Subject<boolean>();
  constructor() {}
}
