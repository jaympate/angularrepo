import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataModule } from '../data/data.module';
import { DateModule } from '../../common/date.module';
import { CertificateOverviewComponent } from './certificate.overview.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    DataModule,
    DateModule
  ],
  declarations: [CertificateOverviewComponent]
})
export class CertificateModule {}
