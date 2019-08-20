import {Component} from '@angular/core';
import {NavigationOption, WebsiteRoutes} from '../website.routes';

@Component({
  selector: 'app-nav-options',
  template: `
    <ul *ngIf="hasNavigationOptions" class="navbar-nav">
      <ng-container *ngFor="let navigationOption of navigationOptions">
        <li class="nav-item" [ngClass]="websiteRoutes.getActive(navigationOption.path)">
          <a class="nav-link navigation" routerLink="{{navigationOption.path}}">{{navigationOption.text | translate}}</a>
        </li>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./nav.options.component.scss']
})
export class NavOptionsComponent {
  navigationOptions: NavigationOption[];

  constructor(public websiteRoutes: WebsiteRoutes) {
    this.navigationOptions = [
      {path: '', text: 'website.home'},
      {path: 'vision', text: 'website.vision'},
      {path: 'cv', text: 'website.cv'}
    ];
  }

  get hasNavigationOptions(): boolean {
    return this.navigationOptions.length !== 0;
  }
}
