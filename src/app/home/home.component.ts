import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="home">
          <p class="website">Dieter Jordens</p>
          <h1 class="display-4 welcomeMessage">{{'website.welcome.message' | translate | uppercase}}</h1>
          <p class="lead introductionMessage">{{'website.introduction.message' | translate}}</p>
          <p class="detailsMessage">{{'website.details.message' | translate:param}}</p>
          <p class="lead">
            <button class="btn btn-lg learnMore" routerLink="vision" type="button"
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
