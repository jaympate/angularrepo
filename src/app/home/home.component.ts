import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="jumbotron">
      <h1 class="display-4">{{'website.welcome.message' | translate}}</h1>
      <p class="lead">{{'website.welcome.part1' | translate}}</p>
      <hr class="my-4">
      <p>{{'website.welcome.part2' | translate}}</p>
      <p class="lead">
        <button class="btn btn-primary btn-lg" routerLink="about" type="button"
                role="button">{{'website.learn.more.about.me' | translate}}</button>
      </p>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
