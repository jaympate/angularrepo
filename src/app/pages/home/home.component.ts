import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  template: `
    <div class="container pt-4">
      <div class="row d-flex justify-content-center">
        <div class="home">
          <p class="website">...</p>
          <h1 class="welcomeMessage">{{'website.welcome.message' | translate | uppercase}}</h1>
          <p class="lead introductionMessage">{{'website.introduction.message' | translate}}</p>
          <p class="detailsMessage">{{'website.details.message' | translate:param}}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  param = {age: HomeComponent.getAge()};

  static getAge(): number {
    return moment().diff(moment('12-25-1992', 'MM-DD-YYYY'), 'years');
  }
}
