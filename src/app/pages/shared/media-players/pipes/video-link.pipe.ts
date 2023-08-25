import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Pipe({
  name: 'videoLink',
})
export class VideoLinkPipe implements PipeTransform {
  transform(value: string): string {
    const streamEndpoint = environment.baseUrl + '/Stream?filePath=';
    return value.replace(environment.baseUrl + '/', streamEndpoint);
  }
}
