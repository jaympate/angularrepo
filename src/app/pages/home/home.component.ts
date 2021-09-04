import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <div class="header">
        <div class="pb-3 pt-5 about grid-container">
          <div class='grid-child text-header'>
            <h1 class="title">I Change Your Data Into Value</h1>&nbsp;
            <p> My job as a data engineer is to analyse data and make it usable.
              Together we solve your daily software problems with years of experience. </p>
          </div>
          <div class='grid-child'>
            <img class='image' height='200px' src="assets/images/cartoon.png">
          </div>
        </div>
      </div>
      <div class="slant"></div>
      <div class="container home">
        <h2 class='pb-3'>Frequently Asked Questions</h2>
        <div id="accordion">
          <app-faq-option
            question="What is Dieter's background?"
            [answer]="backgroundDieter"
          ></app-faq-option>
          <app-faq-option
            question="How much back-end experience does he have?"
            [answer]="backend"
          >
          </app-faq-option>
          <app-faq-option
            question="Does Dieter have front-end experience?"
            [answer]="frontend"
          >
          </app-faq-option>
          <app-faq-option
            question="Does he know how to deliver software?"
            [answer]="softwareDelivery"
          >
          </app-faq-option>
          <app-faq-option
            question="What is his experience with Artificial Intelligence?"
            [answer]="ai"
          >
          </app-faq-option>
          <app-faq-option
            question="What does Dieter do for the community?"
            [answer]="givingBack"
          >
          </app-faq-option>
        </div>
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
            Dieter is currently working as a software and data engineer for his first client as a freelancer: Aquafin NV.
            He has a master degree in Computer Science from KU Leuven.
            In this master, he specialised himself in Artificial Intelligence.
            Dieter has developed software for ten years now, of which five years professionally.
            He wants to make a positive contribution to the world, which has been changing ever faster.
            He wants to create value.
            Dieter is now ${moment().diff(
                moment('12-25-1992', 'MM-DD-YYYY'),
                'years'
              )} years old.
            During his career as a consultant, he did various projects.
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
            Dieter realizes that every project is different and brings its challenges, which he is only too happy to meet.
            In the past, Dieter often used Java and related technologies in his projects. Still, he is also very fond of Python.
            Dieter realizes that as a software engineer, you certainly don't know everything.
            He does have the capacity to pick up new things quickly.
            He sees this continuous learning process as part of his journey as a software craftsman.
            He finds great peace in improving code and is a big fan of test-driven development. He focuses on writing high-quality code.
          </p>
        </div>
      </div>
  `;
  frontend = `
      <div class="row align-items-center">
        <div class="col">
          <p class="text-justify">
            Dieter has never avoided doing front-end development.
            At the beginning of his career, his front-end skills existed of HTML, JavaScript and CSS.
            Over the years, he has expanded his knowledge on front-end development, investing in responsive design and
            learning best practices from his colleagues. He has applied and improved his expertise over the years, working
            on large Angular projects. His knowledge resulted in becoming a finalist in the Angular Challenge 2019 and 2020.
            Focusing on quality, applying test-driven development and focusing on best practices makes him one of the better Angular developers out there.
            If there is one thing he realised, learning never stops in the fast-changing front-end world.
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
            Delivering software is essential.
            Without delivery, there is no value.
            The most successful projects are the projects in close cooperation with the client.
            By working together, you can respond better to the needs of the market.
            Dieter understands how important it is to deliver value fast after creation.
            That's why he learned how to deploy software.
            Over the last years, he learned a lot about Docker, Jenkins and the cloud.
            He knows how to quickly deliver high-quality applications written in different languages and different frameworks.
            He understands that running applications can become complicated as they grow.
            Therefore he spends time learning more and more about cloud computing services.
          </p>
        </div>
      </div>
  `;
  ai = `
      <div class="row align-items-center">
        <div class="col">
          <p class="text-justify">
            Before you can run, you'll have to learn how to walk.
            In Dieter's first years as a software developer, his primary focus was on building applications.
            Dieter did not give up on Artificial Intelligence. Every career step he has made is
            a part of his learning journey. Dieter wants to build applications driven by data.
            From the data of companies, the domain knowledge, and professionals' expertise within an
            organization, you can obtain so much valuable information. It is his goal to turn data into value.
            Dieter's theoretical solid background in Artificial Intelligence aids him to understand the principles of
            Machine Learning and Deep Learning used in the industry today. To stay relevant in the field, he's been
            visiting conferences and followed online courses. Besides building theoretical experience, he also gains practical
            experience by creating his hobby projects. He has made a topic prediction model that can predict
            the topics of his future articles. Earlier in his career, he also worked on a face recognition
            and identification application.
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
            As a data and software engineer Dieter likes to give something back to the community.
            He likes to share his knowledge with others and loves to learn based on the feedback he receives.
            He is open to learning from anyone, critical if needed and tries never to be blinded by his own opinions.
            As a technical writer for publications on Medium such as Better Programming, Towards
            Data Science (and others) he can reach more people as he usually would at work.
            Dieter likes to read and write, which only helps him to deeper understand something.
            Dieter also spoke at two online conferences in the past and would love to do this again, when
            events can be organized in person again. Dieter believes that writing and speaking helps to grow as an individual.
            If you're an organizer or publisher, you're always welcome to reach out.
            It's Dieters ambition to translate his experience and knowledge into value for others.
          </p>
        </div>
      </div>
  `;
}
