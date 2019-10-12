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
          <p class="pt-4">
            <button class="btn btn-outline-dark btn-lg learnMore" routerLink="vision" type="button"
                    role="button">{{'website.learn.more.about.my.vision' | translate}}</button>
          </p>
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
