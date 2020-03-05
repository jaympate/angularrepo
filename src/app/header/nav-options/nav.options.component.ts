import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Builder} from 'builder-pattern';
import {NavigationOption} from './navigation.option';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav.options.component.html',
  styleUrls: ['./nav.options.component.scss']
})
export class NavOptionsComponent {
  navigationOptions: NavigationOption[];

  @Output()
  navigated = new EventEmitter<void>();

  constructor(public router: Router) {
    this.navigationOptions = [
      Builder<NavigationOption>().path('').text('website.home').build(),
      Builder<NavigationOption>().path('vision').text('website.vision').build(),
      Builder<NavigationOption>().path('cv').text('website.cv').build(),
      Builder<NavigationOption>().path('projects').text('website.projects').build(),
      Builder<NavigationOption>().path('blogposts').text('website.blogposts').build(),
      Builder<NavigationOption>().path('data').text('website.data').build()
    ];
  }

  getActive(path: string): string {
    return this.router.url === ('/' + path) ? 'active' : '';
  }

  clickNavigation(): void {
    this.navigated.emit();
  }
}
