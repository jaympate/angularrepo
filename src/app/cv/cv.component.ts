import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cv',
  template: `
    <div class="container pt-2">
      <div class="row cv border">
        <div class="col-sm-4 cv-left border-right">
          <div class="container-fluid pt-4 pb-4">
            <img src="/assets/images/dieter.jpg" class="img-fluid cv-image" alt="{{'cv.image' | translate}}">
          </div>
          <div class="container-fluid ">
            <h1 class="name">Dieter Jordens</h1>
            <span class="lead">{{'cv.current.role' | translate}}</span>
            <div class="about pt-2">
              <p>{{'cv.about.part1' | translate}}</p>
              <p>{{'cv.about.part2' | translate}}</p>
            </div>
            <ul class="social-media-list pb-2">
              <li>
                <a href="https://www.facebook.com/dieter.jordens"><i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/dieterjordens"><i class="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://gitlab.com/djFooFoo"><i class="fa fa-gitlab"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Dieter_Jordens"><i class="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="mailto:dieter.jordens.website@gmail.com"><i class="fa fa-envelope"></i>
                </a>
              </li>
            </ul>
            <a href="mailto:dieter.jordens.website@gmail.com?subject=CV&body={{'cv.body' | translate}}"
               class="btn btn-outline-success"><i
              class="fa fa-download"></i> {{'cv.receive' | translate}}</a>
          </div>
        </div>
        <div class="col-sm-8 cv-right">
          <div class="container">
            <div class="row border-bottom pt-4 pb-2 pl-3">
              <div class="col">
                <h2 class="section-title">{{'cv.expertise' | translate}}</h2>
                <div class="row">
                  <div class="col-sm-6 item">
                    <h3>{{'cv.back-end' | translate}}</h3>
                    <p>{{'cv.back-end.detail' | translate}}</p>
                  </div>
                  <div class="col-sm-6 item">
                    <h3>{{'cv.front-end' | translate}}</h3>
                    <p>{{'cv.front-end.detail' | translate}}</p>
                  </div>
                  <div class="col-sm-6 item">
                    <h3>{{'cv.quality-management' | translate}}</h3>
                    <p>{{'cv.quality-management.detail' | translate}}</p>
                  </div>
                  <div class="col-sm-6 item">
                    <h3>{{'cv.data-technologies'| translate}}</h3>
                    <p>{{'cv.data-technologies.detail'| translate}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row border-bottom pt-4 pb-2 pl-3">
              <div class="col">
                <h2 class="section-title">{{'cv.work.experience' | translate}}</h2>
                <div class="row">
                  <div class="col-12 item">
                    <small>{{'cv.work.experience1.date' | translate}}</small>
                    <h3>{{'cv.work.experience1.title' | translate}}</h3>
                    <h4>{{'cv.work.experience1.employer' | translate}}</h4>
                    <p>{{'cv.work.experience1.place' | translate}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-4 pl-3">
              <div class="col">
                <h2 class="section-title">{{'cv.education' | translate}}</h2>
                <div class="row">
                  <div class="col-12 item">
                    <small>{{'cv.education1.date' | translate}}</small>
                    <h3>{{'cv.education1.title' | translate}}</h3>
                    <h4>{{'cv.education1.employer' | translate}}</h4>
                    <p>{{'cv.education1.place' | translate}}</p>
                  </div>
                  <div class="col-12 item">
                    <small>{{'cv.education2.date' | translate}}</small>
                    <h3>{{'cv.education2.title' | translate}}</h3>
                    <h4>{{'cv.education2.employer' | translate}}</h4>
                    <p>{{'cv.education2.place' | translate}}</p>
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
export class CvComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
