import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberToString'
})
export class NumberToStringPipe implements PipeTransform {
  transform(number: number): string {
    return !!number ? number.toString() : '';
  }
}
