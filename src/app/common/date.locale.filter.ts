import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateLocale' })
export class DateLocaleFilter implements PipeTransform {
  private static formatLocalDate(date: Date, dateFormat: string) {
    return DateLocaleFilter.getLocaleDate(date).format(dateFormat);
  }

  private static getLocaleDate(value: Date) {
    return moment.utc(value).local();
  }

  transform(date: Date, dateFormat: string): any {
    moment.locale('en');

    return DateLocaleFilter.formatLocalDate(date, dateFormat);
  }
}
