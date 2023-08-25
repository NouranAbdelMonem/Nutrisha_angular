import { Pipe, PipeTransform } from '@angular/core';
import {Media} from "../../../../core/shared/models/media";
import {transformMenu} from "@angular/material/menu";

@Pipe({
  name: 'withFlag'
})
export class WithFlagPipe implements PipeTransform {

  transform(value: Media[], flag: string): string {
    if (!value) return null;


    return value.find(m => m.flags && m.flags.some(f => f == flag))?.url;
  }

}
