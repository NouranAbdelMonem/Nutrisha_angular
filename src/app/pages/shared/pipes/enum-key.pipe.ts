import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKey',
})
export class EnumKeyPipe implements PipeTransform {
  transform(value: any, enumObject: any): any {
    return enumObject[value];
  }
}
