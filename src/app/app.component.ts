import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private routerSubscription: Subscription;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    // subscribe to router events and send page views to Google Analytics
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        (window as any).gtag('event', 'page_view', { 'send_to': 'UA-169820783-1' });
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
