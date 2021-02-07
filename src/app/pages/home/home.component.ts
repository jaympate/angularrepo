import {Component, OnInit} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-home',
  template: `
    <div class="container home mb-5">
      <div class="row align-center">
        <div class="col-xl-6 ml-auto mr-auto">
          <div class="mt-3 mb-3">
            <i class="fa fa-quote-left quote"></i>&nbsp;
            <span class="blockquote">Let's turn data into value, together!</span
            >&nbsp;<i class="fa fa-quote-right quote"></i>
          </div>
        </div>
      </div>
      <div id="accordion">
        <app-faq-option
          question="What is Dieter's background?"
          [answer]="backgroundDieter"
        ></app-faq-option>
        <app-faq-option
          question="How much backend experience does he have?"
          [answer]="backend">
        </app-faq-option>
        <app-faq-option
          question="Does Dieter have frontend experience?"
          [answer]="frontend">
        </app-faq-option>
        <app-faq-option
          question="Does he know how to deliver software?"
          [answer]="softwareDelivery">
        </app-faq-option>
        <app-faq-option
          question="What is his experience with Artificial Intelligence?"
          [answer]="ai">
        </app-faq-option>
        <app-faq-option
          question="What does Dieter do for the community?"
          [answer]="givingBack">
        </app-faq-option>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  backgroundDieter = `
      <div class="row align-items-center">
        <div class="col">
          <p class="text-justify">
            Currently Dieter is working as a Software Engineer at Continuum Consulting NV.
            He has an academic bachelor in computer science from the University of Hasselt.
            Afterwards, he achieved a master in computer science from the KU Leuven.
            In this master he specialised himself in Artificial Intelligence.
            Dieter has been actively involved in software development for 10 years, of which 5 years professionally.
            He wants to make a positive contribution to the world, which has been changing ever faster.
            He wants to create value.
            Dieter is now ${moment().diff(moment('12-25-1992', 'MM-DD-YYYY'), 'years')} years old.
            During his career as a consultant, he was involved in various projects.
            Each time a new challenge arose, Dieter trained himself for the success of the projects.
          </p>
        </div>
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/me.png" height="200" />
        </div>
      </div>
  `;
  backend = `
      <div class="row align-items-center">
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/backend.png" height="200" />
        </div>
        <div class="col">
          <p class="text-justify">
            Dieter often had to make modifications to backend applications in the past.
            Dieter realizes that every project is different and brings its own challenges, which he is only too happy to meet.
            In the past, Dieter often used Java and related technologies in his projects, but he is also very fond of Python.
            Dieter realises that as a software engineer you certainly don't know everything.
            He does have the capacity to pick up new things quickly.
            He sees this continuous learning process as part of his journey as a software craftsman.
            He finds great peace in improving code and is a big fan of test driven development.
            This allows him to write high quality code.
          </p>
        </div>
      </div>
  `;
  frontend = `
      <div class="row align-items-center">
        <div class="col">
          <p class="text-justify">
            Dieter has never avoided doing front-end development.
            In the beginning of his career, his frontend skills were limited to HTML, JavaScript and CSS.
            Over the years he has expanded his knowledge on frontend development, investing in responsive design and
            learning best practises from his colleagues. He has applied and improved his knowledge over the years, working
            on large Angular projects. His knowledge resulted in becoming a finalist in the Angular Challenge 2019 and 2020.
            Focusing on quality, applying test driven development and focusing on best practices makes him one of the better
            Angular developers out there. He realises he has still much to learn and is willing to take advice from anyone.
            In this fast changing frontend world, you're never done learning.
          </p>
        </div>
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/frontend.png" height="200" />
        </div>
      </div>
  `;
  softwareDelivery = `
      <div class="row align-items-center">
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/shipment.png" height="200" />
        </div>
        <div class="col">
          <p class="text-justify">
            Today, writing software alone won't get you far.
            It is very important that you can deliver as well.
            Without delivery, there is no value.
            The most successful projects are the projects which are done in close cooperation with the client.
            By working together, you can respond better to the needs of the market.
            Dieter understands how important it is to deliver value fast after creation.
            That's why he learned how to deploy software.
            Over the last years he learned a lot on Docker, Jenkins and AWS.
            He knows how to quickly deliver high quality applications written with different languages and different frameworks.
            He understands that running applications can become complicated as they grow.
            Therefore he spends time on learning more and more about cloud computing services.
            Dieter is currently spending time on getting AWS Developer certified.
          </p>
        </div>
      </div>
  `;
  ai = `
      <div class="row align-items-center">
        <div class="col">
          <p class="text-justify">
            Before you can run, you'll have to learn how to walk.
            In Dieter's first years as a software developer his primary focus was on building applications.
            This does not mean he has given up on Artificial Intelligence. Every career step he has made is
            a part of his learning journey. Dieter wants to build applications that are driven by data.
            From the data of companies, the domain knowledge and the expertise of professionals within an
            organization you can obtain so much valuable information. It is his goal to turn data into value.
            He wants to eliminate the repetitive and to build upon the potential hidden in the organisation itself.
            Dieter's strong theoretical background in Artificial Intelligence aids him to understand the principles of
            Machine Learning and Deep Learning used in the industry today. To stay relevant in the field he's been
            visiting conferences and followed online courses. Besides building theoretical experience, he also gains practical
            experience by building his own hobby projects. He has build a topic prediction model that can predict
            the topics of his future articles. Currently, he's also working on a face recognition application.
          </p>
        </div>
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/ai.png" height="200" />
        </div>
      </div>
  `;
  givingBack = `
      <div class="row align-items-center">
        <div class="col-3 hidden-mobile d-flex justify-content-center">
          <img src="../../../assets/images/coaching.png" height="200" />
        </div>
        <div class="col">
          <p class="text-justify">
            As a data & software engineer Dieter likes to give something back to the community.
            He likes to share his knowledge with others and loves to learn based on the feedback he receives.
            He is open to learn from anyone, critical if needed and tries never to be blinded by his own opinions.
            As a technical writer for publications on Medium such as Better Programming, Towards
            Data Science and other publications he is able to reach more people as he normally would at work.
            Dieter likes to read and write, which only helps him to deeper understand something.
            Dieter is also aiming to speak at conferences.
            He does this because it only helps him to grow as an individual.
            If you're an organizer or publisher you're always welcome to reach out to him.
            It's his ambition to translate his experience and knowledge into value for others.
          </p>
        </div>
      </div>
  `;
}
