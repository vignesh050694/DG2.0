import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objString'
})
export class ObjStringPipe implements PipeTransform {

  transform = (value: object): string => {
    return JSON.stringify({ value });
  }

}
