import {Component, OnInit} from '@angular/core';
import {CertificateService} from './certificate.service';
import {Observable} from 'rxjs';
import {Certificate} from './certificate';

@Component({
  selector: 'certificate-overview',
  template: `
    <div class="card" *ngIf="certificates$ | async as certificates">
      <div class="card-header">
        <h5 class="mb-0">
          <button type="button" class="btn btn-link btn-black" data-toggle="collapse" data-target="#certificateContent"
                  aria-controls="certificateContent" aria-label="Toggle certificate content" [attr.aria-expanded]="!isCollapsed"
                  (click)="toggle()">
            <i class="fa" [ngClass]="isCollapsed ? 'fa-caret-down' : 'fa-caret-up'"></i>
            <span class="ml-2">{{'data.certificates.description' | translate}}</span>
          </button>
        </h5>
      </div>
      <div class="card-body" id="certificateContent" [ngbCollapse]="isCollapsed">
        <table class="table table-striped table-responsive">
          <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{'data.certificate.name' | translate}}</th>
            <th scope="col">{{'data.certificate.organization' | translate}}</th>
            <th scope="col">{{'data.certificate.issueDate' | translate}}</th>
            <th scope="col">{{'data.certificate.type' | translate}}</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let certificate of certificates ; index as i">
            <th scope="row">{{ i + 1 }}</th>
            <td>
              <ngb-highlight class="certificate-name" [result]="certificate.name"></ngb-highlight><a class="ml-1" target="_blank"  href="{{certificate.credentialUrl}}"><i class="fa fa-external-link"></i></a>
            </td>
            <td>
              <ngb-highlight class="certificate-organization" [result]="certificate.organization"></ngb-highlight>
            </td>
            <td>
              <ngb-highlight class="certificate-issue-date" [result]="certificate.issueDate | dateLocale : 'MMMM YYYY'"></ngb-highlight>
            </td>
            <td>
              <ngb-highlight class="certificate-type" [result]="certificate.certificateType"></ngb-highlight>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`

          .btn-black {
              color: black;
          }

          .btn-black:focus {
              text-decoration: none;
          }

          .btn-black:hover {
              text-decoration: underline;
          }
      
          .certificate-type {
              text-transform: capitalize;
          }
    `
  ]
})
export class CertificateOverviewComponent implements OnInit {
  isCollapsed = true;

  certificates$: Observable<Certificate[]>;

  constructor(private certificateService: CertificateService) {

  }

  ngOnInit(): void {
    this.certificates$ = this.certificateService.getCertificates$();
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
