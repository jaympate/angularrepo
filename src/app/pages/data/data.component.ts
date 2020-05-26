import {Component} from '@angular/core';

@Component({
  selector: 'app-data',
  template: `
    <div class="container pt-4">
      <h1>{{'data.title' | translate}}</h1>
      <certificate-overview></certificate-overview>
      <p class="mt-4 pl-2 alert-info">{{'data.more.data.coming.soon' | translate}}</p>
    </div>
  `
})
export class DataComponent {

}
