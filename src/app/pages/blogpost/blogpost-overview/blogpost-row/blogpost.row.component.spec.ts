import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {BlogpostRowComponent} from './blogpost.row.component';
import {TranslatePipeMock} from '../../../../translation/translate.pipe.mock';
import {DateLocaleFilter} from '../../../../common/date.locale.filter';
import {Builder} from 'builder-pattern';
import {Blogpost} from '../blogpost';

describe('BlogpostRowComponent', () => {
  let component: BlogpostRowComponent;
  let fixture: ComponentFixture<BlogpostRowComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        BlogpostRowComponent,
        TranslatePipeMock,
        DateLocaleFilter
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostRowComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should render a list of two blogposts, when there are two given', () => {
    component.blogpost = Builder<Blogpost>()
      .title('my title')
      .url('www.my.title.com')
      .publicationDate(new Date("2020-12-15"))
      .category('general')
      .build();
    component.rowNumber = 5;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
