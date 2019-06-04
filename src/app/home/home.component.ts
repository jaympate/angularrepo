import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="container-fluid">
      <div class="jumbotron">
        <h1 class="display-4 welcomeMessage">{{'website.welcome.message' | translate}}</h1>
        <p class="lead introductionMessage">{{'website.introduction.message' | translate}}</p>
        <hr class="my-4">
        <p class="detailsMessage">{{'website.details.message' | translate}}</p>
        <p class="lead">
          <button class="btn btn-primary btn-lg learnMore" routerLink="vision" type="button"
                  role="button">{{'website.learn.more.about.my.vision' | translate}}</button>
        </p>
      </div>
    </div>
  `
})
export class HomeComponent {
}
