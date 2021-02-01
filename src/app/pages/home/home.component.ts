import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-home',
  template: `
    <div class="container pt-2 home">
      <div class="row align-items-center">
        <div class="col-xl-6 ml-auto mr-auto">
          <div class="mt-3">
            <i class="fa fa-quote-left quote"></i>&nbsp;
            <p>Currently moving to AWS, come back soon!</p>
            <span class="blockquote">{{ 'home.data.quote' | translate }}</span
            >&nbsp;<i class="fa fa-quote-right quote"></i>
          </div>
        </div>
      </div>
      <div class="row align-items-center mt-4">
        <div class="col">
          <h1 class="title">{{ 'website.home' | translate }}</h1>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col">
          <p class="text-justify">
            {{ 'home.education.background' | translate }}
            {{ 'home.mission' | translate }}
            {{ 'home.age' | translate: param }}
          </p>
        </div>
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/me.png" height="200" />
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/backend.png" height="200" />
        </div>
        <div class="col">
          <p class="text-justify">
            {{ 'home.java.experience' | translate }}
            {{ 'home.backend.craftsmanship' | translate }}
            {{ 'home.python' | translate }}
          </p>
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col">
          <p class="text-justify">
            {{ 'home.frontend.experience' | translate }}
            {{ 'home.angular' | translate }}
          </p>
        </div>
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/frontend.png" height="200" />
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/shipment.png" height="200" />
        </div>
        <div class="col">
          <p class="text-justify">
            {{ 'home.deliver.software' | translate }}
          </p>
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col">
          <p class="text-justify">
            {{ 'home.ai' | translate }}
          </p>
        </div>
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/ai.png" height="200" />
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/coaching.png" height="200" />
        </div>
        <div class="col">
          <p class="text-justify">
            {{ 'home.give.back' | translate }}
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  param = { age: HomeComponent.getAge() };

  static getAge(): number {
    return moment().diff(moment('12-25-1992', 'MM-DD-YYYY'), 'years');
  }
}
