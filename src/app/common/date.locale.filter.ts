import {Pipe, PipeTransform} from '@angular/core';
import {TranslateServiceFacade} from '../translation/translate.service.facade';
import * as moment from 'moment';

@Pipe({name: 'dateLocale'})
export class DateLocaleFilter implements PipeTransform {
  constructor(private translate: TranslateServiceFacade) {
  }

  private static formatLocalDate(date: Date, dateFormat: string) {
    return DateLocaleFilter.getLocaleDate(date)
      .format(dateFormat);
  }

  private static getLocaleDate(value: Date) {
    return moment.utc(value)
      .local();
  }

  transform(date: Date, dateFormat: string): any {
    this.initializeMomentWithCurrentLanguage();

    return DateLocaleFilter.formatLocalDate(date, dateFormat);
  }

  private initializeMomentWithCurrentLanguage() {
    const currentLanguage = this.translate.getCurrentLanguage() || 'en';
    moment.locale(currentLanguage);
  }
}
