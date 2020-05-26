import {NgModule} from '@angular/core';
import {DataComponent} from './data.component';
import {CommonModule, DecimalPipe} from '@angular/common';
import {SortableHeaderDirective} from './sortable-header.directive';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NumberToStringPipe} from './no.comma.pipe';
import {BookOverviewComponent} from './book/book.overview.component';
import {CertificateOverviewComponent} from './certificate/certificate.overview.component';
import {DateModule} from '../../common/date.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DateModule
    ],
    declarations: [
        DataComponent,
        BookOverviewComponent,
        CertificateOverviewComponent,
        SortableHeaderDirective,
        NumberToStringPipe
    ],
    exports: [
        SortableHeaderDirective,
        NumberToStringPipe
    ],
    providers: [
        DecimalPipe
    ]
})
export class DataModule {

}
