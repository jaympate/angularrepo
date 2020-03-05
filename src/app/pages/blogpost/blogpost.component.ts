import {Component} from '@angular/core';

@Component({
  selector: 'app-data',
  template: `
    <div class="container-fluid pt-4 pb-4">
      <h1>{{'blogpost.title' | translate}}</h1>
      <blogpost-overview></blogpost-overview>
    </div>
  `
})
export class BlogpostComponent {

}
