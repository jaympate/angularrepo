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
              alt="Curriculum Vitae image"
            />
          </div>
          <div class="container-fluid pt-3">
            <h1 class="name">Dieter Jordens</h1>
            <span class="lead">Software & Data Craftsman</span>
            <div class="about pt-3">
              <p class="text-justify">
                Dieter is a software developer with 5 years of professional experience.
                He holds the title of Civil Engineer.
                Dieter currently works as a software and data craftsman at Continuum Consulting NV.
              </p>
            </div>
            <ul class="social-media-list">
              <li>
                <a href="https://www.facebook.com/dieter.jordens"
                  ><i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/dieterjordens"
                  ><i class="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://gitlab.com/dieterj"
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
              href="mailto:dieter.jordens.website@gmail.com?subject=CV&body=Hi Dieter%0A%0AI%20would%20like%20access%20to%20your%20personal%20resume%20for%20<insert-reason>.%0AKind%20regards%0A%0A<insert-name>"
              class="btn btn-outline-dark btn-lg cvButton"
              ><i class="fa fa-download"></i> Receive full resume</a
            >
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
                    <h4>Dieter Jordens IT Consulting BV</h4>
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
