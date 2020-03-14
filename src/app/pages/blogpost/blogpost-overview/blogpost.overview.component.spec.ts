import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {BlogpostOverviewComponent} from './blogpost.overview.component';
import {TranslatePipeMock} from '../../../translation/translate.pipe.mock';
import {DateLocaleFilter} from '../../../common/date.locale.filter';
import {BlogpostService} from './blogpost.service';
import {BehaviorSubject} from 'rxjs';
import {Blogpost} from './blogpost';
import {Builder} from 'builder-pattern';

describe('BlogpostOverviewComponent', () => {
  let component: BlogpostOverviewComponent;
  let fixture: ComponentFixture<BlogpostOverviewComponent>;
  let blogpostSubject = new BehaviorSubject<Blogpost[]>(null);

  beforeEach(() => {
    const blogposts$ = jest.fn().mockReturnValue(blogpostSubject.asObservable());

    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        BlogpostOverviewComponent,
        TranslatePipeMock,
        DateLocaleFilter
      ],
      providers: [
        {
          provide: BlogpostService,
          useValue: {
            getBlogposts$: blogposts$
          }
        }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostOverviewComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should render a list of blogposts', () => {
    const blogpost1 = Builder<Blogpost>()
      .title('How to be successful')
      .category('life')
      .publicationDate(new Date())
      .url('http://www.how.to.be.succesful.com')
      .build();

    const blogpost2 = Builder<Blogpost>()
      .title('How to succeed at programming')
      .category('programming')
      .publicationDate(new Date())
      .url('http://www.how.to.succeed.at.programming.com')
      .build();

    blogpostSubject.next([
      blogpost1,
      blogpost2
    ]);

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
