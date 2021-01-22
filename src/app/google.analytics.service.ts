import { Injectable } from '@angular/core';

declare let gtag: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  click(eventCategory: string, eventLabel: string): void {
    gtag('event', 'click', {
      event_category: eventCategory,
      event_label: eventLabel
    });
  }
}
