import { Component } from '@angular/core';

@Component({
  selector: 'app-cv',
  template: `
    <div class="container pt-3 pb-2">
      <div class="row cv border pb-3">
        <div class="col-sm-4 cv-left border-right image-container">
          <div class="container-fluid pt-3 ">
            <img
              defaultImage="assets/images/loading.gif"
              lazyLoad="assets/images/profile_picture_small.jpg"
              class="img-fluid cv-image"
              alt="{{ 'cv.image' | translate }}"
            />
          </div>
          <div class="container-fluid pt-3">
            <h1 class="name">Dieter Jordens</h1>
            <span class="lead">Software & Data Craftsman</span>
            <div class="about pt-3">
              <p class="text-justify">
                Dieter is a software developer with about 5 years of
                professional experience. He proudly bears the title of Civil
                Engineer. Dieter currently works as a craftsman at Continuum
                Consulting NV.
              </p>
            </div>
            <ul class="social-media-list">
              <li>
                <a href="www.facebook.com/dieter.jordens"
                  ><i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="www.linkedin.com/in/dieterjordens"
                  ><i class="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="gitlab.com/dieterj"
                  ><i class="fa fa-gitlab"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/djFooFoo"
                  ><i class="fa fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Dieter_Jordens"
                  ><i class="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="mailto:dieter.jordens.website@gmail.com"
                  ><i class="fa fa-envelope"></i>
                </a>
              </li>
            </ul>
            <a
              href="mailto:dieter.jordens.website@gmail.com?subject=CV&body={{
                'cv.body' | translate
              }}"
              class="btn btn-outline-dark btn-lg cvButton"
              ><i class="fa fa-download"></i> {{ 'cv.receive' | translate }}</a
            >
          </div>
        </div>
        <div class="col-sm-8 cv-right">
          <div class="container">
            <div class="row border-bottom pt-3 pl-3">
              <div class="col">
                <h2 class="section-title">
                  {{ 'cv.work.experience' | translate }}
                </h2>
                <div class="row">
                  <div class="col-12 item">
                    <small>{{ 'cv.work.experience1.date' | translate }}</small>
                    <h3>{{ 'cv.work.experience1.title' | translate }}</h3>
                    <h4>{{ 'cv.work.experience1.employer' | translate }}</h4>
                    <p>{{ 'cv.work.experience1.place' | translate }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-3 pl-3">
              <div class="col">
                <h2 class="section-title">{{ 'cv.education' | translate }}</h2>
                <div class="row">
                  <div class="col-12 item">
                    <small>{{ 'cv.education1.date' | translate }}</small>
                    <h3>{{ 'cv.education1.title' | translate }}</h3>
                    <h4>{{ 'cv.education1.employer' | translate }}</h4>
                    <p>{{ 'cv.education1.place' | translate }}</p>
                  </div>
                  <div class="col-12 item">
                    <small>{{ 'cv.education2.date' | translate }}</small>
                    <h3>{{ 'cv.education2.title' | translate }}</h3>
                    <h4>{{ 'cv.education2.employer' | translate }}</h4>
                    <p>{{ 'cv.education2.place' | translate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cv.component.scss']
})
export class CvComponent {}
