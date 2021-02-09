import { Component, OnInit } from '@angular/core';
import { CertificateService } from './certificate.service';
import { Observable } from 'rxjs';
import { Certificate } from './certificate';

@Component({
  selector: 'certificate-overview',
  template: `
    <div class="container pt-2 pb-2">
      <h1>Awards, certificates, courses and conferences</h1>
      <ng-container *ngIf="certificates$ | async as certificates">
        <table class="table table-striped table-responsive">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Organisation</th>
              <th scope="col">Issue date</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let certificate of certificates; index as i">
              <th scope="row">{{ i + 1 }}</th>
              <td>
                <ngb-highlight
                  class="certificate-name"
                  [result]="certificate.name"
                ></ngb-highlight>
                <a
                  *ngIf="certificate.credentialUrl.length > 0"
                  class="ml-1"
                  target="_blank"
                  href="{{ certificate.credentialUrl }}"
                  ><i class="fa fa-external-link"></i
                ></a>
              </td>
              <td>
                <ngb-highlight
                  class="certificate-organization"
                  [result]="certificate.organization"
                ></ngb-highlight>
              </td>
              <td>
                <ngb-highlight
                  class="certificate-issue-date"
                  [result]="certificate.issueDate | dateLocale: 'MMMM YYYY'"
                ></ngb-highlight>
              </td>
              <td>
                <ngb-highlight
                  class="certificate-type"
                  [result]="certificate.certificateType"
                ></ngb-highlight>
              </td>
            </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .certificate-type {
        text-transform: capitalize;
      }
    `
  ]
})
export class CertificateOverviewComponent implements OnInit {
  certificates$: Observable<Certificate[]>;

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.certificates$ = this.certificateService.getCertificates$();
  }
}
