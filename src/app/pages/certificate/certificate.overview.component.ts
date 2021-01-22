import { Component, OnInit } from '@angular/core';
import { CertificateService } from './certificate.service';
import { Observable } from 'rxjs';
import { Certificate } from './certificate';

@Component({
  selector: 'certificate-overview',
  template: `
    <div class="container pt-2 pb-2">
      <h1>{{ 'website.certificates' | translate }}</h1>
      <ng-container *ngIf="certificates$ | async as certificates">
        <table class="table table-striped table-responsive">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ 'certificate.name' | translate }}</th>
              <th scope="col">{{ 'certificate.organization' | translate }}</th>
              <th scope="col">{{ 'certificate.issueDate' | translate }}</th>
              <th scope="col">{{ 'certificate.type' | translate }}</th>
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
