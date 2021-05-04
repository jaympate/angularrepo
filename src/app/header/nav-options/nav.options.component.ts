import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Builder} from 'builder-pattern/dist/src/Builder';
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

  constructor(private router: Router) {
    this.navigationOptions = [
      Builder<NavigationOption>().path('').text('FAQ').build(),
      Builder<NavigationOption>().path('vision').text('Vision').build(),
      Builder<NavigationOption>().path('cv').text('CV').build(),
      Builder<NavigationOption>()
        .path('projects')
        .text('Projects')
        .build(),
      Builder<NavigationOption>()
        .path('articles')
        .text('Articles')
        .build(),
      Builder<NavigationOption>().path('books').text('Books').build(),
      Builder<NavigationOption>().path('data').text('Data').build()
    ];
  }

  getActive(path: string): string {
    return this.router.url === '/' + path ? 'active' : '';
  }

  clickNavigation(): void {
    this.navigated.emit();
  }
}
