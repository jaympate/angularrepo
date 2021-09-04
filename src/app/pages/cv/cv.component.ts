import { Component } from '@angular/core';

@Component({
  selector: 'app-cv',
  template: `
    <div class="container pt-3">
      <div class="row cv border pb-3">
        <div class="col-sm-4 cv-left border-right image-container">
          <div class="container-fluid pt-3 ">
            <img
              defaultImage="assets/images/loading.gif"
              lazyLoad="assets/images/profile_picture_small.jpg"
              class="img-fluid cv-image"
              alt="Curriculum Vitae image"
            />
          </div>
          <div class="container-fluid pt-3">
            <h1 class="name">Dieter Jordens</h1>
            <span class="lead">Software & Data Engineer</span>
            <div class="about pt-3">
              <p class="text-justify">
                Dieter holds the title of Civil Engineer. He is a software developer with many years of professional experience.
                He founded his own company in May 2021. Currently, he works for Aquafin NV as an independent contractor.
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-8 cv-right">
          <div class="container">
            <div class="row border-bottom pt-3 pl-3">
              <div class="col">
                <h2 class="section-title">Work experience</h2>
                <div class="row">
                  <div class="col-12 item">
                    <small>May 2021 - Present</small>
                    <h3>Software & Data Engineer</h3>
                    <h4>Dieter Jordens IT Consulting</h4>
                  </div>
                  <div class="col-12 item">
                    <small>September 2016 - May 2021</small>
                    <h3>Software Craftsman</h3>
                    <h4>Continuum Consulting NV</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-3 pl-3">
              <div class="col">
                <h2 class="section-title">Education</h2>
                <div class="row">
                  <div class="col-12 item">
                    <small>2016</small>
                    <h3>Master of Engineering: Computer Science, Artificial Intelligence</h3>
                    <h4>University of Leuven</h4>
                  </div>
                  <div class="col-12 item">
                    <small>2014</small>
                    <h3>Bachelor of Science: Computer Science, ICT</h3>
                    <h4>University of Hasselt</h4>
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
