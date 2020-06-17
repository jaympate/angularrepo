import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';


// declare ga as a function to set and sent the events
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // subscribe to router events and send page views to Google Analytics
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
