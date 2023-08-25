import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(
    value: string[],
    notAvailable: string = 'N/A',
    spacer = ', '
  ): unknown {
    return value && value.length ? value?.join(spacer) : notAvailable;
  }
}
